const express = require('express')
const route = express.Router()
const {signUp,login} = require("../usercontroller.js/userAuthentication")
const menuUpload = require("../usercontroller.js/menuItems")
const {newOrder,confirmOrder} = require("../usercontroller.js/orders")
const { completeOrder, acceptOrder } = require('../usercontroller.js/delivery')
const review = require('../usercontroller.js/reviews')
const payment = require('../usercontroller.js/payment')

// user authentication
route.post("/register",signUp)
route.post("/login",login)
//menuItems 
route.post("/menuUpload",menuUpload)
//orders
route.post("/newOrder",newOrder)
route.post("/:orderId/confirm",confirmOrder)

//delivery personnel
route.post("/:orderId/accept",acceptOrder)
route.post("/:orderId/complete",completeOrder)
//reviews
route.post("/restaurants/:restaurantId",review)

// payment
route.post("/checkout",payment)





module.exports = route