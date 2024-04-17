import express, { Router, static as static_ } from "express";
import { deleteProductImage, getProductImages, getProductImage, postProductImage, putProductImage, uploadProductImages, getProductUniqueImages } from "../controllers/productImage";
import { ExpressValidator, check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import validateToken from "./validateToken";
import { File } from "buffer";
import { Multer } from "multer";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
const multer = require('multer');


const router = Router();

router.get('/', getProductImages);

router.get('/:id', getProductImage);

router.get('/byProductId/:productId', getProductUniqueImages)

router.post('/post/', [
  check('productId', 'El producto es un campo obligatorio').not().isEmpty(),
  check('filePath', 'El archivo es un campo obligatorio').not().isEmpty(),
  validateFields
], validateToken, postProductImage);

router.post('/uploadImages', [], validateToken, uploadProductImages);

router.put('/:id', validateToken, putProductImage);

router.delete('/:id', validateToken, deleteProductImage);

const storage = multer.diskStorage({
  destination: (req: Request, file: File, callBack: any) => {
    callBack(null, 'uploads')
  },
  filename: (req: Express.Request, file: Express.Multer.File, callBack: any) => {
    callBack(null, `${file.originalname + file.mimetype.replace('/', '.')}`)
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
