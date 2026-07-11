const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".site-nav a, .header-actions a");
const contactForm = document.querySelector(".contact-form");
const contactSubmitFrame = document.querySelector('iframe[name="contact-submit-frame"]');

let isSubmittingContact = false;

function showValidationError(field, message) {
  field.focus();
  window.alert(message);
}

function validateContactForm(form) {
  const name = form.querySelector('input[name="name"]');
  const academy = form.querySelector('input[name="academy"]');
  const phone = form.querySelector('input[name="phone"]');
  const email = form.querySelector('input[name="email"]');

  const nameValue = name?.value.trim() || "";
  const academyValue = academy?.value.trim() || "";
  const phoneValue = phone?.value.trim() || "";
  const emailValue = email?.value.trim() || "";

  if (!nameValue) {
    showValidationError(name, "이름을 입력해주세요.");
    return false;
  }

  if (nameValue.length < 2) {
    showValidationError(name, "이름은 2자 이상 입력해주세요.");
    return false;
  }

  if (!academyValue) {
    showValidationError(academy, "학원명을 입력해주세요.");
    return false;
  }

  if (!phoneValue) {
    showValidationError(phone, "연락처를 입력해주세요.");
    return false;
  }

  const normalizedPhone = phoneValue.replace(/[^0-9]/g, "");
  if (normalizedPhone.length < 9 || normalizedPhone.length > 11) {
    showValidationError(phone, "연락처 형식이 올바르지 않습니다.");
    return false;
  }

  if (!emailValue) {
    showValidationError(email, "이메일을 입력해주세요.");
    return false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailValue)) {
    showValidationError(email, "이메일 형식이 올바르지 않습니다.");
    return false;
  }

  return true;
}

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
  contactForm.addEventListener("submit", (event) => {
    if (!validateContactForm(contactForm)) {
      event.preventDefault();
      return;
    }

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
