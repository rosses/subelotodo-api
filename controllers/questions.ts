import { Request, Response } from "express";
import Question from "../models/questions";
  
  export const getQuestions = async(req: Request,res: Response) =>{
    const questions = await Question.findMany({
      include: {
        user:true,
        product:true,
      },
    });
    res.json(questions);
  }  
  
  export const postQuestion = async( req: Request , res: Response ) => {
  
    const { body } = req;
    try {
      const question = await Question.create({
        data: body
      });
      res.json(question)
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: 'Error al registrar la pregunta'
      },
      );
    }
  }

  export const putQuestion = async (req: Request,res: Response) =>{
  
    const { id } = req.params;
    const { body } = req;
    try {
      const question = await Question.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      if (!question) {
        return res.status(404).json({
          msg: `No existe pregunta con el id ${id}`
        });
      }
  
      const updatedQuestion = await Question.update({
        where: {
          id: parseInt(id),
        },
        data: body,
      });
      res.json(updatedQuestion);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: 'Error al actualizar la pregunta'
      });
    }
  }
  
  export const deleteQuestion =  async(req: Request,res: Response) =>{
  
    const { id } = req.params;
    try {
      const question = await Question.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      if (!question) {
        return res.status(404).json({
          msg: `No existe pregunta con el id ${id}`
        });
      }
      await Question.update({
        where: {
          id: parseInt(id),
        },
        data: {
          deletedAt: new Date(),
        },
      });
      res.json(question);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: 'Error al desactivar la pregunta'
      });
    }
  }
  
  
  
  