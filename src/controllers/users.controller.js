const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {findUserByEmail, createUser, checkPassword} = require ('../services/users.services')
const httpStatus = require ('../constants/httpStatus')

exports.UserRegister = async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    // 🔥 VALIDATION WAJIB
    if (!name || !email || !password) {
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

    const user = await createUser({ name, email, password })

    return res.status(201).json({
      message: 'User berhasil didaftarkan',
      user: {
        id: user.id_user,
        name: user.name_users,
        email: user.email,
        id_user_role: user.id_user_role
      }
    })
  } catch (err) {
    console.error('REGISTER ERROR:', err)
    next(err)
  }
};

exports.UserLogin = async (req, res, next) => {
    try {
       const { email, password } = req.body;
       
       //cek email
        const user = await findUserByEmail(email);
        console.log(user.role.name_role);
        if (!user) return res.status(404).json({ message: "User not found" });

        // cek password
        const valid = await checkPassword(password, user.password);
        if (!valid) return res.status(401).json({ message: "Invalid password" });

        // generate token
        const token = jwt.sign(
            { 
                id: user.id_users
            }, 
            process.env.JWT_SECRET, 
            {expiresIn: "1d",
        });

        return res.json({
        message: "Login success",
        token,
        user: {
                id: user.id_users,
                name: user.name_users,
                email: user.email,
                role: user.role?.name_role 
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};




