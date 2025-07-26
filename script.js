// Botão de voltar ao topo
const btnTopo = document.getElementById("btn-topo");
window.addEventListener("scroll", () => {
  btnTopo.style.display = window.scrollY > 200 ? "block" : "none";
});
btnTopo.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Fade-in ao rolar
const elementos = document.querySelectorAll(".fade-in");
function mostrarAoRolar() {
  const alturaTela = window.innerHeight;
  elementos.forEach(el => {
    const posicao = el.getBoundingClientRect().top;
    if (posicao < alturaTela - 50) el.classList.add("visible");
  });
}
window.addEventListener("scroll", mostrarAoRolar);
mostrarAoRolar();

// Menu hambúrguer
const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");
menuToggle.addEventListener("click", () => {
  menu.classList.toggle("show");
});

// Animação de digitação
const words = ["Thiago", "Front-end Dev", "UX/UI Designer", "Futuro Back-end Dev"];
let i = 0, j = 0, isDeleting = false;

function typeEffect() {
  const typing = document.getElementById('typing');
  const currentWord = words[i];

  typing.textContent = currentWord.substring(0, j);

  if (!isDeleting && j < currentWord.length) {
    j++;
    setTimeout(typeEffect, 100);
  } else if (isDeleting && j > 0) {
    j--;
    setTimeout(typeEffect, 50);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) i = (i + 1) % words.length;
    setTimeout(typeEffect, 1000);
  }
}
typeEffect();

// Envio do formulário com EmailJS (opcional)
// 1) Descomente o script do EmailJS no index.html
// 2) Preencha as chaves abaixo
/*
(function(){
  emailjs.init("SEU_PUBLIC_KEY_AQUI");
})();

const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function(event) {
  event.preventDefault();
  emailjs.sendForm('SEU_SERVICE_ID', 'SEU_TEMPLATE_ID', this)
    .then(() => alert("Mensagem enviada com sucesso!"), 
          (err) => alert("Erro ao enviar: " + JSON.stringify(err)));
  contactForm.reset();
});
*/
