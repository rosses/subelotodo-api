import { Router } from "express";
import { deleteOrder, getOrders, getOrdersByUser, getOrder, postOrder, putOrder } from "../controllers/order";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import validateToken from "./validateToken";

const router = Router();

router.get('/',validateToken, getOrders);

router.get('/byId/:id',validateToken, getOrder);

router.get('/byUser/:userId',validateToken, getOrdersByUser);

router.post('/',[
    check('price', 'El precio es un campo obligatorio').not().isEmpty(),
    check('userId', 'El usuario es un campo obligatorio').not().isEmpty(),
    check('productId', 'El producto es un campo obligatorio').not().isEmpty(),
    check('shipmentId', 'El pago es un campo obligatorio').not().isEmpty(),
    check('orderStateId', 'La orden es un campo obligatorio').not().isEmpty(),
    check('sellerPaid', 'El pago realizado es un campo obligatorio').not().isEmpty(),
    validateFields
] ,validateToken,postOrder);

router.put('/:id',validateToken,  putOrder);

router.delete('/:id',validateToken,  deleteOrder);

export default router;