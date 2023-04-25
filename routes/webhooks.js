const express = require('express');
const { verifyWebhookHMAC } = require('@shopify/shopify-api');
const RecentActivity = require('../models/RecentActivity');

const router = express.Router();

router.post('/orders/create', async (req, res) => {
  const hmacHeader = req.get('X-Shopify-Hmac-Sha256');
  const body = req.rawBody;

  if (!verifyWebhookHMAC(hmacHeader, body)) {
    res.status(400).send('Invalid webhook signature');
    return;
  }

  const { customer, line_items } = JSON.parse(body);
  const message = `${customer.first_name} ${customer.last_name} purchased ${line_items[0].title}`;

  const recentActivity = new RecentActivity({
    type: 'purchase',
    message,
  });

  await recentActivity.save();
  res.sendStatus(200);
});

module.exports = router;
