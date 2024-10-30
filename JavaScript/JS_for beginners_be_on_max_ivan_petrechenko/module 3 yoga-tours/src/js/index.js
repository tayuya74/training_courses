window.addEventListener('DOMContentLoaded', function() {

  'use strict';

  let tabs = require('./tabs')
  tabs()

  let timer = require('./timer')
  timer()

  let modal = require('./modal')
  modal()

  let form = require('./form')
  form()

  let slider = require('./slider')
  slider()

  let calc = require('./calc')
  calc()

})