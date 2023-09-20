import dotenv from "dotenv";
import Server from './models/server';



const server = new Server();

//Configuracion dotenv
dotenv.config();

server.listen();