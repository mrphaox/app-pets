<template>
    <div>
      <h1>Manage Users</h1>
      <div v-for="user in users" :key="user._id">
        <h3>{{ user.nombre }}</h3>
        <p>{{ user.email }}</p>
        <button @click="deleteUser(user._id)">Delete</button>
      </div>
    </div>
  </template>
  
  <script>
  import { getUsers, deleteUser } from '@/services/api';
  
  export default {
    data() {
      return {
        users: [],
      };
    },
    async created() {
      this.users = await getUsers();
    },
    methods: {
      async deleteUser(id) {
        try {
          await deleteUser(id);
          this.users = this.users.filter((user) => user._id !== id); // Elimina del array local
        } catch (error) {
          console.error('Error deleting user:', error.message);
        }
      },
    },
  };
  </script>
