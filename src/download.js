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