import { Request, Response } from "express";
import Orders from "../models/order";
import { NOT } from "sequelize/types/deferrable";
import { notEqual } from "assert";


export const getOrders = async(req: Request,res: Response) =>{
    const products = await Orders.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        product:{include:{ProductImages:true,category:true,subcategory:true,user:true,state:true,city:true}},
        shipment:true,
        orderState:true,
        user:true,
      },
    });
    res.json(products);
}

export const getOrdersThisYear = async(req: Request,res: Response) =>{
  let date: Date = new Date();
  const products = await Orders.findMany({
    where: {
      deletedAt: null,
      createdAt: {
        gte: new Date((date.getFullYear())+'-01-01'),
      },
      orderStateId: {not:3},
    },
    include: {
      product:{include:{ProductImages:true,category:true,subcategory:true,user:true,state:true,city:true}},
      shipment:true,
      orderState:true,
      user:true,
    },
    orderBy: {createdAt: 'asc'},
  });
  res.json(products);
}

export const getOrdersByDay = async(req: Request,res: Response) =>{
  let date: Date = new Date();
  const products = await Orders.findMany({
    where: {
      deletedAt: null,
      createdAt: {
        gte: new Date(date.setDate(date.getDay()-11)),
      },
      orderStateId: {not:3},
    },
    include: {
      product:{include:{ProductImages:true,category:true,subcategory:true,user:true,state:true,city:true}},
      shipment:true,
      orderState:true,
      user:true,
    },
    orderBy: {createdAt: 'asc'},
  });
  res.json(products);
}

export const getOrdersByYear = async(req: Request,res: Response) =>{
  let date: Date = new Date();
  const products = await Orders.findMany({
    where: {
      deletedAt: null,
      createdAt: {
        gte: new Date(date.setFullYear(date.getFullYear()-11)),
      },
      orderStateId: {not:3},
    },
    include: {
      product:{include:{ProductImages:true,category:true,subcategory:true,user:true,state:true,city:true}},
      shipment:true,
      orderState:true,
      user:true,
    },
    orderBy: {createdAt: 'asc'},
  }); 
  res.json(products);
}

export const getOrder = async(req: Request,res: Response) =>{
  const { id } = req.params;
  try {
    const order = await Orders.findUnique({
      where: {
        id: parseInt(id),
        deletedAt: null,
      },
      include: {
        product:true,
        shipment:true,
        orderState:true,
        user:true,
      },
    });
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({
        msg: `No existe orden con el id ${id}`
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al obtener la orden'
    });
  }
}

export const getOrdersByUser = async( req: Request, res: Response) => {
  const { userId } = req.params;
    try {
      const order = await Orders.findMany({
        where: {
          userId: (parseInt(userId)),
          deletedAt: null,
        },
        include: {
          product:{include:{ProductImages:true,category:true,subcategory:true,user:true}},
            shipment:true,
            orderState:true,
            user:true,
        },
      });
      if (order) {
        res.json(order);
      } else {
        res.status(404).json({
          msg: `No existen ordenes para el usuario ${userId}`
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: 'Error al obtener las ordenes'
      });
    }
}

export const getOrdersBySeller = async( req: Request, res: Response) => {
  const { sellerId } = req.params;
    try {
      const order = await Orders.findMany({
        where: {
          product: {
            userId: (parseInt(sellerId))
          },
          deletedAt: null,
          orderStateId:{not:3},
        },
        include: {
            product:{include:{ProductImages:true,category:true,subcategory:true,}},
            shipment:true,
            orderState:true,
            user:true,
        },
      });
      console.log(order);
      if (order) {
        res.json(order);
      } else {
        res.status(404).json({
          msg: `No existen ordenes para el vendedor ${sellerId}`
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: 'Error al obtener las ordenes'
      });
    }
}

export const getOrdersRejectedBySeller = async( req: Request, res: Response) => {
  const { sellerId } = req.params;
    try {
      const order = await Orders.findMany({
        where: {
          product: {
            userId: (parseInt(sellerId))
          },
          deletedAt: null,
          orderStateId: 3,
        },
        include: {
            product:{include:{ProductImages:true,category:true,subcategory:true,}},
            shipment:true,
            orderState:true,
            user:true,
        },
      });
      console.log(order);
      if (order) {
        res.json(order);
      } else {
        res.status(404).json({
          msg: `No existen ordenes para el vendedor ${sellerId}`
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: 'Error al obtener las ordenes'
      });
    }
}

export const postOrder = async( req: Request , res: Response ) => {

  const { body } = req;
  try {
    const orden = await Orders.create({
      data: body,
    });
    res.json(orden)
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al registrar la orden'
    });
  }
}

export const putOrder = async (req: Request,res: Response) =>{

  const { id } = req.params;
  const { body } = req;
  try {
    const order = await Orders.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!order) {
      return res.status(404).json({
        msg: `No existe orden con el id ${id}`
      });
    }

    const updatedOrder = await Orders.update({
      where: {
        id: parseInt(id),
      },
      data: body,
    });
    res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al actualizar la orden'
    });
  }
}

export const deleteOrder =  async(req: Request,res: Response) =>{
  const { id } = req.params;
  try {
    const order = await Orders.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!order) {
      return res.status(404).json({
        msg: `No existe orden con el id ${id}`
      });
    }
    await Orders.update({
      where: {
        id: parseInt(id),
      },
      data: {
        deletedAt: new Date(),
      },
    });
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al desactivar la orden'
    });
  }
}