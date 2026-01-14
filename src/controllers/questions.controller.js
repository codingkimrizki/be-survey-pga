const { Questions } = require('../../models')
const httpStatus = require('../constants/httpStatus')

exports.getAllQuestions = async (req, res) => {
    try {
        const data = await Questions.findAll();
        res.json({
            message: "GET questions",
            data,
        });
    } catch (error) {
        res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: error.message })
    }
};