import { Request, Response } from "express";
import FaqsCategories from "../models/faqsCategories";
  
  export const getFaqsCategories = async(req: Request,res: Response) =>{
    const faqsCategories = await FaqsCategories.findMany({
      where: {deletedAt: null},
      include: {
        faqs:{where: {deletedAt: null},include: {faqCategory:true}}
      },
    });
    res.json(faqsCategories);
  }  
  
  export const postFaqCategorie = async( req: Request , res: Response ) => {
  
    const { body } = req;
    try {
      const faqsCategories = await FaqsCategories.create({
        data: body
      });
      res.json(faqsCategories)
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: 'Error al registrar la categoria de preguntas'
      },
      );
    }
  }

  export const putFaqCategorie = async (req: Request,res: Response) =>{
  
    const { id } = req.params;
    const { body } = req;
    try {
      const faqsCategories = await FaqsCategories.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      if (!faqsCategories) {
        return res.status(404).json({
          msg: `No existe categoria de pregunta con el id ${id}`
        });
      }
  
      const updatedFaqCategory = await FaqsCategories.update({
        where: {
          id: parseInt(id),
        },
        data: body,
      });
      res.json(updatedFaqCategory);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: 'Error al actualizar la categoria de pregunta'
      });
    }
  }
  
  export const deleteFaqCategorie =  async(req: Request,res: Response) =>{
  
    const { id } = req.params;
    try {
      const faqCategories = await FaqsCategories.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      if (!faqCategories) {
        return res.status(404).json({
          msg: `No existe categoria de pregunta con el id ${id}`
        });
      }
      await FaqsCategories.update({
        where: {
          id: parseInt(id),
        },
        data: {
          deletedAt: new Date(),
        },
      });
      res.json(faqCategories);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: 'Error al desactivar la categoria de pregunta'
      });
    }
  }
  
  
  
  