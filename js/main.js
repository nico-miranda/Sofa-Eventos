const btnCarrito = document.getElementById('btn-carrito');
const cerrarCarrito = document.getElementById('cerrar-carrito');
const displayCarrito = document.getElementById('carrito');

const sofa = [
   {
    id: 1,
    nombre: 'Sofa Ataúd Tapiz Violeta: Edición de diseñador',
    precio: 60000,
    imagen: 'ataud.jpg',
  },
  {
    id: 2,
    nombre: 'Sofa Burbujeante Tapiz Azul: Edición de diseñador',
    precio: 70000,
    imagen: 'buble.png',
  },
  {
    id: 3,
    nombre: 'Sofa Curvo Tapiz Verde: Importado',
    precio: 50000,
    imagen: 'curvo.png',
  },
  {
    id: 4,
    nombre: 'Sofa Estilo Gotico: Importado',
    precio: 55000,
    imagen: 'dark.jpg',
  },
  {
    id: 5,
    nombre: 'Sofa Moderno Tapiz Gris: Importado',
    precio: 45000,
    imagen: 'default.jpg',
  },
  {
    id: 6,
    nombre: 'Sofa Hipo: Edición coleccionista de África',
    precio: 100000,
    imagen: 'hipo.jpg',
  },
  {
    id: 7,
    nombre: 'Sofa Hippie Chic: Importado',
    precio: 65000,
    imagen: 'hippie.jpg',
  },
  {
    id: 8,
    nombre: 'Sofa Lip Tapiz Amarillo: Edición Americana',
    precio: 55000,
    imagen: 'lip.png',
  },
  {
    id: 9,
    nombre: 'Sofa con Mueble: Nacional',
    precio: 40000,
    imagen: 'mueble.png',
  },
  {
    id: 10,
    nombre: 'Sofa Simple de Escorpión: Edición coleccionista de África',
    precio: 70000,
    imagen: 'scorpion.jpg',
  },
  {
    id: 11,
    nombre: 'Sofa Tapiz de cuero: Edición de diseñador',
    precio: 100000,
    imagen: 'tapiz.png',
  },
  {
    id: 12,
    nombre: 'Sofa Tapiz Amarillo Familiar: Importado',
    precio: 55000,
    imagen: 'tubo.jpg',
  },
];

class Sofa {
  constructor(obj) {
    this.nombre = obj.nombre;
    this.id = obj.id;
    this.cantidad = obj.cantidad;
    this.precio = obj.precio;
    this.precioIva = this.agregarIva();
  }

  agregarIva() {
    return this.precio + (this.precio * 21) / 100;
  }
}

const guardarProductosStorage = () => {
  localStorage.setItem('carrito', JSON.stringify(carrito));
};

const cargarProductosStorage = () => {
  return JSON.parse(localStorage.getItem('carrito')) || [];
};

const carrito = cargarProductosStorage();

const generarHtmlCatalogo = () => {
  const inputBusqueda = document.querySelector('.filtros [name="busqueda"]');
  inputBusqueda.addEventListener('keyup', filtrarSofa);

  let catalogo = document.querySelector('#catalogo');

  sofa.forEach((sofa) => {
    let elemento = document.createElement('div');
    elemento.id = `card-${sofa.id}`;
    elemento.className = 'card';
    elemento.innerHTML = `
      <img class="card__img" src="images/${sofa.imagen}">
      <div class="card__info">
        <p class="card__nombre">${sofa.nombre}</p>
        <p class="card__precio">$${sofa.precio}</p>
      </div>      
      <button class="card__btn">
        <span class="material-icons">
          add_shopping_cart
        </span>
      </button>
      `;

    catalogo.appendChild(elemento);
  });
};

const buscarSofa = (id) => {
  return sofa.find((sofa) => sofa.id === id);
};

const filtrarSofa = (e) => {
  let catalogo = document.querySelector('#catalogo');
  let value = e.target.value;
  let sofaFiltrados = sofa.filter((el) =>
    el.nombre.toLowerCase().includes(value.toLowerCase())
  );

  catalogo.innerHTML = '';

  if (sofaFiltrados.length === 0) {
    catalogo.innerHTML = `<h2>No se encontraron productos con la busqueda: "${value}"`;
  } else {
    sofaFiltrados.forEach((sofa) => {
      let elemento = document.createElement('div');
      elemento.id = `card-${sofa.id}`;
      elemento.className = 'card';
      elemento.innerHTML = `
        <img class="card__img" src="images/${sofa.imagen}">
        <div class="card__info">
          <p class="card__nombre">${sofa.nombre}</p>
          <p class="card__precio">$${sofa.precio}</p>
        </div>
        <button class="card__btn">
          <span class="material-icons">
            add_shopping_cart
          </span>
        </button>`;

      catalogo.appendChild(elemento);
    });
    cargarSofaCarrito();
  }
};

