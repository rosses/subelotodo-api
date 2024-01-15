import { Router } from "express";
import { deleteUser, getSellers, getUser, getUserByEmail, getUsers, postUser, putUser, validateAccount } from "../controllers/user";
import { check } from "express-validator";
import { emailExists } from "../helpers/db-validator";
import { validateFields } from "../middlewares/validate-fields";
import validateToken from "./validateToken";


const router = Router();

router.get('/', validateToken, getUsers);

router.get('/byId/:id', validateToken, getUser);

router.get('/byEmail/:email', validateToken, getUserByEmail);

router.get('/sellers/', validateToken, getSellers);

router.get('/validateAccount/:id', validateAccount);

router.post('/', [
    check('firstName', 'El primer nombre es un campo obligatorio').not().isEmpty(),
    check('lastName', 'El apellido es un campo obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(emailExists),
    validateFields
], postUser);

router.put('/:id', validateToken, putUser);

router.delete('/:id', validateToken, deleteUser);

export default router;