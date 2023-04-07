import express from 'express'
import { Server } from 'socket.io'

const app = express()
const socket = new Server(3001, {
    cors: {
        origin: ['http://localhost:3000']
    }
})


socket.on('connection', (socket) => {
    socket.emit('test-emit', ['test emit successfully'])
    socket.on('send-all', (values) => {
        socket.broadcast.emit('receive', values)
    })
})


app.listen(3005, () => {
    console.log('listening...')
})