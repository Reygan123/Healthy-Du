const { Exercise, Program, Program_Exercise } = require("../models");

const createProgramExercise = async (req, res, next) => {
    try {
        const { programId, exerciseId } = req.body;

        const program = await Program.findByPk(programId);
        const exercise = await Exercise.findByPk(exerciseId);

        if (!program) {
            return res.status(404).json({ error: 'Program not found' });
        }

        if (!exercise) {
            return res.status(404).json({ error: 'Exercise not found' });
        }

        const payload = await Program_Exercise.create({
            program_id: programId,
            exercise_id: exerciseId,
        });

        const DetailProgram = await Program.findByPk(programId);
        const DetailExercise = await Exercise.findByPk(exerciseId);

        const response = {
            payload,
            program: DetailProgram,
            exercise: DetailExercise,
        };

        return res.status(201).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateProgramExercise = async (req, res, next) => {
    try {
        const { programId, exerciseId } = req.body;
        const { id } = req.params;

        const programExercise = await Program_Exercise.findOne({
            where: {
                id,
            },
        });

        if (!programExercise) {
            return res.status(404).json({ error: 'Program_Exercise not found' });
        }

        if (exerciseId !== undefined) {
            programExercise.exercise_id = exerciseId;
        }

        if (programId !== undefined) {
            programExercise.program_id = programId;
        }

        await Program_Exercise.update(
            {
                program_id: programId || programExercise.programId,
                exercise_id: exerciseId || programExercise.exerciseId
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
            message: "Schedule Updated Successfully",
            data: programExercise,
        });
    } catch (error) {
        next(error);
    }
};


const getProgramExercisebyId = async (req, res, next) => {
    try {
        const { id } = req.params;

        const foundProgram_Exercise = await Program_Exercise.findOne({
            include: [{
                model: Exercise
            }, {
                model: Program
            }],
            where: { id }
        });

        if (!foundProgram_Exercise) {
            throw { name: "errorNotFound" };
        }

        res.status(200).json({ status: true, data: foundProgram_Exercise })
    } catch (error) {
        next(error);
    }
};

const getAllProgramExercise = async (req, res, next) => {
    try {
        const { id } = req.params;

        const page = +req.query.page || 1;
        const limit = +req.query.limit || 10;
        const queryFilter = req.query.q || "";
        const programId = req.query.programId || null;
        const exerciseId = req.query.exerciseId || null;
        const offset = limit * (page - 1);

        let optionFilter = {
            attributes: ['id', 'program_id', 'exercise_id'],
            include: [
                {
                    model: Program
                },
                {
                    model: Exercise
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
                        "$Program.name$": {
                            [Op.iLike]: `%${queryFilter}%`
                        }
                    },
                    {
                        "$Exercise.name$": {
                            [Op.iLike]: `%${queryFilter}%`
                        }
                    }
                ]
            }
        }

        if (programId) {
            optionFilter.where.program_id = programId;
        }

        if (exerciseId) {
            optionFilter.where.exercise_id = exerciseId;
        }

        const { count, rows } = await Program_Exercise.findAndCountAll({
            ...optionFilter,
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

const deleteProgramExercise = async (req, res, next) => {
    try {
        const { id } = req.params

        const foundProgram_Exercise = await Program_Exercise.findOne({
            where: {
                id
            }
        })

        if (!foundProgram_Exercise) {
            throw { name: "errorNotFound" }
        }

        await foundProgram_Exercise.destroy();
        res.status(200).json({ status: true, message: "Program Deleted Succesfully" });
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createProgramExercise,
    updateProgramExercise,
    getAllProgramExercise,
    getProgramExercisebyId,
    deleteProgramExercise
};
