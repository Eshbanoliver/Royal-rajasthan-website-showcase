/* =====================================================
   Royal Rajasthan Interiors – Main JavaScript
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Hero Slider ---------- */
  const heroSlides = document.querySelectorAll('.hero-slide');
  if (heroSlides.length > 0) {
    let currentHeroSlide = 0;
    setInterval(() => {
      heroSlides[currentHeroSlide].classList.remove('active');
      currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
      heroSlides[currentHeroSlide].classList.add('active');
    }, 5000);
  }



  /* ---------- Navbar Scroll Effect ---------- */
  const navbar = document.querySelector('.navbar');
  const scrollTopBtn = document.querySelector('.scroll-top');

  function handleScroll() {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll-to-top button visibility
    if (scrollTopBtn) {
      if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Run once on load

  /* ---------- Scroll to Top ---------- */
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Hamburger Menu ---------- */
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      }
    });
  }

  /* ---------- Animated Counters ---------- */
  const counters = document.querySelectorAll('.count');
  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;

    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const suffix = counter.getAttribute('data-suffix') || '';
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += step;
        if (current < target) {
          counter.textContent = Math.floor(current) + suffix;
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target + suffix;
        }
      };

      updateCounter();
    });

    countersAnimated = true;
  }

  // Intersection Observer for counters
  const metricsSection = document.querySelector('.metrics-section');
  if (metricsSection) {
    const metricsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
        }
      });
    }, { threshold: 0.3 });

    metricsObserver.observe(metricsSection);
  }

  /* ---------- Testimonial Slider ---------- */
  const sliderTrack = document.querySelector('.testimonial-track');
  const sliderCards = document.querySelectorAll('.testimonial-card');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  const dotsContainer = document.querySelector('.slider-dots');
  let currentSlide = 0;

  if (sliderTrack && sliderCards.length > 0) {
    // Create dots
    if (dotsContainer) {
      sliderCards.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.classList.add('slider-dot');
        if (i === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
      });
    }

    function goToSlide(index) {
      currentSlide = index;
      sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

      // Update dots
      if (dotsContainer) {
        dotsContainer.querySelectorAll('.slider-dot').forEach((dot, i) => {
          dot.classList.toggle('active', i === currentSlide);
        });
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentSlide = currentSlide > 0 ? currentSlide - 1 : sliderCards.length - 1;
        goToSlide(currentSlide);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentSlide = currentSlide < sliderCards.length - 1 ? currentSlide + 1 : 0;
        goToSlide(currentSlide);
      });
    }

    // Auto-play
    let autoPlay = setInterval(() => {
      currentSlide = currentSlide < sliderCards.length - 1 ? currentSlide + 1 : 0;
      goToSlide(currentSlide);
    }, 5000);

    // Pause on hover
    sliderTrack.parentElement.addEventListener('mouseenter', () => clearInterval(autoPlay));
    sliderTrack.parentElement.addEventListener('mouseleave', () => {
      autoPlay = setInterval(() => {
        currentSlide = currentSlide < sliderCards.length - 1 ? currentSlide + 1 : 0;
        goToSlide(currentSlide);
      }, 5000);
    });
  }

  /* ---------- FAQ Accordion ---------- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const inner = item.querySelector('.faq-answer-inner');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      faqItems.forEach(other => {
        other.classList.remove('open');
        other.querySelector('.faq-answer').style.maxHeight = '0';
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = inner.scrollHeight + 20 + 'px';
      }
    });
  });

  /* ---------- Scroll Reveal Animations ---------- */
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  reveals.forEach(el => revealObserver.observe(el));

  /* ---------- Contact Form ---------- */
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('formName').value.trim();
      const phone = document.getElementById('formPhone').value.trim();
      const email = document.getElementById('formEmail').value.trim();
      const message = document.getElementById('formMessage').value.trim();

      if (!name || !phone || !message) {
        showFormMessage('Please fill in all required fields.', 'error');
        return;
      }

      // Simulate form submission
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
      submitBtn.style.background = '#28a745';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
        contactForm.reset();
      }, 3000);
    });
  }

  function showFormMessage(msg, type) {
    let el = document.querySelector('.form-message');
    if (!el) {
      el = document.createElement('div');
      el.classList.add('form-message');
      contactForm.prepend(el);
    }
    el.textContent = msg;
    el.style.cssText = `
      padding: 14px 20px;
      border-radius: 8px;
      margin-bottom: 20px;
      font-weight: 600;
      font-size: 0.95rem;
      background: ${type === 'error' ? '#ffe0e0' : '#e0ffe0'};
      color: ${type === 'error' ? '#c0392b' : '#27ae60'};
      border: 1px solid ${type === 'error' ? '#f5c6cb' : '#c3e6cb'};
    `;

    setTimeout(() => el.remove(), 4000);
  }

  /* ---------- Active Nav Link Highlight ---------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

});
