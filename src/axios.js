import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',

});

instance.interceptors.request.use(request => {
  console.log('success:',request);
  return request;
}, error => {
  console.log('error:', error);
  return Promise.reject(error);
});

// instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

export default instance;