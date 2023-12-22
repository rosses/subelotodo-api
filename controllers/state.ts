import { Request, Response } from "express";
import State from "../models/state";


export const getStates = async(req: Request,res: Response) =>{
  const states = await State.findMany({
    include: {
      cities:true,
      products:true,
    },
  });
  res.json(states);
}  

export const getState = async(req: Request,res: Response) =>{

  const { id } = req.params;
  try {
    const state = await State.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        cities:true,
        products:true,
      },
    });
    if (state) {
      res.json(state);
    } else {
      res.status(404).json({
        msg: `No existe Región con el id ${id}`
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al obtener la región'
    });
  }
}

export const postState = async( req: Request , res: Response ) => {

  const { body } = req;
  try {
    const state = await State.create({
      data: {
        name: body.name,
      },
    });
    res.json(state)
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al registrar la región'
    },
    );
  }
}

export const putState = async (req: Request,res: Response) =>{

  const { id } = req.params;
  const { body } = req;
  try {
    const state = await State.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!state) {
      return res.status(404).json({
        msg: `No existe región con el id ${id}`
      });
    }

    const updatedState = await State.update({
      where: {
        id: parseInt(id),
      },
      data: body,
    });
    res.json(updatedState);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al actualizar la región'
    });
  }
}

export const deleteState =  async(req: Request,res: Response) =>{

  const { id } = req.params;
  try {
    const state = await State.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!state) {
      return res.status(404).json({
        msg: `No existe región con el id ${id}`
      });
    }
    await State.update({
      where: {
        id: parseInt(id),
      },
      data: {
        deletedAt: new Date(),
      },
    });
    res.json(state);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al desactivar la región'
    });
  }
}



