const { UserLocationService } = require('../services/userLocation.services')

exports.submitLocation = async (req, res) => {
  try {
    const { city, region, location_source } = req.body
    const ip_address = req.ip

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
