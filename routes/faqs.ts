import { Router } from "express";
import { getFaqs, postFaq, putFaq, deleteFaq, getFaq } from "../controllers/faqs";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import validateToken from "./validateToken";
const multer = require('multer');
import { File } from "buffer";

const router = Router();

router.get('/', getFaqs);

router.get('/byId/:id', getFaq);

router.post('/',[
    validateFields
] ,validateToken,postFaq);

router.put('/:id',validateToken,  putFaq);

router.delete('/:id',validateToken,  deleteFaq);

const storage = multer.diskStorage({
    destination: (req:Request, file:File, callBack:any) => {
        callBack(null, 'uploads')
    },
    filename: (req:Express.Request, file:Express.Multer.File,callBack:any) => {
        callBack(null, `${file.originalname+file.mimetype.replace('/','.')}`)
    }
  },
)
  
const upload = multer({ storage: storage })
   
router.post('/multipleFiles', upload.array('files'), (req, res, next) => {
    
    const files = req.files;

    if (!files) {
      const error = new Error('No File')
      //error.httpStatusCode = 400
      return next(error)
    }
    
    res.send();
  })

export default router;
