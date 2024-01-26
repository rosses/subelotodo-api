import { Request, Response } from "express";
import Shipment from "../models/shipment";

export const checkToken = async (req: Request, res: Response) => {

  const { token } = req.params;
  try {
    const shipment = await Shipment.findFirst({
      where: {
        token: (token),
      },
    });
    if (shipment) {
      res.json(true);
    } else {
      res.json(false)
    }
  } catch (error) {

  }
}

export const getShipments = async (req: Request, res: Response) => {
  const shipments = await Shipment.findMany({
    include: {
      orders: true,
    },
  });
  res.json(shipments);
}

export const getShipment = async (req: Request, res: Response) => {

  const { id } = req.params;
  try {
    const shipment = await Shipment.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        orders: true,
      },
    });
    if (shipment) {
      res.json(shipment);
    } else {
      res.status(404).json({
        msg: `No existe pago con el id ${id}`
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al obtener el pago'
    });
  }
}

export const getShipmentByUser = async (req: Request, res: Response) => {

  const { userId } = req.params;
  try {
    const shipment = await Shipment.findMany({
      where: {
        userId: parseInt(userId),
      },
      include: {
        orders: true,
      },
    });
    if (shipment) {
      res.json(shipment);
    } else {
      res.status(404).json({
        msg: `No existe pago con el id ${userId}`
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al obtener el pago'
    });
  }
}

export const postShipment = async (req: Request, res: Response) => {

  const { body } = req;
  try {
    const shipment = await Shipment.create({
      data: body
    });
    res.json(shipment)
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al registrar el pago'
    },
    );
  }
}

export const putShipment = async (req: Request, res: Response) => {

  const { id } = req.params;
  const { body } = req;
  try {
    const shipment = await Shipment.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!shipment) {
      return res.status(404).json({
        msg: `No existe pago con el id ${id}`
      });
    }

    const updatedShipment = await Shipment.update({
      where: {
        id: parseInt(id),
      },
      data: body,
    });
    res.json(updatedShipment);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al actualizar el pago'
    });
  }
}

export const deleteShipment = async (req: Request, res: Response) => {

  const { id } = req.params;
  try {
    const shipment = await Shipment.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!shipment) {
      return res.status(404).json({
        msg: `No existe pago con el id ${id}`
      });
    }
    await Shipment.update({
      where: {
        id: parseInt(id),
      },
      data: {
        deletedAt: new Date(),
      },
    });
    res.json(shipment);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al desactivar el pago'
    });
  }
}



