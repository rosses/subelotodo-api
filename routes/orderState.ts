import { Router } from "express";
import { deleteOrderState, getOrderStates, getOrderState, postOrderState, putOrderState } from "../controllers/orderState";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import validateToken from "./validateToken";

const router = Router();

router.get('/', getOrderStates);

router.get('/:id', getOrderState);

router.post('/',[
    check('stateOrder', 'El estado de orden es un campo obligatorio').not().isEmpty(),
    validateFields
] ,validateToken,postOrderState);

router.put('/:id',validateToken,  putOrderState);

router.delete('/:id',validateToken,  deleteOrderState);

export default router;