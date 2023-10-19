import { Router } from "express";
import { deleteProduct, getProducts, getProductsByCity,getProductsByUser, getProduct, postProduct, putProduct, getProductsByCategory, getProductsBySubcategory, getProductsByState } from "../controllers/product";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import validateToken from "./validateToken";

const router = Router();

router.get('/',validateToken, getProducts);

router.get('/byId/:id',validateToken, getProduct);

router.get('/byCity/:cityId',validateToken, getProductsByCity);

router.get('/byState/:stateId',validateToken, getProductsByState);

router.get('/byUser/:userId',validateToken, getProductsByUser);

router.get('/byCategory/:categoryId',validateToken, getProductsByCategory);

router.get('/bySubcategory/:subcategoryId',validateToken, getProductsBySubcategory);

router.post('/',[
    check('title', 'El titulo es un campo obligatorio').not().isEmpty(),
    check('categoryId', 'La categoría es un campo obligatorio').not().isEmpty(),
    check('subcategoryId', 'La subcategoria es un campo obligatorio').not().isEmpty(),
    check('userId', 'La etiqueta es un campo obligatorio').not().isEmpty(),
    check('stateId', 'La región es un campo obligatorio').not().isEmpty(),
    check('cityId', 'La comuna es un campo obligatorio').not().isEmpty(),
    check('description', 'La descripción es un campo obligatorio').not().isEmpty(),
    check('condition', 'El estado del producto es un campo obligatorio').not().isEmpty(),
    check('price', 'El precio es un campo obligatorio').not().isEmpty(),
    check('saleState', 'El estado de venta es un campo obligatorio').not().isEmpty(), 
    validateFields
] ,validateToken,postProduct);

router.put('/:id',validateToken,  putProduct);

router.delete('/:id',validateToken,  deleteProduct);

export default router;