import axios from 'axios'
import store from '../store'
import router from '../router'
import {Message} from 'element-ui';


export const baseUrl = "http://localhost:8000";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = baseUrl;

axios.interceptors.request.use(function (config) {
    if (config.url.startsWith("/api/")) {
        config.headers.common['Authorization']=localStorage.getItem('token');
    }
    return config;
}, 

function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    return response;
}, 

function (error) {
    try {
        if (error.response.status === 401) {
            Message.error({
                message: 'token失效',
                duration: 2000,
            })
            router.replace({
                name: 'login'
            })
        }
        if (error.response.status === 400) {
            Message.error({
                message: '账号或者密码错误',
                duration: 2000,
            })
        }
        if (error.response.status === 500) {
            Message.error({
                message: '服务器内部异常, 请检查',
                duration: 2000
            })
        }
    }
    catch (e) {
        Message.error({
            message: '服务器错误 '+e,
            duration: 2000
        })
    }
});

export const login = params => {
    return axios.post('/login/', params).then(res => res.data)
};

export const checkToken = params => {
    return axios.post('/check_token/', params).then(res => res.data)
};

export const addServer = params => {
    return axios.post('/api/server/', params).then(res => res.data)
};

export const checkServer = params => {
    return axios.post('/api/check_server/', params).then(res => res.data)
};

export const getServerList = params => {
    return axios.get('/api/server/', params).then(res => res.data)
};

export const getServer = params => {
    return axios.get('/api/get_server/' + params).then(res => res.data)
};

export const updateServer = (id, params) => {
    return axios.put('/api/server/' + id + '/', params).then(res => res.data)
};

export const deleteServer = params => {
    return axios.delete('/api/server/' + params + '/').then(res => res.data)
};

export const addRepository = params => {
    return axios.post('/api/repository/', params).then(res => res.data)
};

export const checkRepository = params => {
    return axios.post('/api/check_repository/', params).then(res => res.data)
};

export const getRepositoryList = params => {
    return axios.get('/api/repository/', params).then(res => res.data)
};

export const getRepository = params => {
    return axios.get('/api/get_repository/' + params).then(res => res.data)
};

export const updateRepository = (id, params) => {
    return axios.put('/api/repository/' + id + '/', params).then(res => res.data)
};

export const deleteRepository = params => {
    return axios.delete('/api/repository/' + params + '/').then(res => res.data)
};