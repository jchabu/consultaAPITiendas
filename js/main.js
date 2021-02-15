// GET Y POST https://webapp-210130211157.azurewebsites.net/webresources/mitienda/ 
// GET TIENDA https://webapp-210130211157.azurewebsites.net/webresources/mitienda/4

var urlTiendas = 'https://webapp-210130211157.azurewebsites.net/webresources/mitienda/'

window.addEventListener('load', printSeleccion);

var contenedorMain = document.body.children[1];

function tiendaXHR() {
    limpiarMain();
    imprimirForma("XHR");
    listaXHR();
}

function tiendaFetch() {
    limpiarMain();
    imprimirForma("Fetch");
    listaFetch();
}

function tiendaJQuery() {
    limpiarMain();
    imprimirForma("JQuery");
    listaJQuery();
}



function printSeleccion() {
    var contenedorMain = document.body.children[1];
    var menuSeleccion = createNode("div", "", ["seleccion"], []);
    menuSeleccion.appendChild(createNode("h2", "Elige un método para AJAX:", [], []));
    var botonXHR = createNode("button", "XHR", ["boton"], []);
    var botonFetch = createNode("button", "Fetch", ["boton"], []);
    var botonJQuery = createNode("button", "jQuery", ["boton"], []);
    botonXHR.addEventListener('click', tiendaXHR);
    botonFetch.addEventListener('click', tiendaFetch);
    botonJQuery.addEventListener('click', tiendaJQuery);
    menuSeleccion.appendChild(botonXHR);
    menuSeleccion.appendChild(botonFetch);
    menuSeleccion.appendChild(botonJQuery);
    contenedorMain.appendChild(menuSeleccion);
}

function imprimirForma(tipoSeleccion) {
    contenedorMain.appendChild(createNode("div", "", ["navegacion"], []));
    var btnNuevaTienda = createNode("button", "Nueva Tienda", ["boton"], [])
    if (tipoSeleccion === "Fetch") {
        //btnNuevaTienda.addEventListener('click', nuevaTienda);
    } else if (tipoSeleccion === "XHR") {
        //btnNuevaTienda.addEventListener('click', nuevaTienda);
    } else {
        //btnNuevaTienda.addEventListener('click', nuevaTienda);
    }
    contenedorMain.lastChild.appendChild(btnNuevaTienda);
    contenedorMain.appendChild(createNode("div", "", ["listado"], []));
}





//////

function listaXHR() {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', urlTiendas)
    xhr.responseType = 'json'
    xhr.send()

    xhr.onload = function () {
        try {
            const data = this.response
            printLista(data)
        } catch (err) {
            console.error(err)
        }
    }
}

function listaFetch() {
    fetch(urlTiendas)
        .then(response => response.json())
        .then(data => printLista(data))
        .catch(error => console.log(error))
}

function listaJQuery() {
    $.ajax({
        url: urlTiendas, // URL de la petición
        type: 'GET', // tipo de la petición: POST o GET
        dataType: 'json', // tipo de dato que se espera
        success: function (json) { // función a ejecutar si es satisfactoria
            printLista(json)
        },
        error: function (jqXHR, status, error) { // función error
            console.log('Disculpe, existió un problema')
        },
        // función a ejecutar sin importar si la petición falló o no
        complete: function (jqXHR, status) {

        }
    })
}

function printLista(listaTiendas) {
    listaTiendas.forEach(tienda => {
        contenedorMain.lastChild.appendChild(createNode("div", "", ["tarjeta"], []));
        contenedorMain.lastChild.lastChild.appendChild(createNode("h2", tienda.nombreTienda, [], []));
        contenedorMain.lastChild.lastChild.appendChild(createNode("h3", tienda.direccion, [], []));
        contenedorMain.lastChild.lastChild.appendChild(createNode("h3", tienda.localidad + " - " + tienda.telefono, [], []));
    })
}

function limpiarMain() {
    contenedorMain.removeChild(contenedorMain.lastChild);
}

function createNode(name, content, classes, attributes) {
    var node = document.createElement(name);

    if (content != "") {
        var nodeContent = document.createTextNode(content);
        node.appendChild(nodeContent);
    }
    if (classes.length > 0) {
        classes.forEach(classElement => {
            node.classList.add(classElement);
        });
    }

    if (attributes.length > 0) {
        attributes.forEach(nodeAttribute => {
            node.setAttribute(nodeAttribute.name, nodeAttribute.value);
        })
    }
    return node;
}