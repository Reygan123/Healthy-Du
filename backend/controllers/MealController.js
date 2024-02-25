const { Meal_Schedule } = require("../models");
const { Op } = require("sequelize");

const addMeal = async (req, res, next) => {
    try {
        const { name, date } = req.body;

        await Meal_Schedule.create({ name, date });
        res
            .status(200)
            .json({ status: true, message: "Meal Schedule Created Successfully" });
    } catch (error) {
        console.log(error.name);
        next(error);
    }
};

const getAllMeal = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const nameFilter = req.query.name || "";

        const offset = (page - 1) * limit;

        const { count, rows: meals } = await Meal_Schedule.findAndCountAll({
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
            data: meals,
        };

        return res.status(200).json(paginationInfo);
    } catch (err) {
        next(err);
    }
};

const getMeal = async (req, res, next) => {
    try {
        const meal = await Meal_Schedule.findByPk(req.params.id);
        if (!meal) {
            throw { name: "ErrorNotFound" };
        }
        return res.status(200).json({ data: meal });
    } catch (error) {
        next(error);
    }
};

const updateMeal = async (req, res, next) => {
    try {
        const { name, date } = req.body;
        const { id } = req.params;

        const meal = await Meal_Schedule.findOne({
            where: {
                id,
            },
        });

        if (!meal) {
            throw { name: "ErrorNotFound" };
        }

        await Meal_Schedule.update(
            {
                name: name || meal.name,
                date: date || meal.date,
            },
            {
                where: {
                    id,
                },
                returning: true,
            }
        );

        res.status(200).json({
            message: "Meal Schedule Updated Successfully",
            data: meal,
        });
    } catch (err) {
        next(err);
    }
};

const uploadImage = async (req, res, next) => {
    try {
        const params = {
            file: req.file,
            id: req.params.id
        }

        const { file, id } = params;

        if (!file) {
            throw { name: "FileNotExists" }
        }
        console.log(file);

        const image_url = `http://localhost:3000/uploads/${file.filename}`;

        const payload = {
            image_url
        }

        const foundMeal = await Meal_Schedule.findOne({
            where: {
                id
            }
        })

        if (!foundMeal) {
            throw { name: "errorNotFound" }
        }
        await foundMeal.update(payload)
        res.status(200).json({ status: true, message: "Upload Image Succesfully", data: foundMeal });
    } catch (error) {
        next(error)
    }
}

const deleteMeal = async (req, res, next) => {
    try {
        const findMeal = await Meal_Schedule.findByPk(req.params.id);
        if (!findMeal) {
            throw { name: "ErrorNotFound" };
        }
        await findMeal.destroy();
        return res.status(200).json({ message: "Detele Successfully" });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    addMeal,
    getMeal,
    getAllMeal,
    updateMeal,
    uploadImage,
    deleteMeal,
};
