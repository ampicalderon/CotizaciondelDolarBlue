import { obtenerJson } from "https://desarrollo-aplicaciones.vercel.app/2024/code/obtener-json.js";
import { validarSecreto } from "https://desarrollo-aplicaciones.vercel.app/2024/code/validar-secreto.js";

async function inicio() {
  escribirMensaje("Hola! Ingresa la palabra secreta:");
  const secreto = await leerEntrada();
  const dni = "43418189"; // Ingresa tu DNI aquí 👈

  if (await validarSecreto(dni, secreto)) {
    await mostrarCotizacion();
  } else {
    escribirMensaje("Palabra secreta inválida");
  }

  escribirMensaje("Presiona ENTER para volver a intentar");
  await esperarEnter();
  limpiarPantalla();
  inicio();
}

async function mostrarCotizacion() {
  const dolarBlue = await obtenerJson('https://dolarapi.com/v1/dolares/blue');
  escribirMensaje(`Cotización del Dólar Blue: Venta: ${dolarBlue.venta}, Compra: ${dolarBlue.compra}`);
}

function escribirMensaje(mensaje) {
  const appDiv = document.getElementById("app");
  appDiv.innerHTML += `<p>${mensaje}</p>`;
}

function limpiarPantalla() {
  const appDiv = document.getElementById("app");
  appDiv.innerHTML = "";
}

function leerEntrada() {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Escribe tu palabra secreta";
    const appDiv = document.getElementById("app");
    appDiv.appendChild(input);

    input.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        resolve(input.value);
        input.remove();
      }
    });
  });
}

function esperarEnter() {
  return new Promise((resolve) => {
    document.addEventListener("keypress", function onKeyPress(event) {
      if (event.key === "Enter") {
        resolve();
        document.removeEventListener("keypress", onKeyPress);
      }
    });
  });
}

inicio();
