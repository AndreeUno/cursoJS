var link = window.top.location.href, seccionURL = link.split("/"), dominio =(seccionURL[2]), url = seccionURL[1],url = seccionURL[seccionURL.length - 1],url02= url.split('?')[0];
setInterval(getLocalTime, 1000);


$(document).ready(function() {
    if(url02== 'index.html' ||url02== ''){
        consProducto();
    }
    if(url02== 'carrito.html'){
        consCarrito();
    }
});
function consProducto(){
    ls_carrito = localStorage.getItem('arrayCarrito');  
    if(ls_carrito=='' ||ls_carrito==null|| ls_carrito==undefined){
      impre('localstorage vacia');
      contadorCarrito=0; arrayCarrito=[];
    }else{
        impre('localstorage llena');
        ls_arrayCarrito = ls_carrito. split(',') 
        contadorCarrito=ls_arrayCarrito.length;
        arrayCarrito=ls_arrayCarrito;
    }
    impre('arrayLs: ');
    impre(arrayCarrito);
    funContadorCarritoIcon(contadorCarrito);
    fetch("./api/productos.json")
    .then(response => {return response.json();})
    .then(jsondata => {
        jsondata.forEach(function(i,x) {
        tags = i.tags.toString();
        idBloque='bloqueProducto_' +i.id;
        subBloque = document.createElement("div");
        subBloque.setAttribute("id", idBloque);
        constructorProducto = '<div class="row ms-1">'+
        '<div class="card mb-3">'+
        '<div class="row g-0">'+
        '<div class="col-md-4">'+
        '<img src="./img/'+i.imagen+'" class="img-fluid rounded-start" alt="image'+i.nombre+'">'+
        '      </div>'+
        '      <div class="col-md-8">'+
        '        <div class="card-body">'+
        '            <h5 class="card-title mb-3 fw-bold">'+i.nombre+'</h5>'+
        '            <span class="fw-bold mf-card-price">$'+i.precio+'</span>'+
        '            <div class="my-2 text-warning">'+
        '                <i class="fa-solid fa-star"></i>'+
        '                <i class="fa-solid fa-star"></i>'+
        '                <i class="fa-solid fa-star"></i>'+
        '                <i class="fa-solid fa-star"></i>'+
        '                <i class="fa-solid fa-star-half-stroke"></i>'+
        '            </div>'+
        '            <p class="card-text">'+i.descripcion+'</p>'+
        '            <p class="card-text my-3"><small class="text-muted">'+tags+'</small></p>  '+                             
        '            <div class="d-flex mf-card-btn-container">'+
        '                <div class="mf-add-to-cart-btn" onclick="agregaProd('+i.id+')" >'+
        '                    <i class="fa-solid fa-cart-shopping me-2"></i>Agregar'+
        '                </div>'+
        '                <div id="favorite-icon">'+
        '                    <i class="fa-regular fa-heart"></i>'+
        '                </div>'+
        '                <div>'+
        '                    <i class="fa-solid fa-arrow-up-right-from-square"></i>'+
        '                </div>'+
        '            </div>'+
        '        </div>'+
        '      </div>'+
        '    </div>'+
        '</div>'+
    '</div>';
    document.getElementById('bloqueProductos').appendChild(subBloque);
    document.getElementById(idBloque).innerHTML = constructorProducto;
    })
    })
}
function funContadorCarritoIcon(contador){
    if(contador !=0 ){
        document.getElementById('contCarrito').innerHTML = contador;
    }
}

function funTotalProd(contador){
    if (contador != 0) {
        document.getElementById('bloqueTotalProd').innerHTML = 'Total de productos: '+contador;
    }
}

function funTotalPrecio(precioTotal) {
    if (precioTotal != 0) {
        document.getElementById('bloqueTotalPrecio').innerHTML = 'Costo Final: ' + precioTotal;
    }
}

