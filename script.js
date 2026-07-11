const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".site-nav a, .header-actions a");
const contactForm = document.querySelector(".contact-form");
const searchParams = new URLSearchParams(window.location.search);

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

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "전송 중...";
    }
  });
}

if (searchParams.get("submitted") === "1") {
  window.alert("무료체험 신청이 전송되었습니다.");
  searchParams.delete("submitted");

  const nextUrl =
    searchParams.toString().length > 0
      ? `${window.location.pathname}?${searchParams.toString()}${window.location.hash}`
      : `${window.location.pathname}${window.location.hash}`;

  window.history.replaceState({}, "", nextUrl);
}
