import { OrdersModel } from './order.model';
import { Schema, model } from 'mongoose';


const OrdersSchema = new Schema<OrdersModel>({
    name: {
        type: String,
        required: 'An order name is required to create a new order',
    },

    numberOfHoles: {
        type: Number,
        default: 0,
    },
    savings: {
        type: Number,
        default: 0,

    },
    size: {
        type: Number,
        default: 2,
    },
});

export const Orders = model('Orders', OrdersSchema);