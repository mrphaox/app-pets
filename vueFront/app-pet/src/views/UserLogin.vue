<template>
  <div class="login-container">
    <div class="login-card">
      <h1 class="title">Welcome</h1>
      <div class="icon-placeholder">
        <span class="icon-letter">A</span>
      </div>
      <form @submit.prevent="handleSubmit">
        <div class="input-container">
          <input type="email" v-model="email" placeholder="Email" required />
        </div>
        <div class="input-container">
          <input type="password" v-model="password" placeholder="Password" required />
        </div>
        <button type="submit" class="login-btn">LOGIN</button>
      </form>
      <div class="signup-prompt">
        <p>Don't have an account? <router-link to="/register">Sign up</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
import { loginUser } from '@/services/api'; // Importa la función loginUser

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async handleSubmit() {
      try {
        await loginUser(this.email, this.password); // Ya no necesitamos almacenar `response`
        this.$router.push('/pets/list'); // Redirige después de iniciar sesión
      } catch (error) {
        console.error('Error al iniciar sesión:', error.message);
      }
    },
  },
};
</script>

<style scoped>
/* Estilos generales del contenedor */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f1f5f8;
}

/* Estilos de la tarjeta de login */
.login-card {
  width: 100%;
  max-width: 400px;
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* Título del login */
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

/* Estilos del botón de login */
.login-btn {
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
.login-btn:hover {
  background: linear-gradient(90deg, #2980b9, #8e44ad);
}

/* Estilos del mensaje para registrarse */
.signup-prompt {
  margin-top: 1rem;
  font-size: 14px;
}

.signup-prompt a {
  color: #3498db;
  text-decoration: none;
}

.signup-prompt a:hover {
  text-decoration: underline;
}

/* Estilos del placeholder del icono */
.icon-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ecf0f1;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  margin: 0 auto 1.5rem;
}

.icon-letter {
  font-size: 30px;
  color: #2c3e50;
  font-weight: bold;
}
</style>
