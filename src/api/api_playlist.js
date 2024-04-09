import {get} from '@/api/request'
/* 获取推荐歌单 */
export const getPersonalized = (limit) => get('/personalized', {limit})

/* login 获取个性推荐歌单 */
export const getRecommend = () => get('/recommend/resource')
/* 热门歌单分类 */
export const getHotCat = () => get('/playlist/hot')
/* 所有歌单分类 */
export const getAllCat = () => get('/playlist/catlist')
/* 获取经典分类 */
export const getHighQuality = (limit, cat, before) => get('/top/playlist/highquality', {limit, cat, before})
/* 根据分类获取歌单 */
export const getPlayListByCat = ({limit, order, cat, offset}) => get('/top/playlist',{ limit, order, cat, offset })
/* 歌单详情 */
export const getPlayListDetail = (id) => get('/playlist/detail',{id})
/* 歌单歌曲列表 */
export const playlistSongs = (id) => get('/playlist/track/all',{id})
/* 歌单动态信息，点赞收藏等 */
export const playlistDynamic = (id) => get('/playlist/detail/dynamic', {id})
/* 歌单评论 */
export const playlistComments = ({id, offset, limit}) => get('/comment/playlist', {id, offset, limit})