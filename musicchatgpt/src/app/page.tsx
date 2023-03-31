"use client"; // this is a client component

import { useState, FormEvent, useEffect } from 'react';
import sayHi  from './api/sayhi/route';
import respond from './api/respond/route';
import mx3 from './api/mx3/route';

interface Message {
  role: string;
  content: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const handleSayHi = async () => {
      const response = await sayHi(1);
      if (response != undefined) setMessages((prev) => [...prev, response]);
    };
    handleSayHi();
  }, []);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!input) return;
    setMessages((prev) => [...prev, { content: input, role: 'user' }]);
    setInput('');
    console.log(messages);
    const response = await respond(1, input, messages[0].content);
    const single = await mx3(input);
    if (response != undefined) setMessages((prev) => [...prev, response]);
  };

  return (
    <div>
      <ul>
        {messages.map((message, i) => (
          <li key={i} className={message.role}>
            {message.content}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}