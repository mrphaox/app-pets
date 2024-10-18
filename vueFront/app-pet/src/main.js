// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Aquí importas el enrutador correctamente

// Importar los estilos CSS (Tailwind, etc.)
import './assets/tailwind.css';

// Crear la aplicación y montar Vue Router
createApp(App)
  .use(router) // Nota que estamos usando el router importado
  .mount('#app');
