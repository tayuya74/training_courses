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