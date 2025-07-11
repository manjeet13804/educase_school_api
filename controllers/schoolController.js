const db = require('../db');
function getDistanceInKm(lat1, lon1, lat2, lon2) {
  const toRadians = degrees => (degrees * Math.PI) / 180;
  const earthRadius = 6371;
  const deltaLat = toRadians(lat2 - lat1);
  const deltaLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
    Math.cos(toRadians(lat2)) *
    Math.sin(deltaLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadius * c;
}


exports.addSchool = (req, res) => {
  const { name, address, latitude, longitude } = req.body;
  const isInvalid =
    !name || !address ||
    typeof latitude !== 'number' ||
    typeof longitude !== 'number';
  if (isInvalid) {
    return res.status(400).json({ error: 'All fields must be properly filled and coordinates must be numbers.' });
  }

  const insertQuery = `
    INSERT INTO schools (name, address, latitude, longitude)
    VALUES ($1, $2, $3, $4)
    RETURNING id;
  `;

  db.query(insertQuery, [name, address, latitude, longitude], (error, result) => {
    if (error) {
      return res.status(500).json({ error: 'Database error while inserting school.', details: error.message });
    }
    const newSchoolId = result.rows[0].id;
    res.status(201).json({
      message: 'School successfully added.',
      schoolId: newSchoolId,
    });
  });
};

exports.listSchools = (req, res) => {
  const latitude = parseFloat(req.query.latitude);
  const longitude = parseFloat(req.query.longitude);
  if (isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ error: 'Please provide valid numeric latitude and longitude in the query.' });
  }
  db.query('SELECT * FROM schools', (error, result) => {
    if (error) {
      return res.status(500).json({ error: 'Could not retrieve schools from database.' });
    }
    const schoolsWithDistance = result.rows.map(school => {
      const distance = getDistanceInKm(
        latitude,
        longitude,
        school.latitude,
        school.longitude
      );

      return { ...school, distance };
    });
    const sortedSchools = schoolsWithDistance.sort((a, b) => a.distance - b.distance);
    res.status(200).json(sortedSchools);
  });
};
