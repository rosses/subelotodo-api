/*import { Request, Response } from "express";
import Dimensions from "../models/dimensions";


export const getDimensions = async(req: Request,res: Response) =>{
    const dimensions = await Dimensions.findMany();
    res.json(dimensions);
}

export const getDimension = async(req: Request,res: Response) =>{
  const { id } = req.params;
  try {
    const dimensions = await Dimensions.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (dimensions) {
      res.json(dimensions);
    } else {
      res.status(404).json({
        msg: `No existen dimensiones con el id ${id}`
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al obtener las dimensiones'
    });
  }
}

export const postDimensions = async( req: Request , res: Response ) => {

  const { body } = req;
  try {
    const dimensions = await Dimensions.create({
      data: {
        productId: body.name,
        length:body.lengthb,
        weight:body.weight,
        height:body.height,
        width:body.width,
      },
    });
    res.json(dimensions)
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al registrar las dimensiones'
    });
  }
}

export const putDimensions = async (req: Request,res: Response) =>{

  const { id } = req.params;
  const { body } = req;
  try {
    const productTag = await Dimensions.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!productTag) {
      return res.status(404).json({
        msg: `No existen dimensiones con el id ${id}`
      });
    }

    const updatedDimensions = await Dimensions.update({
      where: {
        id: parseInt(id),
      },
      data: body,
    });
    res.json(updatedDimensions);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al actualizar las dimensiones'
    });
  }
}

export const deleteDimensions =  async(req: Request,res: Response) =>{
  const { id } = req.params;
  try {
    const dimensions = await Dimensions.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!dimensions) {
      return res.status(404).json({
        msg: `No existen dimensiones con el id ${id}`
      });
    }
    await Dimensions.update({
      where: {
        id: parseInt(id),
      },
      data: {
        deletedAt: new Date(),
      },
    });
    res.json(dimensions);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al desactivar las dimensiones'
    });
  }
}*/