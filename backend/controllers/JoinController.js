const { User, Joined_Course, Course } = require("../models");

const createJoinCourse = async (req, res, next) => {
    try {
        const { userId, courseId } = req.body;

        const user = await User.findByPk(userId);
        const course = await Course.findByPk(courseId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        const joinedCourse = await Joined_Course.create({
            user_id: userId,
            course_id: courseId,
        });

        const DetailUser = await User.findByPk(userId);
        const DetailCourse = await Course.findByPk(courseId);

        const response = {
            joinedCourse,
            user: DetailUser,
            course: DetailCourse
        };

        return res.status(201).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateJoinCourse = async (req, res, next) => {
    try {
        const joinCourseId = req.params.id;
        const { userId, courseId } = req.body;

        const joinCourse = await Joined_Course.findByPk(joinCourseId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        const user = await User.findByPk(userId);
        const course = await Course.findByPk(courseId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        await joinCourse.update({
            user_id: userId,
            course_id: courseId,
        });

        return res.status(200).json(joinCourse);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getJoinCoursebyId = async (req, res, next) => {
    try {
        const { id } = req.params;

        const foundJoin = await Joined_Course.findOne({
            include: [{
                model: User
            }, {
                model: Course
            }],
            where: { id }
        });

        if (!foundJoin) {
            throw { name: "errorNotFound" };
        }

        res.status(200).json({ status: true, data: foundJoin })
    } catch (error) {
        next(error);
    }
};

const getAllJoinCourse = async (req, res, next) => {
    try {
        const { id } = req.params;

        const page = +req.query.page || 1;
        const limit = +req.query.limit || 10;
        const queryFilter = req.query.q || "";
        const userId = req.query.userId || null;
        const courseId = req.query.courseId || null;
        const offset = limit * (page - 1);

        let optionFilter = {
            attributes: ['id', 'user_id', 'course_id'],
            include: [
                {
                    model: User
                },
                {
                    model: Course
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
                    },
                    {
                        "$Course.name$": {
                            [Op.iLike]: `%${queryFilter}%`
                        }
                    }
                ]
            }
        }

        if (userId) {
            optionFilter.where.user_id = userId;
        }

        if (courseId) {
            optionFilter.where.course_id = courseId;
        }

        const { count, rows } = await Joined_Course.findAndCountAll({
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

const deleteJoinCourse = async (req, res, next) => {
    try {
        const { id } = req.params

        const joinCourse = await Joined_Course.findOne({
            where: {
                id
            }
        })

        if (!joinCourse) {
            throw { name: "errorNotFound" }
        }

        await joinCourse.destroy();
        res.status(200).json({ status: true, message: "Join Deleted Succesfully" });
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createJoinCourse,
    updateJoinCourse,
    getAllJoinCourse,
    getJoinCoursebyId,
    deleteJoinCourse
};
