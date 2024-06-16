import $ from 'jquery'

$('<h1/>')
.text('Hello from jquery')
.css({
  textAlign: 'center',
  color: "blue"
})
.appendTo($('header'))