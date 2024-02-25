const { Food } = require("../models");
const { Op } = require("sequelize");

const addFood = async (req, res, next) => {
    try {
        const { name, calories, serving_size, serving_plate, serving_bowl, piece, fat, cholesterol, carbohydrate, protein, sodium, kalium } = req.body;

        await Food.create({ name, calories, serving_size, serving_plate, serving_bowl, piece, fat, cholesterol, carbohydrate, protein, sodium, kalium });
        res
            .status(200)
            .json({ status: true, message: "Food Created Successfully" });
    } catch (error) {
        console.log(error.name);
        next(error);
    }
};

const getAllFood = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const q = req.query.q || "";
        const nameFilter = req.query.name || "";
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

        const { count, rows: foods } = await Food.findAndCountAll({
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
            data: foods,
        };

        return res.status(200).json(paginationInfo);
    } catch (err) {
        next(err);
    }
};

const getFoodbyId = async (req, res, next) => {
    try {
        const food = await Food.findByPk(req.params.id);
        if (!food) {
            throw { name: "ErrorNotFound" };
        }
        return res.status(200).json({ data: food });
    } catch (error) {
        next(error);
    }
};

const updateFood = async (req, res, next) => {
    try {
        const { name, calories, serving_size, serving_plate, serving_bowl, piece, fat, cholesterol, carbohydrate, protein, sodium, kalium } = req.body;
        const { id } = req.params;

        const food = await Food.findOne({
            where: {
                id,
            },
        });

        if (!food) {
            throw { name: "ErrorNotFound" };
        }

        await Food.update(
            {
                name: name || food.name,
                calories: calories || food.calories,
                serving_size: serving_size || food.serving_size,
                serving_plate: serving_plate || food.serving_plate,
                serving_bowl: serving_bowl || food.serving_bowl,
                piece: piece || food.piece,
                fat: fat || food.fat,
                cholesterol: cholesterol || food.cholesterol,
                carbohydrate: carbohydrate || food.carbohydrate,
                protein: protein || food.protein,
                sodium: sodium || food.sodium,
                kalium: kalium || food.kalium,
            },
            {
                where: {
                    id,
                },
                returning: true,
            }
        );

        res.status(200).json({
            message: "Food Updated Successfully",
            data: food,
        });
    } catch (err) {
        next(err);
    }
};

const deleteFood = async (req, res, next) => {
    try {
        const findFood = await Food.findByPk(req.params.id);
        if (!findFood) {
            throw { name: "ErrorNotFound" };
        }
        await findFood.destroy();
        return res.status(200).json({ message: "Detele Successfully" });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    addFood,
    getFoodbyId,
    getAllFood,
    updateFood,
    deleteFood,
};
