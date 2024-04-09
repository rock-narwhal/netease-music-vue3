import {get} from './request'

//按条件查询歌手列表
export const queryArtist = ({type,area,initial,limit,offset})=> get('/artist/list',{type, area, initial,limit,offset})
//歌手详情
export const artistDetail = (id) => get('/artist/detail', {id})
// 歌手专辑
export const artistAlbum = ({id, offset, limit}) => get('/artist/album', {id, offset, limit})
// 歌手MV
export const artistMV = ({id, offset, limit}) => get('/artist/mv', {id, offset, limit})
//歌手信息
export const artistInfo = (id) => get('/artist/desc', {id})