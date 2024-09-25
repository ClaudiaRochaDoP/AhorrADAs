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
const edicionOperaciones = document.getElementById("editar-operacion")

/* ----------------Botones menu de hamburguesa ---------------------*/
const botonBalanceHamburguesa = document.getElementById("boton-balance-hamburguesa");
const botonCategoriaHamburguesa = document.getElementById("boton-categoria-hamburguesa");
const botonReportesHamburguesa = document.getElementById("boton-reportes-hamburguesa");

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
  edicionOperaciones.classList.add("hidden");

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
  mostrarSection(sectionBalance);
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
  const nombreCat = nombreCategoria.value.trim();

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
  mostrarCategoria();
}


function mostrarCategoria() {
  let categorias = JSON.parse(localStorage.getItem("categorias")) || [];

  nuevaCategoria.innerHTML = "";

  for(let i = 0; i < categorias.length; i++) {
    /*contenedor para nueva categoria*/
    const contenedorCategoria = document.createElement("div");
    contenedorCategoria.className = "flex justify-between items-center p-2 mb-2 rounded-lg";

    /*elemento para cada nombre de categoria*/  
    const elementoCategoria = document.createElement("p");
    elementoCategoria.className = "text-purple-600";
    elementoCategoria.textContent = categorias[i];
    contenedorCategoria.appendChild(elementoCategoria);

    /*contenedor botones*/
    const botonNuevo = document.createElement("div");
    botonNuevo.className = "flex gap-2";

    /*crear botón editar*/
    const botonEditar = document.createElement("a");
    botonEditar.className = "text-purple-600 hover:text-black";
    botonEditar.href = "#";
    botonEditar.textContent = "Editar";

    botonEditar.addEventListener("click", function() {
      mostrarSection(edicionCategorias);
      const nombreCategoriaExistente = categorias[i];
      const editarCategorias = document.getElementById("editar-nombre-categoria");

      editarCategorias.value = nombreCategoriaExistente;

      const confirmarEdicion = document.getElementById("confirmar-edicion");
      confirmarEdicion.addEventListener("click", function () {
        const nombreNuevo = editarCategorias.value;

        if (nombreNuevo !== "") {
          categorias[i] = nombreNuevo;
          localStorage.setItem("categorias", JSON.stringify(categorias));
          
          //Actualizar categorias en operaciones
          let operaciones = JSON.parse(localStorage.getItem("operaciones")) || [];
          operaciones = operaciones.map((op) => {
            if (op.categoriaNuevaOp === nombreCategoriaExistente) {
              op.categoriaNuevaOp = nombreNuevo;
            }
            return op;
          });
          localStorage.setItem("operaciones", JSON.stringify(operaciones));

          mostrarCategoria();
          mostrarSection(section-categorias);
          generarReporte();
          mostrarOperaciones();
        }
      });
    });

    botonNuevo.appendChild(botonEditar);

    /*Crear botón eliminar*/

    const botonEliminar = document.createElement("a");
    botonEliminar.className = "text-purple-600 hover:text-black";
    botonEliminar.href = "#";
    botonEliminar.textContent = "Eliminar";
    botonNuevo.appendChild(botonEliminar);

    botonEliminar.addEventListener("click", function () {
      const catPorEliminar = categorias [i];

      const confirEliminar = confirm(
         `¿Confirmás que querés eliminar la categoría "${catPorEliminar}"?`
      );

      if (confirmacion) {
        //eliminar categoria
        categorias = categorias.filter(
          (categoria) => categoria !== catPorEliminar
        );
        localStorage.setItem("categorias", JSON.stringify(categorias));

        //Eliminar operaciones relacionadas
        let operaciones = JSON.parse(localStorage.getItem("operaciones")) || [];
        operaciones = operaciones.filter(
          (operacion) => operacion.categoriaNuevaOp !== catPorEliminar
        );
        localStorage.setItem("operaciones", JSON.stringify(operaciones));

        mostrarOperaciones();
        mostrarCategoria();
      }
    });

    /*Añadir botones al contenedor principal */
    contenedorCategoria.appendChild(botonNuevo);

    /*Añadir al contenedor de categorias */
    nuevaCategoria.appendChild(contenedorCategoria);
  }

  const seleccionCategoria = document.getElementById("seleccion-categoria");
  const seleccionCatOperacion = document.getElementById("categoria-nuevaOp");

  seleccionCategoria.innerHTML = "";
  seleccionCatOperacion.innerHTML = "";

  //Añadir opción "todas" al principio

  const opcionTodas = document.createElement("option");
  opcionTodas.textContent = "Todas";
  opcionTodas.value = "TODAS";
  seleccionCategoria.appendChild(opcionTodas);

  for (let i = 0; i < categorias.lenght; i++) {
    const opcion1 = document.createElement("option");
    opcion1.textContent = categorias[i];
    seleccionCategoria.appendChild(opcion1);

    const opcion2 = document.createElement("option");
    opcion2.textContent = categorias[i];
    seleccionCatOperacion.appendChild(opcion2);
  }
}

