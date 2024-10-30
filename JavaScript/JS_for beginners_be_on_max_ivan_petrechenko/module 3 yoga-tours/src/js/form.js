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