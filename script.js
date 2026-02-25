document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.querySelector("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Basic Fade-In Reveal Observer
  const revealTargets = document.querySelectorAll('.fade-in, .reveal-img, .reveal-item');
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reducedMotion && revealTargets.length) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          
          // Optional: stop observing once revealed
          // observer.unobserve(entry.target); 
          // Leaving it observed allows re-triggering, 
          // but unobserving is often cleaner for editorial.
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    revealTargets.forEach(target => revealObserver.observe(target));
  } else {
    // If reduced motion, just show everything
    revealTargets.forEach(target => target.classList.add("is-visible"));
  }

  // Smooth Parallax for Hero and Editorial Images
  // We apply a gentle transform based on scroll position
  if (!reducedMotion) {
    const heroBg = document.querySelector('.hero-bg');
    const parallaxTexts = document.querySelectorAll('.parallax-text');
    const storyImages = document.querySelectorAll('.story-image img');

    let lastScrollY = window.scrollY;
    let ticking = false;

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    const updateParallax = () => {
      const scrollY = window.scrollY;

      // Hero Background slows down (moves down at half scroll speed)
      if (heroBg && scrollY < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrollY * 0.4}px)`;
      }

      // Parallax Text blocks slightly move opposite to scroll
      parallaxTexts.forEach(text => {
        const rect = text.getBoundingClientRect();
        // Only parallax if in viewport roughly
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const depth = (window.innerHeight - rect.top) * 0.05;
          text.style.transform = `translateY(${-depth}px)`;
        }
      });

      // Story image contents move slowly inside their container
      storyImages.forEach(img => {
        const container = img.parentElement;
        const rect = container.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          // move the img downwards relative to its container as you scroll down
          const depth = (window.innerHeight - rect.top) * 0.1;
          img.style.transform = `translateY(${depth}px)`;
        }
      });

      ticking = false;
    };

    window.addEventListener('scroll', requestTick, { passive: true });
    // Initial call
    updateParallax();
  }

  // Smooth Scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});
