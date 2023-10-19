import { Router } from "express";
import { loginUser } from "../controllers/login";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";


const router = Router();

router.post('/',[
    check('email', 'El correo no es válido').isEmail(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    validateFields
] ,loginUser);

export default router;