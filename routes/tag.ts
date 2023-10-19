import { Router } from "express";
import { deleteTag, getTags, getTag, postTag, putTag } from "../controllers/tag";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import validateToken from "./validateToken";

const router = Router();

router.get('/',validateToken, getTags);

router.get('/:id',validateToken, getTag);

router.post('/',[
    check('name', 'El nombre es un campo obligatorio').not().isEmpty(),
    validateFields
] ,validateToken,postTag);

router.put('/:id', validateToken, putTag);

router.delete('/:id', validateToken, deleteTag);

export default router;