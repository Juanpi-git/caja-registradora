//DINERO QUE YO LE PASO COMO DATO
const dineroInicialEnCaja = parseFloat(
  prompt("Ingrese el monto inicial en caja")
);

//ES EL DINERO EN CAJA QUE VOY A IR MOSTRANDO
let dineroEnCajaTotal = 0;
//ES UN CONTADOR PARA PODER REGISTRAR MÁS DE UNA VENTA SIN REFRESCAR LA PÁG
let contadorDeVentas = 0;
//ES EL DIV QUE CONTIENE A LOS INPUTS Y LOS BOTONES
let contenedor = document.querySelector(".contenedor");

function registrarVenta() {
  //ACCEDO AL VALOR DE LOS INPUTS Y LOS GUARDO EN VARIABLES PARA PODER USARLOS
  let costoProducto = parseFloat(
    document.querySelector("#costo-producto").value
  );
  let dineroRecibido = parseFloat(
    document.querySelector("#dinero-recibido").value
  );

  //SI contadorDeVentas ES 0, ES LA PRIMER VENTA QUE ESTOY REGISTRANDO UNA VENTA Y OCURRE SOLO LA PRIMERA VEZ
  //SI contadorDeVentas NO ES 0, ESTOY REGISTRANDO MÁS DE UNA VENTA
  if (contadorDeVentas == 0) {
    //SI EL DINERO RECIBIDO POR EL CLIENTE ES MENOR AL COSTO DEL PRODUCTO, CREO UN PÁRRAFO QUE DIGA
    //QUE NO PUEDE REALIZAR LA VENTA Y LO AGREGO AL FINAL
    if (dineroRecibido < costoProducto) {
      let mensaje = document.createElement("p");
      mensaje.textContent = "Dinero insuficiente para completar la venta.";
      contenedor.appendChild(mensaje);

      dineroEnCajaTotal = dineroEnCajaTotal + dineroInicialEnCaja;
    } else {
      //SI EL DINERO RECIBIDO POR EL CLIENTE NO ES MENOR AL COSTO DEL PRODUCTO
      //CALCULO EL VUELTO QUE TENGO QUE DARLE
      //AUMENTO EL DINERO EN CAJA CON EL COSTO DEL PRODUCTO
      //CREO TRES PÁRRAFOS Y LOS AGREGO AL FINAL
      let vuelto = dineroRecibido - costoProducto;
      dineroEnCajaTotal =
        dineroEnCajaTotal + dineroInicialEnCaja + costoProducto;

      let mensajeVenta = document.createElement("p");
      let mensajeVuelto = document.createElement("p");
      let mensajeDineroEnCaja = document.createElement("p");

      mensajeVenta.textContent = "Venta completada.";
      mensajeVuelto.textContent = `Vuelto: $${vuelto}`;
      mensajeDineroEnCaja.textContent = `Dinero en caja: $${dineroEnCajaTotal}`;

      contenedor.appendChild(mensajeVenta);
      contenedor.appendChild(mensajeVuelto);
      contenedor.appendChild(mensajeDineroEnCaja);
    }

    //AUMENTO EL CONTADOR DE VENTAS PARA PODER REGISTRAR MÚLTIPLES VENTAS SIN REFRESCAR
    contadorDeVentas++;
  } else {
    //SI EXISTEN ELEMENTOS EN LAS POSICIONES 7 Y 8 ES PORQUE LA VENTA SE REALIZÓ Y SE AGREGARON LOS TRES PÁRRAFOS
    //ENTONCES BORRO ESOS TRES PÁRRAFOS
    if (contenedor.children[8] && contenedor.children[7]) {
      contenedor.children[9].remove();
      contenedor.children[8].remove();
      contenedor.children[7].remove();
    } else {
      //SI NO EXISTEN LOS ELEMENTOS 7 Y 8 ES PORQUE LA VENTA NO SE PUDO REALIZAR Y SOLO SE AGREGÓ UN PÁRRAFO
      //ENTONCES BORRO ESE PÁRRAFO
      contenedor.children[7].remove();
    }

    //LUEGO DE BORRAR LO QUE HABÍA, VUELVO A HACER LO MISMO DE ANTES Y REGISTRO LA VENTA
    if (dineroRecibido < costoProducto) {
      let mensaje = document.createElement("p");
      mensaje.textContent = "Dinero insuficiente para completar la venta.";
      contenedor.appendChild(mensaje);
    } else {
      let vuelto = dineroRecibido - costoProducto;
      dineroEnCajaTotal = dineroEnCajaTotal + costoProducto;

      let mensajeVenta = document.createElement("p");
      let mensajeVuelto = document.createElement("p");
      let mensajeDineroEnCaja = document.createElement("p");

      mensajeVenta.textContent = "Venta completada.";
      mensajeVuelto.textContent = `Vuelto: $${vuelto}`;
      mensajeDineroEnCaja.textContent = `Dinero en caja: $${dineroEnCajaTotal}`;

      contenedor.appendChild(mensajeVenta);
      contenedor.appendChild(mensajeVuelto);
      contenedor.appendChild(mensajeDineroEnCaja);
    }

    contadorDeVentas++;
  }
}

//ACCEDO AL BOTÓN QUE DICE CALCULAR Y CADA VEZ QUE SE HAGA CLICK
//VA A EJECUTAR LA FUNCIÓN registrarVenta()
let botonCalcular = document.querySelector(".btn-calcular");
botonCalcular.addEventListener("click", () => registrarVenta());

let botonHistorial = document.querySelector(".btn-historial");

//ACCEDO AL BOTÓN PARA CERRAR LA CAJA Y CADA VEZ QUE SE HAGA CLICK
//CREA DOS PÁRRAFOS PARA MOSTRAR LA CANTIDAD DE VENTAS EN EL DÍA Y EL DINERO TOTAL EN CAJA
let botonCerrarCaja = document.querySelector(".btn-cerrarCaja");
botonCerrarCaja.addEventListener("click", () => {
  if (contenedor.children[8] && contenedor.children[7]) {
    contenedor.children[9].remove();
    contenedor.children[8].remove();
    contenedor.children[7].remove();

    let mensajeVentasTotales = document.createElement("p");
    let mensajeDineroEnCaja = document.createElement("p");

    mensajeVentasTotales.textContent = `Hubo ${contadorDeVentas} ventas en el día`;
    mensajeDineroEnCaja.textContent = `Dinero total en caja: $${dineroEnCajaTotal}`;

    contenedor.appendChild(mensajeVentasTotales);
    contenedor.appendChild(mensajeDineroEnCaja);
  } else {
    contenedor.children[7].remove();

    let mensajeVentasTotales = document.createElement("p");

    mensajeVentasTotales.textContent = "No hubo ninguna venta";

    contenedor.appendChild(mensajeVentasTotales);
  }
});
