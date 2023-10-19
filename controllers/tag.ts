import { Request, Response } from "express";
import Tag from "../models/tag";


export const getTags = async(req: Request,res: Response) =>{
  const tags = await Tag.findMany();
  res.json(tags);
}  

export const getTag = async(req: Request,res: Response) =>{

  const { id } = req.params;
  try {
    const tag = await Tag.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (tag) {
      res.json(tag);
    } else {
      res.status(404).json({
        msg: `No existe etiqueta con el id ${id}`
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al obtener la etiqueta'
    });
  }
}

export const postTag = async( req: Request , res: Response ) => {

  const { body } = req;
  try {
    const tag = await Tag.create({
      data: {
        name: body.name,
      },
    });
    res.json(tag)
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al registrar la etiqueta'
    },
    );
  }
}

export const putTag = async (req: Request,res: Response) =>{

  const { id } = req.params;
  const { body } = req;
  try {
    const tag = await Tag.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!tag) {
      return res.status(404).json({
        msg: `No existe etiqueta con el id ${id}`
      });
    }

    const updatedTag = await Tag.update({
      where: {
        id: parseInt(id),
      },
      data: body,
    });
    res.json(updatedTag);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al actualizar la etiqueta'
    });
  }
}

export const deleteTag =  async(req: Request,res: Response) =>{

  const { id } = req.params;
  try {
    const tag = await Tag.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!tag) {
      return res.status(404).json({
        msg: `No existe etiqueta con el id ${id}`
      });
    }
    await Tag.update({
      where: {
        id: parseInt(id),
      },
      data: {
        deletedAt: new Date(),
      },
    });
    res.json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al desactivar la etiqueta'
    });
  }
}



