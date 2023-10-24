import { Router } from "express";
import { deleteUserType, getUserTypes, getUserType, postUserType, putUserType } from "../controllers/userType";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import validateToken from "./validateToken";

const router = Router();

router.get('/',validateToken, getUserTypes);

router.get('/:id',validateToken, getUserType);

router.post('/',[
    check('name', 'El nombre es un campo obligatorio').not().isEmpty(),
    validateFields
] ,validateToken,postUserType);

router.put('/:id', validateToken, putUserType);

router.delete('/:id', validateToken, deleteUserType);

export default router;