
document.addEventListener("DOMContentLoaded", function () {

  const menuToggle = document.getElementById("menuToggle");
  const primaryNav = document.getElementById("primaryNav");

  function setMenu(isOpen) {
    primaryNav.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  }


  menuToggle.addEventListener("click", function () {
    setMenu(!primaryNav.classList.contains("open"));
  });


  primaryNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setMenu(false);
    });
  });


  const themeToggle = document.getElementById("themeToggle");
  const root = document.documentElement;

  function applyTheme(theme) {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
      themeToggle.textContent = "Light mode";
      themeToggle.setAttribute("aria-label", "Switch to light mode");
    } else {
      root.removeAttribute("data-theme");
      themeToggle.textContent = "Dark mode";
      themeToggle.setAttribute("aria-label", "Switch to dark mode");
    }
  }

  let savedTheme = "light";
  try {
    savedTheme = localStorage.getItem("theme") || "light";
  } catch (error) {
    console.warn("Could not read saved theme:", error);
  }
  applyTheme(savedTheme);

  themeToggle.addEventListener("click", function () {
    const newTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(newTheme);
    try {
      localStorage.setItem("theme", newTheme);
    } catch (error) {
      console.warn("Could not save theme:", error);
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  });

  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const formStatus = document.getElementById("formStatus");


  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  function showError(input, message) {
    document.getElementById(input.id + "Error").textContent = message;
    input.classList.add("invalid");
    input.setAttribute("aria-invalid", "true");
  }

  function clearError(input) {
    document.getElementById(input.id + "Error").textContent = "";
    input.classList.remove("invalid");
    input.removeAttribute("aria-invalid");
  }


  function validateForm() {
    let isValid = true;
    [nameInput, emailInput, messageInput].forEach(clearError);

    if (nameInput.value.trim() === "") {
      showError(nameInput, "Enter your name.");
      isValid = false;
    }

    if (emailInput.value.trim() === "") {
      showError(emailInput, "Enter your email address.");
      isValid = false;
    } else if (!emailPattern.test(emailInput.value.trim())) {
      showError(emailInput, "Enter a valid email, like name@example.com.");
      isValid = false;
    }

    if (messageInput.value.trim() === "") {
      showError(messageInput, "Write a short message.");
      isValid = false;
    }

    return isValid;
  }


  form.addEventListener("submit", function (event) {
    event.preventDefault(); 
    formStatus.textContent = "";

    if (validateForm()) {
      formStatus.textContent = "Thanks, " + nameInput.value.trim() + "! Your message is ready to send.";
      form.reset();
    } else {
      formStatus.textContent = "Fix the highlighted fields and try again.";
    }
  });

  
  [nameInput, emailInput, messageInput].forEach(function (input) {
    input.addEventListener("input", function () {
      clearError(input);
    });
  });
});
