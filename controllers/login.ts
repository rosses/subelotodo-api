import { Request, Response } from "express";
import User from "../models/user";
import bcryptjs  from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const loginUser = async (req: Request, res: Response) => {
    
    const {email,password} =req.body;

    const existeEmail = await User.findUnique({
        where: {
            email: (email),
        },
    });

    if (existeEmail) {
        if(bcryptjs.compareSync(password, existeEmail.password)){
            const id =existeEmail.id
            const type=existeEmail.type
            const token = jwt.sign({email:email},process.env.SECRET_KEY!)
            res.json({id,type,token,status:'ok'})
        }
        else{
            res.json({msg:'Contraseña incorrecta',status:'error'})
            
        }
    } else {
        res.json({msg:'No esiste el usuario',status:'error'});
    }

}