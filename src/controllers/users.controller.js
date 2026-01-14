const {findUserByEmail, createUser} = require ('../services/users.services')
const httpStatus = require ('../constants/httpStatus')

exports.UserRegister = async (req, res) => {
    try {
        const { email, password} = req.body

        //cek email sudah terdaftar atau belum
        const existing = await findUserByEmail (email)

        if (existing) {
            return res
            .status(httpStatus.CONFLICT)
            .json({ message: 'Email sudah digunakan' })
        }

        const user = await createUser({email, password})

        return res
        .status(httpStatus.CREATED)
        .json({
            message: 'User berhasil didaftarkan',
            user: {
                id: user.id_user,
                email: user.email,
                id_user_role: user.id_user_role
            },
        });

    } catch (err) {
    console
    .error(err)
    next(err)
  }
};

