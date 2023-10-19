import { Request, Response } from "express";
import User from "../models/user";
import bcryptjs  from 'bcryptjs';
import { now } from "sequelize/types/utils";


export const getUsers = async(req: Request,res: Response) =>{

    const users = await User.findMany();
    res.json(users);
}

export const getUser = async(req: Request,res: Response) =>{

  const { id } = req.params;
  try {
    const user = await User.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({
        msg: `No existe el usuario con el id ${id}`
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al obtener el eeerrusuario'
    });
  }
}

export const getUserByEmail = async( req: Request, res: Response) => {
  const { email } = req.body;
    try {
      const user = await User.findUnique({
        where: {
          email: (email),
        },
      });
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({
          msg: `No existe el usuario con el correo ${email}`
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: 'Error al obtener el usuarissssso'
      });
    }
}

export const postUser = async( req: Request , res: Response ) => {

    const { body } = req;
  try {

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    body.password = bcryptjs.hashSync( body.password, salt );

    const user = await User.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password,
        address: body.address,
        stateId: body.state,
        cityId: body.city,
        type: body.type,
        phone: body.phone,
        birthday: body.birthday,
        createdAt: body.createdAt,
      },
    });
    res.json(user)
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al crear el usuario'
    });
  }

}

export const putUser = async (req: Request,res: Response) =>{

    const { id } = req.params;
    const { body } = req;
    try {
      const user = await User.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      if (!user) {
        return res.status(404).json({
          msg: `No existe un usuario con el id ${id}`
        });
      }

      // Encriptar la contraseña
      const salt = bcryptjs.genSaltSync();
      body.password = bcryptjs.hashSync( body.password, salt );

      const updatedUser = await User.update({
        where: {
          id: parseInt(id),
        },
        data: body,
      });
      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: 'Error al actualizar el usuario'
      });
    }
}

export const deleteUser =  async(req: Request,res: Response) =>{

    const { id } = req.params;
  try {
    const user = await User.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!user) {
      return res.status(404).json({
        msg: `No existe un usuario con el id ${id}`
      });
    }
    await User.update({
      where: {
        id: parseInt(id),
      },
      data: {
        deletedAt: new Date(),
      },
    },);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al desactivar el usuario'
    },);
  }
}