const {Users} = require ('../../models')
const bcrypt = require('bcryptjs');

exports.findUserByEmail = async (email) => {
    return await Users.findOne({ where: { email } });
};

//Register
exports.createUser = async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const createUser = await Users.create({
        email: data.email,
        password: hashedPassword,
        id_user_role: 1, //user
    });

    return createUser;
}

//login
exports.findUserById = async (id) => {
  return await Users.findByPk(id);
};

//forgotPassword
exports.updateUserPassword = async (userId, hashedPassword) => {
  return await Users.update(
    { password: hashedPassword }, 
    { where: { id_users: userId } });
};