import { Request, Response } from "express";
import Banners from "../models/banners";

export const getBanners = async(req: Request,res: Response) =>{
  const banners = await Banners.findMany({});
  res.json(banners);
}  

export const getBanner = async(req: Request,res: Response) =>{

  const { id } = req.params;
  try {
    const banner = await Banners.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (banner) {
      res.json(banner);
    } else {
      res.status(404).json({
        msg: `No existe banner con el id ${id}`
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al obtener el banner'
    });
  }
}

export const postBanner = async( req: Request , res: Response ) => {

  const { body } = req;
  try {
    const banner = await Banners.create({
      data: body
    });
    res.json(banner)
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al registrar el banner'
    },
    );
  }
}

export const putBanner = async (req: Request,res: Response) =>{

  const { id } = req.params;
  const { body } = req;
  try {
    const banner = await Banners.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!banner) {
      return res.status(404).json({
        msg: `No existe banner con el id ${id}`
      });
    }

    const updateBanner = await Banners.update({
      where: {
        id: parseInt(id),
      },
      data: body,
    });
    res.json(updateBanner);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al actualizar el banner'
    });
  }
}

export const deleteBanner =  async(req: Request,res: Response) =>{

  const { id } = req.params;
  try {
    const banner = await Banners.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!banner) {
      return res.status(404).json({
        msg: `No existe banner con el id ${id}`
      });
    }
    await Banners.update({
      where: {
        id: parseInt(id),
      },
      data: {
        deletedAt: new Date(),
      },
    });
    res.json(banner);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al desactivar el banner'
    });
  }
}



