import { useState } from 'react'
import { ChatInput } from './components/ChatInput.jsx'
import { Chatbot } from 'supersimpledev'
import ChatMessages from './components/ChatMessages.jsx'
import { ChatMessage } from './components/ChatMessage.jsx'
import './App.css'

function App () {
  const [chatMessages, setChatMessages] = useState([]);
  
  return (
  <div className="app-container">
    
    <ChatMessages 
      chatMessages={chatMessages}
    />
    <ChatInput 
      chatMessages={chatMessages}
      setChatMessages={setChatMessages}
    />
    
  </div>
  );
}

export default App
