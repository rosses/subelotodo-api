import { Request, Response } from "express";
import ShoppingCart from "../models/shoppingCart";


export const getShoppingCartItems = async(req: Request,res: Response) =>{

const shoppingCartItems = await ShoppingCart.findMany({
    where:{
        deletedAt:null
    },
    include: {
    product:true,
    },
    });
    res.json(shoppingCartItems);
}  

export const getShoppingCartByUser = async(req: Request,res: Response) =>{

    const { userId } = req.params;
    try {
        const shoppingCart = await ShoppingCart.findMany({
        where: {
            userId: (parseInt(userId)),
            deletedAt:null
        },
        include: {
            product:{
                include:{
                    ProductImages:true,
                    city:true,
                },
            }
        },
        });
        if (shoppingCart) {
        res.json(shoppingCart);
        } else {
        res.status(404).json({
            msg: `No existen items con el id ${userId}`
        });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
        msg: 'Error al obtener items'
        });
    }
}

export const getShoppingCartItem = async(req: Request,res: Response) =>{

    const { id } = req.params;
    try {
        const shoppingCart = await ShoppingCart.findUnique({
        where: {
            id: parseInt(id),
            deletedAt:null
        },
        include: {
            product:true,
        },
        });
        if (shoppingCart) {
        res.json(shoppingCart);
        } else {
        res.status(404).json({
            msg: `No existe item con el id ${id}`
        });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
        msg: 'Error al obtener item'
        });
    }
}

export const postShoppingCartItem = async( req: Request , res: Response ) => {

    const { body } = req;
    try {
        const shoppingCart = await ShoppingCart.create({
        data: {
            userId: body.userId,
            amount:body.amount,
            productId:body.productId
        },
        });
        res.json(shoppingCart)
    } catch (error) {
        console.error(error);
        res.status(500).json({
        msg: 'Error al registrar el item'
        },
        );
    }
}

export const putShoppingCartItem = async (req: Request,res: Response) =>{

    const { id } = req.params;
    const { body } = req;
    try {
        const shoppingCart = await ShoppingCart.findUnique({
        where: {
            id: parseInt(id),
        },
        });
        if (!shoppingCart) {
        return res.status(404).json({
            msg: `No existe item con el id ${id}`
        });
        }

        const updatedShoppingCart = await ShoppingCart.update({
        where: {
            id: parseInt(id),
        },
        data: body,
        });
        res.json(updatedShoppingCart);
    } catch (error) {
        console.error(error);
        res.status(500).json({
        msg: 'Error al actualizar el item'
        });
    }
}

export const deleteShoppingCartItem =  async(req: Request,res: Response) =>{

    const { id } = req.params;
    try {
        const shoppingCart = await ShoppingCart.findUnique({
        where: {
            id: parseInt(id),
        },
        });
        if (!shoppingCart) {
        return res.status(404).json({
            msg: `No existe item con el id ${id}`
        });
        }
        await ShoppingCart.update({
        where: {
            id: parseInt(id),
        },
        data: {
            deletedAt: new Date(),
        },
        });
        res.json(shoppingCart);
    } catch (error) {
        console.error(error);
        res.status(500).json({
        msg: 'Error al desactivar el item'
        });
    }
}