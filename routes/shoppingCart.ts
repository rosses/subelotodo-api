import { Router } from "express";
import { deleteShoppingCartItem, getShoppingCartItems, getShoppingCartItem, postShoppingCartItem, putShoppingCartItem, getShoppingCartByUser, createWebpay, stateWebpay } from "../controllers/shoppingCart";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import validateToken from "./validateToken";
const WebpayPlus = require("transbank-sdk").WebpayPlus;

const router = Router();

router.use(function (req, res, next) {
    if (process.env.WPP_CC && process.env.WPP_KEY) {
      WebpayPlus.configureForProduction(process.env.WPP_CC, process.env.WPP_KEY);
    } else {
      WebpayPlus.configureForTesting();
    }
    next();
});

router.get('/',validateToken, getShoppingCartItems);

router.get('/:id',validateToken, getShoppingCartItem);

router.get('/byUser/:userId',validateToken, getShoppingCartByUser);

router.post('/',[
    check('userId', 'El usario es un campo obligatorio').not().isEmpty(),
    check('amount', 'La cantidad es un campo obligatorio').not().isEmpty(),
    check('productId', 'El producto es un campo obligatorio').not().isEmpty(),
    validateFields
] ,validateToken,postShoppingCartItem);

router.put('/:id',validateToken,  putShoppingCartItem);

router.delete('/:id',validateToken,  deleteShoppingCartItem);

router.post("/createWebpay/", validateToken, createWebpay);

router.get("/stateWebpay/:token", validateToken, stateWebpay);

export default router;