const { Week } = require("../models");
const { Op } = require("sequelize");

const addWeek = async (req, res, next) => {
    try {
        const { name, description } = req.body;

        await Week.create({ name, description });
        res
            .status(200)
            .json({ status: true, message: "Week Created Successfully" });
    } catch (error) {
        console.log(error.name);
        next(error);
    }
};

const getAllWeek = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const nameFilter = req.query.name || "";

        const offset = (page - 1) * limit;

        const { count, rows: weeks } = await Week.findAndCountAll({
            where: {
                name: {
                    [Op.iLike]: `%${nameFilter}%`,
                },
            },
            offset,
            limit,
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
            data: weeks,
        };

        return res.status(200).json(paginationInfo);
    } catch (err) {
        next(err);
    }
};

const getWeekbyId = async (req, res, next) => {
    try {
        const weeks = await Week.findByPk(req.params.id);
        if (!weeks) {
            throw { name: "ErrorNotFound" };
        }
        return res.status(200).json({ data: weeks });
    } catch (error) {
        next(error);
    }
};

const updateWeek = async (req, res, next) => {
    try {
        const { name, description } = req.body;
        const { id } = req.params;

        const weeks = await Week.findOne({
            where: {
                id,
            },
        });

        if (!weeks) {
            throw { name: "ErrorNotFound" };
        }

        await Week.update(
            {
                name: name || weeks.name,
                description: description || weeks.description
            },
            {
                where: {
                    id,
                },
                returning: true,
            }
        );

        res.status(200).json({
            message: "Week Updated Successfully",
            data: weeks,
        });
    } catch (err) {
        next(err);
    }
};

const deleteWeek = async (req, res, next) => {
    try {
        const findWeek = await Week.findByPk(req.params.id);
        if (!findWeek) {
            throw { name: "ErrorNotFound" };
        }
        await findWeek.destroy();
        return res.status(200).json({ message: "Detele Successfully" });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    addWeek,
    getWeekbyId,
    getAllWeek,
    updateWeek,
    deleteWeek,
};
