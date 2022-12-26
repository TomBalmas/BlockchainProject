export const unixToDate = (u) => {
    var d = new Date(u * 1000)
    return ("0" + d.getDate()).slice(-2) + "/" + ("0" + (d.getMonth() + 1)).slice(-2) + "/" +
        d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)

}

export const etherscanUrlAcc = (network,hash) => {
    return `https://${network}.etherscan.io/address/${hash}`
}

export const etherscanUrlTrans = (network,hash) => {
    return `https://${network}.etherscan.io/tx/${hash}`
}

export const trimedStr = (s,n) => {
    return n>=s.length ? s : (s.substring(0,s.length-3)+'...')
}