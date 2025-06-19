document.addEventListener("DOMContentLoaded", () => {
  // Hide loader
  const loader = document.getElementById("loader");
  setTimeout(() => loader.style.display = "none", 1500);

  // Dark mode toggle
  const toggle = document.getElementById("theme-toggle");
  const isDark = localStorage.getItem("theme") === "dark";
  if (isDark) {
    document.body.classList.add("dark");
    toggle.textContent = "☀️";
  }

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isNowDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isNowDark ? "dark" : "light");
    toggle.textContent = isNowDark ? "☀️" : "🌙";
  });

  // Fade in animation on load
  document.querySelectorAll(".fade-in").forEach(el => {
    el.classList.add("animate");
  });

  // Star background canvas
  const canvas = document.getElementById("star-canvas");
  const ctx = canvas.getContext("2d");
  let stars = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createStars(count) {
    stars = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.3 + 0.1
      });
    }
  }

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    for (let star of stars) {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
      ctx.fill();
      star.y += star.speed;
      if (star.y > canvas.height) {
        star.y = 0;
        star.x = Math.random() * canvas.width;
      }
    }
    requestAnimationFrame(drawStars);
  }

  window.addEventListener("resize", () => {
    resizeCanvas();
    createStars(150);
  });

  resizeCanvas();
  createStars(150);
  drawStars();
});
