const heroImg = document.getElementById("heroImg");
const heroTitle = document.getElementById("heroTitle");
const heroDesc = document.getElementById("heroDesc");

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

const heroSlides = [
  {
    bg: "url('asset/image/billing hm.jpg')",
    title: "Get Expert <span>Medical</span><br><span>Billing</span> <br>Services",
    desc: "At Leo MedHub, we make medical billing accurate, transparent, and fast. Our team ensures timely reimbursements, fewer errors, and less admin stress—so healthcare providers can focus on patient care."
  },
  {
    bg: "url('asset/image/revenue hm.jpeg')",
    title: "Get Expert <span>Revenue Cycle </span><br><span>Management</span> <br>Services",
    desc: "We help hospitals and clinics maximize revenue efficiency with smart automation and reduced claim denials."
  },
  {
    bg: "url('asset/image/medical coading  hm.jpg')",
    title: "Get Expert <span>Medical</span><br><span>Coding</span> <br>Services",
    desc: "Our platform is 100% HIPAA compliant, ensuring data security and patient confidentiality at all times."
  },
  {
    bg: "url('asset/image/virtual hm.webp')",
    title: "Get Expert <span>Virtual</span><br><span>Healthcare Staffing</span> <br>Services",
    desc: "Our platform is 100% HIPAA compliant, ensuring data security and patient confidentiality at all times."
  }
];

let heroIndex = 0;

function changeHeroSlide() {
  heroImg.classList.remove('active'); // fade out
  setTimeout(() => {
    heroImg.style.backgroundImage = heroSlides[heroIndex].bg;
    heroTitle.innerHTML = heroSlides[heroIndex].title;
    heroDesc.innerHTML = heroSlides[heroIndex].desc;
    heroImg.classList.add('active'); // fade in
    heroIndex = (heroIndex + 1) % heroSlides.length;
  }, 500); // half of transition duration
}

// Initialize first slide
changeHeroSlide();
setInterval(changeHeroSlide, 5000); // change every 5 seconds

// SCROLL ANIMATION – WHO WE ARE
window.addEventListener("scroll", () => {
  const section = document.querySelector(".who-right");
  if (!section) return;
  const position = section.getBoundingClientRect().top;
  const screenPosition = window.innerHeight / 1.3;
  if (position < screenPosition) section.classList.add("visible");
});

const circleWrapper = document.querySelector('.circle-wrapper');
function revealCircle() {
  if (!circleWrapper) return;
  const circleTop = circleWrapper.getBoundingClientRect().top;
  const triggerPoint = window.innerHeight - 100;
  if (circleTop < triggerPoint) circleWrapper.classList.add('visible');
}
window.addEventListener('scroll', revealCircle);
revealCircle();



// Scroll fade-in
window.addEventListener('scroll', () => {
  const sectionTop = container?.getBoundingClientRect().top;
  const trigger = window.innerHeight * 0.85;
  if (sectionTop < trigger) {
    container?.classList.add('visible');
    title?.classList.add('visible');
  }
});


// Scroll Animation for Trusted Section
const fades = document.querySelectorAll(".fade-up, .fade-left, .fade-right, .fade-in");

window.addEventListener("scroll", () => {
  const triggerBottom = window.innerHeight * 0.85;
  fades.forEach(el => {
    const rect = el.getBoundingClientRect().top;
    if (rect < triggerBottom) {
      el.classList.add("show");
    }
  });
});




const slider = document.getElementById("slider");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

let scrollAmount = 0;
const scrollStep = slider.clientWidth * 0.9;

next.addEventListener("click", () => {
  slider.scrollBy({ left: scrollStep, behavior: "smooth" });
});
prev.addEventListener("click", () => {
  slider.scrollBy({ left: -scrollStep, behavior: "smooth" });
});




// ====== EMAILJS CONFIG ======
(function(){
  emailjs.init("CA0GbM3c8-LqU_F1_"); // 🔹 Replace with your EmailJS Public Key
})();

document.getElementById("enquiryForm").addEventListener("submit", function(e){
  e.preventDefault();

  emailjs.sendForm("service_qrcz698", "template_qncp3l9", this)
    .then(() => {
      alert("Your enquiry has been sent successfully ✅");
      this.reset();
    })
    .catch(err => {
      console.error("Error:", err);
      alert("Failed to send message. Try again later ❌");
    });
});

// ====== SCROLL ANIMATION ======
window.addEventListener('scroll', () => {
  document.querySelectorAll('.fade-in').forEach(el => {
    const pos = el.getBoundingClientRect().top;
    const winHeight = window.innerHeight;
    if(pos < winHeight - 100){
      el.classList.add('show');
    }
  });
});
