const { Exercise_Report, User } = require("../models");

const createExerciseReport = async (req, res, next) => {
    try {
        const { userId, total_exercise, total_time, total_calories } = req.body;

        const user = await User.findByPk(userId);

        const currentDate = new Date();

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const payload = await Exercise_Report.create({
            user_id: userId,
            total_exercise,
            total_time,
            total_calories,
            date: currentDate
        });

        const DetailUser = await User.findByPk(userId);

        const response = {
            payload,
            user: DetailUser,
        };

        return res.status(201).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateExerciseReport = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userId, total_exercise, total_time, total_calories } = req.body;

        const foundExercise_Report = await Exercise_Report.findOne({ where: { id } });
        if (!foundExercise_Report) {
            return res.status(404).json({ error: 'Exercise Report not found' });
        }

        if (userId !== undefined) {
            foundExercise_Report.user_id = userId;
        }

        await Exercise_Report.update(
            {
                total_exercise: total_exercise || foundExercise_Report.total_exercise,
                total_time: total_time || foundExercise_Report.total_time,
                total_calories: total_calories || foundExercise_Report.total_calories,
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
            message: 'Exercise Report successfully updated',
            data: foundExercise_Report,
        });
    } catch (error) {
        next(error);
    }
};


const getExerciseReportbyId = async (req, res, next) => {
    try {
        const { id } = req.params;

        const foundExercise_Report = await Exercise_Report.findOne({
            include: [{
                model: User
            }],
            where: { id }
        });

        if (!foundExercise_Report) {
            throw { name: "errorNotFound" };
        }

        res.status(200).json({ status: true, data: foundExercise_Report })
    } catch (error) {
        next(error);
    }
};

const getAllExerciseReport = async (req, res, next) => {
    try {
        const { id } = req.params;

        const page = +req.query.page || 1;
        const limit = +req.query.limit || 10;
        const queryFilter = req.query.q || "";
        const userId = req.query.userId || null;
        const offset = limit * (page - 1);

        let optionFilter = {
            attributes: ['id', 'user_id', 'total_exercise', 'total_time', 'total_calories', 'date'],
            include: [
                {
                    model: User
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
                        "$User.name$": {
                            [Op.iLike]: `%${queryFilter}%`
                        }
                    }
                ]
            }
        }

        if (userId) {
            optionFilter.where.user_id = userId;
        }

        const { count, rows } = await Exercise_Report.findAndCountAll({
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

const deleteExerciseReport = async (req, res, next) => {
    try {
        const { id } = req.params

        const foundExercise_Report = await Exercise_Report.findOne({
            where: {
                id
            }
        })

        if (!foundExercise_Report) {
            throw { name: "errorNotFound" }
        }

        await foundExercise_Report.destroy();
        res.status(200).json({ status: true, message: "Exercise Report Deleted Succesfully" });
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createExerciseReport,
    updateExerciseReport,
    getAllExerciseReport,
    getExerciseReportbyId,
    deleteExerciseReport
};
