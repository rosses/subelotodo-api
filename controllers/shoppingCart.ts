import { Request, Response } from "express";
import ShoppingCart from "../models/shoppingCart";
import { Environment, IntegrationApiKeys, IntegrationCommerceCodes, Options } from "transbank-sdk";
const WebpayPlus = require("transbank-sdk").WebpayPlus;
const TransaccionCompleta = require('transbank-sdk').TransaccionCompleta; // CommonJS


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
            },
        },
        }
        );
        if (shoppingCart) {
        res.json(shoppingCart);
        } else {
        res.status(404).json({
            msg: `No existen items con el id ${userId}`
        }
        );
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
        }
        );
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

export const createWebpay = async(req: Request, res: Response) =>{
    const { id, amount, url } = req.body;
    
    let sessionId = "S-" + Math.floor(Math.random() * 10000) + 1;
  
    try {
      const createResponse = await (new WebpayPlus.Transaction()).create((id).toString(), sessionId, amount, url);
      let token = createResponse.token;
      let tbkToken=createResponse.TBK_TOKEN;
      let orden=createResponse.TBK_ORDEN_COMPRA;
      let sesionId=createResponse.TBK_ID_SESION;
      let return_url = createResponse.url;
      let data = { token, return_url,tbkToken,orden,sesionId };
      res.json(data);
    } catch(error) {
      console.error(error);
      res.status(500).json({
        msg: 'Error al crear la transaccion'
      });
    }
  }

  export const stateWebpay = async(req: Request, res: Response) =>{
    const { token } = req.params;

    try {
        const tx = new WebpayPlus.Transaction(new Options(IntegrationCommerceCodes.WEBPAY_PLUS, IntegrationApiKeys.WEBPAY, Environment.Integration));
        const response = await tx.commit(token);
        res.json(response);
        console.log(response);
    } catch (error) {
        console.log(error)
    } // Para depuración
};