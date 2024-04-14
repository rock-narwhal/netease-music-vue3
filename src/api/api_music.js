import {get} from "@/api/request";
/* 获取音乐url */
export const getSongUrl = (id) => get('/song/url', { id , timeStamp: new Date().getTime()})

/* 搜索 */
export const cloudSearch = ({limit,offset,type,keywords}) => get('/cloudsearch', {limit, offset, type, keywords})

/** 歌曲详情 */
export const songDetail = (ids) => get('/song/detail',{ids})
/** 专辑详情 */
export const albumDetail = (id) => get('/album', {id})

export const albumDetailDynamic = (id) => get('/album/detail/dynamic', {id})