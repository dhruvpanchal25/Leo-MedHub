/*  =========  Main JS (responsive + scroll + slider + emailjs)  =========  */

/* --------- Hero elements & slides --------- */
const heroImg = document.getElementById("heroImg");
const heroTitle = document.getElementById("heroTitle");
const heroDesc = document.getElementById("heroDesc");

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
  if (!heroImg || !heroTitle || !heroDesc) return;
  heroImg.style.opacity = 0;
  setTimeout(() => {
    heroImg.style.backgroundImage = heroSlides[heroIndex].bg;
    heroTitle.innerHTML = heroSlides[heroIndex].title;
    heroDesc.innerHTML = heroSlides[heroIndex].desc;
    heroImg.style.opacity = 1;
    heroIndex = (heroIndex + 1) % heroSlides.length;
  }, 400);
}
changeHeroSlide();
setInterval(changeHeroSlide, 5000);

/* --------- Hamburger & mobile nav --------- */
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

let mobileNav; // will store mobile nav element

function createMobileNavIfNeeded() {
  // create a mobile nav container if not present
  if (!mobileNav) {
    mobileNav = document.createElement('nav');
    mobileNav.className = 'nav-mobile';
    mobileNav.setAttribute('aria-hidden', 'true');

    // clone links from desktop nav
    const desktopLinks = document.querySelectorAll('#navMenu a');
    desktopLinks.forEach(a => {
      const copy = a.cloneNode(true);
      mobileNav.appendChild(copy);
    });

    document.body.appendChild(mobileNav);
  }
}

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  const expanded = hamburger.classList.contains('active');
  hamburger.setAttribute('aria-expanded', expanded ? 'true' : 'false');

  createMobileNavIfNeeded();
  if (mobileNav) {
    if (expanded) {
      mobileNav.style.display = 'block';
      mobileNav.setAttribute('aria-hidden', 'false');
    } else {
      mobileNav.style.display = 'none';
      mobileNav.setAttribute('aria-hidden', 'true');
    }
  }
});

// Click outside to close mobile nav
document.addEventListener('click', (e) => {
  if (!mobileNav) return;
  if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
    hamburger.classList.remove('active');
    mobileNav.style.display = 'none';
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

/* --------- Scroll animations for who-we-are and fades --------- */
const circleWrapper = document.querySelector('.circle-wrapper');
const whoRight = document.querySelector('.who-right');

function revealOnScroll() {
  if (circleWrapper) {
    const top = circleWrapper.getBoundingClientRect().top;
    const trigger = window.innerHeight - 100;
    if (top < trigger) circleWrapper.classList.add('visible');
  }
  if (whoRight) {
    const top2 = whoRight.getBoundingClientRect().top;
    const trigger2 = window.innerHeight / 1.3;
    if (top2 < trigger2) whoRight.classList.add('visible');
  }

  // generic fades
  document.querySelectorAll('.fade-up, .fade-left, .fade-right, .fade-in').forEach(el => {
    const rect = el.getBoundingClientRect().top;
    const trigger = window.innerHeight * 0.85;
    if (rect < trigger) el.classList.add('show');
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

/* --------- Slider prev/next behaviour --------- */
const slider = document.getElementById("slider");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

function safeScrollStep() {
  if (!slider) return 300;
  // choose step based on slider width and card width
  const card = slider.querySelector('.car-card');
  if (card) return card.clientWidth + 16;
  return Math.floor(slider.clientWidth * 0.9);
}

next?.addEventListener("click", () => {
  if (!slider) return;
  slider.scrollBy({ left: safeScrollStep(), behavior: "smooth" });
});
prev?.addEventListener("click", () => {
  if (!slider) return;
  slider.scrollBy({ left: -safeScrollStep(), behavior: "smooth" });
});

/* --------- EmailJS form send (replace placeholders) --------- */
/*
  IMPORTANT:
  1) Replace PUBLIC_KEY, SERVICE_ID, TEMPLATE_ID with your EmailJS values.
  2) Make sure the template in EmailJS uses these variable names:
     {{first_name}}, {{last_name}}, {{email}}, {{phone}}, {{company}}, {{message}}, {{interest}}, {{city}}
*/

// Put your real values here:
const EMAILJS_PUBLIC_KEY = "PUBLIC_KEY_REPLACE_ME";
const EMAILJS_SERVICE_ID = "SERVICE_ID_REPLACE_ME";
const EMAILJS_TEMPLATE_ID = "TEMPLATE_ID_REPLACE_ME";

try {
  if (window.emailjs && typeof emailjs.init === 'function' && EMAILJS_PUBLIC_KEY !== "PUBLIC_KEY_REPLACE_ME") {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  } else if (window.emailjs && typeof emailjs.init === 'function') {
    // initialize even if placeholder (keeps API available) - but it's better to replace with real key
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }
} catch (err) {
  // emailjs script not loaded or error - will still handle below with checks
  console.warn("EmailJS init warning:", err);
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('enquiryForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Basic UI feedback
    const submitBtn = this.querySelector('.submit-btn');
    const oldText = submitBtn ? submitBtn.innerText : null;
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerText = "Sending...";
    }

    // Ensure emailjs available
    if (!window.emailjs || !emailjs.sendForm) {
      alert("Email service not available. Make sure EmailJS script is loaded and PUBLIC_KEY is set.");
      if (submitBtn) { submitBtn.disabled = false; submitBtn.innerText = oldText; }
      return;
    }

    // Send form using sendForm
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

/* --------- minor graceful JS safety fixes --------- */
// make sure hero element visible after DOM loaded
if (heroImg) heroImg.style.opacity = 1;
