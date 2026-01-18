const {Users, UserRole} = require ('../../models')
const bcrypt = require('bcryptjs');

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

//forgotPassword
exports.updateUserPassword = async (userId, hashedPassword) => {
  return await Users.update(
    { password: hashedPassword }, 
    { where: { id_users: userId } });
};