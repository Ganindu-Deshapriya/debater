import React from 'react';
import ReactMarkdown from 'react-markdown';

type MessageProps = {
  msg: {
    id: string;
    botId: 'Bot A' | 'Bot B';
    text: string;
  };
};

export function MessageBubble({ msg }: MessageProps) {
  return (
    <div
      className={`flex flex-col ${msg.botId === 'Bot A' ? 'items-start' : 'items-end'}`}
    >
      <div
        className={`max-w-[80%] p-4 rounded-xl shadow-md ${msg.botId === 'Bot A' ? 'bg-blue-50 border-l-4 border-blue-500' : 'bg-green-50 border-r-4 border-green-500'}`}
      >
        <strong className={`block mb-1 ${msg.botId === 'Bot A' ? 'text-blue-700' : 'text-green-700'}`}>
          {msg.botId}
        </strong>
        <div className="text-gray-800 whitespace-pre-wrap">
          <ReactMarkdown>{msg.text}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
