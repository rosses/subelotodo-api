import { Request, Response } from "express";
import Product from "../models/product";


export const getProducts = async(req: Request,res: Response) =>{
    const products = await Product.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        category:true,
        subcategory:true,
        state:true,
        city:true,
        //dimensions:true,
        productTags:true,
        ProductImages:true,
      },
    });
    res.json(products);
}

export const getProduct = async(req: Request,res: Response) =>{
  const { id } = req.params;
  try {
    const product = await Product.findUnique({
      where: {
        id: parseInt(id),
        deletedAt: null,
      },
      include: {
        category:true,
        subcategory:true,
        state:true,
        city:true,
        //dimensions:true,
        productTags:true,
        ProductImages:true,
      },
    });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({
        msg: `No existe producto con el id ${id}`
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al obtener el producto'
    });
  }
}

export const getProductsByUser = async( req: Request, res: Response) => {
  const { userId } = req.params;
    try {
      const product = await Product.findMany({
        where: {
          userId: (parseInt(userId)),
          deletedAt: null,
        },
        include: {
          category:true,
          subcategory:true,
          state:true,
          city:true,
          //dimensions:true,
          productTags:true,
          ProductImages:true,
        },
      });
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({
          msg: `No existen productos para el usuario ${userId}`
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: 'Error al obtener los productos'
      });
    }
}

export const getProductsBySubcategory = async( req: Request, res: Response) => {
  const { subcategoryId } = req.params;
    try {
      const product = await Product.findMany({
        where: {
          subcategoryId: (parseInt(subcategoryId)),
          deletedAt: null,
        },
        include: {
          category:true,
          subcategory:true,
          state:true,
          city:true,
          //dimensions:true,
          productTags:true,
          ProductImages:true,
        },
      });
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({
          msg: `No existen productos en la subcategoría ${subcategoryId}`
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: 'Error al obtener los productos'
      });
    }
}

export const getProductsByCategory = async( req: Request, res: Response) => {
  const { categoryId } = req.params;
    try {
      const product = await Product.findMany({
        where: {
          categoryId: (parseInt(categoryId)),
          deletedAt: null,
        },
        include: {
          category:true,
          subcategory:true,
          state:true,
          city:true,
          //dimensions:true,
          productTags:true,
          ProductImages:true,
        },
      });
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({
          msg: `No existen productos en la comuna ${categoryId}`
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: 'Error al obtener los productos'
      });
    }
}

export const getProductsByCity = async( req: Request, res: Response) => {
  const { cityId } = req.params;
    try {
      const product = await Product.findMany({
        where: {
          cityId: (parseInt(cityId)),
          deletedAt: null,
        },
        include: {
          category:true,
          subcategory:true,
          state:true,
          city:true,
          //dimensions:true,
          productTags:true,
          ProductImages:true,
        },
      });
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({
          msg: `No existen productos en la comuna ${cityId}`
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: 'Error al obtener los productos'
      });
    }
}
export const getProductsByState = async( req: Request, res: Response) => {
  const { stateId } = req.params;
    try {
      const product = await Product.findMany({
        where: {
          cityId: (parseInt(stateId)),
          deletedAt: null,
        },
        include: {
          category:true,
          subcategory:true,
          state:true,
          city:true,
          //dimensions:true,
          productTags:true,
          ProductImages:true,
        },
      });
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({
          msg: `No existen productos en la comuna ${stateId}`
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: 'Error al obtener los productos'
      });
    }
}

export const postProduct = async( req: Request , res: Response ) => {

  const { body } = req;
  try {
    const product = await Product.create({
      data: {
        title: body.title,
        categoryId: body.categoryId,
        subcategoryId: body.subcategoryId,
        userId: body.userId,
        stateId:body.stateId,
        cityId: body.cityId,
        description: body.description,
        condition: body.condition,
        price: body.price,
        referencialPrice: body.referencialPrice,
        saleState: body.saleState,
        width:body.width,
        weight:body.weight,
        length:body.length,
        height:body.height,
      },
    });
    res.json(product)
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al registrar el producto'
    });
  }
}

export const putProduct = async (req: Request,res: Response) =>{

  const { id } = req.params;
  const { body } = req;
  try {
    const product = await Product.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!product) {
      return res.status(404).json({
        msg: `No existe producto con el id ${id}`
      });
    }

    const updatedProduct = await Product.update({
      where: {
        id: parseInt(id),
      },
      data: body,
    });
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al actualizar el producto'
    });
  }
}

export const deleteProduct =  async(req: Request,res: Response) =>{
  const { id } = req.params;
  try {
    const product = await Product.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!product) {
      return res.status(404).json({
        msg: `No existe producto con el id ${id}`
      });
    }
    await Product.update({
      where: {
        id: parseInt(id),
      },
      data: {
        deletedAt: new Date(),
      },
    });
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al desactivar el producto'
    });
  }
}