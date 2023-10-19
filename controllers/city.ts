import { Request, Response } from "express";
import City from "../models/city";
import { parse } from "path";
import { stat } from "fs/promises";


export const getCities = async(req: Request,res: Response) =>{

    const cities = await City.findMany(
      {include: {
        state: true,
      },});
    res.json(cities);
}

export const getCity = async(req: Request,res: Response) =>{

  const { id } = req.params;
  try {
    const city = await City.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        state: true,
      },
    });
    if (city) {
      res.json(city);
    } else {
      res.status(404).json({
        msg: `No existe comuna con el id ${id}`
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al obtener la comuna'
    });
  }
}

export const getCitiesByState = async(req: Request,res: Response) =>{

  const { stateId } = req.params;
  try {
    const cities = await City.findMany({
      where: {
        stateId: parseInt(stateId),
      },
      include: {
        state: true,
      },
    });
    if (cities) {
      res.json(cities);
    } else {
      res.status(404).json({
        msg: `No existe comuna con la region id ${stateId}`
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al obtener la comuna'
    });
  }
}

export const postCity = async( req: Request , res: Response ) => {

  const { body } = req;
  try {
    const city = await City.create({
      data: {
        name: body.name,
        stateId: body.stateId,
      },
    });
    res.json(city)
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al registrar la comuna'
    });
  }
}

export const putCity = async (req: Request,res: Response) =>{

  const { id } = req.params;
  const { body } = req;
  try {
    const city = await City.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!city) {
      return res.status(404).json({
        msg: `No existe comuna con el id ${id}`
      });
    }

    const updatedCity = await City.update({
      where: {
        id: parseInt(id),
      },
      data: body,
      
    });
    res.json(updatedCity);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al actualizar la comuna'
    });
  }
}

export const deleteCity =  async(req: Request,res: Response) =>{
  const { id } = req.params;
  try {
    const city = await City.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!city) {
      return res.status(404).json({
        msg: `No existe comuna con el id ${id}`
      });
    }
    await City.update({
      where: {
        id: parseInt(id),
      },
      data: {
        deletedAt: new Date(),
      },
    });
    res.json(city);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al desactivar la comuna'
    });
  }
}