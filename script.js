const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm && formStatus) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(contactForm);
        const name = String(formData.get("name") || "").trim();

        formStatus.textContent = `${name || "문의자"}님의 내용이 입력되었습니다. 실제 전송 기능은 이후 API 또는 메일 연동으로 연결하면 됩니다.`;
    });
}
