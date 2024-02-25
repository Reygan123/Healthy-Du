const { Week, Course, Schedule, Program } = require("../models");

const createSchedule = async (req, res, next) => {
    try {
        const { courseId, programId, weekId } = req.body;

        const course = await Course.findByPk(courseId);
        const program = await Program.findByPk(programId);
        const week = await Week.findByPk(weekId);

        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        if (!program) {
            return res.status(404).json({ error: 'Exercise not found' });
        }

        if (!week) {
            return res.status(404).json({ error: 'Week not found' });
        }

        const payload = await Schedule.create({
            course_id: courseId,
            week_id: weekId,
            program_id: programId
        });

        const DetailCourse = await Course.findByPk(courseId);
        const DetailProgram = await Program.findByPk(programId);
        const DetailWeek = await Week.findByPk(weekId);

        const response = {
            payload,
            course: DetailCourse,
            program: DetailProgram,
            week: DetailWeek,
        };

        return res.status(201).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateSchedule = async (req, res, next) => {
    try {
        const { courseId, programId, weekId } = req.body;
        const { id } = req.params;

        const schedule = await Schedule.findOne({
            where: {
                id,
            },
        });

        if (!schedule) {
            return res.status(404).json({ error: 'Schedule not found' });
        }

        if (courseId !== undefined) {
            schedule.course_id = courseId;
        }

        if (programId !== undefined) {
            schedule.program_id = programId;
        }

        if (weekId !== undefined) {
            schedule.week_id = weekId;
        }

        await Schedule.update(
            {
                course_id: courseId || schedule.courseId,
                program_id: programId || schedule.programId,
                week_id: weekId || schedule.weekId,
            },
            {
                where: {
                    id,
                },
                returning: true,
            }
        );

        res.status(200).json({
            message: "Schedule Updated Successfully",
            data: schedule,
        });
    } catch (error) {
        next(error);
    }
};


const getSchedulebyId = async (req, res, next) => {
    try {
        const { id } = req.params;

        const foundSchedule = await Schedule.findOne({
            include: [{
                model: Course
            }, {
                model: Program
            }, {
                model: Week
            }],
            where: { id }
        });

        if (!foundSchedule) {
            throw { name: "errorNotFound" };
        }

        res.status(200).json({ status: true, data: foundSchedule })
    } catch (error) {
        next(error);
    }
};

const getAllSchedule = async (req, res, next) => {
    try {
        const { id } = req.params;

        const page = +req.query.page || 1;
        const limit = +req.query.limit || 20;
        const queryFilter = req.query.q || "";
        const courseId = req.query.courseId || null;
        const programId = req.query.programId || null;
        const weekId = req.query.weekId || null;
        const offset = limit * (page - 1);

        let optionFilter = {
            attributes: ['id', 'course_id', 'program_id', 'week_id'],
            include: [
                {
                    model: Course
                },
                {
                    model: Program
                },
                {
                    model: Week
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
                        "$Course.name$": {
                            [Op.iLike]: `%${queryFilter}%`
                        }
                    },
                    {
                        "$Exercise.name$": {
                            [Op.iLike]: `%${queryFilter}%`
                        }
                    }
                ]
            }
        }

        if (courseId) {
            optionFilter.where.course_id = courseId;
        }

        if (programId) {
            optionFilter.where.program_id = programId;
        }

        if (weekId) {
            optionFilter.where.week_id = weekId;
        }

        const { count, rows } = await Schedule.findAndCountAll({
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

const deleteSchedule = async (req, res, next) => {
    try {
        const { id } = req.params

        const foundSchedule = await Schedule.findOne({
            where: {
                id
            }
        })

        if (!foundSchedule) {
            throw { name: "errorNotFound" }
        }

        await foundSchedule.destroy();
        res.status(200).json({ status: true, message: "Program Deleted Succesfully" });
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createSchedule,
    updateSchedule,
    getAllSchedule,
    getSchedulebyId,
    deleteSchedule
};
