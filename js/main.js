// GET Y POST https://webapp-210130211157.azurewebsites.net/webresources/mitienda/ 
// GET TIENDA https://webapp-210130211157.azurewebsites.net/webresources/mitienda/4

var urlTiendas = 'https://webapp-210130211157.azurewebsites.net/webresources/mitienda/'

window.addEventListener('load', printSeleccion);

var contenedorMain = document.body.children[1];

function tiendaXHR() {
    limpiarMain();
    imprimirForma("XHR");
    var contenedorOculto = document.getElementsByClassName('oculto')[0]
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

function imprimirForma() {
    contenedorMain.appendChild(createNode("div", "", ["navegacion"], []));
    contenedorMain.lastChild.appendChild(createNode("div", "", ["botones"], []));
    var btnNuevaTienda = createNode("button", "Nueva Tienda", ["boton"], [])

    contenedorMain.lastChild.lastChild.appendChild(btnNuevaTienda);
    contenedorMain.lastChild.lastChild.appendChild(createNode("form", "", ["buscador"], []));
    contenedorMain.lastChild.lastChild.lastChild.appendChild(createNode("input", "", ["barraBusqueda"], [{ name: "type", value: "text" }]));
    contenedorMain.lastChild.lastChild.lastChild.appendChild(createNode("button", "", ["botonBusqueda"], [{ name: "type", value: "submit" }]));
    contenedorMain.lastChild.lastChild.lastChild.lastChild.appendChild(createNode("i", "", ["fas", "fa-search"], [{}]));
    // <i class='fas fa-search'></i>
    contenedorMain.lastChild.appendChild(createNode("div", "", ["oculto", "contNuevaTienda"], []));
    contenedorMain.lastChild.lastChild.appendChild(createNode("form", "", ["formulario"], []));
    contenedorMain.lastChild.lastChild.lastChild.appendChild(createNode("label", "Nombre de tienda", [], [{ name: "for", value: "nombreTienda" }]));
    contenedorMain.lastChild.lastChild.lastChild.lastChild.appendChild(createNode("input", "", [], [{ name: "name", value: "nombreTienda" }]));
    contenedorMain.lastChild.lastChild.lastChild.appendChild(createNode("label", "Dirección", [], [{ name: "for", value: "direccionTienda" }]));
    contenedorMain.lastChild.lastChild.lastChild.lastChild.appendChild(createNode("input", "", [], [{ name: "name", value: "direccionTienda" }]));
    contenedorMain.lastChild.lastChild.lastChild.appendChild(createNode("label", "Localidad", [], [{ name: "for", value: "localidadTienda" }]));
    contenedorMain.lastChild.lastChild.lastChild.lastChild.appendChild(createNode("input", "", [], [{ name: "name", value: "localidadTienda" }]));
    contenedorMain.lastChild.lastChild.lastChild.appendChild(createNode("label", "Teléfono", [], [{ name: "for", value: "telefonoTienda" }]));
    contenedorMain.lastChild.lastChild.lastChild.lastChild.appendChild(createNode("input", "", [], [{ name: "name", value: "telefonoTienda" }]));
    btnNuevaTienda.addEventListener('click', function () {
        if (document.getElementsByClassName('contNuevaTienda')[0].classList.contains('oculto')){
            document.getElementsByClassName('contNuevaTienda')[0].classList.remove('oculto');
        }else{
            document.getElementsByClassName('contNuevaTienda')[0].classList.add('oculto');
        }
    })
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
        url: urlTiendas,
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            printLista(json)
        },
        error: function (jqXHR, status, error) {
            console.log('Disculpe, existió un problema')
        },
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