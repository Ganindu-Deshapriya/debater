'use client';

import { useState } from 'react';

type Message = {
  id: string;
  botId: 'Bot A' | 'Bot B';
  text: string;
};

export default function DebateSimulator() {
  const [topic, setTopic] = useState("Is a hotdog a sandwich?");
  const [botAPersonality, setBotAPersonality] = useState("A stubborn New Yorker who takes food strictly literally.");
  const [botBPersonality, setBotBPersonality] = useState("A chaotic philosopher who believes everything is a sandwich.");
  const [tone, setTone] = useState("casual");
  const [numTurns, setNumTurns] = useState(4);

  const [messages, setMessages] = useState<Message[]>([]);
  const [isDebating, setIsDebating] = useState(false);
  const [conclusion, setConclusion] = useState<string | null>(null);

  const fetchBotResponse = async (botId: 'Bot A' | 'Bot B', currentHistory: Message[]) => {
    const personality = botId === 'Bot A' ? botAPersonality : botBPersonality;
    const chatHistory = currentHistory.map(m => `${m.botId}: ${m.text}`).join('\n');

    try {
      const response = await fetch('/api/debate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ personalityPrompt: personality, debateTopic: topic, chatHistory, tone })
      });
      
      const data = await response.json();
      
      // If the API returns our 500 error, log the details to the browser console
      if (!response.ok) {
        console.error("Backend Error Details:", data.details);
        return `Error: ${data.details}`;
      }

      return data.text || "I have no words.";

    } catch (error) {
      console.error("Network or Fetch Error:", error);
      return "Network error occurred.";
    }
  };

  const startDebate = async () => {
    setIsDebating(true);
    setConclusion(null);
    let currentMessages: Message[] = [];
    setMessages([]); // Clear previous debate

    // Alternate bots for the selected number of turns
    const bots: ('Bot A' | 'Bot B')[] = ['Bot A', 'Bot B'];
    for (let i = 0; i < numTurns; i++) {
      const botId = bots[i % 2];
      const responseText = await fetchBotResponse(botId, currentMessages);
      const newMessage: Message = {
        id: crypto.randomUUID(),
        botId: botId,
        text: responseText,
      };
      currentMessages = [...currentMessages, newMessage];
      setMessages(currentMessages);
      // 2-second typing delay for realistic UX
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    // After all turns, fetch a conclusion
    const chatHistory = currentMessages.map(m => `${m.botId}: ${m.text}`).join('\n');
    try {
      const response = await fetch('/api/debate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personalityPrompt: 'You are a neutral debate judge. Summarize the debate and provide a fair, concise conclusion.',
          debateTopic: topic,
          chatHistory,
          tone: 'neutral',
          conclusion: true
        })
      });
      const data = await response.json();
      setConclusion(data.text || 'No conclusion available.');
    } catch (error) {
      setConclusion('Failed to generate a conclusion.');
    }
    setIsDebating(false);
  };

    return (
      <>
        <div className="background-image-blur" aria-hidden="true"></div>
        <main className="relative z-10 max-w-3xl mx-auto p-8 font-sans">
          <h1 className="text-3xl font-bold mb-6 text-center">AI Debate Simulator 🤖⚖️</h1>
          <div className="bg-gray-100 p-6 rounded-lg mb-8 space-y-4 shadow-sm">
            <div className="flex flex-col space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1">Debate Topic:</label>
                <input 
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 text-gray-800"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  disabled={isDebating}
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Number of Turns:</label>
                <input
                  type="number"
                  min={2}
                  max={20}
                  step={1}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 text-gray-800"
                  value={numTurns}
                  onChange={e => setNumTurns(Math.max(2, Math.min(20, Number(e.target.value))))}
                  disabled={isDebating}
                />
                <span className="text-xs text-gray-500">Turns alternate between bots. Even numbers recommended.</span>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Debate Tone:</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 text-gray-800"
                  value={tone}
                  onChange={e => setTone(e.target.value)}
                  disabled={isDebating}
                >
                  <option value="casual">Casual</option>
                  <option value="professional">Professional</option>
                  <option value="aggressive">Aggressive</option>
                  <option value="sarcastic">Sarcastic</option>
                  <option value="friendly">Friendly</option>
                  <option value="neutral">Neutral</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-1 text-blue-600">Bot A Personality:</label>
                  <textarea 
                    className="w-full p-2 border border-gray-300 rounded h-24 focus:ring-2 text-gray-800"
                    value={botAPersonality}
                    onChange={(e) => setBotAPersonality(e.target.value)}
                    disabled={isDebating}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1 text-green-600">Bot B Personality:</label>
                  <textarea 
                    className="w-full p-2 border border-gray-300 rounded h-24 focus:ring-2 text-gray-800"
                    value={botBPersonality}
                    onChange={(e) => setBotBPersonality(e.target.value)}
                    disabled={isDebating}
                  />
                </div>
              </div>
              <button 
                onClick={startDebate} 
                disabled={isDebating}
                className="w-full bg-black text-white font-bold py-3 rounded hover:bg-gray-800 disabled:bg-gray-400 transition"
              >
                {isDebating ? "Debating..." : "Start Debate"}
              </button>
            </div>
          </div>
          <div className="space-y-6">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex flex-col ${msg.botId === 'Bot A' ? 'items-start' : 'items-end'}`}
              >
                <div className={`max-w-[80%] p-4 rounded-xl shadow-md ${
                  msg.botId === 'Bot A' ? 'bg-blue-50 border-l-4 border-blue-500' : 'bg-green-50 border-r-4 border-green-500'
                }`}>
                  <strong className={`block mb-1 ${msg.botId === 'Bot A' ? 'text-blue-700' : 'text-green-700'}`}>
                    {msg.botId}
                  </strong>
                  <p className="text-gray-800 whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}
            {isDebating && messages.length < numTurns && (
              <div className="text-center text-gray-500 animate-pulse font-medium">
                Thinking...
              </div>
            )}
            {conclusion && (
              <div className="mt-8 p-6 bg-yellow-50 border-l-4 border-yellow-500 rounded-xl shadow">
                <strong className="block mb-2 text-yellow-700 text-lg">Debate Conclusion</strong>
                <p className="text-gray-900 whitespace-pre-wrap">{conclusion}</p>
              </div>
            )}
          </div>
        </main>
      </>
  );
}