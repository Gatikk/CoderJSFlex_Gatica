//Variables Globales (Compartidas con carrito.js)
let carrito = JSON.parse(localStorage.getItem('carritoVigente')) || [];
let productos = []; 

//Nodos del DOM específicos de la tienda principal
const contenedorProductos = document.getElementById('contenedor-productos');
const inputBuscador = document.getElementById('input-buscador');
const selectOrden = document.getElementById('select-orden');

//FETCH Y ARRANQUE
const cargarProductos = async () => {
    try {
        const respuesta = await fetch('productos.json');
        const data = await respuesta.json();
        productos = data;
        inicializarApp(); 
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un problema al cargar los productos.'
        });
    } finally {
        inputBuscador.disabled = false;
    }
}

function inicializarApp() {
    carrito.forEach(prodEnCarrito => {
        const productoOriginal = productos.find(p => p.id === prodEnCarrito.id);
        if (productoOriginal) {
            productoOriginal.stock -= prodEnCarrito.cantidadEnCarrito;
        }
    });
    renderizarProductos();
    if (typeof renderizarCarrito === 'function') {
        renderizarCarrito(); 
    }
}

//RENDERIZADORES Y FILTROS
function renderizarProductos(arrayARenderizar = productos) {
    contenedorProductos.innerHTML = ''; 
    
    arrayARenderizar.forEach((producto) => {
        const div = document.createElement('div');
        div.classList.add('tarjeta-producto'); 
        
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="img-producto">
            <h3>${producto.nombre}</h3>
            <p class="precio">$${producto.precio.toLocaleString()}</p>
            <p class="stock">Stock disponible: <span id="stock-${producto.id}">${producto.stock}</span></p>
            
            <div class="controles-agregar">
                <input type="number" id="cantidad-${producto.id}" class="input-cantidad" value="1" min="1" max="${producto.stock}" ${producto.stock === 0 ? 'disabled' : ''}>
                <button id="btn-agregar-${producto.id}" class="btn-agregar" ${producto.stock === 0 ? 'disabled' : ''}>
                    ${producto.stock === 0 ? 'Sin stock' : 'Agregar'}
                </button>
            </div>
        `;
        contenedorProductos.appendChild(div);

        if (producto.stock > 0) {
            const botonAgregar = document.getElementById(`btn-agregar-${producto.id}`);
            const inputCantidad = document.getElementById(`cantidad-${producto.id}`);

            botonAgregar.addEventListener('click', () => {
                const cantidad = parseInt(inputCantidad.value); // Leemos el NumericUpDown
                
                // Validamos que la cantidad sea válida y no supere el stock
                if (cantidad > 0 && cantidad <= producto.stock) {
                    if (typeof AgregarAlCarrito === 'function') {
                        AgregarAlCarrito(producto.id, cantidad); // Le pasamos la cantidad!
                    }
                } else {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Stock insuficiente',
                        text: `Solo tenemos ${producto.stock} unidades disponibles de este producto.`,
                        confirmButtonColor: '#2563eb'
                    });
                    inputCantidad.value = 1; // Reseteamos el input
                }
            });
        }
    });
}

function aplicarFiltros() {
    const textoBusqueda = inputBuscador.value.toLowerCase();
    
    let productosFiltrados = productos.filter(producto => 
        producto.nombre.toLowerCase().includes(textoBusqueda)
    );

    const valorOrden = selectOrden.value;
    if (valorOrden === 'menor') {
        productosFiltrados.sort((a, b) => a.precio - b.precio);
    } else if (valorOrden === 'mayor') {
        productosFiltrados.sort((a, b) => b.precio - a.precio);
    }

    if (productosFiltrados.length === 0) {
        contenedorProductos.innerHTML = '<p style="text-align:center; width:100%; font-size:1.2rem; color:#64748b;">No se encontraron productos que coincidan con tu búsqueda.</p>';
        return;
    }

    renderizarProductos(productosFiltrados);
}

//EVENTOS DE BÚSQUEDA
inputBuscador.addEventListener('input', aplicarFiltros);
selectOrden.addEventListener('change', aplicarFiltros);

//Arranque inicial al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos(); 
});