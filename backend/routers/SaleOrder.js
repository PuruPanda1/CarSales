import {Router} from "express";

import {
    deleteCarById,
    getSaleOrder,
    getSaleOrderById,
    insertSale,
    insertSaleOrder
} from "../db/database.js";

async function insertSaleItemFunction(Sale, SaleOrderId) {
    const carId = Sale.carId
    const SaleValue = Sale.SaleValue
    const price = Sale.price
    const count = Sale.quantity
    return await insertSale(SaleOrderId, carId, price, count, SaleValue)
}

export const SaleOrderRouter = Router()

// show All SaleOrders
SaleOrderRouter.get('/', async (req, res) => {
    const SaleOrders = await getSaleOrder()
    res.send(SaleOrders)
})

// show SaleOrder with given id
SaleOrderRouter.get('/:id', async (req, res) => {
    const id = req.params.id
    const SaleOrders = await getSaleOrderById(id)
    res.send(SaleOrders)
})

// insert the SaleOrder
SaleOrderRouter.post('/create', async (req, res) => {
    const {sellerId, buyerId, timestamp, totalValue, saleItems} = req.body
    const SaleOrderId = await insertSaleOrder(sellerId, buyerId, timestamp, totalValue)
    for (const Sale of saleItems) {
        const result = await insertSaleItemFunction(Sale, SaleOrderId)
        if (result <= 0) {
            res.status(404).message("Failure in updating db")
        }
    }
    res.status(201).send("Success")
})

// TODO -- to delete a Sale order we need to delete the Sales items as well!
SaleOrderRouter.delete('/delete/:id', async (req, res) => {
    const id = req.params.id
    const isDelete = await deleteCarById(id)
    if (isDelete > 0) {
        res.status(200).send("deleted")
    } else {
        res.status(404).send("Error")
    }
})




