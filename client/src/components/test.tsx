/* eslint-disable array-callback-return */
import { useState, useRef, useEffect } from 'react'
import { io } from 'socket.io-client'

const socketClient = io('http://localhost:3001')  
export default function Test() {
//   socketClient.emit('connection')
  const [input, setInput] = useState<any>('')
  const inputElem = useRef<HTMLInputElement>(null)
  const [disMesage, setDisMsg] = useState<string[]>([])  

  const clicked = () => {
    // console.log('clicker...', inputElem)
    setInput(inputElem?.current?.value)
  }
  socketClient.on('test-emit', (skt)=> {
    console.log(skt)
  })
  const newFn = (msg: string[]) => {
    setDisMsg(msg)
  }
  const displayMessage = () => {
    
    socketClient.emit('send-all', [...disMesage, input])
    socketClient.on('receive', (messages) => {
        // console.log('socket', socket)
        newFn(messages)
    })
  }

  return (
    <div>
        <div>
            { disMesage.map((msg, i) =>
                (<li key={i}>{msg}</li>)
            ) }
        </div>
        <input type="text" ref={inputElem} value={input} onChange={clicked}/>
        <button onClick={displayMessage}>Send</button>
    </div>
  )
}
