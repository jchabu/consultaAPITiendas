const urlTiendas = 'https://webapp-210130211157.azurewebsites.net/webresources/mitienda/';
const contenedorMain = document.body.children[1];
/**
 * @param {string} name
 *  @param {string} content
 * @param {array} classes
 * @param {object} attributes
 */
function createNode(name, content, classes, attributes) {
    const node = document.createElement(name);

    if (content !== '') {
        const nodeContent = document.createTextNode(content);
        node.appendChild(nodeContent);
    }
    if (classes.length > 0) {
        classes.forEach((classElement) => {
            node.classList.add(classElement);
        });
    }

    if (attributes.length > 0) {
        attributes.forEach((nodeAttribute) => {
            node.setAttribute(nodeAttribute.name, nodeAttribute.value);
        });
    }
    return node;
}
/**
 * Función para añadir un div con el loader
 * @param {*} contenedor
 */
function startLoader(contenedor, tipoLoader) {
    if (tipoLoader === 'loaderMini') {
        contenedor.appendChild(createNode('div', '', ['loaderMini'], []));
    } else {
        contenedor.appendChild(createNode('div', '', ['loader'], []));
    }
}
/**
 * Función para quitar loader donde sea
 */
function stopLoader() {
    document.getElementsByClassName('loader');
    contenedorMain.removeChild(contenedorMain.lastChild);
}
/**
 * Función para imprimir el formato de la página después de la selección del metodo de petición
 */
function imprimirForma() {
    contenedorMain.appendChild(createNode('div', '', ['navegacion'], []));
    contenedorMain.lastChild.appendChild(createNode('div', '', ['botones'], []));
    const btnNuevaTienda = createNode('button', 'Nueva Tienda', ['boton'], []);
    contenedorMain.lastChild.lastChild.appendChild(btnNuevaTienda);
    contenedorMain.lastChild.lastChild.appendChild(createNode('div', '', ['buscador'], []));
    const barraBusqueda = createNode('input', '', ['barraBusqueda'], [{ name: 'type', value: 'text' }]);
    contenedorMain.lastChild.lastChild.lastChild.appendChild(barraBusqueda);
    const botonBusqueda = createNode('button', '', ['botonBusqueda'], []);
    contenedorMain.lastChild.lastChild.lastChild.appendChild(botonBusqueda);
    contenedorMain.lastChild.lastChild.lastChild.lastChild.appendChild(createNode('i', '', ['fas', 'fa-search'], []));
    contenedorMain.lastChild.appendChild(createNode('div', '', ['oculto', 'contNuevaTienda'], []));
    contenedorMain.lastChild.lastChild.appendChild(createNode('form', '', ['formulario'], []));
    contenedorMain.lastChild.lastChild.lastChild.appendChild(createNode('label', 'Nombre de tienda', [], [{ name: 'for', value: 'nombreTienda' }]));
    contenedorMain.lastChild.lastChild.lastChild.lastChild.appendChild(createNode('input', '', [], [{ name: 'name', value: 'nombreTienda' }, { name: 'required', value: '' }, { name: 'id', value: 'nombreTienda' }]));
    contenedorMain.lastChild.lastChild.lastChild.appendChild(createNode('label', 'Dirección', [], [{ name: 'for', value: 'direccionTienda' }]));
    contenedorMain.lastChild.lastChild.lastChild.lastChild.appendChild(createNode('input', '', [], [{ name: 'name', value: 'direccionTienda' }, { name: 'required', value: '' }, { name: 'id', value: 'direccionTienda' }]));
    contenedorMain.lastChild.lastChild.lastChild.appendChild(createNode('label', 'Localidad', [], [{ name: 'for', value: 'localidadTienda' }]));
    contenedorMain.lastChild.lastChild.lastChild.lastChild.appendChild(createNode('input', '', [], [{ name: 'name', value: 'localidadTienda' }, { name: 'required', value: '' }, { name: 'id', value: 'localidadTienda' }]));
    contenedorMain.lastChild.lastChild.lastChild.appendChild(createNode('label', 'Teléfono', [], [{ name: 'for', value: 'telefonoTienda' }]));
    contenedorMain.lastChild.lastChild.lastChild.lastChild.appendChild(createNode('input', '', [], [{ name: 'name', value: 'telefonoTienda' }, { name: 'required', value: '' }, { name: 'id', value: 'telefonoTienda' }, { name: 'pattern', value: '[689][0-9]{8}' }]));
    contenedorMain.lastChild.lastChild.appendChild(createNode('button', 'Crear tienda', ['botonNuevaTienda', 'boton'], []));
    btnNuevaTienda.addEventListener('click', () => {
        if (document.getElementsByClassName('contNuevaTienda')[0].classList.contains('oculto')) {
            document.getElementsByClassName('contNuevaTienda')[0].classList.remove('oculto');
        } else {
            document.getElementsByClassName('contNuevaTienda')[0].classList.add('oculto');
        }
    });
}
/**
 * @param {JSON} listaTiendas
 */
