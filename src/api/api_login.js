import {get,post} from './request'

export const getQrKey = () => get('/login/qr/key')

export const qrCreate = (key, qrimg) => get('/login/qr/create', {key, qrimg})

export const qrCheck = (key) => get('/login/qr/check', {key})

export const checkLoginStatus = () => post('/login/status')

export const getUserAccountInfo = () => post('/user/account')

export const getUserDetail = (uid) => post('/user/detail', {uid})

export const logout = () => post('/logout')
//发送验证码
export const captchaSent = (phone) => get('/captcha/sent', {phone})
// 校验验证码
export const captchaVerify = (phone, captcha) => get('/captcha/verify', {phone, captcha})