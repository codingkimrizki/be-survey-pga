const jwt = require('jsonwebtoken')
const {
  findUserByEmail, 
  createUser, 
  checkPassword, 
  logout, 
  createPasswordResetToken, 
  sendResetEmail, 
  getValidResetToken,
  invalidateResetToken,
  updateUserPasswordById,
  getAllUsers,
  updateUserRoleById
} = require ('../services/users.services')


exports.UserRegister = async (req, res, next) => {
  try {
    const { name, email, password } = req.body

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

exports.UserLogin = async (req, res) => {
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

exports.UserLogout = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    console.log('TOKEN DARI CONTROLLER:', token); // 🔍 DEBUG
    if (!token) {
      return res.status(400).json({ message: 'Token required' });
    }

    await logout(token);

    return res.json({ message: 'Logout success' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.UserForgotPassword = async (req, res) => {
  try {
    const { email } = req.body
    const user = await findUserByEmail(email)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const token = await createPasswordResetToken(user.id_users)

    await sendResetEmail(email, token)

    res.json({ message: 'Reset link sent' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal server error' })
  }
}

exports.ResetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body

    console.log('BODY:', req.body)
    console.log('NEW PASSWORD:', newPassword)

    const resetToken = await getValidResetToken(token)
    if (!resetToken) {
      return res.status(400).json({ message: 'Invalid token' })
    }

    if (resetToken.expired_at < new Date()) {
      return res.status(400).json({ message: 'Token expired' })
    }

    const user = await updateUserPasswordById(
      resetToken.user_id,
      newPassword
    )

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    await invalidateResetToken(resetToken.id)

    return res.json({ message: 'Password reset success' })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}


//USER MANAGEMENT
exports.getAllUsers = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1
    const pageSize = Number(req.query.pageSize) || 10
    const search = req.query.search || ''
    const sortBy = req.query.sortBy || 'roleName'
    const order = req.query.order || 'asc'

    const result = await getAllUsers({
      page,
      pageSize,
      search,
      sortBy,
      order,
    })

    res.status(200).json({
      data: {
        users: result.users,
        roles: result.users.reduce((acc, u) => {
          acc[u.roleName] = (acc[u.roleName] || 0) + 1
          return acc
        }, {}),
      },
      pagination: result.pagination,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Failed to get users',
    })
  }
}

//2.update
exports.updateRole = async (req, res) => {
  try {
    const { id } = req.params
    const { roleId } = req.body

    const updatedUser = await updateUserRoleById(id, roleId)

    res.status(200).json({
      message: `Role updated successfully`,
      data: {
        id: updatedUser.id_users,
        name: updatedUser.name_users,
        roleId: updatedUser.id_user_role,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message || 'Failed to update user role' })
  }
}