function printLista(listaTiendas) {
    contenedorMain.appendChild(createNode('div', '', ['listado'], []));
    if (listaTiendas.length === undefined) {
        contenedorMain.lastChild.appendChild(createNode('div', '', ['tarjeta'], []));
        contenedorMain.lastChild.lastChild.appendChild(createNode('h2', listaTiendas.nombreTienda, [], []));
        contenedorMain.lastChild.lastChild.appendChild(createNode('h3', listaTiendas.direccion, [], []));
        contenedorMain.lastChild.lastChild.appendChild(createNode('h2', `${listaTiendas.localidad} - ${listaTiendas.telefono}`, [], []));
    } else {
        listaTiendas.forEach((tienda) => {
            contenedorMain.lastChild.appendChild(createNode('div', '', ['tarjeta'], []));
            contenedorMain.lastChild.lastChild.appendChild(createNode('h2', tienda.nombreTienda, [], []));
            contenedorMain.lastChild.lastChild.appendChild(createNode('h3', tienda.direccion, [], []));
            contenedorMain.lastChild.lastChild.appendChild(createNode('h3', `${tienda.localidad} - ${tienda.telefono}`, [], []));
        });
    }
}
/**
 * Función para limpiar el main
 */
function limpiarMain() {
    contenedorMain.removeChild(contenedorMain.lastChild);
}
/**
 * Función para limpiar solo el contenedor Lista
 */
function limpiarLista() {
    contenedorMain.lastChild.removeChild(contenedorMain.lastChild.lastChild);
}
/**
 * Funcion para añadir al boton de nueva tienda un addeventlistener a la vez que recoge los datos de los campos
 * @param {string} tipo
 */
function enviarTienda(tipo) {
    const botonNuevaTienda = document.getElementsByClassName('botonNuevaTienda')[0];
    if (tipo === 'JQuery') {
        botonNuevaTienda.addEventListener('click', () => {
            const objetPost = {
                nombreTienda: document.getElementById('nombreTienda').value,
                direccion: document.getElementById('direccionTienda').value,
                localidad: document.getElementById('localidadTienda').value,
                telefono: document.getElementById('telefonoTienda').value
            };
            postJQuery(objetPost);
            listaJQuery('');
        });
    } else if (tipo === 'Fetch') {
        botonNuevaTienda.addEventListener('click', () => {
            const objetPost = {
                nombreTienda: document.getElementById('nombreTienda').value,
                direccion: document.getElementById('direccionTienda').value,
                localidad: document.getElementById('localidadTienda').value,
                telefono: document.getElementById('telefonoTienda').value
            };
            postFetch(objetPost);
            listaFetch('');
        });
    } else if (tipo === 'XHR') {
        botonNuevaTienda.addEventListener('click', () => {
            const objetPost = {
                nombreTienda: document.getElementById('nombreTienda').value,
                direccion: document.getElementById('direccionTienda').value,
                localidad: document.getElementById('localidadTienda').value,
                telefono: document.getElementById('telefonoTienda').value
            };
            postXHR(objetPost);
            listaXHR('');
        });
    }
}
/**
 * Funcion para hacer el intercambio de iconos en el icono de búsqueda así como añadir la funcionalidad para reiniciar la vista
 * @param {string} tipo
 */
