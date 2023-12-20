import { Request, Response } from "express";
import Notifications from "../models/notifications";


export const getNotifications = async(req: Request,res: Response) =>{
  const { id } = req.params;

    const notifications = await Notifications.findMany({
      where:{
        userId: parseInt(id),
        deletedAt: null,
      },
      include: {
        product:{include:{ProductImages:true}
      }}});
    res.json(notifications);
}

export const getNotification = async(req: Request,res: Response) =>{
  const { id } = req.params;
  try {
    const notification = await Notifications.findUnique({
      where: {
        id: parseInt(id),
        deletedAt: null,
      },
      include: {product:true},
    });
    if (notification) {
      res.json(notification);
    } else {
      res.status(404).json({
        msg: `No existe notificación con el id ${id}`
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al obtener la notificación'
    });
  }
}

export const postNotification = async( req: Request , res: Response ) => {

  const { body } = req;
  try {
    const notification = await Notifications.create({
      data: body,
    });
    res.json(notification)
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al registrar la notificación'
    });
  }
}

export const putNotification = async (req: Request,res: Response) =>{

  const { id } = req.params;
  const { body } = req;
  try {
    const notification = await Notifications.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!notification) {
      return res.status(404).json({
        msg: `No existe notificación con el id ${id}`
      });
    }

    const updatedNotification = await Notifications.update({
      where: {
        id: parseInt(id),
      },
      data: body,
      
    });
    res.json(updatedNotification);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al actualizar la notificación'
    });
  }
}

export const deleteNotification =  async(req: Request,res: Response) =>{
  const { id } = req.params;
  try {
    const notification = await Notifications.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!notification) {
      return res.status(404).json({
        msg: `No existe notificación con el id ${id}`
      });
    }
    await Notifications.update({
      where: {
        id: parseInt(id),
      },
      data: {
        deletedAt: new Date(),
      },
    });
    res.json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al desactivar la notificación'
    });
  }
}