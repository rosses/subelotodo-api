import { Router } from "express";
import { deleteShipment, getShipments, getShipmentByUser, getShipment, postShipment, putShipment, checkToken } from "../controllers/shipment";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import validateToken from "./validateToken";

const router = Router();

router.get('/check/:token',validateToken, checkToken);

router.get('/',validateToken, getShipments);

router.get('/byId/:id',validateToken, getShipment);

router.get('/byUser/:userId',validateToken, getShipmentByUser);

router.post('/',[
    check('amount', 'El monto es un campo obligatorio').not().isEmpty(),
    check('userId', 'El usuario es un campo obligatorio').not().isEmpty(),
    check('token', 'El token es un campo obligatorio').not().isEmpty(),
    validateFields
] ,validateToken,postShipment);

router.put('/:id',validateToken,  putShipment);

router.delete('/:id',validateToken,  deleteShipment);

export default router;