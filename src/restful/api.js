import axios from 'axios'
import store from '../store/index.js'
import router from '../router'
import {Message} from 'element-ui';

export const baseUrl = "http://localhost:8000";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = baseUrl;

axios.interceptors.request.use(function (config) {
    if (config.url.startsWith("/api/")) {
        config.headers.common['Authorization']=store.state.token
       
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
            router.replace({
                name: 'login'
            })
        }
        if (error.response.status === 400) {
            Message.error({
                message: '账号或者密码错误',
                duration: 2000,
                centre: true
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
    return axios.post('/auth_token/', params).then(res => res.data)
};

export const addServer = params => {
    return axios.post('/api/server/', params).then(res => res.data)
};

export const checkServer = params => {
    return axios.post('/api/check_server/', params).then(res => res.data)
};

export const getServerList = params => {
    return axios.get('/api/server/', params,{"Authorization":store.state.token}).then(res => res.data)
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

export const deleteProject = config => {
    return axios.delete('/api/fastrunner/project/', config).then(res => res.data)
};

export const getProjectList = params => {
    return axios.get('/api/fastrunner/project/', params).then(res => res.data)
};

export const getProjectDetail = pk => {
    return axios.get('/api/fastrunner/project/' + pk + '/').then(res => res.data)
};

export const getPagination = url => {
    return axios.get(url).then(res => res.data)
};
