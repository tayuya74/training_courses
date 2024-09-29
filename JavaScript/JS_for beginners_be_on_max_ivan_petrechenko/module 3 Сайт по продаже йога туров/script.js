window.addEventListener('DOMContentLoaded', function() {

  'use strict';
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

  //timer
  let deadline = '2024-08-16'

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

//modal window

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

// form

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

})

