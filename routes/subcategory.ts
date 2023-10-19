import { Router } from "express";
import { deleteSubCategory, getSubCategories, getSubCategory, getSubCategoryByCategory, postSubCategory, putSubCategory } from "../controllers/subcategory";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import validateToken from "./validateToken";

const router = Router();

router.get('/',validateToken, getSubCategories);

router.get('/:id',validateToken, getSubCategory);

router.get('/byCategory/:id',validateToken, getSubCategoryByCategory);

router.post('/',[
    check('name', 'El nombre es un campo obligatorio').not().isEmpty(),
    check('categoryId', 'El id de categoría es un campo obligatorio').not().isEmpty(),
    validateFields
] ,validateToken,postSubCategory);

router.put('/:id', validateToken, putSubCategory);

router.delete('/:id',validateToken,  deleteSubCategory);

export default router;