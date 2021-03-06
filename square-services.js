var cache = require('memory-cache');
const { v4: uuidv4 } = require('uuid');
var squareConnect = require('square-connect');
const defaultClient = squareConnect.ApiClient.instance;
defaultClient.basePath = process.env.SQ_BASE_PATH
oauth2 = defaultClient.authentications['oauth2'];
oauth2.accessToken = process.env.SQACCESSTOKEN;
const catalog_api = new squareConnect.CatalogApi();
const Event = require('./event.model')
const moment = require('moment');

async function getCatalogFromSquare() {
    let catalog;
    let catalog_modifiers;
    let tax;
    if (cache.get("catalog")) {
        data = cache.get("catalog")
        catalog = data.objects.filter(exports => exports.type === "ITEM");
        catalog_modifiers = data.objects.filter(exports => exports.type ==="MODIFIER_LIST");
        catalog_modifiers = catalog_modifiers.filter(exports => exports.modifier_list_data.name ==="Toppings");
        tax = data.objects.filter(exports => exports.type === "TAX");
    } else {
        try {
            data = await catalog_api.listCatalog();
            cache.put("catalog", data);
            catalog = data.objects.filter(exports => exports.type === "ITEM");
            catalog_modifiers = data.objects.filter(exports => exports.type ==="MODIFIER_LIST");
            catalog_modifiers = catalog_modifiers.filter(exports => exports.modifier_list_data.name ==="Toppings");
            tax = data.objects.filter(exports => exports.type === "TAX");
        } catch (error) {
            console.error(error);
        }
    }
    return { items: catalog, modifiers: catalog_modifiers[0].modifier_list_data.modifiers, tax: tax }
}

async function mapRequestToOrder(body) {
    console.log(JSON.stringify(body))
    catalog = await getCatalogFromSquare();
    let line_items = [];
    body.order.itemsOrdered.forEach(itemFromReq => {
        const added_item = catalog.items.filter(item =>
            item.item_data.name.includes(itemFromReq.type))
        item_id = added_item[0].item_data.variations[0].id;
        const modifiers = [];
        catalog.modifiers.forEach(modifier => {
            if (itemFromReq.toppings && itemFromReq.toppings.includes(modifier.modifier_data.name)) {
                modifiers.push({ catalog_object_id: modifier.id })
            }
        });
        line_items.push({ "catalog_object_id": item_id, modifiers: modifiers, "quantity": "1", note: itemFromReq.comments })
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
    let taxes = []
    if(catalog.tax.length > 0) {
        taxes.push({
            name: catalog.tax[0].name,
            catalog_object_id: catalog.tax[0].id,
            scope: "ORDER"
        })
    }
    let service_charges = [
        {
            name: "Online Ordering Fee",
            uid: uuidv4(),
            amount_money: {
                amount: parseInt((parseFloat(body.order.orderTotal) * .04) * 100),
                currency: "USD"
            },
            calculation_phase: "SUBTOTAL_PHASE"
        }
    ]
    if(taxes.length > 0) {
        return { line_items: line_items, fulfillments: fulfillments, taxes: taxes, service_charges: service_charges }
    } else {
        return { line_items: line_items, fulfillments: fulfillments, service_charges: service_charges }
    }
}

module.exports = {
    createOrder: async function (req, res) {
        var body = new squareConnect.CreateOrderRequest();
        body.order = await mapRequestToOrder(req.body)
        body.idempotency_key = uuidv4()
        const orders_api = new squareConnect.OrdersApi()
        const payments_api = new squareConnect.PaymentsApi()
        console.log(JSON.stringify(body, null, 4));
        orders_api.createOrder(process.env.SQLOCATIONID, body).then(function (orderData, body) {
            let payment_body = {}
            if (req.body.order.orderTip) {
                payment_body = {
                    idempotency_key: uuidv4(),
                    amount_money: orderData.order.total_money,
                    tip_money: { amount: parseInt(req.body.order.orderTip * 100), currency: "USD" },
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
                Event.findById(req.body.orderPlacer.eventId, function (err, event) {
                    if (err) {
                        return res.status(500).send(err)
                    }
                    event.availableTimes.forEach(time => {
                        if (time.id === req.body.orderPlacer.pickupTimeId) {
                            time.count++;
                        }
                    });
                    event.save();
                })


                res.send(JSON.stringify(data));
            }, function (error) {
                console.log(error);
                res.status(400).send(error);
            })
        }, function (error) {
            console.log(error);
            res.status(400).send(error);
        })
    }
}