document.addEventListener('DOMContentLoaded', () => {
  const windowInnerWidth = document.documentElement.clientWidth;
  const carouselItems = document.querySelectorAll('.carousel__item');

  if (windowInnerWidth > 375) {
    carouselItems[0].classList.add('carousel__item--left');
    carouselItems[1].classList.add('carousel__item--main');
    carouselItems[2].classList.add('carousel__item--right');
  } else {
    carouselItems[carouselItems.length - 1].classList.add('carousel__item--left');
    carouselItems[0].classList.add('carousel__item--main');
    carouselItems[1].classList.add('carousel__item--right');
  }


  let currentItem = document.querySelector('.carousel__item--main');
  const leftBtn = document.querySelector('#leftBtn');
  const rightBtn = document.querySelector('#rightBtn');
  const carouselInner = document.querySelector('.members__carousel');
  const numbersContainer = document.querySelector('.carousel__numbers');
  const currentElement = numbersContainer.querySelector('.carousel__current');
  const sumElement = numbersContainer.querySelector('.carousel__sum');

  carouselInner.style.height = currentItem.offsetHeight + 'px';

  numbersContainer.classList.remove('visibility-hidden');
  sumElement.innerHTML = carouselItems.length;

  const slideToRight = function () {
    currentItem = document.querySelector('.carousel__item--right');
    const leftItem = document.querySelector('.carousel__item--main');
    carouselItems.forEach((item, i) => {
      item.classList = 'carousel__item';
    });
    currentItem.classList.add('carousel__item--main');
    leftItem.classList.add('carousel__item--left');
    const currentId = Array.from(carouselItems).indexOf(currentItem);
    const rightItem = currentId === carouselItems.length - 1 ? carouselItems[0] : carouselItems[currentId + 1];
    currentElement.innerHTML = currentId + 1;
    rightItem.classList.add('carousel__item--right');

  }

  const slideToLeft = function () {
    currentItem = document.querySelector('.carousel__item--left');
    const rightItem = document.querySelector('.carousel__item--main');
    carouselItems.forEach((item, i) => {
      item.classList = 'carousel__item';
    });
    currentItem.classList.add('carousel__item--main');
    rightItem.classList.add('carousel__item--right');
    const currentId = Array.from(carouselItems).indexOf(currentItem);
    currentElement.innerHTML = currentId + 1;
    const leftItem = currentId === 0 ? carouselItems[carouselItems.length - 1] : carouselItems[currentId - 1];
    leftItem.classList.add('carousel__item--left');
  }

  let slideMove;
  const setIntervalSlider = function () {
    slideMove = setInterval(() => {
      slideToRight();
    }, 4000);
  };
  // setIntervalSlider();

  let restartAutoSlide;
  const startAutoSlide = function () {
    restartAutoSlide = setTimeout(() => {
      setIntervalSlider();
    }, 4000);
  }

  rightBtn.addEventListener('click', function () {
    clearTimeout(restartAutoSlide);
    clearInterval(slideMove); // stop interval
    slideToRight(); // user move      
    startAutoSlide();
  });

  leftBtn.addEventListener('click', function () {
    clearTimeout(restartAutoSlide); // stop timeout
    clearInterval(slideMove); // stop interval
    slideToLeft(); // user move      
    startAutoSlide(); //
  });


  // Slider stages

  const createSliderStages = function () {
    const slider = document.querySelector('.stages__list');
    const btns = document.querySelector('.stages__btns');
    const prevButton = btns.querySelector('#leftStage');
    const nextButton = btns.querySelector('#rightStage');
    const slides = slider.querySelectorAll('.stages__list li');
    const listPonts = document.createElement('ul');

    listPonts.classList.add('stages__points', 'list-reset', 'flex');


    let slideIndex = 0;
    prevButton.classList.add('carousel-btn-left--finish');

    prevButton.after(listPonts);

    const updateButtons = function () {
      console.log(slideIndex);
      if (slideIndex === 0) {
        prevButton.classList.add('carousel-btn-left--finish');
      } else {
        prevButton.classList.remove('carousel-btn-left--finish');
      }
      if (slideIndex === slides.length - 1) {
        nextButton.classList.add('carousel-btn-right--finish');
      } else {
        nextButton.classList.remove('carousel-btn-right--finish');
      }

      console.log(slideIndex);
      // const pointActive = document.querySelector(".stages__points li[]")

      const points = document.querySelectorAll('.stages__points li');
      console.log(points);
      points.forEach(function (point) {
        point.classList.remove('stages__points--active');
        console.log(point.getAttribute('data-point'));
        if (Number(point.getAttribute('data-point')) === slideIndex) {
          point.classList.add('stages__points--active');
        }
      });

    }

    const showPreviousSlide = function () {
      if (slideIndex === 0) {
        return;
      }
      slideIndex--;
      if (slides[slideIndex].classList.contains('double-second')) {
        slideIndex--;
      }
      updateSlider();
    };

    const showNextSlide = function () {
      if (slideIndex === slides.length - 1) {
        return;
      }
      slideIndex++;

      if (slides[slideIndex].classList.contains('double-second')) {
        slideIndex++;
      }
      updateSlider();
    };


    const updateSlider = function () {
      updateButtons();

      const doubleSecondShow = document.querySelector('.double-second--show');
      if (doubleSecondShow) {
        doubleSecondShow.classList.remove('double-second--show');
      }
      slides.forEach((slide, index) => {
        if (index === slideIndex) {
          slide.classList.add('stage--show');
          if (slide.classList.contains('double-first')) {
            slides[index + 1].classList.add('double-second--show');
          }
        } else {
          slide.classList.remove('stage--show');
        }
      });
    }

    updateSlider();

    prevButton.addEventListener('click', showPreviousSlide);
    nextButton.addEventListener('click', showNextSlide);

    function showElementByPoint() {
      slideIndex = Number(this.getAttribute('data-point'));
      updateSlider();
    };

    slides.forEach(function (slide, index) {
      // numbers in stages
      const elementNumber = document.createElement('div');
      elementNumber.append(index + 1);
      elementNumber.classList.add('stage-number');
      slide.prepend(elementNumber);

      if (slide.classList.contains('double-second')) {
        return;
      }

      // create points
      const point = document.createElement('li');
      point.setAttribute('data-point', index);

      if (index === 0) {
        point.classList.add('stages__points--active');
      }

      point.addEventListener('click', showElementByPoint);
      listPonts.append(point);
    });

  };


  if (innerWidth <= 375) {
    createSliderStages();
  }

});


