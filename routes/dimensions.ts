/*import { Router } from "express";
import { deleteDimensions, getDimensions, getDimension, postDimensions, putDimensions } from "../controllers/dimensions";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import validateToken from "./validateToken";

const router = Router();

router.get('/',validateToken, getDimensions);

router.get('/:id',validateToken, getDimension);

router.post('/',[
    validateFields
] ,validateToken,postDimensions);

router.put('/:id',validateToken,  putDimensions);

router.delete('/:id', validateToken, deleteDimensions);

export default router;*/
