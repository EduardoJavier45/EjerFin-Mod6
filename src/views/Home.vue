<template>
  <div class="home">
    <!-- Sección del héroe -->
    <section class="hero">
      <h1>🌤️ Pronóstico del Tiempo</h1>
      <p>Descubre el clima actual en diferentes ciudades del mundo</p>
    </section>

    <!-- Filtro de búsqueda e interactividad -->
    <section class="search-section">
      <div class="search-container">
        <div class="search-input-group">
          <span class="search-icon">🔍</span>
          <input 
            type="text" 
            v-model="filtroTexto"
            placeholder="Buscar ciudades..." 
            class="search-input"
          >
        </div>
        <button 
          @click="alternarUnidades" 
          class="units-toggle"
          :class="{ active: esCelsius }"
        >
          {{ esCelsius ? '°C' : '°F' }}
        </button>
      </div>
    </section>

    <!-- Lista de lugares -->
    <section class="lugares-grid">
      <div 
        v-for="lugar in lugaresFiltrados" 
        :key="lugar.id" 
        class="lugar-card"
      >
        <!-- Información del lugar -->
        <div class="card-header">
          <h3 class="lugar-nombre">{{ lugar.nombre }}</h3>
          <span class="lugar-pais">{{ lugar.pais }}</span>
        </div>

        <div class="clima-info">
          <div class="temperatura-principal">
            <span class="temp-valor">{{ convertirTemperatura(lugar.temperatura) }}</span>
            <span class="temp-unidad">{{ esCelsius ? '°C' : '°F' }}</span>
          </div>
          
          <div class="clima-detalle">
            <span class="clima-icono">{{ lugar.clima.icono }}</span>
            <span class="clima-descripcion">{{ lugar.clima.descripcion }}</span>
          </div>
        </div>

        <div class="estadisticas-rapidas">
          <div class="stat-item">
            <span class="stat-label">Humedad</span>
            <span class="stat-value">{{ lugar.humedad }}%</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Viento</span>
            <span class="stat-value">{{ lugar.viento }} km/h</span>
          </div>
        </div>

        <!-- Botón para ver detalle -->
        <router-link 
          :to="{ name: 'DetalleLugar', params: { id: lugar.id } }" 
          class="ver-detalle-btn"
        >
          Ver Pronóstico Completo
        </router-link>
      </div>
    </section>

    <!-- Mensaje cuando no hay resultados -->
    <div v-if="lugaresFiltrados.length === 0" class="no-resultados">
      <h3>🔍 No se encontraron lugares</h3>
      <p>Intenta con otro término de búsqueda</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      filtroTexto: '',
      esCelsius: true,
      lugares: [
        {
          id: 1,
          nombre: 'Madrid',
          pais: 'España',
          temperatura: 22,
          humedad: 65,
          viento: 12,
          clima: {
            icono: '☀️',
            descripcion: 'Soleado'
          }
        },
        {
          id: 2,
          nombre: 'Londres',
          pais: 'Reino Unido',
          temperatura: 15,
          humedad: 78,
          viento: 8,
          clima: {
            icono: '🌧️',
            descripcion: 'Lluvioso'
          }
        },
        {
          id: 3,
          nombre: 'Tokio',
          pais: 'Japón',
          temperatura: 28,
          humedad: 72,
          viento: 15,
          clima: {
            icono: '⛅',
            descripcion: 'Parcialmente nublado'
          }
        },
        {
          id: 4,
          nombre: 'Nueva York',
          pais: 'Estados Unidos',
          temperatura: 18,
          humedad: 55,
          viento: 20,
          clima: {
            icono: '🌤️',
            descripcion: 'Parcialmente soleado'
          }
        },
        {
          id: 5,
          nombre: 'Santiago',
          pais: 'Chile',
          temperatura: 25,
          humedad: 45,
          viento: 10,
          clima: {
            icono: '☀️',
            descripcion: 'Despejado'
          }
        },
        {
          id: 6,
          nombre: 'Sídney',
          pais: 'Australia',
          temperatura: 20,
          humedad: 68,
          viento: 18,
          clima: {
            icono: '🌦️',
            descripcion: 'Chubascos'
          }
        }
      ]
    }
  },
  computed: {
    lugaresFiltrados() {
      if (!this.filtroTexto) {
        return this.lugares
      }
      
      return this.lugares.filter(lugar => 
        lugar.nombre.toLowerCase().includes(this.filtroTexto.toLowerCase()) ||
        lugar.pais.toLowerCase().includes(this.filtroTexto.toLowerCase())
      )
    }
  },
  methods: {
    alternarUnidades() {
      this.esCelsius = !this.esCelsius
    },
    
    convertirTemperatura(celsius) {
      if (this.esCelsius) {
        return celsius
      }
      // Conversión de Celsius a Fahrenheit
      return Math.round((celsius * 9/5) + 32)
    }
  }
}
</script>

<style scoped>
.home {
  padding: 0;
}

/* Hero Section */
.hero {
  text-align: center;
  padding: 3rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  margin-bottom: 2rem;
  color: white;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 300;
}

.hero p {
  font-size: 1.2rem;
  opacity: 0.9;
}

/* Search Section */
.search-section {
  margin-bottom: 2rem;
}

.search-container {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.search-input-group {
  position: relative;
  flex: 1;
  max-width: 400px;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  font-size: 1.2rem;
}

.search-input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 25px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  color: white;
  transition: all 0.3s ease;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.search-input:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
}

.units-toggle {
  padding: 1rem 1.5rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 60px;
}

.units-toggle:hover,
.units-toggle.active {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
  transform: scale(1.05);
}

/* Grid de lugares */
.lugares-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.lugar-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  color: white;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.lugar-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
}

.card-header {
  text-align: center;
}

.lugar-nombre {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.lugar-pais {
  font-size: 0.9rem;
  opacity: 0.8;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
}

.clima-info {
  text-align: center;
}

.temperatura-principal {
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.temp-valor {
  font-size: 3rem;
  font-weight: 300;
}

.temp-unidad {
  font-size: 1.5rem;
  opacity: 0.8;
}

.clima-detalle {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.clima-icono {
  font-size: 1.5rem;
}

.clima-descripcion {
  font-size: 1rem;
  opacity: 0.9;
}

.estadisticas-rapidas {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
}

.stat-item {
  text-align: center;
}

.stat-label {
  display: block;
  font-size: 0.8rem;
  opacity: 0.7;
  margin-bottom: 0.25rem;
}

.stat-value {
  font-weight: 600;
  font-size: 1rem;
}

.ver-detalle-btn {
  padding: 1rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  text-decoration: none;
  border-radius: 15px;
  text-align: center;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.ver-detalle-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.no-resultados {
  text-align: center;
  padding: 3rem;
  color: white;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
}

.no-resultados h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

/* Responsive */
@media (max-width: 768px) {
  .hero h1 {
    font-size: 2rem;
  }
  
  .lugares-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .search-container {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-input-group {
    max-width: none;
  }
}
</style>