'use client';

import { useChat } from '@ai-sdk/react';
import { useRef, useEffect } from 'react';
import { Terminal, Send, Bot, User } from 'lucide-react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: '/api/chat',
    onError: (err) => console.error('Chat error:', err),
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const trimmedInput = typeof input === 'string' ? input.trim() : '';

  return (
    <div className="flex flex-col h-screen bg-[#000000] text-[#E5E5E5] font-sans antialiased">
      {/* Header */}
      <header className="border-b border-[#1A1A1A] p-4 flex items-center justify-between bg-[#050505]">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-[#00FF66]" />
          <span className="font-mono tracking-widest text-lg font-bold uppercase text-white">
            Wiseman<span className="text-[#00FF66]">.exe</span>
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
          <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse"></span>
          LOCAL_CORE_ONLINE
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 max-w-3xl w-full mx-auto">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4 opacity-60 mt-20">
            <div className="p-4 rounded-full bg-[#0A0A0A] border border-[#1A1A1A]">
              <Bot className="w-12 h-12 text-[#00FF66]" />
            </div>
            <h2 className="text-xl font-mono text-white">Wiseman Awaits Your Foolishness</h2>
            <p className="text-sm max-w-md text-zinc-400 font-mono">
              Ask a brilliant model a question, or state something obvious so it can humiliate your intellect.
            </p>
          </div>
        ) : (
          messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-4 p-4 rounded-lg border ${
                m.role === 'user'
                  ? 'bg-[#050505] border-[#1A1A1A]'
                  : 'bg-[#0A0A0A] border-[#262626]'
              }`}
            >
              <div className="flex-shrink-0 mt-0.5">
                {m.role === 'user' ? (
                  <User className="w-5 h-5 text-zinc-400" />
                ) : (
                  <Bot className="w-5 h-5 text-[#00FF66]" />
                )}
              </div>
              <div className="flex-1 space-y-1 overflow-hidden">
                <p className="text-xs font-mono tracking-wider uppercase text-zinc-500">
                  {m.role === 'user' ? 'Peasant' : 'Wiseman'}
                </p>
                <p className="text-sm leading-relaxed whitespace-pre-wrap font-mono text-zinc-200">
                  {m.content}
                </p>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex gap-2 items-center text-xs font-mono text-zinc-500 pl-4">
            <span className="animate-bounce">●</span>
            <span className="animate-bounce [animation-delay:0.2s]">●</span>
            <span className="animate-bounce [animation-delay:0.4s]">●</span>
            <span>Wiseman is formulating a roast...</span>
          </div>
        )}
        {error && (
          <p className="text-xs font-mono text-red-500 pl-4">Error: {error.message}</p>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <footer className="border-t border-[#1A1A1A] bg-[#050505] p-4">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto relative">
          <input
            className="w-full bg-[#0A0A0A] border border-[#1A1A1A] focus:border-[#00FF66] focus:outline-none rounded-xl py-3 pl-4 pr-12 text-sm font-mono placeholder-zinc-600 text-white transition-colors"
            value={typeof input === 'string' ? input : ''}
            placeholder="Type your message here, mortal..."
            onChange={handleInputChange}
          />
          <button
            type="submit"
            disabled={!trimmedInput || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-[#111] hover:bg-[#1A1A1A] border border-[#222] disabled:opacity-30 text-[#00FF66] transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </footer>
    </div>
  );
}