//три способа подключить модули
import {config} from './modules/config'
import AppService from './modules/app.service'
import './modules/header.component'
import './css/index.css'

console.log('Config key:', config.key)

const service = new AppService('Hello')
service.log()

//чтобы собрать и увидеть результат сборки со всеми консолями
//node dist/bundle.js 