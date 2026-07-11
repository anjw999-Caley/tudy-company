const path = require("path");
const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

function createTransporter() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    throw new Error("SMTP credentials are missing. Set SMTP_USER and SMTP_PASS in .env.");
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass,
    },
  });
}

app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "index.html"));
});

app.post("/api/contact", async (request, response) => {
  const { name, academy, phone, email, studentCount, message } = request.body || {};

  if (!name || !academy || !phone || !email) {
    return response.status(400).json({
      ok: false,
      message: "필수 항목을 모두 입력해주세요.",
    });
  }

  try {
    const transporter = createTransporter();
    const to = process.env.CONTACT_TO || process.env.SMTP_USER;

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      replyTo: email,
      subject: `[TUDY 무료상담 신청] ${academy} / ${name}`,
      text: [
        "TUDY 무료상담 신청이 접수되었습니다.",
        "",
        `이름: ${name}`,
        `학원명: ${academy}`,
        `연락처: ${phone}`,
        `이메일: ${email}`,
        `학생 수: ${studentCount || "-"}`,
        "",
        "[문의 내용]",
        message || "-",
      ].join("\n"),
    });

    return response.json({
      ok: true,
      message: "무료상담 신청이 전송되었습니다.",
    });
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      ok: false,
      message: "메일 전송에 실패했습니다. 서버 메일 설정을 확인해주세요.",
    });
  }
});

app.listen(port, () => {
  console.log(`TUDY landing page is running at http://localhost:${port}`);
});