function cambiarBotonBusqueda(tipo) {
    const contenedorBusqueda = document.getElementsByClassName('buscador')[0];
    contenedorBusqueda.removeChild(contenedorBusqueda.lastChild);
    const botonNuevoBusqueda = createNode('button', '', ['botonBusqueda'], []);
    botonNuevoBusqueda.appendChild(createNode('i', '', ['fa', 'fa-times'], []));
    contenedorBusqueda.appendChild(botonNuevoBusqueda);
    if (tipo === 'JQuery') {
        botonNuevoBusqueda.addEventListener('click', () => {
            limpiarLista();
            startLoader(contenedorMain, '');
            contenedorBusqueda.removeChild(contenedorBusqueda.lastChild);
            contenedorBusqueda.removeChild(contenedorBusqueda.lastChild);
            contenedorBusqueda.appendChild(createNode('input', '', ['barraBusqueda'], [{ name: 'type', value: 'text' }]));
            const botonBusqueda = createNode('button', '', ['botonBusqueda'], []);
            contenedorBusqueda.appendChild(botonBusqueda);
            botonBusqueda.appendChild(createNode('i', '', ['fas', 'fa-search'], []));
            listaJQuery('');
        });
    } else if (tipo === 'Fetch') {
        botonNuevoBusqueda.addEventListener('click', () => {
            limpiarLista();
            startLoader(contenedorMain, '');
            contenedorBusqueda.removeChild(contenedorBusqueda.lastChild);
            contenedorBusqueda.removeChild(contenedorBusqueda.lastChild);
            contenedorBusqueda.appendChild(createNode('input', '', ['barraBusqueda'], [{ name: 'type', value: 'text' }]));
            const botonBusqueda = createNode('button', '', ['botonBusqueda'], []);
            contenedorBusqueda.appendChild(botonBusqueda);
            botonBusqueda.appendChild(createNode('i', '', ['fas', 'fa-search'], []));
            listaFetch('');
        });
    } else if (tipo === 'XHR') {
        botonNuevoBusqueda.addEventListener('click', () => {
            limpiarLista();
            startLoader(contenedorMain, '');
            contenedorBusqueda.removeChild(contenedorBusqueda.lastChild);
            contenedorBusqueda.removeChild(contenedorBusqueda.lastChild);
            contenedorBusqueda.appendChild(createNode('input', '', ['barraBusqueda'], [{ name: 'type', value: 'text' }]));
            const botonBusqueda = createNode('button', '', ['botonBusqueda'], []);
            contenedorBusqueda.appendChild(botonBusqueda);
            botonBusqueda.appendChild(createNode('i', '', ['fas', 'fa-search'], []));
            listaXHR('');
        });
    }
}
/**
 * Busqueda con su propio tipo reutilizando funciones
 * @param {string} tipo
 */
function eventoBusqueda(tipo) {
    const botonBusqueda = document.getElementsByClassName('botonBusqueda')[0];
    const inputBusqueda = document.getElementsByClassName('barraBusqueda')[0];
    if (tipo === 'XHR') {
        botonBusqueda.addEventListener('click', () => {
            limpiarLista();
            listaXHR(inputBusqueda.value);
            cambiarBotonBusqueda('XHR');
        });
    } else if (tipo === 'Fetch') {
        botonBusqueda.addEventListener('click', () => {
            limpiarLista();
            listaFetch(inputBusqueda.value);
            cambiarBotonBusqueda('Fetch');
        });
    } else if (tipo === 'JQuery') {
        botonBusqueda.addEventListener('click', () => {
            limpiarLista();
            listaJQuery(inputBusqueda.value);
            cambiarBotonBusqueda('JQuery');
        });
    }
}
/**
 * Función para sacar la lista de tiendas automaticamente en XHRHttpRequest
 */
