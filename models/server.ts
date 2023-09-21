import express, {  Application } from "express";
import userRoutes from "../routes/user";
import cors from 'cors'; 
import { PrismaClient } from '@prisma/client'

interface Paths {
    // auth: string;
    // search: string;
    // categories: string;
    // products: string;
    users: string;
    // uploads: string;
}



class Server {

    private app: Application; 
    private port: string;
    private prisma: PrismaClient;
    private paths: Paths;
    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.prisma = new PrismaClient(); // Inicializa el cliente de Prisma
        this.paths = {
            users: '/api/Users',
        }; 
        //Metodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

     async dbConnection(){
        try {
            await this.prisma.$connect();
            console.log('Database online');
            
        } catch (error) {
            throw new Error( error as string );
        }
     }

    middlewares(){

        //CORS
        this.app.use( cors());

        //Lectura del body
        this.app.use( express.json() );

        //Carpeta publica
        // this.app.use(  express.static('public') );
    }

    routes(){
        this.app.use(  this.paths.users, userRoutes )
    }

    listen(){
        this.app.listen( this.port, ()=>{
            console.log('Servidor corriendo en puerto ' +this.port);
            
        });
    }
}

export default Server;