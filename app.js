let carrito = [];

class Producto {
    constructor(id, nombre, precio, cantidad) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }
}

let productos = [
    new Producto(1, "A1", 1200, 8),
    new Producto(2, "A2", 2000, 7),
    new Producto(3, "B1", 1500, 5),
    new Producto(4, "B2", 1600, 10)
];

function AgregarAlCarrito(prodId, cant) {
    if(carrito.find(x=>x.id === prodId)){
        let productoExistente = carrito.find(x=>x.id === prodId)
        if(productoExistente){
            productoExistente.cantidad += cant;
            console.log("Cantidad actualizada del producto: " + productoExistente.nombre)
            alert("Se actualizó la cantidad del producto con éxito en el carrito");
        }
    }else{
        let prod = productos.find(x=>x.id === prodId);
        prod.cantidad = cant;
        carrito.push(prod);
        console.log("Producto agregado al carrito: " + prod.nombre);
        alert("Se agregó el producto con éxito al carrito");
    }
}

function EliminarDelCarrito(id){
    if(carrito.find(x=>x.id === id)){
        let prod = carrito.find(x=>x.id === id);
        carrito = carrito.filter(x => x.id !== id)
        console.log("Producto eliminado del carrito: " + prod.nombre);
        alert("Se eliminó el producto con éxito del carrito");
    }else{
        console.log("No se encontró el producto en el carrito");
        alert("No se encontró el producto en el carrito");
    }
}

function VaciarCarrito(){
    if(carrito.length > 0){
        let confirmarVaciar = confirm("¿Estas seguro que deseas vaciar el carrito?")
        if(confirmarVaciar){
            carrito = [];
            console.log("Se vació el carrito");
            alert("Se vació el carrito con éxito");
        }
    }else{
        console.log("No hay productos en el carrito para vaciar");
        alert("No hay productos en el carrito para vaciar");
    }
}

function VaciarCarritoPostCompra(){
    carrito = [];
    console.log("Se vació el carrito post compra");
}

function CalcularPrecio(){
    let total = 0
    for (let i = 0; i < carrito.length; i++) {
        total += carrito[i].precio * carrito[i].cantidad;
    }
    return total;
}

function MostrarTotal(){
    const total = CalcularPrecio();
    console.log("Total de la compra: "+total+"$")
    alert("Total de la compra: "+total+"$");
}

function RealizarCompra(){
    if(carrito.length > 0){
        let confirmarCompra = confirm("Total de la compra: "+CalcularPrecio()+"$\n¿Estas seguro que deseas realizar la compra?")
        if(confirmarCompra){
            alert("Compra realizada con éxito, total pagado "+CalcularPrecio()+"$")
            console.log("Compra realizada con éxito");
            alert("Compra realizada con éxito");
            VaciarCarritoPostCompra();
        }
    }else{
        console.log("No hay productos en el carrito para realizar la compra");
        alert("No hay productos en el carrito para realizar la compra");
    }
}

function VerCarrito(){
    if(carrito.length > 0){
        let stringCarrito = "Productos en el carrito:\n";
        carrito.forEach(prod => {
            stringCarrito += prod.nombre + " - Cantidad: " + prod.cantidad + " - Precio: $" + prod.precio + "\n";
        });
        console.log(stringCarrito);
        alert(stringCarrito);}
    else{
        console.log("No hay nada que mostrar");
        alert("No hay nada que mostrar");
    }
}

function main(){
    let bucle = true;
    while (bucle){
        let opcion = prompt("Ingrese una opción:\n1-Agregar Producto al Carrito\n2-Eliminar Producto del Carrito\n3-Vaciar Carrito\n4-Ver Carrito\n5-Realizar Compra\n6-Salir");
        switch(opcion){
            case "1":
                let opcionProd = parseInt(prompt("Ingrese que producto desea agregar al carrito:" + productos.map(x => "\n"+x.id+"- "+x.nombre+" $"+x.precio).join("")));
                AgregarAlCarrito(opcionProd, 1);
                break;
            case "2":
                if(carrito.length > 0){
                    let opcionEliminar = parseInt(prompt("Ingrese que producto desea eliminar del carrito:" + carrito.map(x => "\n"+x.id+"- "+x.nombre+" $"+x.precio).join("")));
                    EliminarDelCarrito(opcionEliminar);
                }else{
                    console.log("No hay productos en el carrito para eliminar");
                    alert("No hay productos en el carrito para eliminar");
                }
                break;
            case "3":
                VaciarCarrito();
                break;
            case "4":
                VerCarrito();
                break;
            case "5":
                RealizarCompra();
                break;
            case "6":
                bucle = false;
                alert("Gracias por visitarnos, hasta luego!");
                break;
            default:
                break;
        }
    }
}

main();