const axios = require('axios')
const { UserLocationService } = require('../services/userLocation.services')

exports.submitLocation = async (req, res) => {
  try {
    const { location_source } = req.body
    const ip_address = req.headers['x-forwarded-for'] || req.ip

    let city = null
    let region = null

    if (location_source === 'ip') {
      const geo = await axios.get(`http://ip-api.com/json/${ip_address}`)
      city = geo.data.city
      region = geo.data.regionName
    }

    await UserLocationService({
      ip_address,
      city,
      region,
      location_source,
    })

    res.json({ message: 'Location saved successfully!' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to save location' })
  }
}
