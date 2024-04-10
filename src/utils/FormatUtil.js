export const toCNNum = (num)=>{
    let sub = ''
    let n = num
    if(num >= 100000000){
        n = (num / 100000000).toFixed(2)
        sub = '亿'
    }else if(num >= 10000){
        n = (num / 10000).toFixed(2)
        sub = '万'
    }
    return n+sub
}