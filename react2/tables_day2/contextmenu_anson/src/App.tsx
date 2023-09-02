import React from 'react'
import {messages} from './__mocks__/messages'
import {MessageContainer} from './components/MessageContainer'

//fetch data in App component and pass it down

function App() {
  return (
    <>
    <MessageContainer  messages={messages}></MessageContainer>
    </>
  )
}

export default App
