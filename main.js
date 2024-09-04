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

