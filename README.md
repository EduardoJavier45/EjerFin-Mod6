# 🌤️ Clima SPA - Aplicación del Clima con Vue.js

## 📋 Descripción del Proyecto

**Clima SPA** es una Single Page Application (SPA) desarrollada con Vue.js 3 y Vue Router que permite a los usuarios consultar el pronóstico del tiempo de diferentes ciudades del mundo. La aplicación ofrece información detallada sobre el clima actual, pronósticos de 7 días y estadísticas semanales de temperatura.

Este proyecto fue desarrollado como parte del **Ejercicio Final del Módulo 6** del curso **Desarrollador Frontend Trainee Sence**, aplicando conceptos fundamentales de Vue.js como:
- Enrutamiento con Vue Router
- Componentes reutilizables
- Directivas (v-for, v-if, v-model, @click)
- Data binding bidireccional
- Computed properties
- Props y navegación dinámica

---

## 🎯 Características Principales

### ✅ Funcionalidades Implementadas

1. **Navegación SPA sin recarga de página**: Implementada con Vue Router
2. **Vista Home con listado de ciudades**: Muestra 6 ciudades con su clima actual
3. **Vista de Detalle Dinámico**: Información completa de cada ciudad
4. **Búsqueda y filtrado en tiempo real**: Input con v-model para filtrar ciudades
5. **Conversión de unidades**: Botón para alternar entre Celsius y Fahrenheit
6. **Pronóstico de 7 días**: Con información detallada para cada día
7. **Estadísticas semanales**: Temperaturas máxima, mínima y promedio
8. **Diseño responsive**: Adaptable a diferentes tamaños de pantalla
9. **Animaciones y transiciones**: Efectos visuales suaves

---

## 🗂️ Estructura del Proyecto

```
EjerFin-Mod6/
│
├── index.html                 # Punto de entrada HTML
├── package.json               # Dependencias y scripts del proyecto
├── vite.config.js            # Configuración de Vite
├── README.md                 # Documentación del proyecto
│
├── css/
│   └── styles.css            # Estilos CSS adicionales
│
├── src/
│   ├── main.js               # Punto de entrada de Vue
│   ├── App.vue               # Componente raíz con navegación global
│   │
│   ├── router/
│   │   └── index.js          # Configuración de Vue Router
│   │
│   ├── views/
│   │   ├── Home.vue          # Vista principal con listado de ciudades
│   │   └── DetalleLugar.vue  # Vista de detalle de cada ciudad
│   │
│   └── components/           # Componentes reutilizables (vacío por ahora)
│
└── images/                   # Recursos de imágenes
```

---

## 🛣️ Rutas Configuradas

La aplicación utiliza Vue Router con las siguientes rutas:

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | Home.vue | Vista principal que muestra el listado de todas las ciudades disponibles con su clima actual |
| `/lugar/:id` | DetalleLugar.vue | Vista dinámica que muestra el detalle completo de una ciudad específica basándose en su ID |

### Explicación de las Rutas:

#### 1. **Ruta Home (`/`)**
- **Componente**: `Home.vue`
- **Propósito**: Punto de entrada de la aplicación
- **Funcionalidades**:
  - Listado de 6 ciudades (Madrid, Londres, Tokio, Nueva York, Santiago, Sídney)
  - Input de búsqueda con filtrado en tiempo real (v-model)
  - Botón para alternar entre °C y °F
  - Tarjetas clickeables que redirigen al detalle

#### 2. **Ruta Dinámica de Detalle (`/lugar/:id`)**
- **Componente**: `DetalleLugar.vue`
- **Propósito**: Mostrar información detallada de una ciudad específica
- **Parámetro dinámico**: `:id` (ID de la ciudad)
- **Funcionalidades**:
  - Captura el ID desde la URL usando props
  - Muestra clima actual y estadísticas
  - Pronóstico de 7 días con v-for
  - Estadísticas de la semana (máx, mín, promedio)
  - Validación con v-if para IDs inexistentes
  - Botones para volver al inicio

---

## 🚀 Comandos para Ejecutar el Proyecto

### 📦 Instalación de Dependencias

Antes de ejecutar el proyecto por primera vez, instala las dependencias:

```bash
npm install
```

### 🔥 Modo de Desarrollo

Para iniciar el servidor de desarrollo con hot-reload:

```bash
npm run dev
```

La aplicación estará disponible en: **http://localhost:5173**

### 🏗️ Compilar para Producción

Para generar una versión optimizada para producción:

```bash
npm run build
```

Los archivos compilados se generarán en la carpeta `dist/`

### 👀 Previsualizar Build de Producción

Para previsualizar la versión de producción localmente:

```bash
npm run preview
```

---

## 🛠️ Tecnologías Utilizadas

- **Vue.js 3.2.47**: Framework progresivo de JavaScript
- **Vue Router 4.1.6**: Sistema de enrutamiento oficial de Vue
- **Vite 4.0.0**: Herramienta de build rápida
- **JavaScript ES6+**: Sintaxis moderna de JavaScript
- **CSS3**: Estilos con Flexbox, Grid y animaciones
- **HTML5**: Estructura semántica

---

## 📚 Directivas de Vue Utilizadas

El proyecto implementa las siguientes directivas de Vue:

### 1. **v-for** (Renderizado de listas)
```vue
<!-- Iteración de ciudades en Home.vue -->
<div v-for="lugar en lugaresFiltrados" :key="lugar.id" class="lugar-card">
  <!-- contenido -->
</div>

<!-- Iteración de pronóstico en DetalleLugar.vue -->
<div v-for="dia in lugar.pronostico" :key="dia.dia" class="pronostico-card">
  <!-- contenido -->
</div>
```

