const net = require('net')
const tracker = require('./tracker')

module.exports = torrent => {
    tracker.getPeers(torrent, peers => {
        peers.forEach(download)
    })
}

function download(peer){
    const socket = new net.Socket()
    socket.on('error', console.log)
    socket.connect(peer.port, peer.ip, () => {
        // socket.write(...) write a message here later
    })
    socket.on('data', data => {
        //Handle response here later
    })
}

function onWholeMsg(socket, callback){
    let savedBuf = Buffer.alloc(0)
    let handshake = true

    socket.on('data', revcBuf => {
        const msgLen = () => handshake ? savedBuf.readUInt8(0) + 49 :
        savedBuf.readInt32BE(0) + 4

        savedBuf = Buffer.concat([savedBuf, revcBuf])

        while(savedBuf.length >= 4 && savedBuf.length >= msgLen()){
            callback(savedBuf.slice(0, msgLen()))
            savedBuf = savedBuf.slice(msgLen())
            handshake = false
        }
    })
}