function listaXHR(terminacion) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', urlTiendas + String(terminacion));
    xhr.responseType = 'json';
    xhr.send();

    xhr.onload = function () {
        try {
            const data = this.response;
            stopLoader();
            printLista(data);
            eventoBusqueda('XHR');
            enviarTienda('XHR');
        } catch (err) {
            contenedorMain.lastChild.appendChild(createNode('h2', 'Tienda no encontrada', ['error'], []));
        }
    };
}
/**
 *
 * @param {object} objeto
 */
function postXHR(objeto) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', urlTiendas);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(objeto));
}

/**
 * Función para sacar la lista de tiendas en Fetch
 */
function listaFetch(terminacion) {
    fetch(urlTiendas + terminacion)
        .then((response) => response.json())
        .then((data) => { stopLoader(); printLista(data); eventoBusqueda('Fetch'); enviarTienda('Fetch'); })
        .catch(() => contenedorMain.lastChild.appendChild(createNode('h2', 'Tienda no encontrada', ['error'], [])));
}
/**
 * Función para hacer el POST con Fetch
 * @param {object} objeto
 */
function postFetch(objeto) {
    fetch(urlTiendas, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(objeto)
    })
        .then(listaFetch(''));
}

/**
 * Función para sacar la lista de tiendas en JQuery
 */
function listaJQuery(terminacion) {
    $.ajax({
        url: urlTiendas + terminacion,
        type: 'GET',
        dataType: 'json',
        success(json) {
            stopLoader();
            printLista(json);
            eventoBusqueda('JQuery');
            enviarTienda('JQuery');
        },
        error() {
            contenedorMain.lastChild.appendChild(createNode('h2', 'Tienda no encontrada', ['error'], []));
        },
        complete() {
        }
    });
}
/**
 * Función para hacer POST con jQuery
 * @param {object} objeto
 */
function postJQuery(objeto) {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: urlTiendas,
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(objeto)
    });
}
/**
 * Función para invocar el formato y todo lo necesario para el funcionamiento en XHR
 */
function tiendaXHR() {
    limpiarMain();
    imprimirForma();
    startLoader(contenedorMain, '');
    listaXHR('');
}
/**
 * Función para invocar el formato y todo lo necesario para el funcionamiento en Fetch
 */
function tiendaFetch() {
    limpiarMain();
    imprimirForma('Fetch');
    startLoader(contenedorMain, '');
    listaFetch('');
}
/**
 * Función para invocar el formato y todo lo necesario para el funcionamiento en jQuery
 */
function tiendaJQuery() {
    limpiarMain();
    imprimirForma('JQuery');
    startLoader(contenedorMain, '');
    listaJQuery('');
}
/**
 * Función para crear la vista principal de la página donde seleccionas el tipo de petición AJAX
 */
function printSeleccion() {
    const menuSeleccion = createNode('div', '', ['seleccion'], []);
    menuSeleccion.appendChild(createNode('h2', 'Elige un método para AJAX:', [], []));
    const botonXHR = createNode('button', 'XHR', ['boton'], []);
    const botonFetch = createNode('button', 'Fetch', ['boton'], []);
    const botonJQuery = createNode('button', 'jQuery', ['boton'], []);
    botonXHR.addEventListener('click', tiendaXHR);
    botonFetch.addEventListener('click', tiendaFetch);
    botonJQuery.addEventListener('click', tiendaJQuery);
    menuSeleccion.appendChild(botonXHR);
    menuSeleccion.appendChild(botonFetch);
    menuSeleccion.appendChild(botonJQuery);
    contenedorMain.appendChild(menuSeleccion);
}

window.addEventListener('load', printSeleccion);
