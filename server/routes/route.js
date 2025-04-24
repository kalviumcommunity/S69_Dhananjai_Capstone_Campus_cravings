const express = require('express')
const route = express.Router()
const {signUp,login} = require("../usercontroller.js/userAuthentication")
const {menuUpload,getAllItems, getItemById }= require("../usercontroller.js/menuItems")
const {newOrder,confirmOrder} = require("../usercontroller.js/orders")
const { completeOrder, acceptOrder, getOrdersByUserId, getOrderById, getAllDeliveryPersonnel, getDeliveryPersonById } = require('../usercontroller.js/delivery')
const {review, getAllReviews, getReviewsByRestaurantId,} = require('../usercontroller.js/reviews')
const payment = require('../usercontroller.js/payment')
const {
  updateDeliveryStudent,
  updateOrder,
  updateRestaurant,
  updateUser
}  = require("../usercontroller.js/putControllers")

// user authentication
route.post("/register",signUp)
route.post("/login",login)
route.put("/updateUSer",updateUser)

//menuItems 
route.post("/menuUpload",menuUpload)
route.get("/menuitem",getAllItems)
route.get("/menuitem/:id",getItemById)
route.put("/updateRes",updateRestaurant)
//orders
route.post("/newOrder",newOrder)
route.post("/:orderId/confirm",confirmOrder)
route.get("/userOrder/:id",getOrdersByUserId)
route.get("/orders/:id",getOrderById)
route.get("/updateOrder",updateOrder)
//delivery personnel
route.post("/:orderId/accept",acceptOrder)
route.post("/:orderId/complete",completeOrder)
route.get("/delivery",getAllDeliveryPersonnel)
route.get("/delivery/:id",getDeliveryPersonById)
route.put("/updateDelStu",updateDeliveryStudent)
//reviews
route.post("/restaurants/:restaurantId",review)
route.get("/reviews",getAllReviews)
route.get("/reviews/:id",getReviewsByRestaurantId)

// payment
route.post("/checkout",payment)


module.exports = route