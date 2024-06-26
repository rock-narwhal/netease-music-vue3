// [00:00.000] 作词 : 张国祥
export const parseLyric = (lyric) =>  {
    let arr = lyric.split(/\n/)
    return arr.map(item => {
        let index = item.indexOf(']')
        let timeStr = item.slice(1, index)
        let content = item.slice(index + 1)
        let timeArr = timeStr.split(/:/)
        let time = Number(timeArr[0]) * 60 * 1000 + Number(timeArr[1]) * 1000
        return {time, content}
    }).filter(item => !isNaN(item.time))
}