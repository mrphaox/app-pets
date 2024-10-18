<template>
  <div id="app">
    <!-- Barra de navegación (si la necesitas) -->
    <nav v-if="isAuthenticated" class="navbar">
      <router-link to="/pets/list">Mis Mascotas</router-link>
      <router-link to="/admin/users" v-if="isAdmin">Administración</router-link>
      <button @click="logout">Salir</button>
    </nav>

    <!-- Contenedor principal para las rutas -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    // Computed para verificar si el usuario está autenticado
    isAuthenticated() {
      return !!localStorage.getItem('token');
    },
    // Computed para verificar si el usuario es admin
    isAdmin() {
      return localStorage.getItem('role') === 'admin';
    }
  },
  methods: {
    logout() {
      // Limpiar el token y el rol del localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      this.$router.push('/'); // Redirigir al login
    }
  }
}
</script>

<style>
/* Estilos generales para toda la aplicación */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.navbar {
  display: flex;
  justify-content: space-around;
  background-color: #ff7043;
  padding: 1rem;
  margin-bottom: 2rem;
}

.navbar a {
  color: white;
  font-weight: bold;
  text-decoration: none;
}

.navbar button {
  background-color: #2c3e50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
}

.navbar button:hover {
  background-color: #ff7043;
  color: #2c3e50;
}
</style>
