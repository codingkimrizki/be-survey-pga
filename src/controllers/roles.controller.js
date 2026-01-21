const { getRoleOptions } = require('../services/role.services')

exports.getRoleOptions = async (req, res) => {
  try {
    const roles = await getRoleOptions()

    return res.status(200).json({
      success: true,
      data: roles.map(r => ({
        value: r.id_user_role,
        label: r.name_role,
      })),
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      success: false,
      data: [],
    })
  }
}
