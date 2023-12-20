import { Router } from "express";
import { deleteCategory, getCategories, getCategoriesOffers, getCategory, postCategory, putCategory } from "../controllers/category";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import validateToken from "./validateToken";
const multer = require('multer');
import { File } from "buffer";

const router = Router();

router.get('/', getCategories);

router.get('/offers/', getCategoriesOffers);

router.get('/:id',getCategory);

router.post('/',[
    check('name', 'El nombre es un campo obligatorio').not().isEmpty(),
    validateFields
] ,validateToken,postCategory);

router.put('/:id',validateToken,  putCategory);

router.delete('/:id',validateToken,  deleteCategory);

const storage = multer.diskStorage({
    destination: (req:Request, file:File, callBack:any) => {
        callBack(null, 'uploads')
    },
    filename: (req:Express.Request, file:Express.Multer.File,callBack:any) => {
        callBack(null, `${file.originalname+file.mimetype.replace('/','.').split('+')[0]}`)
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