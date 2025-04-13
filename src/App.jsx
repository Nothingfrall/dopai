import React, { useState } from 'react'
import axios from 'axios'

const App = () => {
  const [messages, setMessages] = useState([{ role: "ai", content: "Hi, I'm DopamineAI. Ask me anything about code!" }])
  const [input, setInput] = useState("")
  const [language, setLanguage] = useState("Python")

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }]
    setMessages(newMessages)
    setInput("")
    try {
      const res = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
        model: "gpt-3.5-turbo",
        messages: newMessages,
      }, {
        headers: {
          'Authorization': `Bearer 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`,
        'HTTP-Referer': 'https://yourapp.com',
        'X-Title': 'DopamineAI'
        }
      })
      const reply = res.data.choices[0].message
      setMessages([...newMessages, reply])
    } catch (err) {
      setMessages([...newMessages, { role: "ai", content: "Error: Unable to connect to AI." }])
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 space-y-4">
      <header className="w-full text-left text-xl font-bold text-white flex justify-between items-center">
        <div className="text-2xl">🚀 DopamineAI</div>
        <select
          className="bg-zinc-800 border border-zinc-700 text-white p-1 rounded"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option>Python</option>
          <option>JavaScript</option>
          <option>C++</option>
          <option>Java</option>
        </select>
      </header>
      <div className="w-full max-w-2xl bg-zinc-800 p-4 rounded-xl space-y-2 flex-1">
        {messages.map((msg, idx) => (
          <div key={idx} className={`text-${msg.role === 'user' ? 'right' : 'left'}`}>
            <div className="bg-zinc-700 p-2 rounded-lg inline-block max-w-full">
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      <div className="w-full max-w-2xl flex items-center space-x-2">
        <input
          className="flex-1 bg-zinc-800 border border-zinc-700 p-2 rounded-lg text-white"
          placeholder="Message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} className="bg-purple-600 p-2 rounded-lg text-white hover:bg-purple-500">
          ➤
        </button>
      </div>
    </div>
  )
}

export default App