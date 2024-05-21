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
    const [rows] = await pool.query('SELECT * FROM Car WHERE carId = ?', [id])
    return rows
}

export async function insertCar(carName, carBrand, carType, carPrice) {
    const [rows] = await pool.query('INSERT INTO Car VALUES (NULL, ?, ?, ?)', [carName, carBrand, carType])
    // console.log(rows.insertId)
    return rows.insertId

}

export async function deleteCarById(id) {
    const [rows] = await pool.query('DELETE FROM Car WHERE carId = ?', [id])
    return rows.affectedRows
}


// Purchase Order Table

export async function getPurchaseOrder() {
    const [rows] = await pool.query("SELECT * FROM PurchaseOrder")
    return rows
}

export async function getPurchaseOrderById(id) {
    const [rows] = await pool.query('SELECT * FROM PurchaseOrder WHERE purchaseId = ?', [id])
    return rows
}

export async function insertPurchaseOrder(sellerId, buyerId, timestamp, totalValue) {
    const [rows] = await pool.query('INSERT INTO PurchaseOrder VALUES (NULL, ?, ?, NULL, ?)', [sellerId, buyerId, totalValue])
    return rows.insertId
}

export async function deletePurchaseOrderById(id) {
    const [rows] = await pool.query('DELETE FROM PurchaseOrder WHERE carId = ?', [id])
    return rows.affectedRows
}


// Purchase Table

export async function getPurchase() {
    const [rows] = await pool.query("SELECT * FROM PurchaseItem")
    return rows
}

export async function getPurchaseById(id) {
    const [rows] = await pool.query('SELECT * FROM PurchaseItem WHERE purchaseId = ?', [id])
    return rows
}

export async function insertPurchase(purchaseOrderId, carId, price, count, purchaseValue) {
    const [rows] = await pool.query('INSERT INTO PurchaseItem VALUES (NULL, ?, ?, ?, ?, ?)', [purchaseOrderId, carId, count, price, purchaseValue])
    return rows.insertId
}

export async function deletePurchaseById(id) {
    const [rows] = await pool.query('DELETE FROM PurchaseItem WHERE carId = ?', [id])
    return rows.affectedRows
}


// Sales Order Table

export async function getSaleOrder() {
    const [rows] = await pool.query("SELECT * FROM SaleOrder")
    return rows
}

export async function getSaleOrderById(id) {
    const [rows] = await pool.query('SELECT * FROM SaleOrder WHERE SaleId = ?', [id])
    return rows
}

export async function insertSaleOrder(sellerId, buyerId, timestamp, totalValue) {
    const [rows] = await pool.query('INSERT INTO SaleOrder VALUES (NULL, ?, ?, NULL, ?)', [sellerId, buyerId, totalValue])
    return rows.insertId
}

export async function deleteSaleOrderById(id) {
    const [rows] = await pool.query('DELETE FROM SaleOrder WHERE carId = ?', [id])
    return rows.affectedRows
}


// Sale Table

export async function getSale() {
    const [rows] = await pool.query("SELECT * FROM SaleItem")
    return rows
}

export async function getSaleById(id) {
    const [rows] = await pool.query('SELECT * FROM SaleItem WHERE SaleId = ?', [id])
    return rows
}

export async function insertSale(SaleOrderId, carId, price, count, SaleValue) {
    const [rows] = await pool.query('INSERT INTO SaleItem VALUES (NULL, ?, ?, ?, ?, ?)', [SaleOrderId, carId, count, price, SaleValue])
    return rows.insertId
}

export async function deleteSaleById(id) {
    const [rows] = await pool.query('DELETE FROM SaleItem WHERE carId = ?', [id])
    return rows.affectedRows
}