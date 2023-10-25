
import userRoutes from "../routes/user";
import categoryRoutes from "../routes/category";
import subcategoryRoutes from "../routes/subcategory"
import stateRoutes from "../routes/state"
import cityRoutes from "../routes/city"
import tagRoutes from "../routes/tag"
import productTagRoutes from "../routes/productTag"
import userTypeRoutes from "../routes/userType"
//import dimensionsRoutes from "../routes/dimensions"
import productImageRoutes from "../routes/productImage"
import productRoutes from "../routes/product"
import loginRoutes from "../routes/login"
import express, { Application } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import { json } from "body-parser";
interface Paths {
    auth: string;
    // search: string;
    users: string;
    categories: string;
    subcategories: string;
    states:string;
    cities:string;
    tags:string;
    productTags:string;
    userTypes:string;
    //dimensions:string;
    productImages:string;
    products: string;
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
            users: '/api/users',
            categories: '/api/categories',
            subcategories: '/api/subcategories',
            states: '/api/states',
            cities: '/api/cities',
            tags: '/api/tags',
            productTags: '/api/productTags',
            userTypes:'/api/userTypes',
            //dimensions: '/api/dimensions',
            productImages: '/api/productImages',
            products: '/api/products',
            auth: '/api/login'
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
        const corsOptions = {
            origin: 'https://ezab.cl',  // Reemplaza con el dominio de tu frontend
            methods: 'GET,POST,PUT,DELETE',
            allowedHeaders: 'Content-Type,Authorization',
          };
          
          this.app.use(cors(corsOptions));
        //Lectura del body
        this.app.use( json() );

        //this.app.use(express.static('uploads'))
        this.app.use( express.static('uploads'))
        //Carpeta publica
        // this.app.use(  express.static('public') );
    }

    routes(){
        this.app.use(  this.paths.users, userRoutes ),
        this.app.use(  this.paths.categories, categoryRoutes ),
        this.app.use(  this.paths.subcategories, subcategoryRoutes ),
        this.app.use(  this.paths.states, stateRoutes ),
        this.app.use(  this.paths.cities, cityRoutes ),
        this.app.use(  this.paths.tags, tagRoutes ),
        this.app.use(  this.paths.productTags, productTagRoutes ),
        this.app.use(  this.paths.userTypes, userTypeRoutes ),
        //this.app.use(  this.paths.dimensions, dimensionsRoutes ),
        this.app.use(  this.paths.productImages, productImageRoutes ),
        this.app.use(  this.paths.products, productRoutes ),
        this.app.use(  this.paths.auth, loginRoutes)
    }

    listen(){
        this.app.listen( this.port, ()=>{
            console.log('Servidor corriendo en puerto ' +this.port);
            
        });
    }
}

export default Server;