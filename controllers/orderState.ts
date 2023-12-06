import { Request, Response } from "express";
import OrderState from "../models/orderState";
import { or } from "sequelize";


export const getOrderStates = async(req: Request,res: Response) =>{
  const orderStates = await OrderState.findMany({
    
  });
  res.json(orderStates);
}  

export const getOrderState = async(req: Request,res: Response) =>{

  const { id } = req.params;
  try {
    const orderState = await OrderState.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (orderState) {
      res.json(orderState);
    } else {
      res.status(404).json({
        msg: `No existe estado de orden con el id ${id}`
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al obtener el estado de orden'
    });
  }
}

export const postOrderState = async( req: Request , res: Response ) => {

  const { body } = req;
  try {
    const orderState = await OrderState.create({
      data: {
        stateOrder: body.stateOrder,
      },
    });
    res.json(orderState)
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al registrar estado de orden'
    },
    );
  }
}

export const putOrderState = async (req: Request,res: Response) =>{

  const { id } = req.params;
  const { body } = req;
  try {
    const orderState = await OrderState.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!orderState) {
      return res.status(404).json({
        msg: `No existe estado de orden con el id ${id}`
      });
    }

    const updatedOrderState = await OrderState.update({
      where: {
        id: parseInt(id),
      },
      data: body,
    });
    res.json(updatedOrderState);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al actualizar el estado de orden'
    });
  }
}

export const deleteOrderState =  async(req: Request,res: Response) =>{

  const { id } = req.params;
  try {
    const orderState = await OrderState.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!orderState) {
      return res.status(404).json({
        msg: `No existe estado de orden con el id ${id}`
      });
    }
    await OrderState.update({
      where: {
        id: parseInt(id),
      },
      data: {
        deletedAt: new Date(),
      },
    });
    res.json(orderState);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al desactivar el estado de orden'
    });
  }
}



