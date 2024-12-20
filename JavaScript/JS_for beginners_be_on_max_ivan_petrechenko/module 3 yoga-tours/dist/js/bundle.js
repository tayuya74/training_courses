/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/calc.js":
/*!************************!*\
  !*** ./src/js/calc.js ***!
  \************************/
/***/ ((module) => {

function calc() {
  let persons = document.querySelectorAll('.counter-block-input')[0]
  let restDays = document.querySelectorAll('.counter-block-input')[1]
  let place = document.getElementById('select')
  let totalValue = document.getElementById('total')
  let personsSum = 0
  let daysSum = 0
  let total = 0

  totalValue.innerHTML = 0

  persons.addEventListener('change', function() {
    personsSum = +this.value
    total = (daysSum + personsSum) * 4000

    if(restDays.value == '') {
      totalValue.innerHTML = 0
    } else {
      totalValue.innerHTML = total
    }
  })

  restDays.addEventListener('change', function() {
    daysSum = +this.value
    total = (daysSum + personsSum) * 4000

    if(persons.value == '') {
      totalValue.innerHTML = 0
    } else {
      totalValue.innerHTML = total
    }
  })

  place.addEventListener('change', function() {
    if (restDays.value == '' || persons.value == '') {
      totalValue.innerHTML = 0
    } else {
      let a = total
      totalValue.innerHTML = a * this.options[this.selectedIndex].value
    }
  })
}

module.exports = calc

/***/ }),

/***/ "./src/js/form.js":
/*!************************!*\
  !*** ./src/js/form.js ***!
  \************************/
/***/ ((module) => {

function form() {
  let message = {
    loading: 'load',
    success: 'thx',
    failure: 'fail'
  }

  let form = document.querySelector('.main-form')
  let input = form.getElementsByTagName('input')
  let statusMessage = document.createElement('div')
  statusMessage.classList.add('status')

  form.addEventListener('submit', function(event) {
    event.preventDefault()
    form.appendChild(statusMessage)

    let request = new XMLHttpRequest();
    request.open('POST', 'server.php');
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    //получаем данные от пользователя
    let formData = new FormData(form)

    let obj = {}
    formData.forEach(function(value, key) {
      obj[key] = value
    })
    let json = JSON.stringify(obj)

    request.send(json)

    request.addEventListener('readystatechange', function(){
      if (request.readyState < 4) {
        statusMessage.innerHTML = message.loading
      } else if (request.readyState === 4 && request.status == 200) {
        statusMessage.innerHTML = message.success
      } else {
        statusMessage.innerHTML = message.failure
      }
    })

    for (let i = 0; i < input.length; i++) {
      input[i].value = ''
    }
  })
}

module.exports = form

/***/ }),

/***/ "./src/js/modal.js":
/*!*************************!*\
  !*** ./src/js/modal.js ***!
  \*************************/
/***/ ((module) => {

function modal() {
  function modalWindow() {
    let more = document.querySelector('.more')
    let overlay = document.querySelector('.overlay')
    let close = document.querySelector('.popup-close')

    more.addEventListener('click' , function() {
      overlay.style.display = 'block'
      this.classList.add('more-splash')
      document.body.style.overflow = 'hidden'
    })

    close.addEventListener('click', function(){
      overlay.style.display = 'none'
      more.classList.remove('more-splash')
      document.body.style.overflow = ''
    })
  }
  modalWindow()
}

module.exports = modal

/***/ }),

/***/ "./src/js/slider.js":
/*!**************************!*\
  !*** ./src/js/slider.js ***!
  \**************************/
