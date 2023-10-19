import { Request, Response } from "express";
import ProductTag from "../models/productTag";


export const getProductTags = async(req: Request,res: Response) =>{

    const productTags = await ProductTag.findMany();
    res.json(productTags);
}

export const getProductTag = async(req: Request,res: Response) =>{
  const { id } = req.params;
  try {
    const productTag = await ProductTag.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (productTag) {
      res.json(productTag);
    } else {
      res.status(404).json({
        msg: `No existe etiqueta de producto con el id ${id}`
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al obtener la etiqueta de producto'
    });
  }
}

export const postProductTag = async( req: Request , res: Response ) => {

  const { body } = req;
  try {
    const productTag = await ProductTag.create({
      data: {
        productId: body.productId,
        tagId: body.tagId,
      },
    });
    res.json(productTag)
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al registrar la etiqueta de producto'
    });
  }
}

export const putProductTag = async (req: Request,res: Response) =>{

  const { id } = req.params;
  const { body } = req;
  try {
    const productTag = await ProductTag.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!productTag) {
      return res.status(404).json({
        msg: `No existe etiqueta de producto con el id ${id}`
      });
    }

    const updatedProductTag = await ProductTag.update({
      where: {
        id: parseInt(id),
      },
      data: body,
      
    });
    res.json(updatedProductTag);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al actualizar la etiqueta de producto'
    });
  }
}

export const deleteProductTag =  async(req: Request,res: Response) =>{
  const { id } = req.params;
  try {
    const productTag = await ProductTag.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!productTag) {
      return res.status(404).json({
        msg: `No existe etiqueta de producto con el id ${id}`
      });
    }
    await ProductTag.update({
      where: {
        id: parseInt(id),
      },
      data: {
        deletedAt: new Date(),
      },
    });
    res.json(productTag);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al desactivar la etiqueta de producto'
    });
  }
}