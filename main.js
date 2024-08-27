/* ----------------------- Menu Hamburguesa ---------------------*/
const botonHamburguesa = document.getElementById("boton-hamburguesa");
const menuHamburguesa = document.getElementById("menu-hamburguesa");

/*botonHamburguesa.addEventListener("click", function () {
  menuHamburguesa.classList.toggle('hidden');
});*/


// Mostrar y ocultar filtros

const filtros = document.getElementById('filtros');
const alternarFiltros = document.getElementById('alternar-filtros');

function mostrarOcultarFiltros () {
  if (filtros.classList.contains('hidden')) {
    alternarFiltros.innerText = 'Ocultar Filtros';
    filtros.classList.remove('hidden');
  } else {
    alternarFiltros.innerText = 'Mostrar filtros';
    filtros.classList.add('hidden');
  }
}

alternarFiltros.addEventListener('click', function(){
  mostrarOcultarFiltros();
})