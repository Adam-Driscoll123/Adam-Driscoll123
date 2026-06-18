import { useState } from 'react'
import { Chatbot } from 'supersimpledev'
import './ChatInput.css'

export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() { 
    if (isLoading || inputText==='') { return; }

    
    setInputText('');

    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: "user",
        id: crypto.randomUUID()
      }
    ]

    setChatMessages([
      ...newChatMessages,
      {
        message: "Loading...",
        sender: "robot",
        id: crypto.randomUUID()
      }
    ]);
    setIsLoading(true);
    const response = await Chatbot.getResponseAsync(inputText);
    

    setChatMessages([
      ...newChatMessages,

      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ]);
    setIsLoading(false);
  }

  function checkKeyDown(event) {
    if (event.key==='Enter') { sendMessage() }
    else if (event.key==='Escape'){ setInputText('') }
  }

  return (
    <div className="chat-input-container">
      <input 
        onChange={saveInputText}
        onKeyDown={checkKeyDown}
        placeholder="Send a message to ChatBot" 
        size="30"
        value={inputText}
        className="chat-input"
      />
      <button
        onClick={sendMessage}
        className="send-button"
        >Send</button>
    </div>
  );
}