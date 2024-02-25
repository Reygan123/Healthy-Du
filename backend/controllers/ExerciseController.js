const { Category, sequelize, Exercise, Exercise_Category, Program_Week, Week } = require("../models");
const { Op } = require("sequelize");

const addExercise = async (req, res, next) => {
    // const t = await sequelize.transaction();
    try {
        const { name, description, repetition_time, repetition_value, level, calories, link } = req.body;

        const exercise = await Exercise.create({
            name,
            description,
            repetition_time,
            repetition_value,
            level,
            calories,
            link
        }, { returning: true })

        res.status(201).json({
            message: "Exercise created Succesfully",
            data: exercise
        })
    } catch (error) {
        next(error)
    }
}

const getExercise = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const q = req.query.q || "";
        const levelFilter = req.query.level || "";
        let optionFilter
        const offset = (page - 1) * limit;

        if (q) {
            optionFilter = {
                where: {
                    [Op.or]: []
                }
            };

            let filterName = {
                name: {
                    [Op.iLike]: `%${q}%`
                }
            }

            optionFilter.where[Op.or].push(filterName)
        }

        const { count, rows: exercises } = await Exercise.findAndCountAll({
            // ...filterCategory,
            where: {
                level: {
                    [Op.iLike]: `%${levelFilter}%`,
                },
            },
            offset,
            limit,
            distinct: true,
            ...optionFilter,
            order: [['createdAt', 'DESC']]
        });

        const totalPages = Math.ceil(count / limit);

        const nextPage = page < totalPages ? page + 1 : null;
        const prevPage = page > 1 ? page - 1 : null;

        const paginationInfo = {
            totalItems: count,
            totalPages,
            currentPage: page,
            nextPage,
            prevPage,
            data: exercises,
        };

        res.status(200).json({ data: paginationInfo })
    } catch (error) {
        next(error)
    }
}

const getExerciseID = async (req, res, next) => {
    try {
        const { id } = req.params;

        const foundExercise = await Exercise.findOne({
            include: [{
                model: Category
            }],
            where: {
                id
            }
        })

        if (!foundExercise) {
            throw { name: "errorNotFound" }
        }

        await res.status(200).json({ status: true, data_exercise: foundExercise })
    } catch (error) {
        next(error)
    }
}

const updateExercise = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;
        const { name, repetition_time, repetition_value, level, description, calories, link } = req.body;

        const foundExercise = await Exercise.findOne({
            where: {
                id
            }
        })

        if (!foundExercise) {
            throw { name: "errorNotFound" }
        }

        let updateExercise = {
            name: name || foundExercise.name,
            repetition_time: repetition_time || foundExercise.repetition_time,
            repetition_value: repetition_value || foundExercise.repetition_value,
            level: level || foundExercise.level,
            description: description || foundExercise.description,
            calories: calories || foundExercise.calories,
            link: link || foundExercise.link
        }

        await Exercise_Category.destroy({
            where: {
                exercise_id: foundExercise.id,
            }
        }, {})

        await foundExercise.update(updateExercise);
        res.status(200).json({ status: true, message: "Exercise Updated Succesfully" });
    } catch (error) {
        await t.rollback();
        next(error)
    }
}

const getExerciseByProgramId = async (req, res, next) => {
    try {
        const { programId } = req.params;

        const exercises = await Exercise.findAll({
            include: [
                {
                    model: Program_Week,
                    include: [
                        {
                            model: Week,
                            where: {
                                program_id: programId
                            },
                        },
                    ],
                },
            ],
        });

        res.status(200).json({ data: exercises });
    } catch (error) {
        next(error);
    }
};

const deleteExercise = async (req, res, next) => {
    try {
        const { id } = req.params

        const foundExercise = await Exercise.findOne({
            where: {
                id
            }
        })

        if (!foundExercise) {
            throw { name: "errorNotFound" }
        }

        await foundExercise.destroy();
        res.status(200).json({ status: true, message: "Exercise Deleted Succesfully" });
    } catch (error) {
        next(error)
    }
}

module.exports = {
    addExercise,
    getExercise,
    getExerciseID,
    updateExercise,
    getExerciseByProgramId,
    deleteExercise
}