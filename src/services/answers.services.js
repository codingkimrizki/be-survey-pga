const { Answers, Questions } = require('../../models')
const { sendMajorAlertEmail, getAdminEmails } = require('./users.services')
const redis = require('../../src/config/redis')

const axios = require('axios')

//submit jawaban
exports.createAnswers = async (answersArray, ipAddress) => {
  // tambahkan IP ke tiap jawaban
  const answersWithIp = answersArray.map(a => ({
    ...a,
    ipAddress
  }));

  const result = await Answers.bulkCreate(answersWithIp);
  return result;
};

exports.getAnswersWithIpStats = async () => {
  try {
    const answers = await Answers.findAll()

    // hitung total IP unik per tanggal
    const ipSetPerDate = {}
    const statusPerIp = {}
    const ipStatusMap = {}

    answers.forEach(ans => {
      const date = ans.createdAt.toISOString().slice(0, 10) // YYYY-MM-DD
      const ip = ans.ipAddress
      const key = `${date}_${ip}`

      // init set per tanggal
      if (!ipSetPerDate[date]) ipSetPerDate[date] = new Set()
      ipSetPerDate[date].add(ip)

      // init status tracker per ip
      if (!statusPerIp[ip]) statusPerIp[ip] = []
      statusPerIp[ip].push(ans.answer)

      // Status per IP and date
      if (!ipStatusMap[key]) ipStatusMap[key] = 'clear' // default clear
      if (ans.answer === 'Y') ipStatusMap[key] = 'major' // kalau ada Y, jadi major

    })

    // total IP unik di semua tanggal
    let totalUniqueIp = 0
    Object.values(ipSetPerDate).forEach(set => {
      totalUniqueIp += set.size
    })

    // buat status per IP
    const statusSummary = {}
    Object.entries(statusPerIp).forEach(([ip, answers]) => {
      statusSummary[ip] = answers.includes('Y') ? 'major' : 'clear'
    })

    // hitung total major
    const totalMajor = Object.values(ipStatusMap).filter(status => status === 'major').length

    // //redis
    // const lastSentMajor = Number((await redis.get('major:last_sent')) || 0)

    // if (totalMajor > lastSentMajor) {
    //   const admins = await getAdminEmails()
    //   if (admins.length) {
    //     await sendMajorAlertEmail(admins, totalMajor)
    //     console.log('Major alert email sent')
    //   }
      
    //   await redis.set('major:last_sent', totalMajor)
    // }

    if (totalMajor > 0) {
      const admins = await getAdminEmails()
      if (admins.length) {
        await sendMajorAlertEmail(admins, totalMajor)
      }
    }

    return { answers, totalUniqueIp, statusSummary, totalMajor }
  } catch (err) {
    console.error('Error in getAnswersWithIpStats:', err)
    throw err
  }
}

// ambil semua jawaban suggest
exports.getAnswers = async () => {
  try {
    const answers = await Answers.findAll({
      include: [
        {
          model: Questions,
          as: 'question',
          where: {question_type: "suggest"},
          attributes: ["question_text"]
        }
      ],
      attributes: ["answer"]
    })
    return answers
  } catch (err) {
    console.error('Error in getAnswers:', err)
    throw err
  }
}

exports.ollamaPrompt = async (answers) => {
  const answerText = answers
    .map((a, i) =>
      `${i + 1}. (${a.question?.question_text}) ${a.answer}`
    )
    .join('\n')

    console.log('ANSWER TEXT KE OLLAMA:\n', answerText)

  return `
    Ringkas semua jawaban yang ada dari ${answerText}
    `
}


exports.ollamaGenerate = async (prompt) => {
  try{
      const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL
      console.log('OLLAMA_URL:', OLLAMA_BASE_URL)
      console.log('PROMPT KE OLLAMA:', prompt)

      const ai = await axios.post(`${OLLAMA_BASE_URL}/api/generate`, {
        model: "gemma3:1b",
        prompt,
        stream: false
      })

      console.log('RAW RESPONSE OLLAMA:', ai.data)

    return ai.data.response.trim();
  }catch(err){
    console.error("Ollama error:", err.message);
    throw err; // lempar ke controller
  }
}

