const {Users, UserRole, BlacklistToken, PasswordResetToken} = require ('../../models')
const bcrypt = require('bcryptjs');
const crypto = require('crypto')
const nodemailer = require('nodemailer')

exports.findUserByEmail = async (email) => {
    return await Users.findOne({ 
        where: { email },
        include: [
            {
                model: UserRole,
                as: 'role',          // sama kayak alias di model Users
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

/// create token
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
    from: `Hirose App <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Reset Password',
    html: `
      <p>Click link below to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>This link will expire in 1 hour</p>
    `,
  })
}
