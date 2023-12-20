import { Router } from "express";
import { deleteState, getStates, getState, postState, putState } from "../controllers/state";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import validateToken from "./validateToken";

const router = Router();

router.get('/', getStates);

router.get('/:id', getState);

router.post('/',[
    check('name', 'El nombre es un campo obligatorio').not().isEmpty(),
    validateFields
] ,validateToken,postState);

router.put('/:id',validateToken,  putState);

router.delete('/:id',validateToken,  deleteState);

export default router;