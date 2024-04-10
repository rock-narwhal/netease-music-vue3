export const timeConvert = (second) => {
    let min = Math.floor(second / 60)
    let sec = Math.floor(second % 60)
    if (min < 10) {
        min = String(min).padStart(2, '0')
    }
    if (sec < 10) {
        sec = String(sec).padStart(2, '0')
    }
    return min + ':' + sec
}