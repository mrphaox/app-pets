<template>
  <div class="register-container">
    <div class="register-card">
      <h1 class="title">Create an Account</h1>
      <form @submit.prevent="handleRegister">
        <div class="input-container">
          <input type="text" v-model="nombre" placeholder="Name" required />
        </div>
        <div class="input-container">
          <input type="email" v-model="email" placeholder="Email" required />
        </div>
        <div class="input-container">
          <input type="password" v-model="password" placeholder="Password" required />
        </div>
        <button type="submit" class="register-btn">Register</button>
      </form>
      <div class="login-prompt">
        <p>Already have an account? <router-link to="/">Log in</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
import { registerUser } from '@/services/api'; // Importa la función para registrar usuarios

export default {
  name: 'UserRegister',  // Cambia el nombre a algo con múltiples palabras
  data() {
    return {
      nombre: '',
      email: '',
      password: '',
    };
  },
  methods: {
    async handleRegister() {
      try {
        await registerUser(this.nombre, this.email, this.password);
        this.$router.push('/'); // Redirigir al login después de registrarse
      } catch (error) {
        console.error('Error during registration:', error.message);
      }
    },
  },
};
</script>

<style scoped>
/* Estilos generales del contenedor */
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f1f5f8;
}

/* Estilos de la tarjeta de registro */
.register-card {
  width: 100%;
  max-width: 400px;
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* Título del registro */
.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #2c3e50;
}

/* Estilos del contenedor de inputs */
.input-container {
  margin-bottom: 1.5rem;
}

/* Estilos de los inputs */
input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

/* Cambia el color del borde al hacer foco */
input:focus {
  outline: none;
  border-color: #3498db;
}

/* Estilos del botón de registro */
.register-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(90deg, #3498db, #9b59b6);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
}

/* Efecto hover para el botón */
.register-btn:hover {
  background: linear-gradient(90deg, #2980b9, #8e44ad);
}

/* Estilos del mensaje para iniciar sesión */
.login-prompt {
  margin-top: 1rem;
  font-size: 14px;
}

.login-prompt a {
  color: #3498db;
  text-decoration: none;
}

.login-prompt a:hover {
  text-decoration: underline;
}
</style>