/***/ ((module) => {

function slider() {
  let slideIndex = 1
  let slides = document.querySelectorAll('.slider-item')
  let prev = document.querySelector('.prev')
  let next = document.querySelector('.next')
  let dotsWrap = document.querySelector('.slider-dots')
  let dots = document.querySelectorAll('.dot')

  showSlides(slideIndex)

  function showSlides(n) {

    if (n > slides.length) {
      slideIndex = 1
    }
    if (n < 1) {
      slideIndex = slides.length
    }

    slides.forEach((item) => item.style.display = 'none')
    dots.forEach((item) => item.classList.remove('dot-active'))
    slides[slideIndex - 1].style.display = 'block'
    dots[slideIndex - 1].classList.add('dot-active')
  }

  function plusSlides(n) {
    showSlides(slideIndex +=n)
  }

  function currentSlide(n) {
    showSlides(slideIndex = n)
  }

  //управление слайдером через стрелки
  prev.addEventListener('click', function() {
    plusSlides(-1)
  })

  next.addEventListener('click', function() {
    plusSlides(1)
  })

  //управление слайдером через "точки"
  dotsWrap.addEventListener('click', function(event) {
    for (let i = 0; i < dots.length + 1; i++) {
      if (event.target.classList.contains('dot') && event.target == dots[i-1]) {
        currentSlide(i)
      }
    }
  })
}

module.exports = slider

/***/ }),

/***/ "./src/js/tabs.js":
/*!************************!*\
  !*** ./src/js/tabs.js ***!
  \************************/
/***/ ((module) => {

function tabs() {
  let tab = document.querySelectorAll('.info-header-tab')
  let info = document.querySelector('.info-header')
  let tabContent = document.querySelectorAll('.info-tabcontent')

  function hideTabContent(a) {
    for (let i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove('show')
      tabContent[i].classList.add('hide')
    }
  }

  hideTabContent(1)

  function showTabContent(b) {
    if (tabContent[b].classList.contains('hide')) {
      tabContent[b].classList.remove('hide')
      tabContent[b].classList.add('show')
    }
  }

  info.addEventListener('click', function(event) {
    let target = event.target
    // console.log(target, target.classList.contains('info-header-tab'))
    if (target && target.classList.contains('info-header-tab')) {
      for (let i = 0; i < tab.length; i++) {
        if (target == tab[i]) {
          hideTabContent(0)
          showTabContent(i)
          break
        }
      }
    }
  })
}

module.exports = tabs

/***/ }),

/***/ "./src/js/timer.js":
/*!*************************!*\
  !*** ./src/js/timer.js ***!
  \*************************/
/***/ ((module) => {

function timer() {
  let deadline = '2024-11-16'

  function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date());
    let seconds = Math.floor((t/1000) % 60);
    let minutes = Math.floor((t/1000/60) % 60);
    let hours = Math.floor((t/1000/60/60));
    return {
      'total' : t,
      'hours' : hours,
      'minutes' : minutes,
      'seconds' : seconds
    }
  }

  function setClock(id, endtime) {
    let timer = document.getElementById(id)
    let hours = timer.querySelector('.hours')
    let minutes = timer.querySelector('.minutes')
    let seconds = timer.querySelector('.seconds')
    let timeInterval = setInterval(updateClock, 1000)

    function updateClock() {
      let t = getTimeRemaining(endtime)
      hours.textContent = addZero(t.hours)
      minutes.textContent = addZero(t.minutes)
      seconds.textContent = addZero(t.seconds)

      if(t.total <= 0) {
        clearInterval(timeInterval)
        hours.textContent = minutes.textContent = seconds.textContent = '00'
      }
    }

  }

  function addZero(x) {
    if(x < 10) {
      return "0" + x
    }
    return x
  }

  setClock('timer', deadline)
}

module.exports = timer

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
window.addEventListener('DOMContentLoaded', function() {

  'use strict';

  let tabs = __webpack_require__(/*! ./tabs */ "./src/js/tabs.js")
  tabs()

  let timer = __webpack_require__(/*! ./timer */ "./src/js/timer.js")
  timer()

  let modal = __webpack_require__(/*! ./modal */ "./src/js/modal.js")
  modal()

  let form = __webpack_require__(/*! ./form */ "./src/js/form.js")
  form()

  let slider = __webpack_require__(/*! ./slider */ "./src/js/slider.js")
  slider()

  let calc = __webpack_require__(/*! ./calc */ "./src/js/calc.js")
  calc()

})
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map