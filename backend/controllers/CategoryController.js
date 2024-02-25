const { Category } = require("../models");
const { Op } = require("sequelize");

const addCategory = async (req, res, next) => {
    try {
        const { name } = req.body;

        await Category.create({ name });

        res
            .status(200)
            .json({ status: true, message: "Category Created Successfully" });
    } catch (error) {
        console.log(error.name);
        next(error);
    }
};

const getAllCategory = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
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

        const { count, rows } = await Category.findAndCountAll({
            where: {
                name: {
                    [Op.iLike]: `%${q}%`,
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

const getCategorybyId = async (req, res, next) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) {
            throw { name: "ErrorNotFound" };
        }
        return res.status(200).json({ data: category });
    } catch (error) {
        next(error);
    }
};

const updateCategory = async (req, res, next) => {
    try {
        const { name } = req.body;
        const { id } = req.params;

        const category = await Category.findOne({
            where: {
                id,
            },
        });

        if (!category) {
            throw { name: "ErrorNotFound" };
        };

        await category.update({ name })

        res.status(200).json({
            message: "Category Updated Successfully",
            data: category,
        });
    } catch (err) {
        next(err);
    }
};

const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params
        const findCategory = await Category.findByPk(id);
        if (!findCategory) {
            throw { name: "ErrorNotFound" };
        }
        await findCategory.destroy();
        return res.status(200).json({ message: "Delete Successfully" });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    addCategory,
    getCategorybyId,
    getAllCategory,
    updateCategory,
    deleteCategory,
};