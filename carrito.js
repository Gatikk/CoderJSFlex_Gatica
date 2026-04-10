//Nodos del DOM
const contenedorCarrito = document.getElementById('contenedor-carrito');
const precioTotal = document.getElementById('precio-total');
const btnComprar = document.getElementById('btn-comprar');
const btnVaciar = document.getElementById('btn-vaciar');
const panelCarrito = document.getElementById('panel-carrito');
const btnAbrirCarrito = document.getElementById('btn-abrir-carrito');
const btnCerrarCarrito = document.getElementById('btn-cerrar-carrito');
const contadorCarrito = document.getElementById('contador-carrito');

//Renderizadores
function renderizarCarrito() {
    contenedorCarrito.innerHTML = ''; 
    let cantidadTotal = 0;

    carrito.forEach((prod) => {
        cantidadTotal += prod.cantidadEnCarrito; 

        const div = document.createElement('div');
        div.classList.add('item-carrito');
        div.innerHTML = `
            <div class="info-item-carrito">
                <span class="nombre-item">${prod.nombre}</span>
                <span class="precio-item">$${prod.precio.toLocaleString()} (x${prod.cantidadEnCarrito})</span>
            </div>
            <button class="btn-eliminar" onclick="EliminarDelCarrito(${prod.id})" title="Eliminar un producto">
                🗑️
            </button>
        `;
        contenedorCarrito.appendChild(div);
    });

    contadorCarrito.innerText = cantidadTotal; 
    actualizarTotal();
}

function actualizarTotal() {
    const total = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidadEnCarrito), 0);
    precioTotal.innerText = total.toLocaleString(); 
}

function guardarCarritoEnStorage() {
    localStorage.setItem('carritoVigente', JSON.stringify(carrito));
}

//Agregar, Eliminar y Vaciar Carrito
function AgregarAlCarrito(prodId, cantidad) {
    const productoSeleccionado = productos.find(x => x.id === prodId);
    
    if (productoSeleccionado && productoSeleccionado.stock >= cantidad) {
        const productoEnCarrito = carrito.find(x => x.id === prodId);

        if (productoEnCarrito) {
            productoEnCarrito.cantidadEnCarrito += cantidad; // Sumamos la cantidad elegida
        } else {
            carrito.push({ ...productoSeleccionado, cantidadEnCarrito: cantidad });
        }
        
        productoSeleccionado.stock -= cantidad;
        guardarCarritoEnStorage(); 
        aplicarFiltros(); // Esto re-renderiza la grilla para actualizar los inputs y el stock visual
        renderizarCarrito();
        
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `¡Se agregaron ${cantidad}x ${productoSeleccionado.nombre}!`,
            showConfirmButton: false,
            timer: 1500,
            toast: true
        });
    }
}

window.EliminarDelCarrito = function(id) {
    const productoEnCarrito = carrito.find(x => x.id === id);
    const productoOriginal = productos.find(x => x.id === id);

    if (productoEnCarrito) {
        productoEnCarrito.cantidadEnCarrito--;
        if (productoOriginal) {
            productoOriginal.stock++;
        }

        if (productoEnCarrito.cantidadEnCarrito === 0) {
            carrito = carrito.filter(x => x.id !== id);
        }
    }
    
    guardarCarritoEnStorage();
    aplicarFiltros(); 
    renderizarCarrito();
}

function vaciarTodo() {
    carrito.forEach(prodCarrito => {
        const productoOriginal = productos.find(x => x.id === prodCarrito.id);
        if (productoOriginal) {
            productoOriginal.stock += prodCarrito.cantidadEnCarrito;
        }
    });
    
    carrito = [];
    localStorage.removeItem('carritoVigente');
    aplicarFiltros();
    renderizarCarrito();
}

//Eventos Panel Carrito
btnAbrirCarrito.addEventListener('click', () => {
    panelCarrito.classList.add('panel-abierto');
});

btnCerrarCarrito.addEventListener('click', () => {
    panelCarrito.classList.remove('panel-abierto');
});

btnVaciar.addEventListener('click', () => {
    if (carrito.length === 0) {
        Swal.fire({ title: 'Nada que vaciar', text: 'Tu carrito ya está vacío.', icon: 'info', timer: 2000, showConfirmButton: false });
        return;
    }

    Swal.fire({
        title: '¿Estás seguro?',
        text: "Los productos volverán al stock de la tienda.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, vaciar carrito',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            vaciarTodo();
            Swal.fire({ title: '¡Vaciado!', text: 'Tu carrito ha sido vaciado.', icon: 'success', timer: 1500, showConfirmButton: false });
        }
    });
});

//Checkout con datos pre-completados
btnComprar.addEventListener('click', () => {
    if (carrito.length > 0) {
        Swal.fire({
            title: 'Datos de Facturación y Pago',
            html: `
                <div style="display: flex; flex-direction: column; gap: 15px; text-align: left; margin-top: 10px;">
                    <div>
                        <label style="font-weight: bold; font-size: 0.9rem; color: #1e293b;">Nombre y Apellido</label>
                        <input id="swal-nombre" class="swal2-input" value="Agustín Gatica" style="margin: 5px 0 0 0; width: 100%; box-sizing: border-box;">
                    </div>
                    <div>
                        <label style="font-weight: bold; font-size: 0.9rem; color: #1e293b;">Correo Electrónico</label>
                        <input id="swal-email" type="email" class="swal2-input" value="agustin.gatica@coderjsflex.com" style="margin: 5px 0 0 0; width: 100%; box-sizing: border-box;">
                    </div>
                    <div>
                        <label style="font-weight: bold; font-size: 0.9rem; color: #1e293b;">Número de Tarjeta (Ficticia)</label>
                        <input id="swal-tarjeta" class="swal2-input" value="1234 4567 9898 0101" style="margin: 5px 0 0 0; width: 100%; box-sizing: border-box;">
                    </div>
                    <div style="display: flex; gap: 15px;">
                        <div style="flex: 1;">
                            <label style="font-weight: bold; font-size: 0.9rem; color: #1e293b;">Vencimiento</label>
                            <input id="swal-venc" class="swal2-input" value="12/28" style="margin: 5px 0 0 0; width: 100%; box-sizing: border-box;">
                        </div>
                        <div style="flex: 1;">
                            <label style="font-weight: bold; font-size: 0.9rem; color: #1e293b;">CVV</label>
                            <input id="swal-cvv" class="swal2-input" type="password" value="123" style="margin: 5px 0 0 0; width: 100%; box-sizing: border-box;">
                        </div>
                    </div>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: 'Confirmar Pago',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#2563eb',
            cancelButtonColor: '#d33',
            preConfirm: () => {
                const nombre = document.getElementById('swal-nombre').value;
                if (!nombre) {
                    Swal.showValidationMessage('El nombre es obligatorio');
                }
                return { nombre: nombre };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: '¡Pago Aprobado!',
                    text: `Gracias por tu compra en Smartify, ${result.value.nombre}. Te enviamos el comprobante por email.`,
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#4CAF50'
                });
                
                carrito = [];
                localStorage.removeItem('carritoVigente');
                renderizarCarrito();
                panelCarrito.classList.remove('panel-abierto');
            }
        });

    } else {
        Swal.fire({ title: 'Ups...', text: 'El carrito está vacío.', icon: 'error', confirmButtonText: 'Entendido', confirmButtonColor: '#f27474' });
    }
});