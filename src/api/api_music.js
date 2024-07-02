import {get} from "@/api/request";
/* 获取音乐url */
export const getSongUrl = (id) => get('/song/url', { id })

/* 搜索 */
export const cloudSearch = ({limit,offset,type,keywords}) => get('/cloudsearch', {limit, offset, type, keywords})

/** 歌曲详情 */
export const songDetail = (ids) => get('/song/detail',{ids})
/** 专辑详情 */
export const albumDetail = ({id, offset, limit}) => get('/album', {id, offset, limit})

export const albumDetailDynamic = (id) => get('/album/detail/dynamic', {id})

export const getRecNewSong = (limit) => get('/personalized/newsong', {limit})

export const getLyric = (id) => get('/lyric', {id})

export const songComments = ({id, offset, limit}) => get('/comment/music',{id, offset, limit})