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