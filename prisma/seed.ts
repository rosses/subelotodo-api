import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const listRegiones = [
    {
        name: 'Región Arica y Parinacota',
        cities:{
        create: [
                {name:'Arica'},
                {name:'Camarones'},
                {name:'Putre'},
                {name:'General Lagos'},
            ],
        }
    },
    {
        name: 'Región de Tarapacá',
        cities:{
        create: [
                {name:'Iquique'},
                {name:'Camiña'},
                {name:'Colchane'},
                {name:'Huara'},
                {name:'Pica'},
                {name:'Pozo Almonte'},
                {name:'Alto Hospicio'},
            ],
        }
    },
    {
        name: 'Región de Antofagasta',
        cities:{
        create: [
                {name:'Antofagasta'},
                {name:'Mejillones'},
                {name:'Sierra Gorda'},
                {name:'Taltal'},
                {name:'Calama'},
                {name:'Ollagüe'},
                {name:'San Pedro de Atacama'},
                {name:'Tocopilla'},
                {name:'María Elena'},
            ],
        }
    },
    {
        name: 'Región de Atacama',
        cities:{
        create: [
                {name:'Copiapó'},
                {name:'Caldera'},
                {name:'Tierra Amarilla'},
                {name:'Chañaral'},
                {name:'Diego de Almagro'},
                {name:'Vallenar'},
                {name:'Alto del Carmen'},
                {name:'Freirina'},
                {name:'Huasco'},
            ],
        }
    },
    {
        name: 'Región de Coquimbo',
        cities:{
        create: [
            {name:'La Serena'},
            {name:'Coquimbo'},
            {name:'Andacollo'},
            {name:'La Higuera'},
            {name:'Paiguano'},
            {name:'Vicuña'},
            {name:'Illapel'},
            {name:'Canela'},
            {name:'Los Vilos'},
            {name:'Salamanca'},
            {name:'Ovalle'},
            {name:'Combarbalá'},
            {name:'Monte Patria'},
            {name:'Punitaqui'},
            {name:'Río Hurtado'},
            ],
        }
    },
    {
        name: 'Región de Valparaíso',
        cities:{
        create: [
            {name:'Valparaíso'},
            {name:'Casablanca'},
            {name:'Concón'},
            {name:'Juan Fernández'},
            {name:'Puchuncaví'},
            {name:'Quilpué'},
            {name:'Quintero'},
            {name:'Villa Alemana'},
            {name:'Viña del Mar'},
            {name:'Isla de Pascua'},
            {name:'Los Andes'},
            {name:'Calle Larga'},
            {name:'Rinconada'},
            {name:'San Esteban'},
            {name:'La Ligua'},
            {name:'Cabildo'},
            {name:'Papudo'},
            {name:'Petorca'},
            {name:'Zapallar'},
            {name:'Quillota'},
            {name:'Calera'},
            {name:'Hijuelas'},
            {name:'La Cruz'},
            {name:'Limache'},
            {name:'Nogales'},
            {name:'Olmué'},
            {name:'San Antonio'},
            {name:'Algarrobo'},
            {name:'Cartagena'},
            {name:'El Quisco'},
            {name:'El Tabo'},
            {name:'Santo Domingo'},
            {name:'San Felipe'},
            {name:'Catemu'},
            {name:'Llaillay'},
            {name:'Panquehue'},
            {name:'Putaendo'},
            {name:'Santa María'},            
            ],
        }
    },
    {
        name: "Región Libertador General Bernardo O'Higgins",
        cities:{
        create: [
            {name:'Rancagua'},
            {name:'Codegua'},
            {name:'Coinco'},
            {name:'Coltauco'},
            {name:'Doñihue'},
            {name:'Graneros'},
            {name:'Las Cabras'},
            {name:'Machalí'},
            {name:'Malloa'},
            {name:'Mostazal'},
            {name:'Olivar'},
            {name:'Peumo'},
            {name:'Pichidegua'},
            {name:'Quinta de Tilcoco'},
            {name:'Rengo'},
            {name:'Requínoa'},
            {name:'San Vicente'},
            {name:'Pichilemu'},
            {name:'La Estrella'},
            {name:'Litueche'},
            {name:'Marchihue'},
            {name:'Navidad'},
            {name:'Paredones'},
            {name:'San Fernando'},
            {name:'Chépica'},
            {name:'Chimbarongo'},
            {name:'Lolol'},
            {name:'Nancagua'},
            {name:'Palmilla'},
            {name:'Peralillo'},
            {name:'Placilla'},
            {name:'Pumanque'},
            {name:'Santa Cruz'},            
            ],
        }
    },
    {
        name: 'Región del Maule',
        cities:{
        create: [
            {name:'Talca'},
            {name:'Constitución'},
            {name:'Curepto'},
            {name:'Empedrado'},
            {name:'Maule'},
            {name:'Pelarco'},
            {name:'Pencahue'},
            {name:'Río Claro'},
            {name:'San Clemente'},
            {name:'San Rafael'},
            {name:'Cauquenes'},
            {name:'Chanco'},
            {name:'Pelluhue'},
            {name:'Curicó'},
            {name:'Hualañé'},
            {name:'Licantén'},
            {name:'Molina'},
            {name:'Rauco'},
            {name:'Romeral'},
            {name:'Sagrada Familia'},
            {name:'Teno'},
            {name:'Vichuquén'},
            {name:'Linares'},
            {name:'Colbún'},
            {name:'Longaví'},
            {name:'Parral'},
            {name:'Retiro'},
            {name:'San Javier'},
            {name:'Villa Alegre'},
            {name:'Yerbas Buenas'},            
            ],
        }
    },
    {
        name: 'Región de Ñuble',
        cities:{
        create: [
            {name:'Chillán'},
            {name:'Bulnes'},
            {name:'Cobquecura'},
            {name:'Coelemu'},
            {name:'Coihueco'},
            {name:'Chillán Viejo'},
            {name:'El Carmen'},
            {name:'Ninhue'},
            {name:'Ñiquén'},
            {name:'Pemuco'},
            {name:'Pinto'},
            {name:'Portezuelo'},
            {name:'Quillón'},
            {name:'Quirihue'},
            {name:'Ránquil'},
            {name:'San Carlos'},
            {name:'San Fabián'},
            {name:'San Ignacio'},
            {name:'San Nicolás'},
            {name:'Treguaco'},
            {name:'Yungay'},            
            ],
        }
    },
    {
        name: 'Región del Biobío',
        cities:{
        create: [
            {name:'Concepción'},
            {name:'Coronel'},
            {name:'Chiguayante'},
            {name:'Florida'},
            {name:'Hualqui'},
            {name:'Lota'},
            {name:'Penco'},
            {name:'San Pedro de la Paz'},
            {name:'Santa Juana'},
            {name:'Talcahuano'},
            {name:'Tomé'},
            {name:'Hualpén'},
            {name:'Lebu'},
            {name:'Arauco'},
            {name:'Cañete'},
            {name:'Contulmo'},
            {name:'Curanilahue'},
            {name:'Los Álamos'},
            {name:'Tirúa'},
            {name:'Los Ángeles'},
            {name:'Antuco'},
            {name:'Cabrero'},
            {name:'Laja'},
            {name:'Mulchén'},
            {name:'Nacimiento'},
            {name:'Negrete'},
            {name:'Quilaco'},
            {name:'Quilleco'},
            {name:'San Rosendo'},
            {name:'Santa Bárbara'},
            {name:'Tucapel'},
            {name:'Yumbel'},
            {name:'Alto Biobío'},            
            ],
        }
    },
    {
        name: 'Región de la Araucanía',
        cities:{
        create: [
            {name:'Temuco'},
            {name:'Carahue'},
            {name:'Cunco'},
            {name:'Curarrehue'},
            {name:'Freire'},
            {name:'Galvarino'},
            {name:'Gorbea'},
            {name:'Lautaro'},
            {name:'Loncoche'},
            {name:'Melipeuco'},
            {name:'Nueva Imperial'},
            {name:'Padre Las Casas'},
            {name:'Perquenco'},
            {name:'Pitrufquén'},
            {name:'Pucón'},
            {name:'Saavedra'},
            {name:'Teodoro Schmidt'},
            {name:'Toltén'},
            {name:'Vilcún'},
            {name:'Villarrica'},
            {name:'Cholchol'},
            {name:'Angol'},
            {name:'Collipulli'},
            {name:'Curacautín'},
            {name:'Ercilla'},
            {name:'Lonquimay'},
            {name:'Los Sauces'},
            {name:'Lumaco'},
            {name:'Purén'},
            {name:'Renaico'},
            {name:'Traiguén'},
            {name:'Victoria'},            
            ],
        }
    },
    {
        name: 'Región de los Ríos',
        cities:{
        create: [
            {name:'Valdivia'},
            {name:'Corral'},
            {name:'Futrono'},
            {name:'La Unión'},
            {name:'Lago Ranco'},
            {name:'Lanco'},
            {name:'Los Lagos'},
            {name:'Máfil'},
            {name:'Mariquina'},
            {name:'Paillaco'},
            {name:'Panguipulli'},
            {name:'Río Bueno'},            
            ],
        }
    },
    {
        name: 'Región de los Lagos',
        cities:{
        create: [
            {name:'Puerto Montt'},
            {name:'Calbuco'},
            {name:'Cochamó'},
            {name:'Fresia'},
            {name:'Frutillar'},
            {name:'Los Muermos'},
            {name:'Llanquihue'},
            {name:'Maullín'},
            {name:'Puerto Varas'},
            {name:'Castro'},
            {name:'Ancud'},
            {name:'Chonchi'},
            {name:'Curaco de Vélez'},
            {name:'Dalcahue'},
            {name:'Puqueldón'},
            {name:'Queilén'},
            {name:'Quellón'},
            {name:'Quemchi'},
            {name:'Quinchao'},
            {name:'Osorno'},
            {name:'Puerto Octay'},
            {name:'Purranque'},
            {name:'Puyehue'},
            {name:'Río Negro'},
            {name:'San Juan de la Costa'},
            {name:'San Pablo'},
            {name:'Chaitén'},
            {name:'Futaleufú'},
            {name:'Hualaihué'},
            {name:'Palena'},            
            ],
        }
    },
    {
        name: 'Región de Aysén',
        cities:{
        create: [
            {name:'Coihaique'},
            {name:'Lago Verde'},
            {name:'Aisén'},
            {name:'Cisnes'},
            {name:'Guaitecas'},
            {name:'Cochrane'},
            {name:"O'Higgins"},
            {name:'Tortel'},
            {name:'Chile Chico'},
            {name:'Río Ibáñez'},            
            ],
        }
    },
    {
        name: 'Región de Magallanes y de la Antártica Chilena',
        cities:{
        create: [
            {name:'Punta Arenas'},
            {name:'Laguna Blanca'},
            {name:'Río Verde'},
            {name:'San Gregorio'},
            {name:'Cabo de Hornos'},
            {name:'Antártica'},
            {name:'Porvenir'},
            {name:'Primavera'},
            {name:'Timaukel'},
            {name:'Natales'},
            {name:'Torres del Paine'},            
            ],
        }
    },
    {
        name: 'Región Metropolitana',
        cities:{
        create: [
            {name:'Santiago'},
            {name:'Cerrillos'},
            {name:'Cerro Navia'},
            {name:'Conchalí'},
            {name:'El Bosque'},
            {name:'Estación Central'},
            {name:'Huechuraba'},
            {name:'Independencia'},
            {name:'La Cisterna'},
            {name:'La Florida'},
            {name:'La Granja'},
            {name:'La Pintana'},
            {name:'La Reina'},
            {name:'Las Condes'},
            {name:'Lo Barnechea'},
            {name:'Lo Espejo'},
            {name:'Lo Prado'},
            {name:'Macul'},
            {name:'Maipú'},
            {name:'Ñuñoa'},
            {name:'Pedro Aguirre Cerda'},
            {name:'Peñalolén'},
            {name:'Providencia'},
            {name:'Pudahuel'},
            {name:'Quilicura'},
            {name:'Quinta Normal'},
            {name:'Recoleta'},
            {name:'Renca'},
            {name:'San Joaquín'},
            {name:'San Miguel'},
            {name:'San Ramón'},
            {name:'Vitacura'},
            {name:'Puente Alto'},
            {name:'Pirque'},
            {name:'San José de Maipo'},
            {name:'Colina'},
            {name:'Lampa'},
            {name:'Tiltil'},
            {name:'San Bernardo'},
            {name:'Buin'},
            {name:'Calera de Tango'},
            {name:'Paine'},
            {name:'Melipilla'},
            {name:'Alhué'},
            {name:'Curacaví'},
            {name:'María Pinto'},
            {name:'San Pedro'},
            {name:'Talagante'},
            {name:'El Monte'},
            {name:'Isla de Maipo'},
            {name:'Padre Hurtado'},
            {name:'Peñaflor'},            
            ],
        }
    },
]

