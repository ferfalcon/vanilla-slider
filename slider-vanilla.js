document.addEventListener('DOMContentLoaded', function () {
  const slider = document.querySelector('.slider__item-list');
  const slides = document.querySelectorAll('.slider__item');
  const nextButton = document.querySelector('button[name="next-slide"]');
  const prevButton = document.querySelector('button[name="prev-slide"]');
  const dotsContainer = document.querySelector('.slider__dots');
  
  let currentIndex = 0;
  const totalSlides = slides.length;

  // Create dots based on the number of slides
  function createDots() {
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('div');
      dot.classList.add('slider__dot');
      if (i === currentIndex) {
        dot.classList.add('active');
      }
      dotsContainer.appendChild(dot);
      dot.addEventListener('click', () => goToSlide(i));
    }
  }

  function updateDots() {
    const dots = document.querySelectorAll('.slider__dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    slider.style.transform = `translateX(-${index * 100}%)`;
    updateDots();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    goToSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    goToSlide(currentIndex);
  }

  nextButton.addEventListener('click', nextSlide);
  prevButton.addEventListener('click', prevSlide);

  // Swipe functionality
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  slider.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
    const diffX = startX - currentX;

    if (diffX > 50) {
      nextSlide();
      isDragging = false;
    } else if (diffX < -50) {
      prevSlide();
      isDragging = false;
    }
  });

  slider.addEventListener('touchend', () => {
    isDragging = false;
  });

  // Desktop drag functionality
  slider.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    isDragging = true;
    e.preventDefault(); // Prevent text selection
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    currentX = e.clientX;
    const diffX = startX - currentX;

    if (diffX > 50) {
      nextSlide();
      isDragging = false;
    } else if (diffX < -50) {
      prevSlide();
      isDragging = false;
    }
  });

  slider.addEventListener('mouseup', () => {
    isDragging = false;
  });

  slider.addEventListener('mouseleave', () => {
    isDragging = false;
  });

  // Recalculate on window resize
  window.addEventListener('resize', () => {
    goToSlide(currentIndex); // Adjust slider position on resize
  });

  createDots(); // Initialize the dots
});
