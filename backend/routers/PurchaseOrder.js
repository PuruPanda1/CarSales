import {Router} from "express";

import {
    deleteCarById,
    getPurchaseOrder,
    getPurchaseOrderById,
    insertPurchase,
    insertPurchaseOrder
} from "../db/database.js";

// TODO Create the stock db which will keep the track of current available resources

async function insertPurchaseItemFunction(purchase, purchaseOrderId) {
    const carId = purchase.carId
    const purchaseValue = purchase.purchaseValue
    const price = purchase.price
    const count = purchase.quantity
    return await insertPurchase(purchaseOrderId, carId, price, count, purchaseValue)
}

export const PurchaseOrderRouter = Router()

// show All PurchaseOrders
PurchaseOrderRouter.get('/', async (req, res) => {
    const PurchaseOrders = await getPurchaseOrder()
    res.send(PurchaseOrders)
})

// show PurchaseOrder with given id
PurchaseOrderRouter.get('/:id', async (req, res) => {
    const id = req.params.id
    const PurchaseOrders = await getPurchaseOrderById(id)
    res.send(PurchaseOrders)
})

// insert the PurchaseOrder
PurchaseOrderRouter.post('/create', async (req, res) => {
    const {sellerId, buyerId, timestamp, totalValue, purchaseItems} = req.body
    const purchaseOrderId = await insertPurchaseOrder(sellerId, buyerId, timestamp, totalValue)
    for (const purchase of purchaseItems) {
        const result = await insertPurchaseItemFunction(purchase, purchaseOrderId)
        if(result<=0){
            res.status(404).message("Failure in updating db")
        }
    }
    res.status(201).send("Success")
})

// TODO -- to delete a purchase order we need to delete the purchases as well!
PurchaseOrderRouter.delete('/delete/:id', async (req, res) => {
    const id = req.params.id
    const isDelete = await deleteCarById(id)
    if (isDelete > 0) {
        res.status(200).send("deleted")
    } else {
        res.status(404).send("Error")
    }
})





