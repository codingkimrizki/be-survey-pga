const { UserRole } = require('../../models')

exports.getRoleOptions = async () => {
  return await UserRole.findAll({
    attributes: ['id_user_role', 'name_role'],
    order: [['name_role', 'ASC']],
  })
}