const listCategories = [
    {
        name: 'Tecnologia y electrónica',
        subcategories:{
        create: [
                {
                    name: 'Celulares y Tablets',
                },
                {
                    name: 'Televisores',
                },
                {
                    name: 'Audio',
                },
                {
                    name: 'Computación',
                },
                {
                    name: 'VideoJuegos',
                },
                {
                    name: 'Smart Home',
                },
                {
                    name: 'Fotografía',
                },
            ],
        }
    },
    {
        name: 'Hogar',
        subcategories:{
        create: [
                {
                    name: 'Electrodomésticos',
                },
                {
                    name: 'Linea Blanca',
                },
                {
                    name: 'Aire acondicionado y calefacción',
                },
                {
                    name: 'Menaje',
                },
                {
                    name: 'Decoración e Iluminación',
                },
            ],
        }
    },
    {
        name: 'Muebles',
        subcategories:{
        create: [
                {
                    name: 'Comedor',
                },
                {
                    name: 'Living',
                },
                {
                    name: 'Terraza',
                },
                {
                    name: 'Otros',
                },
            ],
        }
    },
    {
        name: 'Domitorio',
        subcategories:{
        create: [
                {
                    name: 'Camas',
                },
                {
                    name: 'Respaldos',
                },
                {
                    name: 'Colchones',
                },
                {
                    name: 'Ropa de Cama',
                },
                {
                    name: 'Escritorios y sillas',
                },
                {
                    name: 'Muebles de Dormitorio',
                },
            ],
        }
    },
    {
        name: 'Deportes y Aire Libre',
        subcategories:{
        create: [
                {
                    name: 'Ropa deportiva',
                },
                {
                    name: 'Bicicletas y Scooters',
                },
                {
                    name: 'Camping',
                },
                {
                    name: 'Fitness',
                },
                {
                    name: 'Maletas',
                },
                {
                    name: 'Accesorios',
                },
            ],
        }
    },
    {
        name: 'Mujer',
        subcategories:{
        create: [
                {
                    name: 'Vestuario',
                },
                {
                    name: 'Calzado',
                },
                {
                    name: 'Joyeria',
                },
                {
                    name: 'Accesorios',
                },
            ],
        }
    },
    {
        name: 'Hombre',
        subcategories:{
        create: [
                {
                    name: 'Vestuario',
                },
                {
                    name: 'Calzado',
                },
                {
                    name: 'Accesorios',
                },
            ],
        }
    },
    {
        name: 'Mundo niños y juguetería',
        subcategories:{
        create: [
                {
                    name: 'Vestuario',
                },
                {
                    name: 'Juguetes y juegos de mesa',
                },
                {
                    name: 'Coches y sillas',
                },
            ],
        }
    },
    {
        name: 'Belleza y Salud',
        subcategories:{
        create: [
                {
                    name: 'Perfumes',
                },
                {
                    name: 'Dermocosmetica',
                },
                {
                    name: 'Bienestar ',
                },
                {
                    name: 'Salud',
                },
            ],
        }
    },
    {
        name: 'Mundo escolar',
        subcategories:{
        create: [
                {
                    name: 'Libros Escolares',
                },
                {
                    name: 'Articulos escolares',
                },
                {
                    name: 'Uniformes',
                },
            ],
        }
    },
    {
        name: 'Antiguedades y arte',
        subcategories:{
        create: [
                {
                    name: 'Muebles',
                },
                {
                    name: 'Cuadros',
                },
                {
                    name: 'Menaje',
                },
                {
                    name: 'Accesorios',
                },
            ],
        }
    },
    {
        name: 'Jardín y Terraza',
        subcategories:{
        create: [
                {
                    name: 'Parrillas y Asadores',
                },
                {
                    name: 'Herramientas',
                },
                {
                    name: 'Plantas',
                },
                {
                    name: 'Mundo Piscina',
                },
                {
                    name: 'Juegos de exterior',
                },
            ],
        }
    },
    {
        name: 'Música y Libros',
        subcategories:{
        create: [
                {
                    name: 'Instrumentos musicales',
                },
                {
                    name: 'Libros',
                },
                {
                    name: 'Música',
                },
            ],
        }
    },
    {
        name: 'Otras Categorias',
        subcategories:{
        create: [
                {
                    name: 'Mascotas',
                },
                {
                    name: 'Otros',
                },
            ],
        }
    },
]

const listUserTypes = [
    {
        id:1,
        name: 'Administrador',
    },
    {
        id:2,
        name: 'Vendedor',
    },
    {
        id:3,
        name: 'Cliente',
    },
]

async function main() {
 
    

    for (let data of listUserTypes) {
        await prisma.userTypes.create({
          data,
        });
    }

    for (let data of listCategories) {
        await prisma.categories.create({
        data,
        });
    }

    for (let data of listRegiones) {
        await prisma.states.create({
        data,
        });
    }

  const superAdmin = await prisma.users.create({
    data: {
      firstName: 'Super',
      lastName:'Admin',
      email: 'super@admin.com',
      password:'$2a$10$Iu3oJhb5qZG2E0uzoLQhbud9AF61/zbJ6SHb/GSp7sIG49Gv/bsVm',
      address:'Admin',
      stateId:1,
      cityId:1,
      type:1,
      phone:11111111,
      birthday:new Date(Date.now()),
    },
  })

  console.log({ superAdmin })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
  