import {get} from './request'
export const getQrKey = (timestamp) => get('/login/qr/key',{timestamp})

export const qrCreate = (key,qrimg,timestamp) => get('/login/qr/create',{key,qrimg,timestamp})

export const qrCheck = (key,timestamp) => get('/login/qr/check', {key,timestamp})

export const checkLoginStatus = (timestamp) => get('/login/status',{timestamp})

export const getUserAccountInfo = (timestamp) => get('/user/account',{timestamp})

export const getUserDetail = (uid,timestamp) => get('/user/detail',{uid, timestamp})