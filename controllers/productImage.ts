import { NextFunction, Request, Response,Express } from "express";
import ProductImage from "../models/productImage";
import multer from 'multer'


type destinationcallback = (error: any | null, destination: string) => void
type filenamecallback = (error: any | null, filename: string) => void



export const getProductImages = async(req: Request,res: Response) =>{
    const productImages = await ProductImage.findMany();
    res.json(productImages);
}

export const getProductImage = async(req: Request,res: Response) =>{
  const { id } = req.params;
  try {
    const productImage = await ProductImage.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (productImage) {
      res.json(productImage);
    } else {
      res.status(404).json({
        msg: `No existe imagen con el id ${id}`
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al obtener la imagen'
    });
  }
}

export const getProductUniqueImages = async(req: Request,res: Response) =>{
  const { productId } = req.params;
  try {
    const productImage = await ProductImage.findMany({
      where: {
        productId: parseInt(productId),
      },
    });
    if (productImage) {
      res.json(productImage);
    } else {
      res.status(404).json({
        msg: `No existe imagen con el id ${productId}`
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al obtener la imagen'
    });
  }
}

export const postProductImage = async( req: Request , res: Response ) => {

  const { body } = req;
  try {
    const productImage = await ProductImage.create({
      data: {
        productId: body.productId,
        filePath: body.filePath,
      },
    });
    res.json(productImage)
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al registrar la imagen'
    });
  }
}

export const putProductImage = async (req: Request,res: Response) =>{

  const { id } = req.params;
  const { body } = req;
  try {
    const productImage = await ProductImage.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!productImage) {
      return res.status(404).json({
        msg: `No existe imagen con el id ${id}`
      });
    }

    const updatedProductImage = await ProductImage.update({
      where: {
        id: parseInt(id),
      },
      data: body,
    });
    res.json(updatedProductImage);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al actualizar la imagen'
    });
  }
}

export const deleteProductImage =  async(req: Request,res: Response) =>{
  const { id } = req.params;
  try {
    const productImage = await ProductImage.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!productImage) {
      return res.status(404).json({
        msg: `No existe imagen con el id ${id}`
      });
    }
    await ProductImage.update({
      where: {
        id: parseInt(id),
      },
      data: {
        deletedAt: new Date(),
      },
    });
    res.json(productImage);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al desactivar la imagen'
    });
  }
}

const storage = multer.diskStorage({
  destination: 'uploads',

  filename: (
      req: Request, 
      file: any, 
      callback: filenamecallback
  ): void => {
    callback(null, `FunOfHeuristic_${file.name}`)
  }
})

const upload = multer({ storage: storage })

export const uploadProductImages = async( req: Request , res: Response ) => {
  try {
    console.log('45')
    upload.array('files[]'), (req:Request, res:Response, next:NextFunction) => {

        res.send({sttus:  'ok'});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al cargar las imagenes'
    });
  }
}

