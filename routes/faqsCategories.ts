import { Router } from "express";
import { getFaqsCategories, putFaqCategorie, postFaqCategorie, deleteFaqCategorie } from "../controllers/faqsCategories";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import validateToken from "./validateToken";

const router = Router();

router.get('/', getFaqsCategories);

router.post('/',[
    validateFields
] ,validateToken,postFaqCategorie);

router.put('/:id',validateToken,  putFaqCategorie);

router.delete('/:id',validateToken,  deleteFaqCategorie);

export default router;
