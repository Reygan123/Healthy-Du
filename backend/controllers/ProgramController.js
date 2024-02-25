const { Program } = require("../models");
const { Op } = require("sequelize");

const addProgram = async (req, res, next) => {
    try {
        const { name, description } = req.body;

        const response = await Program.create({ name, description });

        res
            .status(200)
            .json(response);
    } catch (error) {
        console.log(error.name);
        next(error);
    }
};

const getAllProgram = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const nameFilter = req.query.q || "";
        const q = req.query.q || "";
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

        const { count, rows } = await Program.findAndCountAll({
            where: {
                name: {
                    [Op.iLike]: `%${nameFilter}%`,
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
            data: rows,
        };

        return res.status(200).json(paginationInfo);
    } catch (err) {
        next(err);
    }
};

const getProgrambyId = async (req, res, next) => {
    try {
        const program = await Program.findByPk(req.params.id);
        if (!program) {
            throw { name: "ErrorNotFound" };
        }
        return res.status(200).json({ data: program });
    } catch (error) {
        next(error);
    }
};

const updateProgram = async (req, res, next) => {
    try {
        const { name, description } = req.body;
        const { id } = req.params;

        const program = await Program.findOne({
            where: {
                id,
            },
        });

        if (!program) {
            throw { name: "ErrorNotFound" };
        };

        await program.update({ name, description })

        res.status(200).json({
            message: "Program Updated Successfully",
            data: program,
        });
    } catch (err) {
        next(err);
    }
};

const deleteProgram = async (req, res, next) => {
    try {
        const { id } = req.params
        const findProgram = await Program.findByPk(id);
        if (!findProgram) {
            throw { name: "ErrorNotFound" };
        }
        await findProgram.destroy();
        return res.status(200).json({ message: "Delete Successfully" });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    addProgram,
    getProgrambyId,
    getAllProgram,
    updateProgram,
    deleteProgram,
};