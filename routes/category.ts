import { Router } from "express";
import { deleteCategory, getCategories, getCategory, postCategory, putCategory } from "../controllers/category";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import validateToken from "./validateToken";

const router = Router();

router.get('/',validateToken, getCategories);

router.get('/:id',validateToken, getCategory);

router.post('/',[
    check('name', 'El nombre es un campo obligatorio').not().isEmpty(),
    validateFields
] ,validateToken,postCategory);

router.put('/:id',validateToken,  putCategory);

router.delete('/:id',validateToken,  deleteCategory);

export default router;