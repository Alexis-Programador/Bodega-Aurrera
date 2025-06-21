const buscador = document.getElementById('buscador');
const ordenar = document.getElementById('ordenar');
const contenedor = document.getElementById('productos');
const contador = document.getElementById('contador');
const productosOriginales = Array.from(contenedor.children);

function renderizarProductos(lista) {
    contenedor.innerHTML = '';
    lista.forEach(prod => contenedor.appendChild(prod));
    contador.innerText = `Mostrando ${lista.length} de ${productosOriginales.length} productos`;
}

function filtrarProductos() {
    const texto = buscador.value.toLowerCase();
    const filtrados = productosOriginales.filter(
        p => p.innerText.toLowerCase().includes(texto)
    );
    ordenarProductos(filtrados);
}

function ordenarProductos(lista) {
    const tipo = ordenar.value;
    const ordenados = [...lista].sort((a, b) => {
        const textoA = a.innerText.toLowerCase();
        const textoB = b.innerText.toLowerCase();
        return tipo === 'az' ? textoA.localeCompare(textoB) : textoB.localeCompare(textoA);
    });
    renderizarProductos(ordenados);
}

buscador.addEventListener('input', filtrarProductos);
ordenar.addEventListener('change', filtrarProductos);

filtrarProductos(); 


// calendario 

 const fechaBtn = document.getElementById('fechaBtn');
  const dateInput = document.getElementById('dateInput');
  const selectedDate = document.getElementById('selectedDate');

  fechaBtn.onclick = () => dateInput.showPicker?.() || dateInput.click();

 dateInput.onchange = () => {
  const [year, month, day] = dateInput.value.split('-');
  selectedDate.textContent = `${day}/${month}/${year}`;
}; 


//seleccionar los productos

const productos = document.querySelectorAll('.producto');

let productoSeleccionado = null;

productos.forEach(producto => {
  producto.addEventListener('click', () => {
    const nombre = producto.querySelector('p').innerText;

    if (producto.classList.contains('seleccionado')) {
     
      dateInput.showPicker?.() || dateInput.click();

      dateInput.onchange = () => {
        if (!dateInput.value) return; 
      
        db.collection("selecciones").add({
          producto: nombre,
          fecha: dateInput.value
        })
        .then(docRef => {
          alert(`Producto "${nombre}" guardado con fecha de caducidad: ${dateInput.value}`);
          console.log("Guardado con ID:", docRef.id);

          producto.classList.remove('seleccionado');
          dateInput.value = '';
         
        })
        
      };

    } else {
     
      productos.forEach(p => p.classList.remove('seleccionado'));
      producto.classList.add('seleccionado');
      productoSeleccionado = nombre;
      console.log("Producto seleccionado:", nombre);
    }
  });
});



// Configuración de Firebase 
const firebaseConfig = {
    apiKey: "AIzaSyCMAaN-8Ez8UwV2H8czIjhFo3Yap5hSXOQ",
      authDomain: "calendarionombres.firebaseapp.com",
      projectId: "calendarionombres",
      storageBucket: "calendarionombres.appspot.com",
      messagingSenderId: "421662579027",
      appId: "1:421662579027:web:d091915c62851e0809e9a6",
      measurementId: "G-XB0F9LRHC7"
};


firebase.initializeApp(firebaseConfig);


const db = firebase.firestore();
