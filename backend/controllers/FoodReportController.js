const { Food, User, Meal_Schedule, Food_Report } = require("../models");

const createFoodReport = async (req, res, next) => {
    try {
        const { userId, foodId, mealId, amount } = req.body;

        const user = await User.findByPk(userId);
        const food = await Food.findByPk(foodId);
        const mealSchedule = await Meal_Schedule.findByPk(mealId);
        const currentDate = new Date();
        const finalAmount = amount || 0;

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!food) {
            return res.status(404).json({ error: 'Food not found' });
        }

        if (!mealSchedule) {
            return res.status(404).json({ error: 'Meal Schedule not found' });
        }

        const foodReport = await Food_Report.create({
            user_id: userId,
            food_id: foodId,
            meal_id: mealId,
            date: currentDate,
            amount: finalAmount
        });

        const DetailUser = await User.findByPk(userId);
        const DetailFood = await Food.findByPk(foodId);
        const DetailMeal = await Meal_Schedule.findByPk(mealId);

        const response = {
            foodReport,
            user: DetailUser,
            food: DetailFood,
            meal: DetailMeal,
        };

        return res.status(201).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateFoodReport = async (req, res, next) => {
    try {
        const foodReportId = req.params.id;
        const { userId, foodId, mealId, amount } = req.body;
        const currentDate = new Date();

        const foodReport = await Food_Report.findByPk(foodReportId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!food) {
            return res.status(404).json({ error: 'Food not found' });
        }

        if (!mealSchedule) {
            return res.status(404).json({ error: 'Meal Schedule not found' });
        }

        const user = await User.findByPk(userId);
        const food = await Food.findByPk(foodId);
        const mealSchedule = await Meal_Schedule.findByPk(mealId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!food) {
            return res.status(404).json({ error: 'Food not found' });
        }

        if (!mealSchedule) {
            return res.status(404).json({ error: 'Meal Schedule not found' });
        }

        await foodReport.update({
            user_id: userId,
            food_id: foodId,
            meal_id: mealId,
            date: currentDate,
            amount
        });

        return res.status(200).json(foodReport);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getFoodReportbyId = async (req, res, next) => {
    try {
        const { id } = req.params;

        const foundReport = await Food_Report.findOne({
            include: [{
                model: User
            }, {
                model: Food
            }, {
                model: Meal_Schedule
            }],
            where: { id }
        });

        if (!foundReport) {
            throw { name: "errorNotFound" };
        }

        res.status(200).json({ status: true, data: foundReport })
    } catch (error) {
        next(error);
    }
};

const getAllFoodReport = async (req, res, next) => {
    try {
        const { id } = req.params;

        const page = +req.query.page || 1;
        const limit = +req.query.limit || 10;
        const queryFilter = req.query.q || "";
        const dateReport = req.query.date;
        const userId = req.query.userId || null;
        const foodId = req.query.foodId || null;
        const mealId = req.query.mealId || null;
        const offset = limit * (page - 1);

        let optionFilter = {
            attributes: ['id', 'user_id', 'food_id', 'meal_id', 'amount', 'date'],
            include: [
                {
                    model: User
                },
                {
                    model: Food
                },
                {
                    model: Meal_Schedule
                }
            ], where: {},
        };

        if (id) {
            optionFilter.where.id = id;
        }

        if (dateReport) {
            optionFilter.where.date = {
                [Op.gte]: dateReport,
            }
        }

        if (queryFilter) {
            optionFilter.where = {
                [Op.or]: [
                    {
                        "$User.name$": {
                            [Op.iLike]: `%${queryFilter}%`
                        }
                    },
                    {
                        "$Food.name$": {
                            [Op.iLike]: `%${queryFilter}%`
                        }
                    },
                    {
                        "$Meal_Schedule.name$": {
                            [Op.iLike]: `%${queryFilter}%`
                        }
                    }
                ]
            }
        }

        if (userId) {
            optionFilter.where.user_id = userId;
        }

        if (foodId) {
            optionFilter.where.food_id = foodId;
        }

        if (mealId) {
            optionFilter.where.meal_id = mealId;
        }

        const { count, rows } = await Food_Report.findAndCountAll({
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

const deleteFoodReport = async (req, res, next) => {
    try {
        const { id } = req.params

        const foundReport = await Food_Report.findOne({
            where: {
                id
            }
        })

        if (!foundReport) {
            throw { name: "errorNotFound" }
        }

        await foundReport.destroy();
        res.status(200).json({ status: true, message: "Food Report Deleted Succesfully" });
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createFoodReport,
    updateFoodReport,
    getAllFoodReport,
    getFoodReportbyId,
    deleteFoodReport
};
