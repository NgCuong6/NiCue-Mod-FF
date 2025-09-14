// Global Variables
let liked = false;
let commented = false;
let subscribed = false;

// DOM Elements
const introScreen = document.getElementById("introScreen");
const mainContent = document.getElementById("mainContent");
const enterBtn = document.getElementById("enterBtn");
const logoFormation = document.getElementById("logoFormation");
const introSubtitle = document.getElementById("introSubtitle");
const introLoader = document.getElementById("introLoader");
const loaderProgress = document.getElementById("loaderProgress");
const loaderText = document.getElementById("loaderText");
const particlesContainer = document.getElementById("particlesContainer");

const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const backToTop = document.getElementById("backToTop");
const toast = document.getElementById("toast");

// Download flow elements
const subscribeBtn = document.getElementById("subscribeBtn");
const likeBtn = document.getElementById("likeBtn");
const commentBtn = document.getElementById("commentBtn");
const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");
const step4 = document.getElementById("step4");
const likeProgress = document.getElementById("likeProgress");
const commentProgress = document.getElementById("commentProgress");
const progressFill = document.getElementById("progressFill");

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  initializeIntro();
  initializeNavigation();
  initializeScrollEffects();
  initializeDownloadFlow();
});

// Intro Animation System
function initializeIntro() {
  createParticles();
  startLogoAnimation();
  simulateLoading();
}

function createParticles() {
  const particleCount = window.innerWidth < 768 ? 30 : 50;

  for (let i = 0; i < particleCount; i++) {
    setTimeout(() => {
      createParticle();
    }, i * 100);
  }
}

function createParticle() {
  const particle = document.createElement("div");
  particle.className = "particle";

  const size = Math.random() * 8 + 4;
  const startX = Math.random() * window.innerWidth;
  const startY = window.innerHeight + 50;
  const endX = startX + (Math.random() - 0.5) * 200;
  const endY = -50;
  const duration = Math.random() * 3 + 2;

  particle.style.width = size + "px";
  particle.style.height = size + "px";
  particle.style.left = startX + "px";
  particle.style.top = startY + "px";
  particle.style.animationDuration = duration + "s";

  particlesContainer.appendChild(particle);

  // Animate particle
  particle.animate(
    [
      {
        transform: `translate(0, 0) scale(0)`,
        opacity: 0,
      },
      {
        transform: `translate(0, -100px) scale(1)`,
        opacity: 1,
        offset: 0.1,
      },
      {
        transform: `translate(${endX - startX}px, ${endY - startY}px) scale(0)`,
        opacity: 0,
      },
    ],
    {
      duration: duration * 1000,
      easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    }
  ).onfinish = () => {
    particle.remove();
  };

  setTimeout(() => {
    if (particle.parentNode) {
      particle.remove();
    }
  }, duration * 1000);
}

function startLogoAnimation() {
  const letters = document.querySelectorAll(".logo-letter");

  letters.forEach((letter, index) => {
    letter.style.animationDelay = index * 0.1 + 0.5 + "s";
  });

  // Continue creating particles during logo formation
  const particleInterval = setInterval(createParticle, 200);

  setTimeout(() => {
    clearInterval(particleInterval);
  }, 3000);
}

function simulateLoading() {
  const loadingSteps = [
    { progress: 20, text: "Initializing NiCue Mod...", delay: 1000 },
    { progress: 45, text: "Loading Premium Skins...", delay: 1500 },
    { progress: 70, text: "Connecting to Servers...", delay: 2000 },
    { progress: 90, text: "Preparing Experience...", delay: 2500 },
    { progress: 100, text: "Ready!", delay: 3000 },
  ];

  loadingSteps.forEach((step, index) => {
    setTimeout(() => {
      loaderProgress.style.width = step.progress + "%";
      loaderText.textContent = step.text;

      if (step.progress === 100) {
        setTimeout(() => {
          introLoader.style.opacity = "0";
          setTimeout(() => {
            enterBtn.style.display = "inline-flex";
            enterBtn.addEventListener("click", enterWebsite);
          }, 300);
        }, 500);
      }
    }, step.delay);
  });
}

function enterWebsite() {
  // Fade out intro screen
  introScreen.classList.add("hidden");

  // Show main content after transition
  setTimeout(() => {
    mainContent.style.display = "block";
    document.body.style.overflow = "auto";

    // Initialize main website features
    initializeCounters();
    initializeAnimations();

    // Show entrance animation
    setTimeout(() => {
      document.body.classList.add("website-loaded");
    }, 100);
  }, 1000);
}

