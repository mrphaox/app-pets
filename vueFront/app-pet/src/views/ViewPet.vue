<template>
  <div class="pet-details-container">
    <!-- Cabecera con la imagen y botón de editar -->
    <div class="pet-card">
      <div class="pet-header">
        <img :src="pet.photo || (pet.type === 'dog' ? dogIcon : catIcon)" alt="pet image" class="pet-image" />
        <button @click="editPet" class="edit-btn">
          <i class="pi pi-pencil"></i> Editar
        </button>
      </div>

      <!-- Detalles de la mascota -->
      <div class="pet-info">
        <h2 class="pet-name">{{ pet.name }} <span class="pet-breed">{{ pet.breed }}</span></h2>
        <p class="pet-details">Edad: <span>{{ pet.age }} años</span></p>
        <p class="pet-details">Sexo: <span>{{ pet.sex === 'male' ? 'Macho' : 'Hembra' }}</span></p>
        <p class="pet-details">Temperamento: <span>{{ pet.temperament }}</span></p>
        <p class="pet-details">Peso: <span>{{ pet.weight }} kg</span> | Estatura: <span>{{ pet.height }} cm</span></p>
      </div>

      <!-- Información del propietario -->
      <div class="owner-info">
        <h3 class="owner-title">Propietario</h3>
        <p class="owner-details"><strong>Nombre:</strong> {{ owner.name }}</p>
        <p class="owner-details"><strong>Ubicación:</strong> {{ owner.location }}</p>
        <p class="owner-details"><strong>Teléfono:</strong> {{ owner.phone }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getPetById } from '@/services/api';
import dogIcon from '@/assets/icon-dog.png';
import catIcon from '@/assets/icon-cat.png';

export default {
  data() {
    return {
      pet: {},
      owner: {},
      dogIcon,
      catIcon,
    };
  },
  async created() {
    const petId = this.$route.params.id;
    try {
      const petData = await getPetById(petId);
      this.pet = petData;
      this.owner = petData.owner || {
        name: 'Propietario desconocido',
        location: 'Ubicación no especificada',
        phone: 'Teléfono no especificado',
      };
    } catch (error) {
      console.error('Error al obtener la mascota:', error);
    }
  },
  methods: {
    editPet() {
      this.$router.push(`/pets/${this.pet._id}/edit`);
    },
  },
};
</script>

<style scoped>
/* Estilos generales */
.pet-details-container {
  background-color: #f9fafb;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.pet-card {
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.pet-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pet-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 12px;
  border: 2px solid #e0e0e0;
}

.edit-btn {
  background-color: #3498db;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.edit-btn:hover {
  background-color: #2980b9;
}

/* Estilo de los detalles de la mascota */
.pet-info {
  background-color: #ff7043;
  border-radius: 12px;
  padding: 1.5rem;
  color: white;
}

.pet-name {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.pet-breed {
  font-weight: normal;
  opacity: 0.8;
}

.pet-details {
  font-size: 1.1rem;
  margin-top: 0.5rem;
}

.pet-details span {
  font-weight: bold;
}

/* Estilo de la sección del propietario */
.owner-info {
  background-color: #f3f4f6;
  border-radius: 12px;
  padding: 1.5rem;
  color: #2c3e50;
}

.owner-title {
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.owner-details {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.owner-details strong {
  font-weight: bold;
}

/* Responsivo */
@media (max-width: 768px) {
  .pet-card {
    padding: 1.5rem;
  }

  .pet-name {
    font-size: 1.6rem;
  }

  .pet-details,
  .owner-details {
    font-size: 1rem;
  }
}
</style>
