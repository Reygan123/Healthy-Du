const { User } = require("../models");
const { Op, where } = require("sequelize");
const { match } = require("../utils/BcryptUtil");
const { generateToken } = require("../utils/JwtUtil");

const loginUser = async (req, res, next) => {
    try {
        const { emailOrUsername, password } = req.body;
        const foundUser = await User.findOne({
            where: {
                [Op.or]: [{ email: emailOrUsername }, { username: emailOrUsername }],
            },
        });
        if (!foundUser) throw { name: "InvalidCredentials" };

        const isPasswordMatch = await match(password, foundUser.password);
        if (!isPasswordMatch) throw { name: "InvalidCredentials" };

        const token = generateToken(foundUser);

        res.status(200).json({
            success: true,
            accessToken: token,
            dataUser: { id: foundUser.id },
        });
    } catch (error) {
        next(error);
    }
};

const registerUser = async (req, res, next) => {
    try {
        const { name, email, username, password, role } = req.body;

        const foundUser = await User.findOne({
            where: {
                [Op.or]: [{ email }, { username }],
            },
        });

        await User.create({ name, email, username, password, role });
        res
            .status(200)
            .json({ status: true, message: "User Created Successfully" });
    } catch (error) {
        console.log(error.name)
        next(error);
    }
};

const getUserbyId = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        return res.status(200).json({ data: user });
    } catch (error) {
        next(error);
    }
};

const getAllUser = async (req, res, next) => {
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

        const { count, rows } = await User.findAndCountAll({
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


const updateUser = async (req, res, next) => {
    try {
        const { id } = req.loggedUser;
        const { email, name, username, age, gender, height, weight, point, activity_factor, oldPassword, newPassword, role } = req.body;

        const foundUser = await User.findOne({ where: { id } });

        let updateUser = {
            email: email || foundUser.email,
            name: name || foundUser.name,
            username: username || foundUser.username,
            age: age || foundUser.age,
            gender: gender || foundUser.gender,
            weight: weight || foundUser.weight,
            height: height || foundUser.height,
            activity_factor: activity_factor || foundUser.activity_factor,
            point: point || foundUser.point,
            role: role || foundUser.role,
        };

        if (oldPassword) {
            const isPasswordMatch = await match(oldPassword, foundUser.password);
            if (isPasswordMatch) {
                updateUser = {
                    ...updateUser,
                    password: newPassword,
                };
            } else {
                throw { name: "InvalidCredentials" };
            }
        }

        await foundUser.update(updateUser);
        res
            .status(200)
            .json({ status: true, message: "User Updated Successfully" });
    } catch (error) {
        next(error);
    }
};

const getUserLogin = async (req, res, next) => {
    try {
        const { id } = req.loggedUser;
        const foundUser = await User.findOne({
            where: { id },
            attributes: { exclude: ["createdAt", "updatedAt", "password"] },
        });

        res.status(200).json({ status: true, data: foundUser });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    loginUser,
    registerUser,
    getUserbyId,
    updateUser,
    getUserLogin,
    getAllUser
};
