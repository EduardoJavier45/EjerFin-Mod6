<template>
  <div class="detalle-lugar">
    <!-- Mensaje si no se encuentra el lugar -->
    <div v-if="!lugarEncontrado" class="lugar-no-encontrado">
      <div class="error-content">
        <span class="error-icon">❌</span>
        <h2>Lugar no encontrado</h2>
        <p>El lugar con ID {{ id }} no existe en nuestra base de datos.</p>
        <button @click="volverHome" class="btn-volver">
          ⬅️ Volver al Inicio
        </button>
      </div>
    </div>

    <!-- Contenido del detalle -->
    <div v-else class="detalle-contenido">
      <!-- Botón para volver al inicio -->
      <button @click="volverHome" class="btn-volver-top">
        ⬅️ Volver al Inicio
      </button>

      <!-- Header del lugar -->
      <div class="header-lugar">
        <div class="titulo-lugar">
          <h1>{{ lugar.nombre }}</h1>
          <p class="subtitulo">{{ lugar.pais }}</p>
        </div>
        <div class="clima-actual">
          <span class="icono-grande">{{ lugar.clima.icono }}</span>
          <div class="temp-actual">
            <span class="temperatura">{{ lugar.temperatura }}°C</span>
            <span class="descripcion">{{ lugar.clima.descripcion }}</span>
          </div>
        </div>
      </div>

      <!-- Estadísticas actuales -->
      <div class="estadisticas-actuales">
        <div class="stat-card">
          <span class="stat-icon">💧</span>
          <div class="stat-info">
            <span class="stat-label">Humedad</span>
            <span class="stat-value">{{ lugar.humedad }}%</span>
          </div>
        </div>
        <div class="stat-card">
          <span class="stat-icon">💨</span>
          <div class="stat-info">
            <span class="stat-label">Viento</span>
            <span class="stat-value">{{ lugar.viento }} km/h</span>
          </div>
        </div>
        <div class="stat-card">
          <span class="stat-icon">🌡️</span>
          <div class="stat-info">
            <span class="stat-label">Sensación térmica</span>
            <span class="stat-value">{{ lugar.sensacionTermica }}°C</span>
          </div>
        </div>
        <div class="stat-card">
          <span class="stat-icon">👁️</span>
          <div class="stat-info">
            <span class="stat-label">Visibilidad</span>
            <span class="stat-value">{{ lugar.visibilidad }} km</span>
          </div>
        </div>
      </div>

      <!-- Pronóstico de la semana -->
      <div class="pronostico-section">
        <h2>📅 Pronóstico de 7 días</h2>
        <div class="pronostico-grid">
          <div 
            v-for="dia in lugar.pronostico" 
            :key="dia.dia"
            class="pronostico-card"
          >
            <h3 class="dia-nombre">{{ dia.dia }}</h3>
            <span class="dia-icono">{{ dia.icono }}</span>
            <div class="temperaturas">
              <span class="temp-max">↑ {{ dia.maxima }}°C</span>
              <span class="temp-min">↓ {{ dia.minima }}°C</span>
            </div>
            <p class="dia-descripcion">{{ dia.descripcion }}</p>
            <div class="detalles-extras">
              <span>💧 {{ dia.precipitacion }}%</span>
              <span>💨 {{ dia.viento }} km/h</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Estadísticas de la semana -->
      <div class="estadisticas-semana">
        <h2>📊 Estadísticas de la Semana</h2>
        <div class="stats-resumen">
          <div class="resumen-card">
            <span class="resumen-icon">🔥</span>
            <div class="resumen-info">
              <span class="resumen-label">Temperatura Máxima</span>
              <span class="resumen-valor">{{ temperaturaMaxima }}°C</span>
            </div>
          </div>
          <div class="resumen-card">
            <span class="resumen-icon">❄️</span>
            <div class="resumen-info">
              <span class="resumen-label">Temperatura Mínima</span>
              <span class="resumen-valor">{{ temperaturaMinima }}°C</span>
            </div>
          </div>
          <div class="resumen-card">
            <span class="resumen-icon">📊</span>
            <div class="resumen-info">
              <span class="resumen-label">Temperatura Promedio</span>
              <span class="resumen-valor">{{ temperaturaPromedio }}°C</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Botón inferior para volver -->
      <button @click="volverHome" class="btn-volver-bottom">
        ⬅️ Volver al Inicio
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetalleLugar',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      // Datos mockeados de lugares con información completa
      lugaresMock: [
        {
          id: 1,
          nombre: 'Madrid',
          pais: 'España',
          temperatura: 22,
          humedad: 65,
          viento: 12,
          sensacionTermica: 24,
          visibilidad: 10,
          clima: {
            icono: '☀️',
            descripcion: 'Soleado'
          },
          pronostico: [
            { dia: 'Lunes', icono: '☀️', maxima: 24, minima: 18, descripcion: 'Despejado', precipitacion: 10, viento: 12 },
            { dia: 'Martes', icono: '⛅', maxima: 23, minima: 17, descripcion: 'Parcialmente nublado', precipitacion: 20, viento: 10 },
            { dia: 'Miércoles', icono: '🌧️', maxima: 20, minima: 15, descripcion: 'Lluvioso', precipitacion: 80, viento: 15 },
            { dia: 'Jueves', icono: '🌤️', maxima: 22, minima: 16, descripcion: 'Soleado con nubes', precipitacion: 30, viento: 8 },
            { dia: 'Viernes', icono: '☀️', maxima: 25, minima: 19, descripcion: 'Despejado', precipitacion: 5, viento: 10 },
            { dia: 'Sábado', icono: '☀️', maxima: 26, minima: 20, descripcion: 'Muy soleado', precipitacion: 0, viento: 7 },
            { dia: 'Domingo', icono: '⛅', maxima: 24, minima: 18, descripcion: 'Parcialmente nublado', precipitacion: 15, viento: 11 }
          ]
        },
        {
          id: 2,
          nombre: 'Londres',
          pais: 'Reino Unido',
          temperatura: 15,
          humedad: 78,
          viento: 8,
          sensacionTermica: 13,
          visibilidad: 8,
          clima: {
            icono: '🌧️',
            descripcion: 'Lluvioso'
          },
          pronostico: [
            { dia: 'Lunes', icono: '🌧️', maxima: 16, minima: 12, descripcion: 'Lluvioso', precipitacion: 75, viento: 10 },
            { dia: 'Martes', icono: '🌦️', maxima: 17, minima: 13, descripcion: 'Chubascos', precipitacion: 60, viento: 12 },
            { dia: 'Miércoles', icono: '☁️', maxima: 16, minima: 11, descripcion: 'Nublado', precipitacion: 40, viento: 8 },
            { dia: 'Jueves', icono: '🌦️', maxima: 15, minima: 10, descripcion: 'Chubascos', precipitacion: 65, viento: 15 },
            { dia: 'Viernes', icono: '⛅', maxima: 18, minima: 13, descripcion: 'Parcialmente nublado', precipitacion: 30, viento: 9 },
            { dia: 'Sábado', icono: '🌤️', maxima: 19, minima: 14, descripcion: 'Soleado con nubes', precipitacion: 20, viento: 7 },
            { dia: 'Domingo', icono: '⛅', maxima: 17, minima: 12, descripcion: 'Parcialmente nublado', precipitacion: 35, viento: 11 }
          ]
        },
        {
          id: 3,
          nombre: 'Tokio',
          pais: 'Japón',
          temperatura: 28,
          humedad: 72,
          viento: 15,
          sensacionTermica: 30,
          visibilidad: 9,
          clima: {
            icono: '⛅',
            descripcion: 'Parcialmente nublado'
          },
          pronostico: [
            { dia: 'Lunes', icono: '⛅', maxima: 29, minima: 24, descripcion: 'Parcialmente nublado', precipitacion: 25, viento: 14 },
            { dia: 'Martes', icono: '☀️', maxima: 30, minima: 25, descripcion: 'Soleado', precipitacion: 10, viento: 12 },
            { dia: 'Miércoles', icono: '🌤️', maxima: 28, minima: 23, descripcion: 'Soleado con nubes', precipitacion: 20, viento: 16 },
            { dia: 'Jueves', icono: '⛅', maxima: 27, minima: 22, descripcion: 'Parcialmente nublado', precipitacion: 30, viento: 18 },
            { dia: 'Viernes', icono: '🌧️', maxima: 26, minima: 21, descripcion: 'Lluvioso', precipitacion: 70, viento: 20 },
            { dia: 'Sábado', icono: '🌦️', maxima: 27, minima: 22, descripcion: 'Chubascos', precipitacion: 55, viento: 17 },
            { dia: 'Domingo', icono: '⛅', maxima: 28, minima: 23, descripcion: 'Parcialmente nublado', precipitacion: 25, viento: 15 }
          ]
        },
        {
          id: 4,
          nombre: 'Nueva York',
          pais: 'Estados Unidos',
          temperatura: 18,
          humedad: 55,
          viento: 20,
          sensacionTermica: 16,
          visibilidad: 10,
          clima: {
            icono: '🌤️',
            descripcion: 'Parcialmente soleado'
          },
          pronostico: [
            { dia: 'Lunes', icono: '🌤️', maxima: 20, minima: 15, descripcion: 'Parcialmente soleado', precipitacion: 15, viento: 18 },
            { dia: 'Martes', icono: '☀️', maxima: 22, minima: 16, descripcion: 'Soleado', precipitacion: 5, viento: 15 },
            { dia: 'Miércoles', icono: '⛅', maxima: 21, minima: 16, descripcion: 'Parcialmente nublado', precipitacion: 20, viento: 22 },
            { dia: 'Jueves', icono: '☁️', maxima: 19, minima: 14, descripcion: 'Nublado', precipitacion: 35, viento: 25 },
            { dia: 'Viernes', icono: '🌦️', maxima: 18, minima: 13, descripcion: 'Chubascos', precipitacion: 60, viento: 28 },
            { dia: 'Sábado', icono: '⛅', maxima: 20, minima: 15, descripcion: 'Parcialmente nublado', precipitacion: 25, viento: 20 },
            { dia: 'Domingo', icono: '☀️', maxima: 23, minima: 17, descripcion: 'Soleado', precipitacion: 10, viento: 16 }
          ]
        },
        {
          id: 5,
          nombre: 'Santiago',
          pais: 'Chile',
          temperatura: 25,
          humedad: 45,
          viento: 10,
          sensacionTermica: 26,
          visibilidad: 12,
          clima: {
            icono: '☀️',
            descripcion: 'Despejado'
          },
          pronostico: [
            { dia: 'Lunes', icono: '☀️', maxima: 27, minima: 20, descripcion: 'Despejado', precipitacion: 0, viento: 8 },
            { dia: 'Martes', icono: '☀️', maxima: 28, minima: 21, descripcion: 'Muy soleado', precipitacion: 0, viento: 9 },
            { dia: 'Miércoles', icono: '🌤️', maxima: 26, minima: 19, descripcion: 'Soleado con nubes', precipitacion: 5, viento: 12 },
            { dia: 'Jueves', icono: '⛅', maxima: 24, minima: 18, descripcion: 'Parcialmente nublado', precipitacion: 10, viento: 15 },
            { dia: 'Viernes', icono: '☀️', maxima: 25, minima: 19, descripcion: 'Despejado', precipitacion: 0, viento: 10 },
            { dia: 'Sábado', icono: '☀️', maxima: 27, minima: 20, descripcion: 'Despejado', precipitacion: 0, viento: 7 },
            { dia: 'Domingo', icono: '🌤️', maxima: 26, minima: 19, descripcion: 'Soleado con nubes', precipitacion: 5, viento: 11 }
          ]
        },
        {
          id: 6,
          nombre: 'Sídney',
          pais: 'Australia',
          temperatura: 20,
          humedad: 68,
          viento: 18,
          sensacionTermica: 19,
          visibilidad: 10,
          clima: {
            icono: '🌦️',
            descripcion: 'Chubascos'
          },
          pronostico: [
            { dia: 'Lunes', icono: '🌦️', maxima: 22, minima: 18, descripcion: 'Chubascos', precipitacion: 50, viento: 16 },
            { dia: 'Martes', icono: '⛅', maxima: 23, minima: 19, descripcion: 'Parcialmente nublado', precipitacion: 30, viento: 14 },
            { dia: 'Miércoles', icono: '☀️', maxima: 24, minima: 20, descripcion: 'Soleado', precipitacion: 10, viento: 12 },
            { dia: 'Jueves', icono: '🌤️', maxima: 23, minima: 19, descripcion: 'Soleado con nubes', precipitacion: 15, viento: 15 },
            { dia: 'Viernes', icono: '⛅', maxima: 22, minima: 18, descripcion: 'Parcialmente nublado', precipitacion: 25, viento: 18 },
            { dia: 'Sábado', icono: '🌧️', maxima: 21, minima: 17, descripcion: 'Lluvioso', precipitacion: 65, viento: 20 },
            { dia: 'Domingo', icono: '🌦️', maxima: 22, minima: 18, descripcion: 'Chubascos', precipitacion: 45, viento: 17 }
          ]
        }
      ]
    }
  },
  computed: {
    // Busca el lugar por ID
    lugar() {
      return this.lugaresMock.find(l => l.id === parseInt(this.id))
    },
    
    // Verifica si el lugar fue encontrado
    lugarEncontrado() {
      return this.lugar !== undefined
    },
    
    // Calcula la temperatura máxima de la semana
    temperaturaMaxima() {
      if (!this.lugar) return 0
      const maximas = this.lugar.pronostico.map(dia => dia.maxima)
      return Math.max(...maximas)
    },
    
    // Calcula la temperatura mínima de la semana
    temperaturaMinima() {
      if (!this.lugar) return 0
      const minimas = this.lugar.pronostico.map(dia => dia.minima)
      return Math.min(...minimas)
    },
    
    // Calcula la temperatura promedio de la semana
    temperaturaPromedio() {
      if (!this.lugar) return 0
      const todasTemperaturas = this.lugar.pronostico.flatMap(dia => [dia.maxima, dia.minima])
      const suma = todasTemperaturas.reduce((acc, temp) => acc + temp, 0)
      return Math.round(suma / todasTemperaturas.length)
    }
  },
  methods: {
    // Método para volver al home
    volverHome() {
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style scoped>
.detalle-lugar {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* Mensaje de error cuando no se encuentra el lugar */
.lugar-no-encontrado {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.error-content {
  background: white;
  padding: 3rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 500px;
}

.error-icon {
  font-size: 4rem;
  display: block;
  margin-bottom: 1rem;
}

.error-content h2 {
  color: #e74c3c;
  margin-bottom: 1rem;
}

.error-content p {
  color: #7f8c8d;
  margin-bottom: 2rem;
}

/* Botones para volver */
.btn-volver,
.btn-volver-top,
.btn-volver-bottom {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn-volver:hover,
.btn-volver-top:hover,
.btn-volver-bottom:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.btn-volver-top {
  margin-bottom: 1.5rem;
}

.btn-volver-bottom {
  width: 100%;
  margin-top: 2rem;
  padding: 1rem;
}

/* Header del lugar */
.header-lugar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 15px;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.titulo-lugar h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.subtitulo {
  font-size: 1.2rem;
  opacity: 0.9;
}

.clima-actual {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.icono-grande {
  font-size: 4rem;
}

.temp-actual {
  display: flex;
  flex-direction: column;
}

.temperatura {
  font-size: 3rem;
  font-weight: bold;
}

.descripcion {
  font-size: 1.2rem;
  opacity: 0.9;
}

/* Estadísticas actuales */
.estadisticas-actuales {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  font-size: 2rem;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-label {
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-bottom: 0.25rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
}

/* Pronóstico de la semana */
.pronostico-section {
  margin-bottom: 2rem;
}

.pronostico-section h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
}

.pronostico-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.pronostico-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.pronostico-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.dia-nombre {
  font-size: 1.1rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.dia-icono {
  font-size: 3rem;
  display: block;
  margin: 0.5rem 0;
}

.temperaturas {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 0.75rem 0;
}

.temp-max {
  color: #e74c3c;
  font-weight: bold;
}

.temp-min {
  color: #3498db;
  font-weight: bold;
}

.dia-descripcion {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin: 0.5rem 0;
}

.detalles-extras {
  display: flex;
  justify-content: center;
  gap: 1rem;
  font-size: 0.85rem;
  color: #95a5a6;
  margin-top: 0.5rem;
}

/* Estadísticas de la semana */
.estadisticas-semana {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.estadisticas-semana h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
}

.stats-resumen {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.resumen-card {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.resumen-card:nth-child(2) {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.resumen-card:nth-child(3) {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.resumen-icon {
  font-size: 2.5rem;
}

.resumen-info {
  display: flex;
  flex-direction: column;
}

.resumen-label {
  font-size: 0.9rem;
  opacity: 0.9;
  margin-bottom: 0.25rem;
}

.resumen-valor {
  font-size: 2rem;
  font-weight: bold;
}

/* Responsive */
@media (max-width: 768px) {
  .detalle-lugar {
    padding: 1rem;
  }
  
  .header-lugar {
    flex-direction: column;
    text-align: center;
  }
  
  .titulo-lugar h1 {
    font-size: 2rem;
  }
  
  .pronostico-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }
  
  .stats-resumen {
    grid-template-columns: 1fr;
  }
}
</style>
