document.addEventListener('DOMContentLoaded', () => {

const modal = document.getElementById('vista-previa');
const tituloModal = document.getElementById('titulo-modal');
const descModal = document.getElementById('descripcion-modal');
const btnPedidoWA = document.getElementById('btn-whatsapp-pedido');
const contenedorMedia = document.querySelector('.modal-media');

const MI_TELEFONO = "5493424432210";

const abrirModal = (titulo, descripcion, fuente, _esQR = false, fotosLista = "", preciosLista = "") => {
    tituloModal.textContent = titulo || "Producto";
    descModal.innerHTML = (descripcion || "").replace(/\n/g, "<br>");
    modal.dataset.tienePrecios = preciosLista ? "true" : "false";

    contenedorMedia.innerHTML = '';

    if (fotosLista) {
        const galeria = document.createElement('div');
        galeria.className = 'galeria-interna-modal';

        const fotos = fotosLista.split(',');
        const precios = preciosLista ? preciosLista.split(',') : [];

        fotos.forEach((f, i) => {
            const contenedor = document.createElement('div');
            contenedor.style.position = 'relative';

            const img = document.createElement('img');
            img.src = f.trim();
            contenedor.appendChild(img);

            // PRECIO (si existe)
            if (precios[i]) {
                const precio = document.createElement('span');
                precio.textContent = precios[i];
                precio.style.position = 'absolute';
                precio.style.bottom = '5px';
                precio.style.right = '5px';
                precio.style.background = 'rgba(0,0,0,0.7)';
                precio.style.color = 'white';
                precio.style.padding = '3px 6px';
                precio.style.borderRadius = '6px';
                precio.style.fontSize = '12px';

                contenedor.appendChild(precio);
            }

            galeria.appendChild(contenedor);
        });

        contenedorMedia.appendChild(galeria);
        btnPedidoWA.style.display = 'inline-block';

    } else {
        contenedorMedia.innerHTML = `<img src="${fuente}">`;
        btnPedidoWA.style.display = 'inline-block';
    }

    const mensaje = encodeURIComponent(`Asistente santoto laser Me interesa: ${titulo}`);
    btnPedidoWA.href = `https://wa.me/${MI_TELEFONO}?text=${mensaje}`;

    modal.style.display = 'flex';
modal.classList.add('activo');

// si tiene muchas fotos → modo galería
if (fotosLista && preciosLista) {
    // SOLO variantes (con precios)
    modal.classList.add('modal-solo-imagen');
} else {
    modal.classList.remove('modal-solo-imagen');
}
    console.log("MODAL ABIERTO");
};

const cerrarModal = () => {
    modal.classList.remove('activo');

    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
};

document.querySelectorAll('.imagen-carrusel').forEach(el => {
    el.addEventListener('click', () => {
        const fondo = el.style.backgroundImage;
        const url = fondo.slice(5, -2);

        abrirModal(
            el.dataset.title,
            el.dataset.description,
            url,
            false,
            el.dataset.fotos,
            el.dataset.precios
        );
    });
});

document.addEventListener('click', e => {
    if (e.target.id === 'cerrar-vista-previa') {
        cerrarModal();
    }
});

const btnCerrar = document.getElementById('cerrar-modal-btn');

if (btnCerrar) {
    btnCerrar.addEventListener('click', cerrarModal);
}

modal.onclick = e => { 
    if (e.target === modal) cerrarModal(); 
};

// BOTONES DEL CARRUSEL (sin romper si no existen)
document.querySelectorAll('.carrusel-contenedor').forEach(c => {
    const cont = c.querySelector('.carrusel-imagenes');
    
    const btnIzq = c.querySelector('.boton-izq');
    const btnDer = c.querySelector('.boton-der');

    if (btnIzq) {
        btnIzq.onclick = () => cont.scrollLeft -= 300;
    }

    if (btnDer) {
        btnDer.onclick = () => cont.scrollLeft += 300;
    }
});

// VISOR DE IMÁGENES GRANDES
const visor = document.getElementById('visor-imagen');
const imgGrande = document.getElementById('img-grande');

document.addEventListener('click', e => {
    if (e.target.closest('.galeria-interna-modal img')) {

    // SOLO si el producto tiene precios
    if (modal.dataset.tienePrecios === "true") {
        const img = e.target;

        abrirModal(
            "Producto",
            "",
            img.src,
            false,
            "",
            ""
        );
    }

}
});

visor.addEventListener('click', () => {
    visor.style.display = 'none';
});

});