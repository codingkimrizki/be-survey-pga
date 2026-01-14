const { Answers } = require('../../models')
const httpStatus = require('../constants/httpStatus')

exports.submitAnswers = async (req, res) => {
    try {
        const answers = req.body;

        if (!Array.isArray(answers)) {
            return res
            .status(httpStatus.BAD_REQUEST)
            .json({message: "Input Must Be An Array"})
        }

        const submit = await  Answers.bulkCreate (answers)

        res
        .status(httpStatus.CREATED)   
        .json({message: "Succes Input Answers", data: submit}) 

    } catch (err) {
       res
       .status(httpStatus.INTERNAL_SERVER_ERROR) 
       .json({error: err.message})
    }
}