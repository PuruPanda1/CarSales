import { Router } from "express";

import { getCarById, getCars, insertCar, deleteCarById } from "../db/database.js";

export const carRouter = Router()

// show All cars
carRouter.get('/',async (req,res)=>{
    const cars = await getCars()
    res.send(cars)
})

// show car with given id
carRouter.get('/:id',async (req,res)=>{
    const id = req.params.id
    const cars = await getCarById(id)
    res.send(cars)
})


// insert the car
carRouter.post('/create',async (req,res)=>{
    const {carName, carBrand, carType, carPrice} = req.body
    console.log(carName,carBrand,carType,carPrice)
    const result = insertCar(carName,carBrand,carType,carPrice)  
    res.status(201).send(result)
})


// delete the car with given id
carRouter.delete('/delete/:id',async (req,res)=>{
    const id = req.params.id
    const isDelete = await deleteCarById(id)
    if(isDelete>0){
         res.status(200).send("deleted")
    }else{
         res.status(404).send("Error")
    }
})




