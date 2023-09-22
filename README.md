SubeloTodoApi
Este proyecto esta generado usando Node.js versión 18.17.1.

Instrucciones para el Proyecto

Para instalar el proyecto, ejecuta:
npm install

Crea un archivo .env con los siguientes atributos:

.env
PORT=8000
DATABASE_URL="mysql://user:password@host:port/db_name"

Para correr las migraciones en la base de datos asignada, utiliza los siguientes comandos:

npx prisma migrate dev
npx prisma generate

Para poder probar y compilar el proyecto, ejecuta:
tsc 
node /dist/app.js.