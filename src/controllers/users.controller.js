const {findUserByEmail, createUser} = require ('../services/users.services')
const httpStatus = require ('../constants/httpStatus')

exports.UserRegister = async (req, res, next) => {
  try {
    const { email, password } = req.body

    // 🔥 VALIDATION WAJIB
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email dan password wajib diisi'
      })
    }

    const existing = await findUserByEmail(email)
    if (existing) {
      return res.status(409).json({
        message: 'Email sudah digunakan'
      })
    }

    const user = await createUser({ email, password })

    return res.status(201).json({
      message: 'User berhasil didaftarkan',
      user: {
        id: user.id_user,
        email: user.email,
        id_user_role: user.id_user_role
      }
    })
  } catch (err) {
    console.error('REGISTER ERROR:', err)
    next(err)
  }
}


