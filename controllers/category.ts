import { Request, Response } from "express";
import Category from "../models/category";


export const getCategories = async(req: Request,res: Response) =>{
  const categories = await Category.findMany({
    include: {
      subcategories:true,
    },
  });
  res.json(categories);
}  

export const getCategoriesOffers = async(req: Request,res: Response) =>{
  const categories = await Category.findMany({
    include: {
      products:{take: 5,where:{approved:true,deletedAt:null,stock:{not:0}},include:{ProductImages:true}},
      subcategories:true,
    },
  });
  res.json(categories);
}  

export const getCategory = async(req: Request,res: Response) =>{

  const { id } = req.params;
  try {
    const category = await Category.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        products:{where:{approved:true,deletedAt:null,stock:{not:0}},include:{ProductImages:true,subcategory:true,state:true,city:true,user:true}},
        subcategories:true,
      },
    });
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({
        msg: `No existe categoría con el id ${id}`
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al obtener la categoría'
    });
  }
}

export const postCategory = async( req: Request , res: Response ) => {

  const { body } = req;
  try {
    const category = await Category.create({
      data: {
        name: body.name,
      },
    });
    res.json(category)
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al registrar la categoría'
    },
    );
  }
}

export const putCategory = async (req: Request,res: Response) =>{

  const { id } = req.params;
  const { body } = req;
  try {
    const category = await Category.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!category) {
      return res.status(404).json({
        msg: `No existe categoría con el id ${id}`
      });
    }

    const updatedCategory = await Category.update({
      where: {
        id: parseInt(id),
      },
      data: body,
    });
    res.json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al actualizar la categoría'
    });
  }
}

export const deleteCategory =  async(req: Request,res: Response) =>{

  const { id } = req.params;
  try {
    const category = await Category.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!category) {
      return res.status(404).json({
        msg: `No existe categoría con el id ${id}`
      });
    }
    await Category.update({
      where: {
        id: parseInt(id),
      },
      data: {
        deletedAt: new Date(),
      },
    });
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al desactivar la categoría'
    });
  }
}



