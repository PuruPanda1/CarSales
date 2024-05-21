import { Router } from "express";

import {getPurchase, getPurchaseById, insertPurchase, deletePurchaseById } from "../db/database.js";

export const purchaseRouter = Router()

// show All purchases
purchaseRouter.get('/',async (req,res)=>{
    const purchases = await getPurchase()
    res.send(purchases)
})

// show purchase with given id
purchaseRouter.get('/:id',async (req,res)=>{
    const id = req.params.id
    const purchases = await getPurchaseById(id)
    res.send(purchases)
})


// insert the purchase
purchaseRouter.post('/create',async (req,res)=>{
    const {purchaseName, purchaseBrand, purchaseType, purchasePrice, purchaseOrderId, price, count, carId, purchaseValue} = req.body
    console.log(purchaseName,purchaseBrand,purchaseType,purchasePrice)
    const result = await insertPurchase(purchaseName, purchaseBrand, purchaseType, purchasePrice, purchaseOrderId, price, count, carId, purchaseValue)
    (result>0)? res.status(201).send("Success") : res.status(422).send("Error")
    res.status(201).send(result)
})

purchaseRouter.post('/createmul',async (req,res)=>{

})

// delete the purchase with given id
purchaseRouter.delete('/delete/:id',async (req,res)=>{
    const id = req.params.id
    const isDelete = await deleteCarById(id)
    if(isDelete>0){
         res.status(200).send("deleted")
    }else{
         res.status(404).send("Error")
    }
})




