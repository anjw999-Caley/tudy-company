const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".site-nav a, .header-actions a");
const contactForm = document.querySelector(".contact-form");
const contactSubmitFrame = document.querySelector('iframe[name="contact-submit-frame"]');

let isSubmittingContact = false;

if (menuToggle && header) {
  menuToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("nav-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (header && header.classList.contains("nav-open")) {
      header.classList.remove("nav-open");
      if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", "false");
      }
    }
  });
});

if (contactForm) {
  contactForm.addEventListener("submit", () => {
    const submitButton = contactForm.querySelector('button[type="submit"]');

    isSubmittingContact = true;

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "전송 중...";
    }
  });
}

if (contactSubmitFrame) {
  contactSubmitFrame.addEventListener("load", () => {
    if (!isSubmittingContact) {
      return;
    }

    isSubmittingContact = false;

    const submitButton = contactForm?.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "무료 상담 신청";
    }

    contactForm?.reset();
    window.alert("무료체험 신청이 전송되었습니다.");
  });
}
