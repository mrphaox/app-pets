import { createRouter, createWebHistory } from 'vue-router';
import UserLogin from '../views/UserLogin.vue';
import Register from '../views/UserRegister.vue'; // Importa el componente de registro
import PetsList from '../views/petList.vue';
import CreatePet from '../views/CreatePet.vue';
import EditPet from '../views/EditPet.vue';
import AdminUsers from '../views/AdminUsers.vue';
import ViewPet from '../views/ViewPet.vue'; 

const routes = [
  { path: '/', component: UserLogin },
  { path: '/register', component: Register }, // Añade la ruta para el registro
  { path: '/pets/list', component: PetsList },
  { path: '/pets/create', component: CreatePet },
  { path: '/pets/:id/edit', component: EditPet },
  { path: '/pets/:id/view', component: ViewPet },
  { path: '/admin/users', component: AdminUsers },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// "Guard" de navegación para proteger rutas
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Verifica si el usuario está autenticado

  if (!isAuthenticated && to.path !== '/' && to.path !== '/register') {
    // Si el usuario no está autenticado y no está en la página de login o registro, redirigirlo al login
    next('/');
  } else {
    next(); // Si está autenticado o ya está en la página de login/registro, continuar
  }
});

export default router;
