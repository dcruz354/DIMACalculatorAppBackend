import { getAllOrders, createOrder, getOrder, updateOrder, deleteOrder } from './../controllers/to-order-list.controller';

import express = require("express");

export const toOrderRoutes = express.Router();

toOrderRoutes.get("/", getAllOrders).post("/", createOrder);

toOrderRoutes
    .get("/:orderId", getOrder)
    .put("/:orderId", updateOrder)
    .delete("/:orderId", deleteOrder);