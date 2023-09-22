import { Router } from "express";
import { deleteUser, getUser, getUsers, postUser, putUser , getUserByEmail} from "../controllers/user";
import { check } from 'express-validator';
import { emailExists } from "../helpers/db-validator";
import { validateFields } from '../middlewares/validate-fields'

const router = Router();

router.get('/',     getUsers);

router.get('/:id',  getUser);

router.post('/byEmail', getUserByEmail);

router.post('/',[
    check('firstName', 'El primer nombre es un campo obligatorio').not().isEmpty(),
    check('lastName', 'El apellido es un campo obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(emailExists),
    validateFields
] ,postUser);

router.put('/:id',  putUser);

router.delete('/:id',  deleteUser);

export default router;