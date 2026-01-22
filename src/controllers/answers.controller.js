const redis = require('../config/redis');
const answersService = require('../services/answers.services');
const httpStatus = require('../constants/httpStatus');

exports.submitAnswers = async (req, res) => {
  try {
    const answers = req.body;

    if (!Array.isArray(answers)) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "Input Must Be An Array" });
    }

    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

    const submit = await answersService.createAnswers(answers, ipAddress);

    res
      .status(httpStatus.CREATED)
      .json({ message: "Success Input Answers", data: submit });

  } catch (err) {
    console.error(err);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: err.message });
  }
};

// ambil semua jawaban untuk widget / supplier
exports.supplierAnswers = async (req, res) => {
  try {
    const { answers, totalUniqueIp, statusSummary,  totalMajor } = await answersService.getAnswersWithIpStats()

    res.status(httpStatus.OK).json({
      data: answers,
      totalData: answers.length,        // total jawaban
      totalIpAddress: totalUniqueIp,    // total IP unik per tanggal
      statusSummary,                    // status per IP
      totalMajor
    })
  } catch (err) {
    console.error(err)
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: err.message })
  }
};

// exports.saveOllamaAnswers = async (req, res) => {
//  try {
//   const answers = await answersService.getAnswers();
//   const prompt = await answersService.ollamaPrompt (answers);
//   const generate = await answersService.ollamaGenerate (prompt);

//   //save to redis
//   const ollamaSave= `ollama:`;
//   await redis.set(ollamaSave, generate, {EX: 3600});

//   //ambil dari redis
//   const cached = await redis.get(key);

//   //Kirim ke client
//   res.json({ aiSummary: cached });
  
//  }catch(err){
//   console.error(err);
//   res.status(500).json({ error: err.message });
//  }
// }


