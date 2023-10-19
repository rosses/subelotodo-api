/*import { Router } from "express";
import { deleteDimensions, getDimensions, getDimension, postDimensions, putDimensions } from "../controllers/dimensions";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import validateToken from "./validateToken";

const router = Router();

router.get('/',validateToken, getDimensions);

router.get('/:id',validateToken, getDimension);

router.post('/',[
    check('productId', 'El producto es un campo obligatorio').not().isEmpty(),
    check('length', 'El largo es un campo obligatorio').not().isEmpty(),
    check('width', 'El ancho es un campo obligatorio').not().isEmpty(),
    check('height', 'La altura es un campo obligatorio').not().isEmpty(),
    check('weight', 'El peso es un campo obligatorio').not().isEmpty(),
    validateFields
] ,validateToken,postDimensions);

router.put('/:id',validateToken,  putDimensions);

router.delete('/:id', validateToken, deleteDimensions);

export default router;*/