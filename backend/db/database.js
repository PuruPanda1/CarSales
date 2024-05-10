import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
}).promise()


// Car Table

export async function getCars() {
    const [rows] = await pool.query("SELECT * FROM Car")
    return rows
}

export async function getCarById(id) {
    const [rows] = await pool.query('SELECT * FROM Car WHERE carId = ?',[id])
    return rows
}

export async function insertCar(carName, carBrand, carType, carPrice) {
    const [rows] = await pool.query('INSERT INTO Car VALUES (NULL, ?, ?, ?)',[carName, carBrand, carType])
    return rows.insertId
}

export async function deleteCarById(id) {
    const [rows] = await pool.query('DELETE FROM Car WHERE carId = ?',[id])
    return rows.affectedRows
}


// Purchase Order Table

export async function getPurchaseOrder() {
    const [rows] = await pool.query("SELECT * FROM PurchaseOrder")
    return rows
}

export async function getPurchaseOrderById(id) {
    const [rows] = await pool.query('SELECT * FROM PurchaseOrder WHERE purchaseId = ?',[id])
    return rows
}

export async function insertPurchaseOrder(purchaseName, purchaseBrand, purchaseType, purchasePrice) {
    const [rows] = await pool.query('INSERT INTO PurchaseOrder VALUES (NULL, ?, ?, ?)',[purchaseName, purchaseBrand, purchaseType])
    return rows.insertId
}

export async function deletePurchaseOrderById(id) {
    const [rows] = await pool.query('DELETE FROM PurchaseOrder WHERE carId = ?',[id])
    return rows.affectedRows
}


// Purchase Table

export async function getPurchase() {
    const [rows] = await pool.query("SELECT * FROM Purchase")
    return rows
}

export async function getPurchaseById(id) {
    const [rows] = await pool.query('SELECT * FROM Purchase WHERE purchaseId = ?',[id])
    return rows
}

export async function insertPurchase(purchaseName, purchaseBrand, purchaseType, purchasePrice) {
    const [rows] = await pool.query('INSERT INTO Purchase VALUES (NULL, ?, ?, ?)',[purchaseName, purchaseBrand, purchaseType])
    return rows.insertId
}

export async function deletePurchaseById(id) {
    const [rows] = await pool.query('DELETE FROM Purchase WHERE carId = ?',[id])
    return rows.affectedRows
}