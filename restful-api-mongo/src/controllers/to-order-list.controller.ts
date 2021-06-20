import { defaultCallback, optsCallback } from './controllers.utils';
import { Orders } from '../models/to-order-list.model'

export const getAllOrders = (req: any, res: any) => {
    Orders.find({}, defaultCallback(req, res));
};

export const getOrder = (req: any, res: any) => {
    Orders.findById(req.params.orderId, defaultCallback(req, res));
};

export const createOrder = (req: any, res: any) => {
    const newOrder = new Orders({
        name: req.body.name
    });
    newOrder.save(defaultCallback(req, res));
};

export const updateOrder = (req: any, res: any) => {
    Orders.findOneAndUpdate(
        {
            _id: req.params.orderId
        },
        req.body,
        { new: true },
        defaultCallback(req, res)
    );
};

export const deleteOrder = (req: any, res: any) => {
    Orders.deleteOne(
        { _id: req.params.orderId},
        optsCallback(req, res)({ msg: "Deleted successfully." })
    );
};