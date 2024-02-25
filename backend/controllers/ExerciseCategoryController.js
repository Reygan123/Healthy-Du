const { Exercise, Exercise_Category, Category } = require("../models");
const { Op } = require("sequelize");

const createExerciseCategory = async (req, res, next) => {
    try {
        const { exerciseId, categoryId } = req.body;

        const exercise = await Exercise.findByPk(exerciseId);
        const category = await Category.findByPk(categoryId);

        if (!exercise) {
            return res.status(404).json({ error: 'Exercise not found' });
        }

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        const joinedCourse = await Exercise_Category.create({
            exercise_id: exerciseId,
            category_id: categoryId,
        });

        const DetailExercise = await Exercise.findByPk(exerciseId);
        const DetailCategory = await Category.findByPk(categoryId);

        const response = {
            joinedCourse,
            exercise: DetailExercise,
            category: DetailCategory
        };

        return res.status(201).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateExerciseCategory = async (req, res, next) => {
    try {
        const { exerciseId, categoryId } = req.body;
        const { id } = req.params;

        const exerciseCategory = await Exercise_Category.findOne({
            where: {
                id,
            },
        });

        if (!exerciseCategory) {
            return res.status(404).json({ error: 'Exercise Category not found' });
        }

        if (exerciseId !== undefined) {
            exerciseCategory.exercise_id = exerciseId;
        }

        if (categoryId !== undefined) {
            exerciseCategory.category_id = categoryId;
        }

        await Exercise_Category.update(
            {
                exercise_id: exerciseId || exerciseCategory.exerciseId,
                category_id: categoryId || exerciseCategory.categoryId
            },
            {
                where: {
                    id,
                },
                returning: true,
            }
        );

        res.status(200).json({
            status: true,
            message: "Exercise Category Updated Successfully",
            data: exerciseCategory,
        });
    } catch (error) {
        next(error);
    }
};

// const updateExerciseCategory = async (req, res, next) => {
//     try {
//         const exerciseCategoryId = req.params.id;
//         const { exerciseId, categoryId } = req.body;

//         const categoryExercises = await Exercise_Category.findByPk(exerciseCategoryId);

//         if (!exercise) {
//             return res.status(404).json({ error: 'Exercise not found' });
//         }

//         if (!category) {
//             return res.status(404).json({ error: 'Category not found' });
//         }

//         const exercise = await Exercise.findByPk(exerciseId);
//         const category = await Category.findByPk(categoryId);

//         if (!exercise) {
//             return res.status(404).json({ error: 'Exercise not found' });
//         }

//         if (!category) {
//             return res.status(404).json({ error: 'Course not found' });
//         }

//         await category.update({
//             exercise_id: exerciseId,
//             category_id: categoryId,
//         });

//         return res.status(200).json(categoryExercises);
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: 'Internal Server Error' });
//     }
// }

const getExerciseCategorybyId = async (req, res, next) => {
    try {
        const { id } = req.params;

        const foundJoin = await Exercise_Category.findOne({
            include: [{
                model: Exercise
            }, {
                model: Category
            }],
            where: { id }
        });

        if (!foundJoin) {
            throw { name: "errorNotFound" };
        }

        res.status(200).json({ status: true, data: foundJoin })
    } catch (error) {
        next(error);
    }
};

const getAllExerciseCategory = async (req, res, next) => {
    try {
        const { id } = req.params;

        const page = +req.query.page || 1;
        const limit = +req.query.limit || 10;
        const queryFilter = req.query.q || "";
        // const nameFilter = req.query.name || "";
        const exerciseId = req.query.exerciseId || null;
        const categoryId = req.query.categoryId || null;
        const offset = limit * (page - 1);

        let optionFilter = {
            attributes: ['id', 'exercise_id', 'category_id'],
            include: [
                {
                    model: Exercise
                },
                {
                    model: Category
                }
            ], where: {},
        };

        if (id) {
            optionFilter.where.id = id;
        }

        if (queryFilter) {
            optionFilter.where = {
                [Op.or]: [
                    {
                        "$Exercise.name$": {
                            [Op.iLike]: `%${queryFilter}%`
                        }
                    }
                ]
            }
        }

        if (exerciseId) {
            optionFilter.where.exercise_id = exerciseId;
        }

        if (categoryId) {
            optionFilter.where.category_id = categoryId;
        }

        const { count, rows } = await Exercise_Category.findAndCountAll({
            ...optionFilter,
            // where: {
            //     name: {
            //         [Op.iLike]: `%${nameFilter}%`,
            //     },
            // },
            subQuery: false,
            distinct: true,
            offset,
            limit,
            order: [['createdAt', 'DESC']]
        });

        const totalPage = Math.ceil(count / limit);
        const nextPage = page < totalPage ? page + 1 : null;
        const prevPage = page > 1 ? page - 1 : null;

        res.status(200).json({
            success: true,
            totalData: count,
            totalPage,
            prevPage,
            nextPage,
            currentPage: page,
            data: rows,
        });


    } catch (error) {
        next(error)
    }
};

const deleteExerciseCategory = async (req, res, next) => {
    try {
        const { id } = req.params

        const category = await Exercise_Category.findOne({
            where: {
                id
            }
        })

        if (!category) {
            throw { name: "errorNotFound" }
        }

        await category.destroy();
        res.status(200).json({ status: true, message: "Category Deleted Succesfully" });
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createExerciseCategory,
    updateExerciseCategory,
    getAllExerciseCategory,
    getExerciseCategorybyId,
    deleteExerciseCategory
};
