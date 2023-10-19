import { Request, Response } from "express";
import Subcategory from "../models/subcategory";


export const getSubCategories = async(req: Request,res: Response) =>{

    const subcategories = await Subcategory.findMany({
      include: {
      category:true,
    },});
    res.json(subcategories);
}

export const getSubCategory = async(req: Request,res: Response) =>{

  const { id } = req.params;
  try {
    const subcategory = await Subcategory.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        category:true,
      },
    });
    if (subcategory) {
      res.json(subcategory);
    } else {
      res.status(404).json({
        msg: `No existe subcategoría con el id ${id}`
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al obtener la subcategoría'
    });
  }
}

export const getSubCategoryByCategory = async(req: Request,res: Response) =>{

  const { id } = req.params;
  try {
    const subcategories = await Subcategory.findMany({
      where: {
        categoryId: parseInt(id),
      },
      include: {
        category:true,
      },
    });
    if (subcategories) {
      res.json(subcategories);
    } else {
      res.status(404).json({
        msg: `No existe subcategoría con el id ${id}`
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al obtener la subcategoría'
    });
  }
}

export const postSubCategory = async( req: Request , res: Response ) => {

  const { body } = req;
  try {
    const subcategory = await Subcategory.create({
      data: {
        name: body.name,
        categoryId: body.categoryId,
      },
    });
    res.json(subcategory)
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al registrar la subcategoría'
    });
  }
}

export const putSubCategory = async (req: Request,res: Response) =>{

  const { id } = req.params;
  const { body } = req;
  try {
    const subcategory = await Subcategory.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!subcategory) {
      return res.status(404).json({
        msg: `No existe subcategoría con el id ${id}`
      });
    }

    const updatedSubCategory = await Subcategory.update({
      where: {
        id: parseInt(id),
      },
      data: body,
      
    });
    res.json(updatedSubCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al actualizar la subcategoría'
    });
  }
}

export const deleteSubCategory =  async(req: Request,res: Response) =>{
  const { id } = req.params;
  try {
    const subcategory = await Subcategory.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!subcategory) {
      return res.status(404).json({
        msg: `No existe subcategoría con el id ${id}`
      });
    }
    await Subcategory.update({
      where: {
        id: parseInt(id),
      },
      data: {
        deletedAt: new Date(),
      },
    });
    res.json(subcategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al desactivar la subcategoría'
    });
  }
}