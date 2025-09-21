const imagenes = document.querySelectorAll('.img')
const cursor = document.querySelector(".cursor") 

imagenes.forEach(img => { // Esto al hacer clic sobre las imágenes, le añadirá la clase "mostrar_img" junto con sus propiedades en CSS
    img.addEventListener('click', () => {
        eliminarClase(imagenes) // Llamado de función
        img.classList.add('mostrar_img') 
    })
});

function eliminarClase (imagenes) { // Función que elimina la clase "mostrar_img" de quien la tenga activa
    imagenes.forEach(img => {
        img.classList.remove('mostrar_img')
    })
}

function visibilidadCursor() { // Función para deshabilitar el cursor si entra al @media
    if (window.matchMedia("(max-width: 991px)").matches) {
        cursor.style.display = "none";
    } else {
        cursor.style.display = "block";
    }
}

document.addEventListener("mousemove", (eje) => { // Mueve el elemento CSS con el cursor
    let x = eje.pageX;
    let y = eje.pageY;

    cursor.style.top = y + "px";
    cursor.style.left = x + "px";
    visibilidadCursor();
});

// Desaparece el elemento CSS cuando el cursor está fuera de pantalla
document.addEventListener("mouseout", () => { 
    cursor.style.display = "none";
})