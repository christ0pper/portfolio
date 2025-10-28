document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-links a");

  // Smooth Scroll for Navbar Links
  links.forEach((link) => {
    const href = link.getAttribute("href");

    if (href && href.startsWith("#")) {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = href.substring(1);
        const section = document.getElementById(targetId);

        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      });
    }
  });

  const aboutSection = document.querySelector(".about");

  if (!aboutSection) return;

  // Split text into span characters
  const textContent = aboutSection.textContent.trim();
  aboutSection.textContent = "";
  const spans = textContent.split("").map((char) => {
    const span = document.createElement("span");
    span.textContent = char;
    span.style.color = "#DEDEE7"; // start gray
    span.style.transition = "color 0.2s linear";
    aboutSection.appendChild(span);
    return span;
  });

  // Animation state
  let inView = false;
  let scrollDirection = "down";
  let currentIndex = 0;
  let animating = false;
  let scrollTimer = null;

  // Determine scroll direction
  let lastScrollY = window.scrollY;
  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    scrollDirection = currentScrollY > lastScrollY ? "down" : "up";
    lastScrollY = currentScrollY;

    // Scroll pause detection
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      animating = false;
    }, 120); // adjust for more/less sensitivity

    if (inView && !animating) {
      animating = true;
      requestAnimationFrame(animateCharacters);
    }
  });

  // Intersection observer to check if section is in view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        inView = entry.isIntersecting;

        if (inView && !animating) {
          animating = true;
          requestAnimationFrame(animateCharacters);
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(aboutSection);

  // Main animation loop
  function animateCharacters() {
    if (!inView) return;

    if (scrollDirection === "down") {
      if (currentIndex < spans.length) {
        spans[currentIndex].style.color = "#222"; // fade to black
        currentIndex++;
      }
    } else {
      if (currentIndex > 0) {
        currentIndex--;
        spans[currentIndex].style.color = "#DEDEE7"; // fade to gray
      }
    }

    if (
      (scrollDirection === "down" && currentIndex < spans.length) ||
      (scrollDirection === "up" && currentIndex > 0)
    ) {
      if (animating) {
        requestAnimationFrame(animateCharacters);
      }
    } else {
      animating = false;
    }
  }
});
