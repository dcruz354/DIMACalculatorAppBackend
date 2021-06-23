//import { OrdersModel } from './order.model';
import { Schema, model } from 'mongoose';


export class OrdersModel {
    constructor(name: string, numbrOfHoles: number, savings: number, size: number) {
        this.name = name;
        this.numbrOfHoles = numbrOfHoles;
        this.savings = savings;
        this.size = size;
    }
    name: string;
    numbrOfHoles: number;
    savings: number;
    size: number;
}

const OrdersSchema = new Schema<OrdersModel>({
    name: {
        type: String,
        required: 'An order name is required to create a new order',
    },

    numbrOfHoles: {
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