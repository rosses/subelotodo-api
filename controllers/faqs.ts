import { Request, Response } from "express";
import Faqs from "../models/faqs";
  
  export const getFaqs = async(req: Request,res: Response) =>{
    const faqs = await Faqs.findMany({where: {deletedAt: null},
      include: {
        faqCategory:true,
      },
    });
    res.json(faqs);
  }  

  export const getFaq = async(req: Request,res: Response) =>{

    const { id } = req.params;
    try {
      const faq = await Faqs.findUnique({
        where: {
          id: parseInt(id),
          deletedAt: null,
        },
        include: {
          faqCategory: true,
        },
      });
      if (faq) {
        res.json(faq);
      } else {
        res.status(404).json({
          msg: `No existe pregunta con el id ${id}`
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: 'Error al obtener la pregunta'
      });
    }
  }
  
  export const postFaq = async( req: Request , res: Response ) => {
  
    const { body } = req;
    try {
      const faqs = await Faqs.create({
        data: body
      });
      res.json(faqs)
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: 'Error al registrar la pregunta'
      },
      );
    }
  }

  export const putFaq = async (req: Request,res: Response) =>{
  
    const { id } = req.params;
    const { body } = req;
    try {
      const faqs = await Faqs.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      if (!faqs) {
        return res.status(404).json({
          msg: `No existe pregunta con el id ${id}`
        });
      }
  
      const updatedFaq = await Faqs.update({
        where: {
          id: parseInt(id),
        },
        data: body,
      });
      res.json(updatedFaq);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: 'Error al actualizar la pregunta'
      });
    }
  }
  
  export const deleteFaq =  async(req: Request,res: Response) =>{
  
    const { id } = req.params;
    try {
      const faq = await Faqs.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      if (!faq) {
        return res.status(404).json({
          msg: `No existe pregunta con el id ${id}`
        });
      }
      await Faqs.update({
        where: {
          id: parseInt(id),
        },
        data: {
          deletedAt: new Date(),
        },
      });
      res.json(faq);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: 'Error al desactivar la pregunta'
      });
    }
  }
  
  
  
  