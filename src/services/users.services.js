const {Users, UserRole, BlacklistToken, PasswordResetToken} = require ('../../models')
const bcrypt = require('bcryptjs');
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const { Op } = require('sequelize')

exports.findUserByEmail = async (email) => {
    return await Users.findOne({ 
        where: { email },
        include: [
            {
                model: UserRole,
                as: 'role',
            }
        ]
    });
};

exports.checkPassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

//Register
exports.createUser = async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const User = await Users.create({
        name_users: data.name,
        email: data.email,
        password: hashedPassword,
        id_user_role: 1,
    });

    return User;
}

exports.findUserById = async (id) => {
  return await Users.findByPk(id);
};

//token
exports.logout = async (token) => {
  console.log('TOKEN MASUK SERVICE:', token);
  return await BlacklistToken.create({ token });
};

//create token
exports.createPasswordResetToken = async (userId) => {
  const token = crypto.randomBytes(32).toString('hex')

  await PasswordResetToken.create({
    user_id: userId,
    token,
    expired_at: new Date(Date.now() + 60 * 60 * 1000),
  })

  return token
}

// validate token
exports.getValidResetToken = async (token) => {
  return PasswordResetToken.findOne({
    where: {
      token,
      used_at: null,
    },
  })
}

// invalidate token
exports.invalidateResetToken = async (id) => {
  return PasswordResetToken.update(
    { used_at: new Date() },
    { where: { id } }
  )
}

// send email
exports.sendResetEmail = async (email, token) => {
  const resetLink =
    `${process.env.FRONTEND_URL}/recovery-password?token=${token}`

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  await transporter.sendMail({
    from: `HIROSE-RBA-ETHIC <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Reset Password',
    html: `
      <p>Click link below to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>This link will expire in 1 hour</p>
    `,
  })
}

//USER
exports.updateUserPasswordById = async (userId, newPassword) => {
  const user = await Users.findByPk(userId)
  if (!user) return null

  const hashedPassword = await bcrypt.hash(newPassword, 10)
  user.password = hashedPassword
  await user.save()

  return user
}

//USER MANAGEMENT
exports.getAllUsers = async ({
  page = 1,
  pageSize = 10,
  search = '',
  sortBy = 'roleName',
  order = 'asc',
}) => {
  page = Number.isInteger(page) && page > 0 ? page : 1
  pageSize = Number.isInteger(pageSize) && pageSize > 0 ? pageSize : 10
  const offset = (page - 1) * pageSize

  // Mapping sortBy FE ke kolom DB
  const columnMap = {
    name: 'name_users',
    email: 'email',
    roleName: 'id_user_role', // kita handle relasi khusus nanti
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  }

  const orderColumn = columnMap[sortBy] || 'id_users'

  // Filter pencarian
  const where = search
    ? {
        name_users: {
          [Op.like]: `%${search}%`,
        },
      }
    : {}

  // Build order array
  const orderArray =
    sortBy === 'roleName'
      ? [[{ model: UserRole, as: 'role' }, 'name_role', order.toUpperCase()]]
      : [[orderColumn, order.toUpperCase()]]

  const { rows, count } = await Users.findAndCountAll({
    where,
    limit: pageSize,
    offset,
    order: orderArray,
    include: [
      {
        model: UserRole,
        as: 'role', // pastikan sama dengan Users.belongsTo
        attributes: ['name_role'],
      },
    ],
  })

  return {
    users: rows.map(u => ({
      id: u.id_users,
      name: u.name_users,
      email: u.email,
      roleId: u.id_user_role,
      roleName: u.role?.name_role || '-',
      createdAt: u.createdAt,
      updatedAt: u.updatedAt,
    })),
    pagination: {
      page,
      pageSize,
      total: count,
    },
  }
}

//update
exports.updateUserRoleById = async (userId, roleId) => {
  const user = await Users.findByPk(userId)
  if (!user) throw new Error('User not found')

  user.id_user_role = roleId
  await user.save()

  return user
}

//email major
  //1. find user with admin role
  exports.getAdminEmails = async () => {
    const admins = await Users.findAll({
      include: [
        {
          model: UserRole,
          as: 'role',
          where: { name_role: 'admin' },
          attributes: [],
        },
      ],
      attributes: ['email', 'name_users'],
    })

    return admins
  }
  //2. send email 
  exports.sendMajorAlertEmail = async (admins, totalMajor) => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const emails = admins.map(a => a.email)

    await transporter.sendMail({
      from: 'HIROSE-RBA-ETHIC <no-reply@pga.com>',
      to: emails,
      subject: 'Major Issue Detected',
      html: `
        <h2>Major Issue Alert</h2>
        <p>There are <b>${totalMajor}</b> major issues detected.</p>
        <p>Please login to dashboard for details.</p>
      `,
    })
  }

