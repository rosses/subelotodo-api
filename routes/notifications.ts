import { Router } from "express";
import { getNotification, getNotifications, postNotification, putNotification, deleteNotification } from "../controllers/notifications";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import validateToken from "./validateToken";

const router = Router();

router.get('/:id',validateToken, getNotifications);

router.get('/byId/:id',validateToken, getNotification);

router.post('/',[
    validateFields
] ,validateToken,postNotification);

router.put('/:id',validateToken,  putNotification);

router.delete('/:id',validateToken,  deleteNotification);

export default router;