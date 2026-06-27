document.addEventListener('DOMContentLoaded', () => {
  
  // 1. DOM Elements
  const carousel = document.getElementById('carouselContainer');
  const track = document.getElementById('sliderTrack');
  const dots = document.querySelectorAll('#paginationDots .dot');
  const likeBtn = document.getElementById('likeBtn');
  const heartIcon = document.getElementById('heartIcon');
  const heartPopup = document.getElementById('heartPopup');
  const bookmarkBtn = document.getElementById('bookmarkBtn');
  const bookmarkIcon = document.getElementById('bookmarkIcon');
  const likesNumber = document.getElementById('likesNumber');
  const moreBtn = document.getElementById('moreBtn');
  const captionContainer = document.querySelector('.caption-container');

  // 2. State Variables
  let currentIndex = 0;
  const slideCount = 6;
  let isDragging = false;
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID = 0;
  let isLiked = false;
  let isBookmarked = false;
  const baseLikes = 1248;

  // 3. Carousel Slider Logic (Touch & Drag)
  
  // Slide to Specific Index
  function slideToIndex(index) {
    currentIndex = Math.max(0, Math.min(index, slideCount - 1));
    currentTranslate = currentIndex * -carousel.clientWidth;
    prevTranslate = currentTranslate;
    track.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    track.style.transform = `translateX(${currentTranslate}px)`;
    updateDots();
  }

  // Update Pagination Dots Active State
  function updateDots() {
    dots.forEach((dot, idx) => {
      if (idx === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  // Handle Drag Start
  function dragStart(event) {
    isDragging = true;
    startX = getPositionX(event);
    track.style.transition = 'none';
    carousel.style.cursor = 'grabbing';
    cancelAnimationFrame(animationID);
  }

  // Handle Drag Move
  function dragMove(event) {
    if (!isDragging) return;
    const currentX = getPositionX(event);
    const diffX = currentX - startX;
    currentTranslate = prevTranslate + diffX;
    
    // 바운더리 오버 드래그 방지 마찰력 적용
    if (currentTranslate > 0) {
      currentTranslate = currentTranslate * 0.3;
    } else {
      const maxTranslate = (slideCount - 1) * -carousel.clientWidth;
      if (currentTranslate < maxTranslate) {
        currentTranslate = maxTranslate + (currentTranslate - maxTranslate) * 0.3;
      }
    }
    
    track.style.transform = `translateX(${currentTranslate}px)`;
  }

  // Handle Drag End
  function dragEnd() {
    if (!isDragging) return;
    isDragging = false;
    carousel.style.cursor = 'grab';
    
    const movedBy = currentTranslate - prevTranslate;
    const threshold = carousel.clientWidth * 0.25; // 25% 드래그 시 슬라이드 전환

    if (movedBy < -threshold && currentIndex < slideCount - 1) {
      currentIndex++;
    } else if (movedBy > threshold && currentIndex > 0) {
      currentIndex--;
    }
    
    slideToIndex(currentIndex);
  }

  function getPositionX(event) {
    return event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
  }

  // Resize Handler to adapt to window resize
  window.addEventListener('resize', () => {
    slideToIndex(currentIndex);
  });

  // Touch Events
  carousel.addEventListener('touchstart', dragStart);
  carousel.addEventListener('touchmove', dragMove);
  carousel.addEventListener('touchend', dragEnd);

  // Mouse Events
  carousel.addEventListener('mousedown', dragStart);
  carousel.addEventListener('mousemove', dragMove);
  carousel.addEventListener('mouseup', dragEnd);
  carousel.addEventListener('mouseleave', dragEnd);

  // Keyboard Arrow Navigation
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      slideToIndex(currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
      slideToIndex(currentIndex + 1);
    }
  });


  // 4. Social Feed Interactions (Like & Double Click)

  // Toggle Like Status
  function toggleLike() {
    isLiked = !isLiked;
    if (isLiked) {
      heartIcon.classList.add('liked');
      likesNumber.textContent = (baseLikes + 1).toLocaleString();
    } else {
      heartIcon.classList.remove('liked');
      likesNumber.textContent = baseLikes.toLocaleString();
    }
  }

  // Trigger double click giant heart popup
  function triggerGiantHeart() {
    if (!isLiked) {
      toggleLike();
    }
    // 하트 팝업 애니메이션 실행
    heartPopup.classList.remove('like-animate');
    void heartPopup.offsetWidth; // reflow 트리거하여 애니메이션 초기화
    heartPopup.classList.add('like-animate');
  }

  // Heart button click
  likeBtn.addEventListener('click', toggleLike);

  // Giant Heart Popup Double Click
  carousel.addEventListener('dblclick', triggerGiantHeart);

  // Clear heart popup animation class once it finishes
  heartPopup.addEventListener('animationend', () => {
    heartPopup.classList.remove('like-animate');
  });

  // Bookmark Toggle
  bookmarkBtn.addEventListener('click', () => {
    isBookmarked = !isBookmarked;
    if (isBookmarked) {
      bookmarkIcon.classList.add('active');
    } else {
      bookmarkIcon.classList.remove('active');
    }
  });


  // 5. Caption More/Less Expand Accordion
  moreBtn.addEventListener('click', () => {
    captionContainer.classList.add('expanded');
  });

});
