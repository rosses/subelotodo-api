import { Router } from "express";
import { deleteBanner, getBanner, getBanners, postBanner, putBanner } from "../controllers/banners";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import validateToken from "./validateToken";
const multer = require('multer');
import { File } from "buffer";

const router = Router();

router.get('/', getBanners);

router.get('/byId/:id', getBanner);

router.post('/',[
    validateFields
] ,validateToken,postBanner);

router.put('/:id',validateToken,  putBanner);

router.delete('/:id',validateToken,  deleteBanner);

const storage = multer.diskStorage({
    destination: (req:Request, file:File, callBack:any) => {
        callBack(null, 'uploads')
    },
    filename: (req:Express.Request, file:Express.Multer.File,callBack:any) => {
        callBack(null, `${file.originalname+file.mimetype.replace('/','.').replace('´','').replace('ñ','')}`)
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