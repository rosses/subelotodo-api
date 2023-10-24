import UserType from "../models/userType";
import { Request, Response } from "express";

export const getUserTypes = async(req: Request,res: Response) =>{
    const userTypes = await UserType.findMany();
    res.json(userTypes);
}  

export const getUserType = async(req: Request,res: Response) =>{

const { id } = req.params;
try {
    const userType = await UserType.findUnique({
    where: {
        id: parseInt(id),
    },
    });
    if (userType) {
    res.json(userType);
    } else {
    res.status(404).json({
        msg: `No existe tipo de usuario con el id ${id}`
    });
    }
} catch (error) {
    console.error(error);
    res.status(500).json({
    msg: 'Error al obtener el tipo de usuario'
    });
}
}

export const postUserType = async( req: Request , res: Response ) => {

const { body } = req;
try {
    const userType = await UserType.create({
    data: {
        name: body.name,
    },
    });
    res.json(userType)
} catch (error) {
    console.error(error);
    res.status(500).json({
    msg: 'Error al registrar el tipo de usuario'
    },
    );
}
}

export const putUserType = async (req: Request,res: Response) =>{

const { id } = req.params;
const { body } = req;
try {
    const userType = await UserType.findUnique({
    where: {
        id: parseInt(id),
    },
    });
    if (!userType) {
    return res.status(404).json({
        msg: `No existe tipo de usuario con el id ${id}`
    });
    }

    const updatedUserType = await UserType.update({
    where: {
        id: parseInt(id),
    },
    data: body,
    });
    res.json(updatedUserType);
} catch (error) {
    console.error(error);
    res.status(500).json({
    msg: 'Error al actualizar el tipo de usuario'
    });
}
}

export const deleteUserType =  async(req: Request,res: Response) =>{

const { id } = req.params;
try {
    const userType = await UserType.findUnique({
    where: {
        id: parseInt(id),
    },
    });
    if (!userType) {
    return res.status(404).json({
        msg: `No existe tipo de usuario con el id ${id}`
    });
    }
    await UserType.update({
    where: {
        id: parseInt(id),
    },
    data: {
        deletedAt: new Date(),
    },
    });
    res.json(userType);
} catch (error) {
    console.error(error);
    res.status(500).json({
    msg: 'Error al desactivar el tipo de usuario'
    });
}
}
  
  
  
  