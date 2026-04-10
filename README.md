# Smartify - Simulador de E-commerce (Domótica)

Este proyecto es el trabajo final para el curso de JavaScript de Coderhouse. Consiste en un simulador interactivo de **Smartify**, una tienda online ficticia de productos de domótica (Smart Home).

## 🚀 Guía para el corrector / Puntos destacados

Para evaluar el simulador, podés seguir este circuito de pruebas:

1. **Catálogo y Filtros:** Carga asíncrona desde `productos.json` usando `fetch` (con manejo de errores `try/catch/finally`). Mientras carga, el buscador permanece deshabilitado.
2. **Control de Stock y Cantidades:** Se implementó un input numérico (NumericUpDown) para agregar múltiples unidades a la vez, con validación estricta de stock disponible en tiempo real.
3. **Gestión del Carrito:** Panel lateral interactivo con cálculo dinámico del total, guardado en `localStorage` y eliminación individual (restituyendo el stock a la tienda).
4. **Checkout (Simulación):** Al comprar, se despliega un formulario (SweetAlert2) con datos pre-completados de fantasía para agilizar la prueba. Finaliza limpiando el storage y la sesión.
5. **Vaciar Carrito:** Botón de vaciado general que requiere confirmación, restaura todo el stock original y limpia la vista.

## 🛠️ Tecnologías aplicadas
* HTML5 / CSS3
* JavaScript (ES6+) estructurado en módulos (`app.js` y `carrito.js`).
* Fetch API, Promesas y control asíncrono.
* DOM, Eventos y Web Storage (`localStorage`).
* SweetAlert2.