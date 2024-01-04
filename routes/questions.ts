import { Router } from "express";
import { deleteQuestion, getQuestions,  putQuestion, postQuestion } from "../controllers/questions";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import validateToken from "./validateToken";

const router = Router();

router.get('/', getQuestions);

router.post('/',[
    validateFields
] ,validateToken,postQuestion);

router.put('/:id',validateToken,  putQuestion);

router.delete('/:id',validateToken,  deleteQuestion);

export default router;
