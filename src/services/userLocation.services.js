const { UserLocation } = require('../../models')

/**
 * Simpan lokasi user ke DB
 * @param {Object} param0
 * @param {string} param0.ip_address
 * @param {string} param0.city
 * @param {string} param0.region
 * @param {string} param0.location_source
 */
exports.UserLocationService = async ({ ip_address, city, region, location_source }) => {
  try {
    const location = await UserLocation.create({
      ip_address,
      city,
      region,
      location_source,
    })
    return location
  } catch (err) {
    throw err
  }
}
