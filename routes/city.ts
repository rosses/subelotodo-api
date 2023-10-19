import { Router } from "express";
import { deleteCity, getCities, getCitiesByState, getCity, postCity, putCity } from "../controllers/city";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import validateToken from "./validateToken";

const router = Router();

router.get('/',validateToken, getCities);

router.get('/byId/:id',validateToken, getCity);

router.get('/byState/:stateId',validateToken, getCitiesByState);

router.post('/',[
    check('name', 'El nombre es un campo obligatorio').not().isEmpty(),
    check('stateId', 'El id de región es un campo obligatorio').not().isEmpty(),
    validateFields
] ,validateToken,postCity);

router.put('/:id',validateToken,  putCity);

router.delete('/:id',validateToken,  deleteCity);

export default router;