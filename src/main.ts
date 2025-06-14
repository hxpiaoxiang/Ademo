import { createApp } from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'
import './style.css'
import App from './App.vue'

// 导入Mock数据服务（开发环境使用）
import './mock'

// 导入路由配置
import router from './router'

// 导入Font Awesome图标库
import { library } from '@fortawesome/fontawesome-svg-core'
import { faWifi, faSignal, faBatteryThreeQuarters } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// 添加图标到库中
library.add(faWifi, faSignal, faBatteryThreeQuarters)

// 创建Vue应用实例
const app = createApp(App)

// 使用插件
app.use(router)
app.use(Vant)

// 注册Font Awesome组件
app.component('font-awesome-icon', FontAwesomeIcon)

// 挂载应用
app.mount('#app')