const agregarSofa = (sofa) => {
  if (carrito.some((item) => item.id === sofa.id)) {
    let duplicado = carrito.find((item) => item.id === sofa.id);
    duplicado.cantidad++;
  } else {
   sofa.cantidad = 1;
    carrito.push(sofa);
  }
  notificacionAgregado(sofa);
};

const cargarSofaCarrito = () => {
  let cardBtns = document.querySelectorAll('.card__btn');

  cardBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      let itemId = parseInt(e.target.closest('.card').id.slice(5));

      btnCarrito.classList.add('agregado');
      setTimeout(() => {
        btnCarrito.classList.remove('agregado');
      }, 1000);

      agregarSofa(buscarSofa(itemId));
      guardarProductosStorage();
      generarHtmlCarrito();
    });
  });
};

const eliminarSofa = (id) => {
  if (carrito.some((el) => el.id === id)) {
    if (carrito.find((el) => el.id === id).cantidad === 1) {
      let posicion = carrito.findIndex((sofa) => sofa.id === id);
      carrito.splice(posicion, 1);
    } else {
      carrito.find((el) => el.id === id).cantidad--;
    }
  }
};

const eliminarSofaCarrito = () => {
  let deleteBtns = document.querySelectorAll('.sofa__eliminar');

  deleteBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      let itemId = parseInt(e.target.closest('.product-container').id.slice(9));

      eliminarSofa(itemId);
      guardarProductosStorage();
      generarHtmlCarrito();
    });
  });
  actualizarCantidadCarrito();
};

const actualizarCantidadCarrito = () => {
  let carritoCantidad = document.querySelector('#carrito-cantidad');

  const productosCarrito = cargarProductosStorage();
  let cantidadProductos = 0;

  productosCarrito.forEach((producto) => {
    cantidadProductos += producto.cantidad;
  });

  carritoCantidad.innerHTML = cantidadProductos;
};

const notificacionAgregado = (producto) => {
  Toastify({
    text: `Se agrego al carrito: "<b>${producto.nombre}</b>"`,
    duration: 3000,
    gravity: 'bottom',
    position: 'left',
    stopOnFocus: true,
    escapeMarkup: false,
    style: {
      background: '#333333',
      border: '1px solid #444444',
      fontSize: '14px',
    },
  }).showToast();
};

const generarHtmlCarrito = () => {
  let contenedorCarrito = document.querySelector('.contenedor-carrito');
  let totalCarrito = document.querySelector('.total-carrito');

  const productosCarrito = cargarProductosStorage();

  if (productosCarrito.length === 0) {
    contenedorCarrito.innerHTML = 'No hay productos en tu carrito.';
  } else {
    contenedorCarrito.innerHTML = '';
    productosCarrito.forEach((producto) => {
      let elemento = document.createElement('div');
      elemento.id = `producto-${producto.id}`;
      elemento.className = 'product-container';
      elemento.innerHTML = `
          <img class="sofa__img" src="images/${producto.imagen}">
          <div class="sofa__info">
            <p class="sofa__nombre">${producto.nombre}</p>
            <p class="sofa__precio">$${producto.precio}</p>
            <p class="sofa__cantidad">Cantidad: ${producto.cantidad}</p>
          </div>
          <button class="sofa__eliminar">&times</button>
        `;
      contenedorCarrito.appendChild(elemento);
    });
  }
  let total = 0;
  let totalIva = 0;

  for (const item of productosCarrito) {
    let sofa = new Sofa(item);
    sofa.agregarIva();
    totalIva += sofa.precioIva * sofa.cantidad;
    total += sofa.precio * sofa.cantidad;
  }

  totalCarrito.innerHTML = `
  <span>Precio: $${total.toFixed(2)}</span>
  <span>Impuesto IVA: $${(totalIva - total).toFixed(2)}</span>
  <p>Total a pagar: $${totalIva.toFixed(2)}</p>
  `;

  eliminarSofaCarrito();
};

generarHtmlCatalogo();
generarHtmlCarrito();
cargarSofaCarrito();

btnCarrito.addEventListener('click', () => {
  displayCarrito.classList.add('active');
});

cerrarCarrito.addEventListener('click', () => {
  displayCarrito.classList.remove('active');
});


  fetch("https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/search?query=%3CREQUIRED%3E",{ 
	"method": "GET",
	"headers": {
		"accept": "application/json",
		"X-RapidAPI-Key": "556642f38bmsh4948a6c44d4a338p1e70b1jsne9715f40d25f",
		"X-RapidAPI-Host": "matchilling-chuck-norris-jokes-v1.p.rapidapi.com"
	}
 }).then(response => { 
  return response.json()
 }).then(jokes => { 
  const comedy = jokes.result.map(jokeline => { 
    return ` 
    <p class="joke">${jokeline.value}</p>
    ` 
  })
document.querySelector("#cnjokes").insertAdjacentHTML ('afterbegin',comedy);
 })
