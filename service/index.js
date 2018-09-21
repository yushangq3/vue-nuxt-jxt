import axios from 'axios'
// import { Message } from 'element-ui'
import qs from 'qs'
import config from './config'

if (process.server) {
  
  config.baseURL = `http://${process.env.HOST || '192.168.104.1'}:${process.env.PORT || 3000}`
}
const service = axios.create(config)

// POST 传参序列化
service.interceptors.request.use(
  config => {
    if (config.method === 'post') config.data = qs.stringify(config.data)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 返回状态判断
service.interceptors.response.use(
  res => {
    return res.data
  },
  error => {
    return Promise.reject(error)
  }
)

export function fetch(url = '', data = {}, type = 'GET'){
		url ='/api'+url;
		type = type.toUpperCase();
		return new Promise(function(resolve, reject) {
      console.log(type+' request url', url)
			if (type == 'GET') {
					service.get(url, data).then(function(res) {
		       resolve(res);
		     }).catch(function(error) {
		       console.log(error);
		     });
			}else{
					service.post(url, data).then(function(res) {
						resolve(res);
					}).catch(function(error) {
						console.log(error);
					});
			}
		})
}

// export default {
//   post (url, data) {
//     console.log('post request url', url)
//     return service({
//       method: 'post',
//       url,
//       params: data
//     })
//   },
//   get (url, data) {
//     console.log('get request url', url)
//     return service({
//       method: 'get',
//       url,
//       params: data
//     })
//   },
//   delete (url, data) {
//     console.log('delete request url', url)
//     return service({
//       methods: 'delete',
//       url,
//       params: data
//     })
//   }
// }
// 