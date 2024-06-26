import axios from 'axios'

const base_url = 'http://localhost:3000'

const service = axios.create({
    baseURL: base_url,
    withCredentials: true,
})

function handleError(err) {
    let data, code, msg
    if (err.response) {
        console.log(err.response.data)
        console.log(err.response.status)
        data = err.response.data
        code = 11
        msg = '请求错误'
    } else if (err.request) {
        console.log(err.request)
        code = 22
        msg = '无响应'
    } else {
        console.log('error : ', err.message)
        code = 33
        msg = err.message
    }
    return {data, code, msg}
}

export const get = (url, params) => {
    params = params || {}
    params.timestamp = new Date().getTime()
    return service.get(
        base_url + url, {params}
    ).then(res => res.data)
        .catch(err => handleError(err))
}

export const post = (url, data, headers, params) => {
    data = data || {}
    let cookie = localStorage.getItem('loginCookie')
    if(cookie && cookie !== ''){
        data.cookie = cookie
    }
    return service.post(
        base_url + url, data, {headers, params}
    ).then(res => res.data)
        .catch(err => handleError(err))
}

export const getBlob = (url, params, headers) => {
    service.get(base_url + url, {params, headers, responseType: 'blob'})
        .then(res => res.data)
        .catch(err => handleError(err))
}