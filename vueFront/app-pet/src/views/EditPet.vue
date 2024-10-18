<template>
  <div class="form-container">
    <h2 class="form-title">Actualizar Mascota</h2>

    <form @submit.prevent="handleSubmit" class="form-grid">
      <div class="form-group">
        <label for="name" class="form-label">Nombre</label>
        <input id="name" v-model="pet.name" type="text" class="form-input" placeholder="Nombre de la mascota" required />
      </div>

      <div class="form-group">
        <label for="type" class="form-label">Tipo</label>
        <select id="type" v-model="pet.type" class="form-input" required>
          <option disabled value="">Selecciona el tipo de mascota</option>
          <option value="dog">Perro</option>
          <option value="cat">Gato</option>
        </select>
      </div>

      <div class="form-group">
        <label for="sex" class="form-label">Sexo</label>
        <select id="sex" v-model="pet.sex" class="form-input" required>
          <option disabled value="">Selecciona el sexo</option>
          <option value="male">Macho</option>
          <option value="female">Hembra</option>
        </select>
      </div>

      <div class="form-group">
        <label for="breed" class="form-label">Raza</label>
        <input id="breed" v-model="pet.breed" type="text" class="form-input" placeholder="Raza de la mascota" />
      </div>

      <div class="form-group">
        <label for="age" class="form-label">Edad</label>
        <input id="age" v-model="pet.age" type="number" class="form-input" placeholder="Edad (en años)" required />
      </div>

      <div class="form-group">
        <label for="weight" class="form-label">Peso (kg)</label>
        <input id="weight" v-model="pet.weight" type="number" class="form-input" placeholder="Peso en kilogramos" />
      </div>

      <div class="form-group">
        <label for="height" class="form-label">Estatura (cm)</label>
        <input id="height" v-model="pet.height" type="number" class="form-input" placeholder="Estatura en centímetros" />
      </div>

      <div class="form-group">
        <label for="temperament" class="form-label">Temperamento</label>
        <input id="temperament" v-model="pet.temperament" type="text" class="form-input" placeholder="Temperamento de la mascota" />
      </div>

      <div class="form-group">
        <label for="chipNumber" class="form-label">Número de Chip</label>
        <input id="chipNumber" v-model="pet.chipNumber" type="text" class="form-input" placeholder="Número de chip (opcional)" />
      </div>

      <!-- Campo para subir imagen -->
      <div class="form-group">
        <label for="photo" class="form-label">Foto de la mascota</label>
        <input id="photo" type="file" @change="handleFileUpload" class="form-input" />
      </div>

      <div class="form-group full-width">
        <button type="submit" class="btn-submit">Actualizar Mascota</button>
      </div>
    </form>
  </div>
</template>

<script>
import { getPetById, updatePet } from '@/services/api'; // Importa las funciones de la API

export default {
  data() {
    return {
      pet: {
        name: '',
        type: '',
        sex: '',
        breed: '',
        age: '',
        weight: '',
        height: '',
        temperament: '',
        chipNumber: '',
        photo: null, // Campo para almacenar la imagen
      },
    };
  },
  async created() {
    // Obtener el ID de la mascota desde la ruta
    const petId = this.$route.params.id;

    // Cargar los datos de la mascota para actualizar
    try {
      const petData = await getPetById(petId);
      this.pet = petData; // Cargar los datos en el formulario
    } catch (error) {
      console.error('Error al cargar los datos de la mascota:', error.message);
    }
  },
  methods: {
    // Manejar la subida de la imagen
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.pet.photo = file;
      }
    },

    // Método para manejar la actualización de la mascota
    async handleSubmit() {
      try {
        const petId = this.$route.params.id;
        const formData = new FormData();

        // Añadir los datos de la mascota al FormData
        formData.append('name', this.pet.name);
        formData.append('type', this.pet.type);
        formData.append('sex', this.pet.sex);
        formData.append('breed', this.pet.breed);
        formData.append('age', this.pet.age);
        formData.append('weight', this.pet.weight);
        formData.append('height', this.pet.height);
        formData.append('temperament', this.pet.temperament);
        formData.append('chipNumber', this.pet.chipNumber);

        // Solo añadir la foto si el usuario sube una nueva
        if (this.pet.photo) {
          formData.append('photo', this.pet.photo);
        }

        // Obtener el ID del usuario (dueño) desde el localStorage
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user._id) {
          // Asegúrate de que 'owners' sea un array
          formData.append('owners[]', user._id); // Asegurarse de enviar 'owners' como un array
        } else {
          throw new Error('No se pudo encontrar el ID del usuario.');
        }

        // Actualizar la mascota con los datos
        await updatePet(petId, formData);

        // Redirigir al listado de mascotas después de actualizar
        this.$router.push('/pets/list');
      } catch (error) {
        console.error('Error al actualizar mascota:', error.response?.data || error.message);
      }
    },
  },
};
</script>

<style scoped>
/* Los mismos estilos que en el formulario de creación */
.form-container {
  max-width: 700px;
  margin: 0 auto;
  background-color: #ffffff;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.form-title {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 2rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: 1rem;
  color: #555;
  margin-bottom: 0.5rem;
  text-align: left;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: border-color 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #6200ea;
}

.full-width {
  grid-column: span 2;
}

.btn-submit {
  display: block;
  width: 100%;
  padding: 0.75rem;
  background-color: #6200ea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.btn-submit:hover {
  background-color: #5b00d1;
  transform: translateY(-3px);
}

.btn-submit:focus {
  outline: none;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .btn-submit {
    font-size: 1rem;
  }
}
</style>
