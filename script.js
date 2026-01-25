// Menú responsive
const burger = document.getElementById("burger");
const mobile = document.getElementById("mobile");

burger?.addEventListener("click", () => {
  const open = mobile.classList.toggle("open");
  burger.setAttribute("aria-expanded", String(open));
});

// Scroll suave en anclas
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href").slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth" });
      mobile.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    }
  });
});

// Animación de entrada para tarjetas
const cards = document.querySelectorAll(".card");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("show");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
cards.forEach((c) => io.observe(c));