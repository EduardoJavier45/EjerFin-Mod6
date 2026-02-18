// JavaScript para EjerFin-Mod6
document.addEventListener('DOMContentLoaded', function() {
    console.log('EjerFin-Mod6 cargado correctamente!');
    
    // Animaciones de entrada
    animateElements();
    
    // Configurar eventos
    setupEventListeners();
    
    // Navegación suave
    setupSmoothScrolling();
});

// Función para animar elementos al cargar
function animateElements() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.classList.add('fade-in');
        }, index * 200);
    });
}

// Configurar todos los event listeners
function setupEventListeners() {
    // Botón de la sección hero
    const btnClick = document.getElementById('btn-click');
    if (btnClick) {
        btnClick.addEventListener('click', handleHeroButtonClick);
    }
    
    // Formulario de contacto
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Efectos hover para botones
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', handleButtonHover);
        button.addEventListener('mouseleave', handleButtonLeave);
    });
}

// Manejador del botón hero
function handleHeroButtonClick() {
    const messages = [
        '¡Excelente! Has hecho clic en el botón 🎉',
        '¡Genial! El JavaScript está funcionando 🚀',
        '¡Fantástico! Interacción exitosa ✨',
        '¡Increíble! Todo funciona perfectamente 🎯'
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    // Crear y mostrar notificación
    showNotification(randomMessage);
    
    // Añadir efecto visual al botón
    const button = document.getElementById('btn-click');
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
}

// Manejador del formulario
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Obtener datos del formulario
    const formData = new FormData(e.target);
    const data = {
        nombre: formData.get('nombre'),
        email: formData.get('email'),
        mensaje: formData.get('mensaje')
    };
    
    // Validación básica
    if (validateForm(data)) {
        // Simular envío
        showNotification('¡Formulario enviado correctamente! 📧', 'success');
        e.target.reset();
    } else {
        showNotification('Por favor, completa todos los campos correctamente ❌', 'error');
    }
}

// Validación del formulario
function validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    return data.nombre.trim().length > 0 &&
           emailRegex.test(data.email) &&
           data.mensaje.trim().length > 10;
}

// Efectos de hover para botones
function handleButtonHover(e) {
    e.target.style.transform = 'translateY(-2px) scale(1.05)';
}

function handleButtonLeave(e) {
    e.target.style.transform = 'translateY(0) scale(1)';
}

// Navegación suave
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    // Remover notificación existente si la hay
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Crear nueva notificación
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Estilos de la notificación
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '600',
        zIndex: '1000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        backgroundColor: type === 'error' ? '#e74c3c' : 
                        type === 'success' ? '#27ae60' : '#3498db'
    });
    
    // Añadir al DOM
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Utilidades adicionales
const Utils = {
    // Función para formatear fecha
    formatDate: (date) => {
        return new Date(date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },
    
    // Función para generar ID único
    generateId: () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    },
    
    // Función para debounce
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// Exponer funciones globalmente si es necesario
window.EjerFinMod6 = {
    showNotification,
    Utils
};