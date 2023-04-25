const express = require('express');
const Shopify = require('shopify-api-node');

const app = express();
const PORT = process.env.PORT || 3000;

const shopName = 'medicalsupplyx.myshopify.com'; // Replace with your actual shop name
const accessToken = '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'; // Replace with your permanent access token
const webhookUrl = 'https://shopify-recent-activity.herokuapp.com/webhook/orders-create';

const shopify = new Shopify({
  shopName: shopName,
  accessToken: accessToken,
});

app.use(express.json());

async function createWebhook() {
  try {
    const webhook = await shopify.webhook.create({
      topic: 'orders/create',
      address: webhookUrl,
      format: 'json',
    });    
    console.log('Webhook created:', webhook);
  } catch (error) {
    console.error('Error creating webhook:', error);
  }
}
// Add this route before app.listen()
app.post('/webhook/orders-create', (req, res) => {
  console.log('Received webhook:', req.body);
  res.sendStatus(200);
});
app.get('/', (req, res) => {
  res.send('Shopify Recent Activity App is running!');
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  createWebhook();
});
