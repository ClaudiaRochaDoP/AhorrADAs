/* ----------------------- Menu Hamburguesa ---------------------*/
const botonHamburguesa = document.getElementById("boton-hamburguesa");
const menuHamburguesa = document.getElementById("menu-hamburguesa");

botonHamburguesa.addEventListener("click", function () {
  menuHamburguesa.classList.toggle("hidden");
});