botonAgCategoria.addEventListener("click", agregarCategoria);

window.onload = mostrarCategoria;


// OPERACIONES
/*----------Agregar, editar y eliminar operaciones------------*/

function agregarOperacion() {
  const descripcionNuevaOp = document.getElementById ("descripcion-nuevaOp").value;
  const montoNuevaOp = parseFloat(document.getElementById("monto-nuevaOp").value);
  const tipoNuevaOp = document.getElementById("tipo-nuevaOp").value;
  const categoriaNuevaOp = document.getElementById("categoria-nuevaOp").value;
  const fechaNuevaOp = document.getElementById("fecha-nuevaOp").value;

  const operacion = {
    descripcionNuevaOp,
    montoNuevaOp,
    tipoNuevaOp,
    categoriaNuevaOp,
    fechaNuevaOp,
  };

  let operaciones = JSON.parse(localStorage.getItem("operaciones")) || [];

  operaciones.push(operacion);

  localStorage.setItem("operaciones", JSON.stringify(operaciones));

  mostrarOperaciones();
  //generarReporte();

  //vaciar campos
  document.getElementById("descripcion-nuevaOp").value = "";
  document.getElementById("monto-nuevaOp").value = "";
  document.getElementById("tipo-nuevaOp").value = "";
  document.getElementById("categoria-nuevaOp").value = "";
  document.getElementById("fecha-nuevaOp").value = "";
}

