<template>
  <div class="pets-container">
    <h1 class="title">Hola {{ userName }}, Buenos días</h1>
    <p class="subtitle">Tus mascotas, selecciona la que quieras consultar</p>

    <!-- Mejora de la grid para que sea responsiva -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
      <div
        v-for="pet in pets"
        :key="pet._id"
        class="pet-card bg-white rounded-xl shadow-md p-4 transition-transform hover:shadow-lg hover:-translate-y-2"
      >
        <!-- Mostrar imagen si existe, de lo contrario usar icono por tipo de animal -->
        <img 
          :src="pet.photo || getPetIcon(pet.type)" 
          alt="pet image" 
          class="w-full h-40 object-cover rounded-lg mb-4"
        />
        <div class="pet-details text-center">
          <h3 class="text-lg font-bold text-gray-800">{{ pet.name }}</h3>
          <p class="text-gray-500">{{ pet.breed }}</p>
          <div class="flex justify-between items-center mt-4 space-x-2">
            <button @click="viewPet(pet._id)" class="btn-icon"><i class="pi pi-search"></i></button>
            <button @click="editPet(pet._id)" class="btn-icon"><i class="pi pi-pencil"></i></button>
            <button @click="confirmDelete(pet._id)" class="btn-icon"><i class="pi pi-trash"></i></button>
          </div>
        </div>
      </div>
    </div>

    <!-- Botón centrado para agregar mascota -->
    <div class="add-pet-container">
      <button @click="addPet" class="add-pet-btn">
        <i class="pi pi-plus"></i> Agregar Mascota
      </button>
    </div>
  </div>
</template>

<script>
// Importar las imágenes de respaldo y Prime Icons
import dogIcon from '@/assets/icon-dog.png';
import catIcon from '@/assets/icon-cat.png';
import { getPets, deletePet } from '@/services/api';

export default {
  data() {
    return {
      userName: '', // Inicializa vacío
      pets: [],
      dogIcon, // Icono de respaldo para perros
      catIcon, // Icono de respaldo para gatos
    };
  },
  async created() {
    // Recupera el nombre del usuario desde localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    this.userName = user ? user.nombre : 'Usuario'; // Aquí muestra el nombre del usuario o un valor por defecto

    // Cargar las mascotas
    this.pets = await getPets();
  },
  methods: {
    addPet() {
      this.$router.push('/pets/create');
    },
    viewPet(id) {
      this.$router.push(`/pets/${id}/view`);
    },
    editPet(id) {
      this.$router.push(`/pets/${id}/edit`);
    },
    async confirmDelete(id) {
      if (confirm('¿Estás seguro de que deseas eliminar esta mascota?')) {
        try {
          await deletePet(id);
          this.pets = this.pets.filter((pet) => pet._id !== id); // Remueve del array localmente
        } catch (error) {
          console.error('Error al eliminar mascota:', error.message);
        }
      }
    },
    // Método para obtener la imagen correcta basado en el tipo de mascota
    getPetIcon(petType) {
      // Normaliza el valor del tipo de mascota a minúsculas
      const typeLower = petType.toLowerCase();
      console.log("Tipo de mascota:", typeLower); // Añade esta línea para depurar el tipo de mascota
      if (typeLower === 'gato' || typeLower === 'cat') {
        return this.catIcon; // Si es un gato, retorna el icono del gato
      } else if (typeLower === 'perro' || typeLower === 'dog') {
        return this.dogIcon; // Si es un perro, retorna el icono del perro
      }
      return ''; // Retorna un valor vacío o predeterminado si no coincide con perro o gato
    },
  },
};
</script>

<style scoped>
/* Contenedor principal */
.pets-container {
  background-color: #f4f6fb;
  min-height: 100vh;
  padding: 3rem;
  text-align: center;
}

/* Título principal */
.title {
  font-size: 2rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

/* Subtítulo */
.subtitle {
  font-size: 1rem;
  color: #7f8c8d;
  margin-bottom: 2rem;
}

/* Tarjetas de mascotas */
.pet-card {
  background-color: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.pet-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.pet-details {
  text-align: center;
}

/* Estilos de botones con iconos */
.btn-icon {
  background-color: #3498db;
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 18px;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-icon:hover {
  background-color: #2980b9;
}

.btn-icon i {
  vertical-align: middle;
}

/* Contenedor del botón de agregar mascota */
.add-pet-container {
  margin-top: 2rem;
  text-align: center;
}

/* Contenedor del botón de agregar mascota */
.add-pet-container {
  margin-top: 2rem;
  display: flex;
  justify-content: center; /* Alinea horizontalmente al centro */
}

/* Botón de agregar mascota */
.add-pet-btn {
  background-color: #8e44ad;
  color: white;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.add-pet-btn:hover {
  background-color: #9b59b6;
  transform: translateY(-5px);
}

.add-pet-btn i {
  margin-right: 8px;
  font-size: 20px;
}

/* Responsivo */
.grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
}

@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
