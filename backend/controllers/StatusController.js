const { Exercise_Report, User, Program, Status_Program } = require("../models");

const createStatusProgram = async (req, res, next) => {
    try {
        const { userId, programId, status } = req.body;

        const user = await User.findByPk(userId);
        const program = await Program.findByPk(programId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!program) {
            return res.status(404).json({ error: 'Program not found' });
        }

        const payload = await Status_Program.create({
            user_id: userId,
            program_id: programId,
            status,
        });

        const DetailUser = await User.findByPk(userId);
        const DetailProgram = await Program.findByPk(programId);

        const response = {
            payload,
            user: DetailUser,
            program: DetailProgram
        };

        return res.status(201).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateStatusProgram = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userId, programId, status, total_calories } = req.body;

        const foundStatus = await Status_Program.findOne({ where: { id } });
        if (!foundStatus) {
            return res.status(404).json({ error: 'Status Program not found' });
        }

        if (userId !== undefined) {
            foundStatus.user_id = userId;
        }

        if (programId !== undefined) {
            foundStatus.program_id = programId;
        }

        await Status_Program.update(
            {
                status: status || foundStatus.status,
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
            message: 'Status Program successfully updated',
            data: foundStatus,
        });
    } catch (error) {
        next(error);
    }
};


const getStatusProgrambyId = async (req, res, next) => {
    try {
        const { id } = req.params;

        const foundStatus = await Status_Program.findOne({
            include: [{
                model: User
            }, {
                model: Program
            }],
            where: { id }
        });

        if (!foundStatus) {
            throw { name: "errorNotFound" };
        }

        res.status(200).json({ status: true, data: foundStatus })
    } catch (error) {
        next(error);
    }
};

const getAllStatusProgram = async (req, res, next) => {
    try {
        const { id } = req.params;

        const page = +req.query.page || 1;
        const limit = +req.query.limit || 10;
        const queryFilter = req.query.q || "";
        const userId = req.query.userId || null;
        const programId = req.query.programId || null;
        const offset = limit * (page - 1);

        let optionFilter = {
            attributes: ['id', 'user_id', 'program_id', 'status'],
            include: [
                {
                    model: User
                },
                {
                    model: Program
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

        if (programId) {
            optionFilter.where.program_id = programId;
        }

        const { count, rows } = await Status_Program.findAndCountAll({
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

const deleteStatusProgram = async (req, res, next) => {
    try {
        const { id } = req.params

        const foundStatus = await Status_Program.findOne({
            where: {
                id
            }
        })

        if (!foundStatus) {
            throw { name: "errorNotFound" }
        }

        await foundStatus.destroy();
        res.status(200).json({ status: true, message: "Status Program Deleted Succesfully" });
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createStatusProgram,
    updateStatusProgram,
    getAllStatusProgram,
    getStatusProgrambyId,
    deleteStatusProgram
};
