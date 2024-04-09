import {get} from './request'
// 获取搜索结果
export const getSuggest = ({type, keywords}) => get('/search/suggest', {type, keywords})
// 获取热搜榜
export const getHotSearch = () => get('/search/hot/detail')
//获取轮播图banner
export const getBanner = () => get('/banner')
// 获取专辑评论
export const albumComment = ({id, offset, limit, before}) => get('/comment/album', {id, offset, limit, before})