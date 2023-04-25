const express = require('express');
const RecentActivity = require('../models/RecentActivity');

const router = express.Router();

router.get('/', async (req, res) => {
  const recentActivities = await RecentActivity.find().sort({ createdAt: -1 }).limit(10);
  res.json(recentActivities);
});

module.exports = router;
