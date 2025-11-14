const heroImg = document.getElementById("heroImg");
const heroTitle = document.getElementById("heroTitle");
const heroDesc = document.getElementById("heroDesc");

function img(srcD, srcM){ return window.innerWidth <= 600 ? `url('${srcM}')` : `url('${srcD}')`; }

const heroSlides = [
  { bg: img('asset/image/billing hm.jpg','asset/image/billing sl.jpg'),
    title:"Get Expert <span><br>Medical Billing</span><br> Services",
    desc:"Accurate billing with faster reimbursements." },
  { bg: img('asset/image/medical coading  hm.jpg','asset/image/coding ml.jpg'),
    title:"Get Expert <span><br>Medical Coding</span><br> Services",
    desc:"Accurate billing with faster reimbursements." },    
  { bg: img('asset/image/revenue hm.jpeg','asset/image/revenue ml.jpg'),
    title:"Maximize <span><br>Revenue Cycle</span><br>Efficiency",
    desc:"Smart automation and reduced claim denials." }
];

let i = 0;
function switchHero(){
  heroImg.style.opacity = 0;
  heroTitle.style.opacity = 0;
  heroDesc.style.opacity = 0;

  setTimeout(()=>{
    heroImg.style.backgroundImage = heroSlides[i].bg;
    heroTitle.innerHTML = heroSlides[i].title;
    heroDesc.innerHTML = heroSlides[i].desc;

    heroImg.style.opacity = 1;
    heroTitle.style.opacity = 1;
    heroDesc.style.opacity = 1;

    i = (i+1) % heroSlides.length;
  },450);
}

switchHero();
setInterval(switchHero, 5000);

/* Smooth Scroll Reveal */
const reveals = document.querySelectorAll('.smooth-reveal');
function revealOnScroll(){
  reveals.forEach(el=>{
    if(el.getBoundingClientRect().top < window.innerHeight - 120){
      el.classList.add('active');
    }
  });
}
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

/* Who We Are Slide Reveal */
function revealWho(){
  let pos = document.querySelector(".who-we-are").getBoundingClientRect().top;
  if(pos < window.innerHeight - 150){
    document.querySelector(".circle-wrapper").classList.add("visible");
    document.querySelector(".who-right").classList.add("visible");
  }
}
window.addEventListener("scroll", revealWho);
revealWho();

/* Mobile Menu */
document.getElementById("hamburger").onclick=()=>{
  const m=document.getElementById("mobileMenu");
  m.style.display= m.style.display==="flex" ? "none":"flex";
};

// animation
function animateWhoWeAre() {
  const circle = document.querySelector(".circle-wrapper");
  const rightText = document.querySelector(".who-right");

  const trigger = circle.getBoundingClientRect().top < window.innerHeight - 120;
  if(trigger) {
    circle.classList.add("visible");
    rightText.classList.add("visible");
  }
}
window.addEventListener("scroll", animateWhoWeAre);
animateWhoWeAre();

// Slider-Section
const slider = document.getElementById("slider");
const prev = document.getElementById("prev");
const next = document.getElementById("next");


function safeScrollStep(){
const card = slider.querySelector('.car-card');
if(card) return card.clientWidth + 24;
return 300;
}


next.addEventListener("click",()=>{
slider.scrollBy({ left:safeScrollStep(), behavior:"smooth" });
});
prev.addEventListener("click",()=>{
slider.scrollBy({ left:-safeScrollStep(), behavior:"smooth" });
});

// contact us section

// REPLACE these placeholders with your values (keep quotes)
const EMAILJS_PUBLIC_KEY = "PUBLIC_KEY_REPLACE_ME";   // e.g. "CA0GbM3c8-LqU_F1_"
const EMAILJS_SERVICE_ID = "SERVICE_ID_REPLACE_ME";  // e.g. "service_qrcz698"
const EMAILJS_TEMPLATE_ID = "TEMPLATE_ID_REPLACE_ME";// e.g. "template_qncp3l9"

// Initialize EmailJS if library loaded
if (window.emailjs && typeof emailjs.init === 'function') {
  try {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  } catch (err) {
    console.warn("EmailJS init failed (check PUBLIC KEY):", err);
  }
}

// Form submission logic
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('enquiryForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector('.submit-btn');
    const oldText = submitBtn ? submitBtn.innerText : null;
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerText = "Sending...";
    }

    // ensure emailjs available
    if (!window.emailjs || !emailjs.sendForm) {
      alert("Email service not available. Make sure EmailJS script is loaded and PUBLIC KEY is set.");
      if (submitBtn) { submitBtn.disabled = false; submitBtn.innerText = oldText; }
      return;
    }

    // send the form - SERVICE & TEMPLATE must be strings
    emailjs.sendForm(service_qrcz698, template_qncp3l9, this)
      .then(() => {
        alert("✅ Your enquiry has been sent successfully!");
        this.reset();
        if (submitBtn) { submitBtn.disabled = false; submitBtn.innerText = oldText; }
      })
      .catch((err) => {
        console.error("EmailJS Error:", err);
        alert("❌ Failed to send message. Please try again later.");
        if (submitBtn) { submitBtn.disabled = false; submitBtn.innerText = oldText; }
      });
  });
});

