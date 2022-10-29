// Pone el focus en el canvas del juego
window.onload = function () {
    let focused = document.getElementById('juego');
    focused.focus();
};


// Añade un botón pulsable
window.addEventListener('scroll', function () {
    var scrollButton = document.querySelector(".scroll-Top");

    // Si se ha bajado una cierta altura, aparece el botón.
    // Si no, desaparece
    if (window.scrollY > 300) {
        scrollButton.classList.add("active");
    }
    else {
        scrollButton.classList.remove("active");
    }

}   );

// Sube hasta la parte superior de la página
function scrollToTop() {
    window.scrollTo({ top: 0 });
};


// Mantiene el header todo el rato en la parte superior
function moveHeader() {
    var header = document.getElementById("myHeader");
    var sticky = header.offsetTop;

    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
};

// Mueve el header si se baja en la página
window.onscroll = function () {
    moveHeader();
};