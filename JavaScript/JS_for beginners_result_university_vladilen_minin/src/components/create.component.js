import {Component} from '../core/component'
import {Form} from '../core/form'
import { Validators } from '../core/validators'
import { apiService } from '../services/api.service'


export class CreateComponent extends Component {
  constructor(id) { 
  super(id)
}
  init() {
    this.$el.addEventListener('submit', submitHandler.bind(this))
    this.form = new Form(this.$el, {
      title: [Validators.requred],
      fulltext: [Validators.requred, Validators.minLength(10)]
    })
  }
}

async function submitHandler(event) {
  event.preventDefault()

  if (this.form.isValid()) {
    const formdata = {
      type: this.$el.type.value,
      date: new Date().toJSON(),
      ...this.form.value()
    }

    await apiService.createPost(formdata)
    this.form.clear()
    alert('Запись создана в базе данных')
  }
} 