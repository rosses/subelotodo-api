import { Router } from "express";
import { deleteProduct, getProducts, getProductsByCity,getProductsByUser, getProduct, postProduct, putProduct, getProductsByCategory, getProductsBySubcategory, getProductsByState, getProductsToApprove, getProductsToHome, getProductsToDiscount } from "../controllers/product";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import validateToken from "./validateToken";

const router = Router();

router.get('/', getProducts);

router.get('/toApprove/', getProductsToApprove);

router.get('/toHome/', getProductsToHome);

router.get('/toDiscount/', getProductsToDiscount);

router.get('/byId/:id', getProduct);

router.get('/byCity/:cityId', getProductsByCity);

router.get('/byState/:stateId', getProductsByState);

router.get('/byUser/:userId', getProductsByUser);

router.get('/byCategory/:categoryId', getProductsByCategory);

router.get('/bySubcategory/:subcategoryId', getProductsBySubcategory);

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