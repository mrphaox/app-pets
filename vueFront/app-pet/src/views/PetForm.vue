<template>
    <div class="form-container p-6">
      <h2>{{ isEditing ? 'Editar Mascota' : 'Crear Nueva Mascota' }}</h2>
  
      <form @submit.prevent="handleSubmit">
        <input v-model="pet.name" type="text" placeholder="Nombre" class="form-input" />
        <input v-model="pet.breed" type="text" placeholder="Raza" class="form-input" />
        <input v-model="pet.age" type="number" placeholder="Edad" class="form-input" />
        <input v-model="pet.weight" type="number" placeholder="Peso" class="form-input" />
        <input v-model="pet.height" type="number" placeholder="Estatura" class="form-input" />
        <textarea v-model="pet.description" placeholder="Descripción" class="form-input"></textarea>
  
        <button type="submit" class="btn-submit">{{ isEditing ? 'Actualizar' : 'Guardar' }}</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    props: ['isEditing'],
    data() {
      return {
        pet: {
          name: '',
          breed: '',
          age: '',
          weight: '',
          height: '',
          description: '',
        },
      };
    },
    methods: {
      handleSubmit() {
        if (this.isEditing) {
          // Actualizar mascota
          console.log('Actualizar mascota:', this.pet);
        } else {
          // Crear nueva mascota
          console.log('Crear nueva mascota:', this.pet);
        }
        this.$router.push('/pets/list');
      },
    },
  };
  </script>
  
  <style scoped>
  .form-container {
    background-color: #f5fafd;
    padding: 2rem;
    border-radius: 1rem;
  }
  
  .form-input {
    display: block;
    width: 100%;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
  }
  
  .btn-submit {
    background-color: #ff7043;
    color: white;
    padding: 1rem;
    border-radius: 0.5rem;
    width: 100%;
    text-align: center;
    cursor: pointer;
  }
  </style>
  