function consCarrito(){
    ls_carrito = localStorage.getItem('arrayCarrito');  
    if(ls_carrito=='' ||ls_carrito==null|| ls_carrito==undefined){
      impre('localstorage vacia');
      contadorCarrito=0; arrayCarrito=[];
    }else{
        impre('localstorage llena');
        ls_arrayCarrito = ls_carrito. split(',');
        contadorCarrito=ls_arrayCarrito.length;
        arrayCarrito=ls_arrayCarrito;
    }
    impre('arrayLs: ');
    impre(arrayCarrito);
    funContadorCarritoIcon(contadorCarrito); 
    funTotalProd(contadorCarrito);
    document.getElementById('bloqueProductos').innerHTML = ' ';
    fetch("./api/productos.json")
        .then(response => { return response.json(); })
        .then(jsondata => {
          
            encArraryTotalPrecio = [];
            jsondata.forEach(function (b, x) {
                 impre(b);
                encArraryProd = [];
                encArraryProdPrecio = [];
             
                for (let a = 0; a < arrayCarrito.length; a++) {
                    if (arrayCarrito[a].toString()==b.id){
                       impre('si matchea');
                        encProducto = jsondata.find(c => c.id == arrayCarrito[a].toString());
                        indexEncProducto = jsondata.indexOf(encProducto);
                        if (indexEncProducto != -1) {
                            encArraryProd.push(x);
                            encArraryProdPrecio.push(b.precio);
                        }
                        var encArraryProdPrecio = encArraryProdPrecio.map(function (x) {
                            return parseInt(x, 10);
                        });

                        impre(encArraryProdPrecio);
                        
                        valorInicialPrecio = 0;
                        totalPrecio = encArraryProdPrecio.reduce(
                            (previousValue, currentValue) => previousValue + currentValue,
                            valorInicialPrecio
                        );
                        encArraryTotalPrecio.push(totalPrecio);
                        impre('PrecioTotal: '+totalPrecio);
                        impre(encArraryTotalPrecio);
                        valorInicialPrecioFinal = 0;
                        totalPrecioFinal = encArraryTotalPrecio.reduce(
                            (previousValue, currentValue) => previousValue + currentValue,
                            valorInicialPrecioFinal
                        );

                        impre(totalPrecioFinal);
                        funTotalPrecio(totalPrecioFinal);

        tags = b.tags.toString();
        idBloque='bloqueProducto_' +b.id;
        subBloque = document.createElement("div");
        subBloque.setAttribute("id", idBloque);
        constructorProducto = '<div class="row ms-1">'+
        '<div class="card mb-3">'+
        '<div class="row g-0">'+
        '<div class="col-md-4">'+
        '<img src="./img/'+b.imagen+'" class="img-fluid rounded-start" alt="image'+b.nombre+'">'+
        '      </div>'+
        '      <div class="col-md-8">'+
        '        <div class="card-body">'+
        '            <h5 class="card-title mb-3 fw-bold">'+b.nombre+'</h5>'+
        '            <span class="fw-bold mf-card-price">$'+b.precio+'</span>'+
        '            <div class="my-2 text-warning">'+
        '                <i class="fa-solid fa-star"></i>'+
        '                <i class="fa-solid fa-star"></i>'+
        '                <i class="fa-solid fa-star"></i>'+
        '                <i class="fa-solid fa-star"></i>'+
        '                <i class="fa-solid fa-star-half-stroke"></i>'+
        '            </div>'+
        '            <p class="card-text">'+b.descripcion+'</p>'+
        '            <p class="card-text my-3"><small class="text-muted">'+tags+'</small></p>  '+                             
        '            <div class="d-flex mf-card-btn-container">'+
        '                <div class="mf-add-to-cart-btn" onclick="eliminaProd('+b.id+')" >'+
        '                    <i class="fa-solid fa-cart-shopping me-2"></i>Eliminar'+
        '                </div>'+
        '                <div id="favorite-icon">' +
                        encArraryProd.length    +
        '                </div>' +
        '                <div id="favorite-icon">'+
        '                    -'+
        '                </div>'+
        '                <div>'+
        '                    +'+
        '                </div>'+
        '            </div>'+
        '        </div>'+
        '      </div>'+
        '    </div>'+
        '</div>'+
    '</div>';
    document.getElementById('bloqueProductos').appendChild(subBloque);
    document.getElementById(idBloque).innerHTML = constructorProducto;
                    }
                }
            })
        })
}

function eliminaProd(idProd){
    impre('comienza la funcion eliminaProd');
    impre(idProd);
    encArraryProd02 = [];
    arrayCarrito.forEach(function (d, x) {
        if(idProd==d){
            encArraryProd02.push(x);
        }
    });

    impre(encArraryProd02); 
    arrayCarrito = arrayCarrito.filter(function (value, index) {
        return encArraryProd02.indexOf(index) == -1;
    })

    impre(arrayCarrito);
    localStorage.setItem('arrayCarrito', arrayCarrito.toString());
    consCarrito();
};



function agregaProd(idProd){
    
    Swal.fire({
        title: 'Producto agregado!',
        text: 'Continua agregando productos al carrito',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
    id_prod=idProd.toString();
    arrayCarrito.push(id_prod);
    funContadorCarritoIcon(arrayCarrito.length)
    impre('arrayRealTime: ');
    impre( arrayCarrito.toString());
    localStorage.setItem('arrayCarrito', arrayCarrito.toString());
}

function impre(element){
    console.log(element);
}

function getLocalTime(){
    let time = new Date();
    let timeDiv = document.getElementById('timeDiv');
    timeDiv.innerHTML=time.toLocaleTimeString();
}