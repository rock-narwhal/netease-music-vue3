import {get} from './request'
/* 排行榜 */
export const getTopList = ()=> get('/toplist')

/* 新歌速递 */
export const getLatestByType = (type)=> get('/top/song',{type})

/* 新碟速放 */
export const getLatestAlbum = ({type,area})=> get('/top/album', {type, area})