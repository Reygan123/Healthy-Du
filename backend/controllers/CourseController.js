const { Course } = require("../models");
const { Op } = require("sequelize");

const addCourse = async (req, res, next) => {
    try {
        const { name, description } = req.body;

        const response = await Course.create({ name, description });
        res
            .status(200)
            .json(response);
    } catch (error) {
        console.log(error.name);
        next(error);
    }
};

const getAllCourse = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const q = req.query.q || "";
        let optionFilter
        const nameFilter = req.query.name || "";

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

        const { count, rows: courses } = await Course.findAndCountAll({
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
            data: courses,
        };

        return res.status(200).json(paginationInfo);
    } catch (err) {
        next(err);
    }
};

const getCoursebyId = async (req, res, next) => {
    try {
        const courses = await Course.findByPk(req.params.id);
        if (!courses) {
            throw { name: "ErrorNotFound" };
        }
        return res.status(200).json({ data: courses });
    } catch (error) {
        next(error);
    }
};

const updateCourse = async (req, res, next) => {
    try {
        const { name, description } = req.body;
        const { id } = req.params;

        const courses = await Course.findOne({
            where: {
                id,
            },
        });

        if (!courses) {
            throw { name: "ErrorNotFound" };
        }

        await Course.update(
            {
                name: name || courses.name,
                description: description || courses.description,
            },
            {
                where: {
                    id,
                },
                returning: true,
            }
        );

        res.status(200).json({
            message: "Course Updated Successfully",
            data: courses,
        });
    } catch (err) {
        next(err);
    }
};

const deleteCourse = async (req, res, next) => {
    try {
        const findCourse = await Course.findByPk(req.params.id);
        if (!findCourse) {
            throw { name: "ErrorNotFound" };
        }
        await findCourse.destroy();
        return res.status(200).json({ message: "Detele Successfully" });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    addCourse,
    getCoursebyId,
    getAllCourse,
    updateCourse,
    deleteCourse,
};
