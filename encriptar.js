const d = document;
const textInpt = d.querySelector(".txt__input");
const imgDeco = d.querySelector(".deco__img");
const avisoTitulo = d.querySelector(".result__msg");
const instructionText = d.querySelector(".result__instrctn");
const botonEncriptar = d.querySelector(".encript__btn");
const botonDesencriptar = d.querySelector(".encript__btn.encript__btn__secundary");
const botonCopiar = d.querySelector(".result__btn");

const llavesMap = {
  a:  "ai",
  e: "enter",
  i: "imes",
  o: "ober",
  u: "ufat",
}
const keys = Object.keys(llavesMap)
const values = Object.values(llavesMap)

function encriptarmensaje(msg) {
  const arr = msg.split('')
  const result = arr.map((letter) => {
    if (keys.includes(letter)) { 
      return llavesMap[letter] 
    } else {
      return letter
    }
  })
  return result.join('')
}

function desencriptarMensaje(msg) {
  const pattern = values.join('|')
  const regex = new RegExp(`(${pattern})`, 'g')
  const arr = msg.split(regex)

  const result = arr.map((substring) => {
    if (values.includes(substring)) { 
      return keys.find(key => llavesMap[key] === substring) 
    } else {
      return substring
    }
  })

  return result.join('')
}


// Ocultar elementos dinámicamente
textInpt.addEventListener("input", (e) => {
  imgDeco.style.display = "none";
  avisoTitulo.textContent = "Capturando Mensaje.";
  instructionText.textContent = "";
});

// Función del botón encriptar
botonEncriptar.addEventListener("click", (e) => {
  e.preventDefault();
  let mensaje = textInpt.value.toLowerCase();

  if (mensaje) {
    let mensajeEncriptado = encriptarmensaje(mensaje);

    // Ocultar imagen decorativa y mostrar el resultado
    imgDeco.style.display = "none";
    avisoTitulo.textContent = "El resultado es:";
    instructionText.textContent = mensajeEncriptado;
    botonCopiar.classList.remove("hidden");
  }
});

// Función del botón desencriptar
botonDesencriptar.addEventListener("click", (e) => {
  e.preventDefault();
  let mensaje = textInpt.value.toLowerCase();

  if (mensaje) {
    let mensajeDesencriptado = desencriptarMensaje(mensaje);

    // Ocultar imagen decorativa y mostrar el resultado
    imgDeco.style.display = "none";
    avisoTitulo.textContent = "El resultado es:";
    instructionText.textContent = mensajeDesencriptado;
    botonCopiar.classList.remove("hidden");
  }
});

// Función para copiar el mensaje encriptado/desencriptado
botonCopiar.addEventListener('click', () => {
  let textoCopiado = instructionText.textContent;
  navigator.clipboard.writeText(textoCopiado).then(() => {
    imgDeco.style.display = "block";
    avisoTitulo.textContent = "El texto se copió";
    botonCopiar.classList.add("hidden");
    instructionText.textContent = "";
  });
});
