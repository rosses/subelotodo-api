import { Request, Response } from "express";
import User from "../models/user";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { emailExists } from "../helpers/db-validator";
import { env } from "process";
import { OAuth2Client } from "google-auth-library/build/src/auth/oauth2client";

export const loginUser = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    const existeEmail = await User.findUnique({
        where: {
            email: (email),
        },
    });

    if (existeEmail) {
        if (bcryptjs.compareSync(password, existeEmail.password)) {
            if (existeEmail.type !== 3) {
                const id = existeEmail.id
                const type = existeEmail.type
                const name = existeEmail.firstName
                const lastName = existeEmail.lastName
                const token = jwt.sign({ email: email }, process.env.SECRET_KEY!)
                res.json({ id, type, token, status: 'ok', name, lastName, email })
            }
            else {
                res.json({ msg: 'Cuenta pendiente de validación', status: 'error' })
            }

        }
        else {
            res.json({ msg: 'Contraseña incorrecta', status: 'error' })

        }
    } else {
        res.json({ msg: 'No exsiste el usuario', status: 'error' });
    }

}

export const loginUserGoogle = async (req: Request, res: Response) => {

    const { googletoken } = req.body;


    const clientId = env.GOOGLE_CLIENT_ID;
    const client = new OAuth2Client(clientId);
    try {
        const verify = await client.verifyIdToken({
            idToken: googletoken,
            audience: clientId
        });
        const usuario = verify.getPayload();

        const existeEmail = await User.findUnique({
            where: {
                email: (usuario?.email),
            },
        });

        if (verify) {
            if (existeEmail) {
                const id = existeEmail.id
                const type = existeEmail.type
                const name = existeEmail.firstName
                const lastName = existeEmail.lastName
                const email = existeEmail.email
                const token = jwt.sign({ email: existeEmail.email }, process.env.SECRET_KEY!)
                res.json({ id, type, token, status: 'ok', name, lastName, email })


            } else {
                try {
                    const newUser = await User.create({
                        data: {
                            type: 2,
                            firstName: usuario!.name!,
                            lastName: usuario!.family_name!,
                            email: usuario!.email!,
                            password: '',
                            address: '',
                            stateId: 1,
                            cityId: 1,
                            phone: 100000001,
                            birthday: new Date(),
                        },
                    });
                    const id = newUser.id
                    const type = newUser.type
                    const name = newUser.firstName
                    const lastName = newUser.lastName
                    const token = jwt.sign({ email: newUser.email }, process.env.SECRET_KEY!)
                    res.json({ id, type, token, status: 'ok', name, lastName })
                } catch (error) {
                    console.error(error);
                    res.status(500).json({
                        msg: 'Error al crear el usuario'
                    });
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
}