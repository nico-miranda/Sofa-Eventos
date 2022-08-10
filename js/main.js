const btnCarrito = document.getElementById('btn-carrito');
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
    this.precio = obj.precio;
    this.precioIva = this.agregarIva();
  }

  agregarIva() {
    return this.precio + (this.precio * 21) / 100;
  }
}

const carrito = [];

const generarHtmlCatalogo = () => {
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
      <button class="card__btn">Añadir al carrito</button>`;

    catalogo.appendChild(elemento);
  });
};

const buscarSofa = (id) => {
  return sofa.find((sofa) => sofa.id === id);
};

const agregarSofa = (sofa) => {
  carrito.push(sofa);
};

const cargarSofaCarrito = () => {
  let cardBtns = document.querySelectorAll('.card__btn');

  cardBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      let itemId = parseInt(e.target.closest('.card').id.slice(5));

      agregarSofa(buscarSofa(itemId));
      generarHtmlCarrito();
    });
  });
};

const eliminarSofa = (id) => {
  let posicion = carrito.findIndex((sofa) => sofa.id === id);
  carrito.splice(posicion, 1);
};

const eliminarSofaCarrito = () => {
  let deleteBtns = document.querySelectorAll('.sofa__eliminar');

  deleteBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      let itemId = parseInt(e.target.closest('.product-container').id.slice(9));

      eliminarSofa(itemId);
      generarHtmlCarrito();
    });
  });
};

const generarHtmlCarrito = () => {
  let contenedorCarrito = document.querySelector('.contenedor-carrito');
  let totalCarrito = document.querySelector('.total-carrito');

  if (carrito.length === 0) {
    contenedorCarrito.innerHTML = 'No hay productos en tu carrito.';
  } else {
    contenedorCarrito.innerHTML = '';
  }

  carrito.forEach((producto) => {
    let elemento = document.createElement('div');
    elemento.id = `producto-${producto.id}`;
    elemento.className = 'product-container';
    elemento.innerHTML = `
      <img class="sofa__img" src="images/${producto.imagen}">
      <div class="sofa__info">
        <p class="sofa__nombre">${producto.nombre}</p>
        <p class="sofa__precio">$${producto.precio}</p>
      </div>
      <button class="sofa__eliminar">&times</button>
    `;

    contenedorCarrito.appendChild(elemento);
  });

  let total = 0;

  for (const item of carrito) {
    let sofa = new Sofa(item);
    sofa.agregarIva();
    total += sofa.precioIva;
  }

  totalCarrito.innerHTML = `Total a pagar: $${total.toFixed(2)}`;

  eliminarSofaCarrito();
};

generarHtmlCatalogo();
cargarSofaCarrito();

btnCarrito.addEventListener('click', () => {
  displayCarrito.classList.toggle('active');

  if (displayCarrito.classList.contains('active')) {
    btnCarrito.innerHTML = 'close';
  } else {
    btnCarrito.innerHTML = 'shopping_cart';
  }
});