var express = require('express');
var path = require('path');
require('dotenv').config();
var cors = require('cors');
var cache = require('memory-cache');
const { v4: uuidv4 } = require('uuid');
var squareConnect = require('square-connect');
var port = process.env.PORT || 8080;
var app = express();
app.use(express.json());
app.use(cors())
const defaultClient = squareConnect.ApiClient.instance;
defaultClient.basePath = process.env.SQ_BASE_PATH
oauth2 = defaultClient.authentications['oauth2'];
oauth2.accessToken = process.env.SQACCESSTOKEN;
const catalog_api = new squareConnect.CatalogApi();
let catalog;
let tax;
let catalog_modifiers;


function mapRequestToOrder(body) {
  let line_items = [];
  body.order.pizzasOrdered.forEach(pizza => {
    const item_id = catalog.filter(item =>
      item.item_data.name.includes(pizza.type)
    ).map(item => item.item_data.variations[0].id);
    const modifiers = [];
    catalog_modifiers.forEach(modifier => {
      if (pizza.toppings.includes(modifier.modifier_data.name)) {
        modifiers.push({ catalog_object_id: modifier.id })
      }
    });
    line_items.push({ "catalog_object_id": item_id[0], modifiers: modifiers, "quantity": "1", note: pizza.comments })
  });
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  let fulfillments = [
    {
      type: "PICKUP",
      state: "PROPOSED",
      pickup_details: {
        recipient: {
          display_name: body.orderPlacer.name,
          email_address: body.orderPlacer.email,
          phone_number: body.orderPlacer.phone.length === 10 ? "1" + body.orderPlacer.phone : body.orderPlacer.phone
        },
        schedule_type: "SCHEDULED",
        pickup_at: body.orderPlacer.pickupTime
      }
    }
  ]
  let taxes = [
    {
      name: tax[0].name,
      catalog_object_id: tax[0].id,
      scope: "ORDER"
    }
  ]
  return { line_items: line_items, fulfillments: fulfillments, taxes: taxes }
}

function createOrder(req, res, next) {
  var body = new squareConnect.CreateOrderRequest();
  body.order = mapRequestToOrder(req.body)
  body.idempotency_key = uuidv4()
  const orders_api = new squareConnect.OrdersApi()
  const payments_api = new squareConnect.PaymentsApi()
  orders_api.createOrder(process.env.SQLOCATIONID, body).then(function (orderData) {
    let payment_body = {}
    if (req.body.order.orderTip) {
      payment_body = {
        idempotency_key: uuidv4(),
        amount_money: orderData.order.total_money,
        tip_money: { amount: parseFloat(req.body.order.orderTip * 100), currency: "USD" },
        source_id: req.body.nonce,
        order_id: orderData.order.id
      }
    } else {
      payment_body = {
        idempotency_key: uuidv4(),
        amount_money: orderData.order.total_money,
        source_id: req.body.nonce,
        order_id: orderData.order.id
      }
    }
    payments_api.createPayment(payment_body).then(function (data) {
      res.send(JSON.stringify(data));
    }, function (error) {
      res.status(400).send(error);
    })
  }, function (error) {
    res.status(400).send(error);
  })
}

app.post('/complete-order', async function (req, res) {
  if (cache.get("catalog")) {
    data = cache.get("catalog")
    catalog = data.objects.filter(exports => exports.type === "ITEM");
    catalog_modifiers = data.objects[24].modifier_list_data.modifiers;
    tax = data.objects.filter(exports => exports.type === "TAX");
  } else {
    await catalog_api.listCatalog().then(function (data) {
      cache.put("catalog", data);
      catalog = data.objects.filter(exports => exports.type === "ITEM");
      catalog_modifiers = data.objects[24].modifier_list_data.modifiers;
      tax = data.objects.filter(exports => exports.type === "TAX");
    }, function (error) {
      console.log(error)
    });
  }
  createOrder(req, res);
})

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, function () {
  console.log('Application running on port: ' + port);
});