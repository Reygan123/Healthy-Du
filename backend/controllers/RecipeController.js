const { Recipe } = require("../models");
const { Op } = require("sequelize");

const addRecipe = async (req, res, next) => {
    try {
        const { name, description, time_prepare, time_cooking, tutorial } = req.body;

        const response = await Recipe.create({ name, description, time_prepare, time_cooking, tutorial });

        res
            .status(200)
            .json(response);
    } catch (error) {
        console.log(error.name);
        next(error);
    }
};

const getAllRecipe = async (req, res, next) => {
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

        const { count, rows: recipes } = await Recipe.findAndCountAll({
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
            data: recipes,
        };

        return res.status(200).json(paginationInfo);
    } catch (err) {
        next(err);
    }
};

const getRecipebyId = async (req, res, next) => {
    try {
        const recipe = await Recipe.findByPk(req.params.id);
        if (!recipe) {
            throw { name: "ErrorNotFound" };
        }
        return res.status(200).json({ data: recipe });
    } catch (error) {
        next(error);
    }
};

const updateRecipe = async (req, res, next) => {
    try {
        const { name, description, time_prepare, time_cooking, tutorial } = req.body;
        const { id } = req.params;

        const recipe = await Recipe.findOne({
            where: {
                id,
            },
        });

        if (!recipe) {
            throw { name: "ErrorNotFound" };
        }

        await Recipe.update(
            {
                name: name || recipe.name,
                description: description || recipe.description,
                time_prepare: time_prepare || recipe.time_prepare,
                time_cooking: time_cooking || recipe.time_cooking,
                tutorial: tutorial || recipe.tutorial,
            },
            {
                where: {
                    id,
                },
                returning: true,
            }
        );

        res.status(200).json({
            message: "Recipe Updated Successfully",
            data: recipe,
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

        const foundRecipe = await Recipe.findOne({
            where: {
                id
            }
        })

        if (!foundRecipe) {
            throw { name: "errorNotFound" }
        }
        await foundRecipe.update(payload)
        res.status(200).json({ status: true, message: "Upload Image Succesfully", data: foundRecipe });
    } catch (error) {
        next(error)
    }
}

const deleteRecipe = async (req, res, next) => {
    try {
        const findRecipe = await Recipe.findByPk(req.params.id);
        if (!findRecipe) {
            throw { name: "ErrorNotFound" };
        }
        await findRecipe.destroy();
        return res.status(200).json({ message: "Detele Successfully" });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    addRecipe,
    getRecipebyId,
    getAllRecipe,
    updateRecipe,
    uploadImage,
    deleteRecipe,
};