function mostrarOperaciones(operaciones = null) {
  const sinOperaciones = getElementById("sin-operaciones");
  const imagenOperacion = getElementById("imagen-operacion");
  const contenedorNuevaOp = getElementById("contenedor-nuevaOp");

 // let operaciones = JSON.parse(localStorage.getItem("operaciones")) || [];

 if (operaciones === null) {
  operaciones = JSON.parse(localStorage.getItem("operaciones"))  || [];
 }

  contenedorNuevaOp.innerHTML = "";

  if (operaciones.lenght > 0) {
    imagenOperacion.style.display = "none";
    sinOperaciones.style.display = "none";

    //contenedor nuevas operaciones
    const nuevaOpTabla = document.createElement("div");
    nuevaOpTabla.className = "w-full flex flex-col mb-4"

    //fila titulos
    const titulosOperaciones = document.createElement("div");
    titulosOperaciones.className =  "md:flex hidden text-center bg-purple-500 text-white p-2 font-semibold shadow-md rounded-md";

    const titulos = ["Descripción", "Categoría", "Fecha", "Monto", "Acciones"];
    titulos.forEach((titulo) => {
      const tituloNuevo = document.createElement("div");
      tituloNuevo.className = "text-center flex-none px-1 py-1";
      tituloNuevo.textContent = titulo;
      titulosOperaciones.appendChild(tituloNuevo);
    });
    nuevaOpTabla.appendChild(titulosOperaciones);

    
    //nueva fila de operaciones
    operaciones.forEach((operacion, index) => {
      const filaOp = document.createElement("div");
      filaOp.className = "md:flex p-2 border-b";

      //Agregar descripción, categoría, fecha, monto
      const celdas = [
        "descripcionNuevaOp",
        "categoriaNuevaOp",
        "fechaNuevaOp",
        "montoNuevaOp",
      ];
      celdas.forEach((campo) => {
        const celdaNueva = document.createElement("div");
        celdaNueva.className = "text-center flex-none px-1 py-1";

        //Asignar clases adicionales dependiendo del campo
        if (campo === "categoriaNuevaOp") {
          celdaNueva.textContent = operacion[campo];
          celdaNueva.classList.add("text-sm", "w-auto", "text-center", "font-medium");
        } else if (campo === fechaNuevaOp) {
          celdaNueva.textContent = operacion[campo];
          celdaNueva.classList.add("text-sm", "text-gray-500", "hidden", "md:flex");
        } else if (campo === "montoNuevaOp") {
          let montoNuevo = `$${operacion.montoNuevaOp}`;
          if (operacion.tipoNuevaOp === "GASTO"){
            montoNuevo = `-$${operacion.montoNuevaOp}`;
            celdaNueva.classList.add("text-red-600", "font-bold");
          } else if (operacion.tipoNuevaOp === "GANANCIA") {
            montoNuevo = `+$${operacion.monyoNuevaOp}`
            celdaNueva.classList.add("text-green-600", "font-bold");
          }
          celdaNueva.textContent = montoNuevo;
        } else {
          celdaNueva.textContent = operacion[campo];
        }
        filaOp.appendChild(celdaNueva);
      });

      //Creo contenedor de acciones
      const acciones = document.createElement("div");
      acciones.className = "ml-2 flex gap-2 justify-center";

      //botón de Editar
      const botonEdd = document.createElement("button");
      botonEdd.textContent = "Editar";
      botonEdd.className = "text-xs text-blue-500 hover:underline";
      botonEdd.addEventListener("click", function () {
        mostrarSection(edicionOperaciones);

        document.getElementById("descripcion-nuevaOp-edd").value =
        operacion.descripcionNuevaOp;
        document.getElementById("monto-nuevaOp-edd").value =
        operacion.montoNuevaOp;
        document.getElementById("tipo-nuevaOp-edd").value=
        operacion.tipoNuevaOp;

        const categoriaOpEdd = document.getElementById("categoria-nuevaOp-edd");
        categoriaOpEdd.innerHTML = "";

        let categorias = JSON.parse(localStorage.getItem("categorias")) || [];
        categorias.forEach((categoria) => {
          const editOpciones = document.createElement("option");
          editOpciones.textContent = categoria;
          categoriaOpEdd.appendChild(editOpciones);
        });

        categoriaOpEdd.value = operacion.categoriaNuevaOp;

        document.getElementById("fecha-nuevaOp-edd").value = 
        operacion.fechaNuevaOp;

        //modificar valores
        const editarOperacion = document.getElementById("editar-operacion-btn");

        editarOperacion.addEventListener("click", function() {
          const nuevaDescripcion = document.getElementById("descripcion-nuevaOp-edd").value;
          const nuevoMonto = parseFloat(document.getElementById("monto-nuevaOp-edd").value);
          const nuevoTipo = document.getElementById("tipo-nuevaOp-edd").value;
          const nuevaCategoria = document.getElementById("categoria-nuevaOp-edd").value;
          const nuevaFecha = document.getElementById("fecha-nuevaOp-edd").value;

          operaciones[index] = {
            descripcionNuevaOp: nuevaDescripcion,
            montoNuevaOp: nuevoMonto, 
            tipoNuevaOp: nuevoTipo,
            categoriaNuevaOp: nuevaCategoria,
            fechaNuevaOp: nuevaFecha,
          };

          localStorage.setItem("operaciones", JSON.stringify(operaciones));
          mostrarOperaciones();
          mostrarSection(sectionBalance);
        });
      });

      //Botón eliminar
      const botonEliminar = document.createElement("button");
      botonEliminar.textContent = "Eliminar";
      botonEliminar.className = "text-red-500 text-xs hover:underline";
      botonEliminar.addEventListener("click", function () {
        //Obtener descripcion y categoria de la operacion
        const descripcionOperacion = operaciones[index].descripcionOperacion;
        const categoriaOperacion = operaciones[index].categoriaOperacion;

        //mostrar mensaje de confirmación
        const confirmacion = confirm(
           `¿Seguro que quieres eliminar la operación?\n\Descripción: ${descripcionOperacion}\nCategoría: ${categoriaOperacion}`
        );

        if (confirmar) {
          //si confirma eliminar la operación
          operaciones.splice(index, 1);
          localStorage.setItem("operaciones", JSON.stringify(operaciones));
          mostrarOperaciones();
        }
      });

      acciones.appendChild(botonEdd);
      acciones.appendChild(botonEliminar);

      //Añadir acciones al final de la fila
      filaOp.appendChild(acciones);
      nuevaOpTabla.appendChild(filaOp);
    });

    contenedorNuevaOp.appendChild(nuevaOpTabla);
    mostrarSection(sectionBalance);
  } else {
    imagenOperacion.style.display = "block";
    sinOperaciones.style.display = "block";
  }
}

