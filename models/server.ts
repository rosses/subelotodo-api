
import userRoutes from "../routes/user";
import categoryRoutes from "../routes/category";
import subcategoryRoutes from "../routes/subcategory"
import stateRoutes from "../routes/state"
import orderStateRoutes from "../routes/orderState"
import cityRoutes from "../routes/city"
import tagRoutes from "../routes/tag"
import productTagRoutes from "../routes/productTag"
import userTypeRoutes from "../routes/userType"
import shipmentRoutes from "../routes/shipment"
//import dimensionsRoutes from "../routes/dimensions"
import productImageRoutes from "../routes/productImage"
import productRoutes from "../routes/product"
import loginRoutes from "../routes/login"
import orderRoutes from "../routes/order"
import questionsRoutes from "../routes/questions"
import bannerRoutes from "../routes/banners"
import notificationRoutes from "../routes/notifications"
import faqRoutes from "../routes/faqs"
import faqCategoryRoutes from "../routes/faqsCategories"
import shoppingCartRoutes from "../routes/shoppingCart"
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
    shoppingCart:string;
    orderState:string;
    shipment:string;
    order:string;
    questions:string;
    banners:string;
    notifications:string;
    faqs:string;
    faqCategories:string;
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
            auth: '/api/login',
            shoppingCart: '/api/shoppingCart',
            order:'/api/order',
            orderState:'/api/orderState',
            shipment:'/api/shipment',
            questions:'/api/questions',
            banners:'/api/banners',
            notifications:'/api/notifications',
            faqs:'/api/faqs',
            faqCategories:'/api/faqsCategories',
            // uploads: '/api/uploads',
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
        
        this.app.use(cors());
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
        this.app.use(  this.paths.productImages, productImageRoutes ),
        this.app.use(  this.paths.products, productRoutes ),
        this.app.use(  this.paths.auth, loginRoutes),
        this.app.use(  this.paths.shoppingCart, shoppingCartRoutes),
        this.app.use(  this.paths.order, orderRoutes ),
        this.app.use(  this.paths.orderState, orderStateRoutes),
        this.app.use(  this.paths.shipment,shipmentRoutes),
        this.app.use(  this.paths.questions,questionsRoutes),
        this.app.use(  this.paths.banners,bannerRoutes),
        this.app.use(  this.paths.notifications,notificationRoutes),
        this.app.use(  this.paths.faqs,faqRoutes),
        this.app.use(  this.paths.faqCategories,faqCategoryRoutes)
    }

    listen(){
        this.app.listen( this.port, ()=>{
            console.log('Servidor corriendo en puerto ' +this.port);
        }
        );
    }
}

export default Server;