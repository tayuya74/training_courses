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
  let deadline = '2024-06-16'

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

})