// Navigation Functions
function initializeNavigation() {
  // Mobile menu toggle
  navToggle.addEventListener("click", function () {
    navToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.body.classList.toggle("menu-open");
  });

  // Close mobile menu when clicking on links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function () {
      navToggle.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.classList.remove("menu-open");
    });
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Scroll Effects
function initializeScrollEffects() {
  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Navbar scroll effect
    if (scrollTop > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Back to top button
    if (scrollTop > 500) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }

    // Parallax effect for hero shapes
    const shapes = document.querySelectorAll(".shape");
    shapes.forEach((shape, index) => {
      const speed = 0.5 + index * 0.2;
      const yPos = -(scrollTop * speed);
      shape.style.transform = `translateY(${yPos}px)`;
    });

    lastScrollTop = scrollTop;
  });

  // Back to top functionality
  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
}

// Counter Animations
function initializeCounters() {
  const counters = document.querySelectorAll(".stat-number");
  const observerOptions = {
    threshold: 0.7,
  };

  const counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute("data-target"));
        const increment = target / 100;
        let current = 0;

        const updateCounter = () => {
          if (current < target) {
            current += increment;
            counter.textContent =
              Math.floor(current) +
              (target === 99 ? "%" : target === 24 ? "h" : "+");
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent =
              target + (target === 99 ? "%" : target === 24 ? "h" : "K+");
          }
        };

        updateCounter();
        counterObserver.unobserve(counter);
      }
    });
  }, observerOptions);

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });
}

// Animation Initialization
function initializeAnimations() {
  // Animate elements on scroll
  const animateElements = document.querySelectorAll(
    ".feature-card, .download-card, .step"
  );

  const observerOptions = {
    threshold: 0.3,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        entry.target.classList.add("animated");
      }
    });
  }, observerOptions);

  animateElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
}

// Download Flow Functions
function initializeDownloadFlow() {
  if (!subscribeBtn) return;

  // Subscribe button
  subscribeBtn.addEventListener("click", function (e) {
    e.preventDefault();
    subscribed = true;
    showToast("Cảm ơn bạn đã đăng ký kênh!", "success");

    // Add click effect
    createClickEffect(e.clientX, e.clientY);

    // Show step 2 after delay
    setTimeout(() => {
      showStep(2);
    }, 1500);

    // Open YouTube in new tab
    window.open("https://www.youtube.com/@NiCueeVN", "_blank");
  });

  // Like button
  if (likeBtn) {
    likeBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (!liked) {
        liked = true;
        this.innerHTML = '<i class="fas fa-check"></i> <span>Đã Like</span>';
        this.style.background = "linear-gradient(135deg, #10b981, #059669)";

        likeProgress.classList.add("completed");
        likeProgress.querySelector(".status").textContent = "Hoàn thành";

        showToast("Like thành công!", "success");
        createClickEffect(e.clientX, e.clientY);

        checkInteractionComplete();
      }

      // Open YouTube video
      window.open("https://m.youtube.com/watch?v=oz4g-T5kuh0", "_blank");
    });
  }

  // Comment button
  if (commentBtn) {
    commentBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (!commented) {
        commented = true;
        this.innerHTML = '<i class="fas fa-check"></i> <span>Đã Comment</span>';
        this.style.background = "linear-gradient(135deg, #10b981, #059669)";

        commentProgress.classList.add("completed");
        commentProgress.querySelector(".status").textContent = "Hoàn thành";

        showToast("Comment thành công!", "success");
        createClickEffect(e.clientX, e.clientY);

        checkInteractionComplete();
      }

      // Open YouTube video
      window.open("https://m.youtube.com/watch?v=oz4g-T5kuh0", "_blank");
    });
  }
}

function showStep(stepNumber) {
  // Hide all steps
  document.querySelectorAll(".download-step").forEach((step) => {
    step.classList.remove("active");
  });

  // Show specific step
  const targetStep = document.getElementById(`step${stepNumber}`);
  if (targetStep) {
    targetStep.classList.add("active");

    // Scroll to step
    targetStep.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
}

function checkInteractionComplete() {
  if (liked && commented) {
    setTimeout(() => {
      showStep(3);
      startVerification();
    }, 1000);
  }
}

function startVerification() {
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15 + 5;
    if (progress > 100) progress = 100;

    if (progressFill) {
      progressFill.style.width = progress + "%";
    }

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        showStep(4);
        showToast("Xác minh thành công! Bạn có thể tải về ngay!", "success");
      }, 1000);
    }
  }, 300);
}

// Toast Notification System
function showToast(message, type = "info") {
  if (!toast) return;

  const toastContent = toast.querySelector(".toast-content");
  const toastIcon = toast.querySelector(".toast-icon");
  const toastMessage = toast.querySelector(".toast-message");

  // Set icon based on type
  let iconClass;
  switch (type) {
    case "success":
      iconClass = "fas fa-check-circle";
      break;
    case "error":
      iconClass = "fas fa-exclamation-circle";
      break;
    case "warning":
      iconClass = "fas fa-exclamation-triangle";
      break;
    default:
      iconClass = "fas fa-info-circle";
  }

  toastIcon.className = `toast-icon ${iconClass}`;
  toastMessage.textContent = message;
  toast.className = `toast ${type}`;

  // Show toast
  toast.classList.add("show");

  // Hide after 4 seconds
  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}

