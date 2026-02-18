<template>
  <div id="app">
    <!-- Barra de navegación global -->
    <nav class="navbar">
      <div class="nav-container">
        <h1 class="nav-title">
          <router-link to="/" class="nav-brand">
            🌤️ Clima App
          </router-link>
        </h1>
        <div class="nav-links">
          <router-link to="/" class="nav-link" active-class="active">
            🏠 Inicio
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Vista principal donde se renderizan los componentes -->
    <main class="main-content">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="footer">
      <p>&copy; 2026 Clima SPA - Ejercicio Final Módulo 6</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* Reset básico */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
  min-height: 100vh;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Navbar */
.navbar {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-title {
  font-size: 0; /* Oculta el h1, pero mantiene la semántica */
}

.nav-brand {
  font-size: 1.8rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  transition: transform 0.3s ease;
}

.nav-brand:hover {
  transform: scale(1.05);
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.nav-link:hover,
.nav-link.active {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

/* Main content */
.main-content {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

/* Footer */
.footer {
  background: rgba(0, 0, 0, 0.2);
  color: white;
  text-align: center;
  padding: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* Responsive */
@media (max-width: 768px) {
  .nav-container {
    padding: 0 1rem;
  }
  
  .nav-brand {
    font-size: 1.5rem;
  }
  
  .main-content {
    padding: 1rem;
  }
}

/* Animaciones globales */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>