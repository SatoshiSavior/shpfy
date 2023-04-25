const mongoose = require('mongoose');

const recentActivitySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const RecentActivity = mongoose.model('RecentActivity', recentActivitySchema);

module.exports = RecentActivity;