// Click Effects
function createClickEffect(x, y) {
  const effect = document.createElement("div");
  effect.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 20px;
        height: 20px;
        background: rgba(0, 245, 255, 0.8);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 9999;
        animation: clickRipple 0.8s ease-out forwards;
    `;

  document.body.appendChild(effect);

  setTimeout(() => {
    effect.remove();
  }, 800);

  // Add ripple animation if not exists
  if (!document.getElementById("clickRippleAnimation")) {
    const style = document.createElement("style");
    style.id = "clickRippleAnimation";
    style.textContent = `
            @keyframes clickRipple {
                0% {
                    transform: translate(-50%, -50%) scale(0);
                    opacity: 1;
                }
                100% {
                    transform: translate(-50%, -50%) scale(10);
                    opacity: 0;
                }
            }
        `;
    document.head.appendChild(style);
  }
}

// Button Click Effects
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn") || e.target.closest(".btn")) {
    createClickEffect(e.clientX, e.clientY);
  }
});

// Utility Functions
function showComingSoon() {
  showToast("Tính năng sắp ra mắt! Vui lòng theo dõi kênh để cập nhật", "info");
}

// Mouse Movement Effects
document.addEventListener("mousemove", function (e) {
  // Parallax effect for floating shapes (only on desktop)
  if (window.innerWidth > 768) {
    const shapes = document.querySelectorAll(".shape");
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    shapes.forEach((shape, index) => {
      const speed = (index + 1) * 0.02;
      const x = (mouseX - 0.5) * speed * 100;
      const y = (mouseY - 0.5) * speed * 100;

      shape.style.transform += ` translate(${x}px, ${y}px)`;
    });
  }
});

// Card Hover Effects
document.querySelectorAll(".feature-card, .download-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Image Loading Effects
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("load", function () {
    this.style.opacity = "1";
    this.style.transform = "scale(1)";
  });

  // Set initial state
  img.style.opacity = "0";
  img.style.transform = "scale(0.9)";
  img.style.transition = "opacity 0.5s ease, transform 0.5s ease";
});

// Keyboard Navigation
document.addEventListener("keydown", function (e) {
  // ESC to close mobile menu
  if (e.key === "Escape") {
    navToggle.classList.remove("active");
    navMenu.classList.remove("active");
    document.body.classList.remove("menu-open");
  }

  // Enter/Space on buttons
  if (
    (e.key === "Enter" || e.key === " ") &&
    e.target.classList.contains("btn")
  ) {
    e.preventDefault();
    e.target.click();
  }
});

// Performance Optimization
let ticking = false;

function updateAnimations() {
  // Update any frame-based animations here
  ticking = false;
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateAnimations);
    ticking = true;
  }
}

// Error Handling
window.addEventListener("error", function (e) {
  console.error("JavaScript Error:", e.error);
  showToast("Đã có lỗi xảy ra. Vui lòng tải lại trang.", "error");
});

// Page Visibility API for pausing animations
document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    // Pause expensive animations when page is hidden
    document.body.style.animationPlayState = "paused";
  } else {
    // Resume animations when page is visible
    document.body.style.animationPlayState = "running";
  }
});

// Social Media Integration
function shareOnSocial(platform) {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(
    "Check out NiCue Mod - Best Free Fire Mod Skins!"
  );

  let shareUrl;

  switch (platform) {
    case "facebook":
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      break;
    case "telegram":
      shareUrl = `https://t.me/share/url?url=${url}&text=${text}`;
      break;
    case "twitter":
      shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
      break;
    default:
      return;
  }

  window.open(shareUrl, "_blank", "width=600,height=400");
}

// Lazy Loading for Images
function initializeLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Initialize everything when DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Add loading complete class
  setTimeout(() => {
    if (document.body.classList.contains("website-loaded")) {
      document.body.classList.add("fully-loaded");
    }
  }, 2000);

  // Initialize lazy loading
  initializeLazyLoading();

  // Add touch support for mobile devices
  if ("ontouchstart" in window) {
    document.body.classList.add("touch-device");
  }
});

// Resize Handler
let resizeTimeout;
window.addEventListener("resize", function () {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Handle resize-specific updates
    if (window.innerWidth > 768) {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
      document.body.classList.remove("menu-open");
    }
  }, 250);
});

// Preload Critical Resources
function preloadResources() {
  const criticalImages = [
    "https://sf-static.upanhlaylink.com/img/image_2025090992dfc9c09aea3a0b2aeeb303de9bd38c.jpg",
  ];

  criticalImages.forEach((src) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = src;
    document.head.appendChild(link);
  });
}

// Call preload on page load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", preloadResources);
} else {
  preloadResources();
}

console.log("NiCue Mod Website Loaded Successfully! 🚀");
