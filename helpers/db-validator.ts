import User from "../models/user";

export const emailExists = async ( email = '' ) =>{
    const existeEmail = await User.findFirst({
        where: {
            email: (email),
        },
    });
    if ( existeEmail ) {
        throw new Error(`El correo: ${ email }, ya está registrado`);
    }
}
