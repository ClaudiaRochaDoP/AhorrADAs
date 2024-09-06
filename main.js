/* ----------------------- Menu Hamburguesa ---------------------*/
const botonHamburguesa = document.getElementById("boton-hamburguesa");
const menuHamburguesa = document.getElementById("menu-hamburguesa");

botonHamburguesa.addEventListener("click", function () {
  menuHamburguesa.classList.toggle("hidden");
});

// Mostrar y ocultar filtros

const filtros = document.getElementById("filtros");
const alternarFiltros = document.getElementById("alternar-filtros");

function mostrarOcultarFiltros() {
  if (filtros.classList.contains("hidden")) {
    alternarFiltros.innerText = "Ocultar Filtros";
    filtros.classList.remove("hidden");
  } else {
    alternarFiltros.innerText = "Mostrar filtros";
    filtros.classList.add("hidden");
  }
}

alternarFiltros.addEventListener("click", function () {
  mostrarOcultarFiltros();
});

/* ----------------------- se muestran los paneles ---------------------*/
const sectionBalance = document.getElementById("section-balance");
const sectionCategorias = document.getElementById("section-categorias");
const sectionReportes = document.getElementById("section-reportes");
const sectionOperaciones = document.getElementById("section-operaciones");
const edicionCategorias = document.getElementById ("edicion-categorias")

/* ----------------------- botones menu de hamburguesa ---------------------*/
const botonBalanceHamburguesa = document.getElementById(
  "boton-balance-hamburguesa"
);
const botonCategoriaHamburguesa = document.getElementById(
  "boton-categoria-hamburguesa"
);
const botonReportesHamburguesa = document.getElementById(
  "boton-reportes-hamburguesa"
);

/*-----------------Botones menú escritorio---------------*/ 

const mostrarBalance = document.getElementById("mostrar-balance");
const mostrarCategorias = document.getElementById("mostrar-categoria");
const mostrarReportes = document.getElementById("mostrar-reportes");
const mostrarOperacion = document.getElementById("boton-operacion");
const cancelarOperacion = document.getElementById("cancelar-operacion");

function mostrarSection(section) {
  sectionBalance.classList.add("hidden");
  sectionCategorias.classList.add("hidden");
  sectionReportes.classList.add("hidden");
  sectionOperaciones.classList.add("hidden");
  edicionCategorias.classList.add("hidden");

  section.classList.remove("hidden");
}

/*-------------------Paneles en mobiles-----------*/

botonBalanceHamburguesa.addEventListener("click", function () {
  mostrarSection(sectionBalance);
});

botonCategoriaHamburguesa.addEventListener("click", function () {
  mostrarSection(sectionCategorias);
});

botonReportesHamburguesa.addEventListener("click", function () {
  mostrarSection(sectionReportes);
});


/* -----------------------Se muestran los paneles en el escritorio ---------------------*/

mostrarBalance.addEventListener ("click", function() {
  mostrarSection (sectionBalance);
});

mostrarCategorias.addEventListener ("click", function (){
  mostrarSection(sectionCategorias);
});

mostrarReportes.addEventListener ("click", function (){
  mostrarSection(sectionReportes);
});

mostrarOperacion.addEventListener("click", function () {
  mostrarSection(sectionOperaciones);
});


/*------------------------Cancelar operacion----------------------------*/

cancelarOperacion.addEventListener("click", function () {
  mostrarSection (sectionBalance);
});


/*-------------------Agregar, editar o eliminar categorias------------*/

const nombreCategoria = document.getElementById ("nombre-categoria");
const botonAgCategoria = document.getElementById ("boton-ag-categoria");
const nuevaCategoria = document.getElementById ("nueva-categoria");

function agregarCategoria () {
  const nombreCat = nombreCategoria.ariaValueMax.trim();

  if (nombreCat === "") {
    alert("Agregar una categoria aquí.");
    return;
  }

  let categorias = JSON.parse(localStorage.getItem("categorias")) || [];

  if (categorias.includes(nombreCat)) {
    alert("La categoria ya existe.");
    return;
  }

  categorias.push(nombreCat);
  localStorage.setItem("categorias", JSON.stringify(categorias));
  nombreCategoria.value = "";
  mostrarCategorias();
}

function mostrarCategorias() {
  let categorias = JSON.parse(localStorage.getItem("categorias")) || [];

  nuevaCategoria.innerHTML = "";

  for (let i = 0; i < categorias.lenght; i++) {
    /*contenedor para nueva categoria*/
    const contenedorCategoria = document.createElement("div");
    contenedorCategoria.className =
      "flex justify-between items-center p-2 mb-2 rounded-lg"

    /*elemento para cada nombre de categoria*/  
    const elementoCategoria = document.createElement("p");
    elementoCategoria.className = "text-purple-600";
    elementoCategoria.textContent = categorias [i];
    contenedorCategoria.appendChild(elementoCategoria);

    /*contenedor botones*/
    const botonNuevo = document.createElement("div");
    botonNuevo.className = "flex gap-2"

    /*botón editar*/
    cons botonEditar = document.createElement ("a");
    botonEditar.className = "text-purple-600 hover:text-black";
    botonEditar.href = "#";
    botonEditar.textContent = "Editar";

    botonEditar.addEventListener("click", function(){
      mostrarSection(edicionCategorias);
      const nombreCategoriaExistente = categorias[i];
      const editarCategorias = document.getElementById ("editar-nombre-categoria");

      editarCategorias.value = nombreCategoriaExistente;

      const confirmarEdicion = document.getElementById("confirmar-edicion");
      confirmarEdicion,addEventListener("click", function (){
        const nombreNuevo = editarCategorias.value;

        if (nombreNuevo !== "") {
          categorias[i] = nombreNuevo;
          this.localStorage.setItem("categorias", JSON.stringify(categorias));
          mostrarCategorias();
          mostrarSection(mostrar-categoria);
        }
      });
    });
  }
}