### 2. **v-model** (Two-way binding)
```vue
<!-- Input de búsqueda en Home.vue -->
<input 
  type="text" 
  v-model="filtroTexto"
  placeholder="Buscar ciudades..." 
>
```

### 3. **v-if / v-else** (Renderizado condicional)
```vue
<!-- Validación en DetalleLugar.vue -->
<div v-if="!lugarEncontrado" class="lugar-no-encontrado">
  <h2>Lugar no encontrado</h2>
</div>

<div v-else class="detalle-contenido">
  <!-- contenido del detalle -->
</div>
```

### 4. **@click** (Manejo de eventos)
```vue
<!-- Alternar unidades en Home.vue -->
<button @click="alternarUnidades" class="units-toggle">
  {{ esCelsius ? '°C' : '°F' }}
</button>

<!-- Navegación programática en DetalleLugar.vue -->
<button @click="volverHome" class="btn-volver">
  ⬅️ Volver al Inicio
</button>
```

### 5. **:class** (Binding dinámico de clases)
```vue
<button 
  :class="{ active: esCelsius }"
  @click="alternarUnidades"
>
```

### 6. **{{ }}** (Interpolación)
```vue
<span class="temperatura">{{ lugar.temperatura }}°C</span>
<h3>{{ lugar.nombre }}</h3>
```

---

## 📊 Datos Mockeados

La aplicación utiliza datos ficticios (mock) para simular una API de clima. Cada ciudad incluye:

- ID único
- Nombre y país
- Temperatura actual (°C)
- Humedad (%)
- Velocidad del viento (km/h)
- Sensación térmica
- Visibilidad
- Descripción del clima con emoji
- Pronóstico de 7 días con:
  - Día de la semana
  - Temperaturas máxima y mínima
  - Probabilidad de precipitación
  - Velocidad del viento

### Ciudades Disponibles:

1. **Madrid, España** 🇪🇸
2. **Londres, Reino Unido** 🇬🇧
3. **Tokio, Japón** 🇯🇵
4. **Nueva York, Estados Unidos** 🇺🇸
5. **Santiago, Chile** 🇨🇱
6. **Sídney, Australia** 🇦🇺

---

## 🎨 Características de Diseño

- **Paleta de Colores**: Gradientes azules que evocan el cielo
- **Tipografía**: Segoe UI, moderna y legible
- **Iconos**: Emojis para representar condiciones climáticas
- **Cards**: Tarjetas con sombras y efectos hover
- **Responsive Design**: Adaptable a móviles, tablets y escritorio
- **Glassmorphism**: Efecto de vidrio esmerilado en la navbar

---

## 🔄 Control de Versiones

El proyecto utiliza Git para el control de versiones. Se realizaron commits descriptivos en las siguientes etapas:

1. **Commit inicial**: Configuración de Vue Router y estructura base
2. **Implementación Home**: Componente con listado y filtrado
3. **Implementación Detalle**: Vista dinámica con pronósticos
4. **Documentación**: Creación del README.md completo

---

## 📦 Empaquetado y Entrega

Para crear el archivo ZIP de entrega:

```bash
# En Linux/Mac
zip -r EjerFin-Mod6-ClimaApp.zip EjerFin-Mod6/ -x "*/node_modules/*" "*/dist/*"

# En Windows (PowerShell)
Compress-Archive -Path EjerFin-Mod6 -DestinationPath EjerFin-Mod6-ClimaApp.zip -Force
```

**Nota**: El archivo ZIP debe incluir el código fuente, estilos, README.md, pero **excluye** las carpetas `node_modules` y `dist` (se pueden regenerar con `npm install` y `npm run build`).

---

## 🎓 Aprendizajes Clave

Durante el desarrollo de este proyecto se aplicaron:

- ✅ Configuración y uso de Vue Router
- ✅ Creación de rutas estáticas y dinámicas
- ✅ Navegación programática con `this.$router.push()`
- ✅ Paso de parámetros en rutas con props
- ✅ Uso de `<router-link>` y `<router-view>`
- ✅ Directivas fundamentales de Vue (v-for, v-if, v-model)
- ✅ Manejo de eventos con @click
- ✅ Computed properties para cálculos reactivos
- ✅ Data binding bidireccional
- ✅ Componentización y reutilización de código
- ✅ Estilos scoped en componentes Vue

---

## 🔗 Enlaces del Proyecto

- **Repositorio GitHub**: [https://github.com/EduardoJavier45/EjerFin-Mod6](https://github.com/EduardoJavier45/EjerFin-Mod6)
- **Demo en vivo**: [Disponible tras el deploy]

---

## 👨‍💻 Autor

**Trainee Developer**  
Ejercicio Final - Módulo 6 - Desarrollo Frontend  
**Curso: Desarrollador Frontend Trainee Sence**  
Año: 2026

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el campo `license` en `package.json` para más detalles.

---

## 🙏 Agradecimientos

Gracias por revisar este proyecto. Espero que cumpla con todos los requisitos de la rúbrica:

- ✅ Uso de Vue Router
- ✅ Rutas estática (/) y dinámica (/lugar/:id)
- ✅ Directivas de Vue (v-for, v-if, v-model, @click)
- ✅ Interpolación con {{ }}
- ✅ Datos mockeados estructurados
- ✅ Navegación entre vistas
- ✅ Documentación completa
- ✅ Control de versiones con Git

---

**¡Disfruta explorando el clima! 🌍☀️🌧️**
