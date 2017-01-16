import axios from 'axios';
import { Message } from 'element-ui';

export default function(Vue) {
  const instance = axios.create({
    baseURL: '/api/',
    withCredentials: true
  });

  instance.interceptors.response.use(r => r, error => {
    if (error.response) {
      if (error.response.status === 401) {
        // TODO
      }

      Message.error(JSON.stringify(error.response.data));
    } else if (error !== 'cancel') {
      Message.error(error.message.toString());
    }

    return Promise.reject(error);
  });
  Vue.prototype.$http = instance;
}
