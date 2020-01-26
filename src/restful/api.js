import axios from 'axios'



export const baseUrl = "http://localhost:8000";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = baseUrl;


export const addServer = params => {
    return axios.post('/api/server/', params).then(res => res.data)
};

export const checkServer = params => {
    return axios.post('/api/check_server/', params).then(res => res.data)
};

export const getServerList = params => {
    return axios.get('/api/server/',params).then(res => res.data)
};

export const getServer = params => {
    return axios.get('/api/get_server/'+params).then(res => res.data)
};

export const updateServer =(id,params)  => {
    return axios.put('/api/server/'+id+'/',params).then(res => res.data)
};

export const deleteServer =params  => {
    return axios.delete('/api/server/'+params+'/').then(res => res.data)
};

export const deleteProject = config => {
    return axios.delete('/api/fastrunner/project/', config).then(res => res.data)
};

export const getProjectList = params => {
    return axios.get('/api/fastrunner/project/',params).then(res => res.data)
};

export const getProjectDetail = pk => {
    return axios.get('/api/fastrunner/project/' + pk + '/').then(res => res.data)
};

export const getPagination = url => {
    return axios.get(url).then(res => res.data)
};
