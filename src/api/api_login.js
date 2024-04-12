import {get,post} from './request'

export const getQrKey = (timestamp) => get('/login/qr/key', {timestamp})

export const qrCreate = (key, qrimg, timestamp) => get('/login/qr/create', {key, qrimg, timestamp})

export const qrCheck = (key, timestamp) => get('/login/qr/check', {key, timestamp})

export const checkLoginStatus = () => post('/login/status')

export const getUserAccountInfo = () => post('/user/account')

export const getUserDetail = (uid) => post('/user/detail', {uid})

export const logout = () => post('/logout')
//发送验证码
export const captchaSent = (phone) => get('/captcha/sent', {phone})
// 校验验证码
export const captchaVerify = (phone, captcha) => get('/captcha/verify', {phone, captcha})