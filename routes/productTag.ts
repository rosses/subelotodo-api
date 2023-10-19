import { Router } from "express";
import { deleteProductTag, getProductTags, getProductTag, postProductTag, putProductTag } from "../controllers/productTag";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import validateToken from "./validateToken";

const router = Router();

router.get('/',validateToken, getProductTags);

router.get('/:id',validateToken, getProductTag);

router.post('/',[
    check('productId', 'El producto es un campo obligatorio').not().isEmpty(),
    check('tagId', 'La etiqueta es un campo obligatorio').not().isEmpty(),
    validateFields
] ,validateToken,postProductTag);

router.put('/:id', validateToken, putProductTag);

router.delete('/:id', validateToken, deleteProductTag);

export default router;