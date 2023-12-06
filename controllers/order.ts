import { Request, Response } from "express";
import Orders from "../models/order";
import Order from "../models/order";


export const getOrders = async(req: Request,res: Response) =>{
    const products = await Orders.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        product:true,
        shipment:true,
        orderState:true,
        user:true,
      },
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

export const postOrder = async( req: Request , res: Response ) => {

  const { body } = req;
  try {
    const orden = await Orders.create({
      data: {
        userId: body.userId,
        productId:body.productId,
        shipmentId: body.shipmentId,
        orderStateId: body.orderStateId,
        price: body.price,
        sellerPaid:body.sellerPaid,
      },
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