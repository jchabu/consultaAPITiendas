// GET Y POST https://webapp-210130211157.azurewebsites.net/webresources/mitienda/ 
// GET TIENDA https://webapp-210130211157.azurewebsites.net/webresources/mitienda/4

window.addEventListener('load', printSeleccion);

function tiendaXHR () {
    limpiarMain();
    console.log("XHR");
}
function tiendaFetch () {
    limpiarMain();
    console.log("Fetch");
}
function tiendaJQuery(){
    limpiarMain();
    console.log("JQuery");
}



function printSeleccion () {
    var contenedorMain = document.body.children[1];
    var menuSeleccion = createNode("div", "", ["seleccion"],[]);
    menuSeleccion.appendChild(createNode("h2", "Elige un método para AJAX:", [],[]));
    var botonXHR = createNode("button", "XHR", ["boton"],[]);
    var botonFetch = createNode("button", "Fetch", ["boton"],[]);
    var botonJQuery = createNode("button", "jQuery", ["boton"],[]);
    botonXHR.addEventListener('click', tiendaXHR);
    botonFetch.addEventListener('click', tiendaFetch);
    botonJQuery.addEventListener('click', tiendaJQuery);
    menuSeleccion.appendChild(botonXHR);
    menuSeleccion.appendChild(botonFetch);
    menuSeleccion.appendChild(botonJQuery);
    contenedorMain.appendChild(menuSeleccion);
}

function limpiarMain () {
    var contenedorMain = document.body.children[1];
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