const botonAgregarOperacion = document
      .getElementById("agregar-operacion")
      .addEventListener("click", agregarOperacion);

  window.onload = mostrarOperaciones
  window.onload = mostrarCategoria


/*-----------------------FILTROS-------------------- */

//aplicar filtros

function aplicarFiltros() {
  const filtroTipo = document.getElementById ("filtro-tipo").value;
  const filtroCategoria = document.getElementById ("seleccion-categoria").value;
  const filtroDesde = document.getElementById ("filtro-desde").value;
  const filtroOrdenar = document.getElementById ("filtro-ordenar").value;

  let operaciones = JSON.parse(localStorage.getItem("operaciones")) || [];


  //comprobar si se aplicó algún filtro
  const filtrosAplicados = filtroTipo !== "TODOSFILT" || filtroCategoria || filtroDesde || filtroOrdenar;

  if (filtrosAplicados) {
    // tipo
    if (filtroTipo !== "TODOSFILT") {
      operaciones = operaciones.filter((op) => op.tipoNuevaOp === filtroTipo);
    }

    // categoria
    if (filtroCategoria && filtroCategoria !== "TODAS") {
      operaciones = operaciones.filter((op) => op.categoriaNuevaOp === filtroCategoria);
    }

    // fecha
    if (filtroDesde) {
      const fechaDesde = new date(filtroDesde);
      operaciones = operaciones.filter((op) => new Date(op.fechaNuevaOp) >= fechaDesde);
    }


    // ORDENAR
    switch (filtroOrdenar) {
      case "mas-reciente": operaciones.sort (
        (a, b) => new Date(b.fechaNuevaOp) - new Date(a.fechaNuevaOp)
      );
      break;
      case "menos-reciente": operaciones.sort(
        (a,b) => new Date(a.fechaNuevaOp) - new Date(b.fechaNuevaOp)
      );
      break;
      case "mayor-monto": operaciones.sort(
        (a, b) => b.montoNuevaOp - a.montoNuevaOp);
      break;
      case "menor-monto": operaciones.sort(
        (a, b) => a.montoNuevaOp - b.montoNuevaOp);
      break;
      case "a-z": operaciones.sort(
        (a, b) => a.descripcionNuevaOp.localeCompare(b.descripcionNuevaOp));
      break;
      case "z-a": operaciones.sort(
        (a, b) => b.descripcionNuevaOp.localeCompare(a.descripcionNuevaOp));
      break;
      default:
        break;
     
    }
    mostrarOperaciones(operaciones);
  } else {
    mostrarOperacion();
  }
}
  