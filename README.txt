Pet Management App (Vue.js)
Este proyecto es una aplicación para la gestión de mascotas. Los usuarios pueden registrarse, iniciar sesión y agregar información sobre sus mascotas. Está desarrollado con Vue.js, Node.js, Express y MongoDB.

Características
Registro de usuarios.
Inicio de sesión autenticado con JWT.
Gestión completa de mascotas: Crear, Leer, Actualizar, Eliminar (CRUD).
Interfaz de usuario responsiva.
Validación y manejo de formularios con Vue.
Tecnologías Utilizadas
Frontend: Vue.js, Tailwind CSS, Axios.
Backend: Node.js, Express, MongoDB (Mongoose), JWT para autenticación.
Base de datos: MongoDB (MongoDB Atlas recomendado).
Requisitos previos
Antes de instalar el proyecto, asegúrate de tener lo siguiente instalado en tu sistema:

Node.js (versión 16.0 o superior)

npm o yarn

MongoDB (Local o MongoDB Atlas)

Instalación

1. Clonar el repositorio

git clone https://github.com/mrphaox/app_Pets.git

cd app_Pets

2. Configuración del backend

Dirígete a la carpeta del backend:

cd back/apiPets

Instala las dependencias:
npm install

Crea un archivo .env en la raíz del directorio backend con la siguiente configuración:

MONGODB_URI=mongodb+srv://<usuario>:<contraseña>@cluster0.mongodb.net/<nombre-de-la-base-de-datos>?retryWrites=true&w=majority
JWT_SECRET=tu_clave_secreta_para_jwt
PORT=9000

Inicia el servidor del backend:

npm run start

3. Configuración del frontend
Dirígete a la carpeta del frontend:

cd VueFront/app-pet

Instala las dependencias:

npm install

Crea un archivo .env.local en el directorio del frontend con la URL base para la API:

VITE_API_URL=http://localhost:9000/api
Inicia el servidor de desarrollo:http://localhost:8080

npm run serve

4. Acceder a la aplicación

Backend: Ejecutándose en http://localhost:9000
Frontend: Ejecutándose en http://localhost:8080

Abre http://localhost:8080 para acceder a la interfaz de la aplicación.

API Endpoints

Aquí algunos de los endpoints principales disponibles en el backend:

Autenticación

Registro de usuario: POST /api/users/register

Iniciar sesión: POST /api/login

Mascotas

Agregar una mascota: POST /api/pets/create

Obtener todas las mascotas del usuario: GET /api/pets/list

Obtener detalles de una mascota: GET /api/pets/:id/view

Actualizar una mascota: PUT /api/pets/:id/update

Eliminar una mascota: DELETE /api/pets/:id/delete

Scripts Disponibles

En los directorios del frontend y backend, puedes ejecutar:

npm run serve Ejecuta el proyecto en modo de desarrollo.
npm run build: Compila la aplicación para producción.
npm run serve Inicia la aplicación ya compilada (en producción).

Contribuciones
Si deseas contribuir al proyecto:

Haz un fork del repositorio.
Crea una rama (git checkout -b nueva-funcionalidad).
Realiza tus cambios y haz commit (git commit -m 'Agrega nueva funcionalidad').
Haz push a tu rama (git push origin nueva-funcionalidad).
Abre un Pull Request.

Licencia
Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.
