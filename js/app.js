// ==========================
// VARIABLES
// ==========================

const formulario =
document.getElementById("productoForm");

const productosContainer =
document.getElementById("productosContainer");

const solicitudesContainer =
document.getElementById("solicitudesContainer");

let productos =
JSON.parse(
localStorage.getItem("productos")
) || [];

let compras =
JSON.parse(
localStorage.getItem("compras")
) || [];

// ==========================
// PRODUCTOS DEMO
// ==========================

if(productos.length === 0){

    productos = [

        {
            id:1,
            nombre:"Tomates Chonto",
            descripcion:"Tomates frescos cultivados localmente.",
            precio:4000,
            cantidad:120
        },

        {
            id:2,
            nombre:"Lechuga Crespa",
            descripcion:"Lechuga recién cosechada.",
            precio:2500,
            cantidad:90
        },

        {
            id:3,
            nombre:"Suculentas",
            descripcion:"Plantas ornamentales.",
            precio:12000,
            cantidad:35
        }

    ];

    guardarDatos();
}

// ==========================
// INICIO
// ==========================

mostrarProductos();
mostrarCompras();

// ==========================
// GUARDAR PRODUCTO
// ==========================

formulario.addEventListener("submit",(e)=>{

    e.preventDefault();

    const producto = {

        id:Date.now(),

        nombre:
        document.getElementById("nombre").value,

        descripcion:
        document.getElementById("descripcion").value,

        precio:
        document.getElementById("precio").value,

        cantidad:
        document.getElementById("cantidad").value

    };

    productos.push(producto);

    guardarDatos();

    mostrarProductos();

    formulario.reset();

    alert("Producto publicado correctamente");

});

// ==========================
// GUARDAR DATOS
// ==========================

function guardarDatos(){

    localStorage.setItem(
        "productos",
        JSON.stringify(productos)
    );

    localStorage.setItem(
        "compras",
        JSON.stringify(compras)
    );

}

// ==========================
// MOSTRAR PRODUCTOS
// ==========================

function mostrarProductos(){

    productosContainer.innerHTML = "";

    productos.forEach(producto => {

        productosContainer.innerHTML += `

            <div class="producto">

                <h3>${producto.nombre}</h3>

                <p>${producto.descripcion}</p>

                <p>
                <strong>Precio:</strong>
                $${producto.precio}
                </p>

                <p>
                <strong>Cantidad disponible:</strong>
                ${producto.cantidad}
                </p>

                <button
                onclick="solicitarPedido('${producto.nombre}')">

                Solicitar Pedido

                </button>

            </div>

        `;

    });

}

// ==========================
// FORMULARIO PEDIDO
// ==========================

function solicitarPedido(producto){

    const nombre =
    prompt("Ingrese su nombre completo");

    if(!nombre) return;

    const correo =
    prompt("Ingrese su correo electrónico");

    if(!correo) return;

    const telefono =
    prompt("Ingrese su teléfono");

    if(!telefono) return;

    const direccion =
    prompt("Ingrese su dirección");

    if(!direccion) return;

    const cantidad =
    prompt("Cantidad requerida");

    if(!cantidad) return;

    const observaciones =
    prompt("Observaciones del pedido");

    compras.push({

        producto,
        cantidad,
        nombre,
        correo,
        telefono,
        direccion,
        observaciones,

        estado:"Pendiente",

        fecha:
        new Date().toLocaleDateString()

    });

    guardarDatos();

    mostrarCompras();

    alert("Pedido registrado exitosamente");

}

// ==========================
// MOSTRAR COMPRAS
// ==========================

function mostrarCompras(){

    solicitudesContainer.innerHTML = "";

    compras.forEach(compra => {

        solicitudesContainer.innerHTML += `

        <div class="producto">

            <h3>
            ${compra.producto}
            </h3>

            <p>
            <strong>Cliente:</strong>
            ${compra.nombre}
            </p>

            <p>
            <strong>Correo:</strong>
            ${compra.correo}
            </p>

            <p>
            <strong>Teléfono:</strong>
            ${compra.telefono}
            </p>

            <p>
            <strong>Dirección:</strong>
            ${compra.direccion}
            </p>

            <p>
            <strong>Cantidad:</strong>
            ${compra.cantidad}
            </p>

            <p>
            <strong>Observación:</strong>
            ${compra.observaciones}
            </p>

            <p>
            <strong>Fecha:</strong>
            ${compra.fecha}
            </p>

            <p>

                <strong style="color:green;">
                Estado:
                ${compra.estado}
                </strong>

            </p>

        </div>

        `;

    });

}