import React, { useState, useRef, useEffect } from 'react';
import { 
  ChatMessage, 
  BusinessPlanData, 
  CurrencyCode 
} from '../types';
import { 
  Sparkles, 
  Send, 
  X, 
  Bot, 
  User, 
  HelpCircle, 
  ArrowRight, 
  RefreshCw,
  MessageSquare
} from 'lucide-react';

interface AICopilotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  plan: BusinessPlanData;
  displayCurrency: CurrencyCode;
}

export const AICopilotDrawer: React.FC<AICopilotDrawerProps> = ({
  isOpen,
  onClose,
  plan,
  displayCurrency,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I am your **Executive Business Planning & Decision-Support Agent**.

I can help you:
• **Adapt to a specific budget constraint** (e.g. *"I only have $3,000 / PKR 500,000, what fits?"*)
• **Analyze suppliers & equipment trade-offs**
• **Refine assumptions or review hidden costs**
• **Answer in English, Urdu, or Roman Urdu** (*"Main $2000 me business start karna chahta hoon"*)

What aspect of **${plan.title}** would you like to explore?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedPrompts: [
        'How can I launch this for 50% less capital?',
        'What are the 3 biggest hidden risks?',
        'Compare alternative budget equipment options',
        'PKR 1,000,000 me ye setup kaise hoga?',
      ],
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (messageToSend?: string) => {
    const query = (messageToSend || input).trim();
    if (!query || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          currentPlan: plan,
          history: messages.slice(-6),
        }),
      });

      const data = await res.json();

      const assistantMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'I analyzed your request. Let me know what specific calculations or trade-offs you want to review next.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionTaken: data.actionTaken,
        suggestedPrompts: data.suggestedPrompts,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        role: 'assistant',
        content: 'Unable to reach the decision support service. Please check your connection or try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const renderFormattedContent = (text: string) => {
    const lines = text.split('\n');
    return (
      <div className="space-y-1.5 font-sans text-xs leading-relaxed">
        {lines.map((line, i) => {
          const trimmed = line.trim();
          if (!trimmed) {
            return <div key={i} className="h-1" />;
          }

          // Headers
          if (trimmed.startsWith('### ')) {
            return <div key={i} className="font-bold text-slate-900 mt-2 text-xs">{trimmed.replace(/^###\s+/, '')}</div>;
          }
          if (trimmed.startsWith('## ')) {
            return <div key={i} className="font-bold text-slate-900 mt-2.5 text-sm">{trimmed.replace(/^##\s+/, '')}</div>;
          }

          // Bullets
          const isBullet = trimmed.startsWith('• ') || trimmed.startsWith('- ') || trimmed.startsWith('* ');
          const lineContent = isBullet ? trimmed.replace(/^([•\-*]\s+)/, '') : trimmed;

          // Parse **bold** and *italic*
          const parts = lineContent.split(/(\*\*.*?\*\*|\*.*?\*)/g);

          const formattedLine = parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={pIdx} className="font-semibold text-slate-900">{part.slice(2, -2)}</strong>;
            }
            if (part.startsWith('*') && part.endsWith('*')) {
              return <em key={pIdx} className="italic text-slate-700">{part.slice(1, -1)}</em>;
            }
            return part;
          });

          if (isBullet) {
            return (
              <div key={i} className="flex items-start gap-1.5 pl-1">
                <span className="text-slate-400 font-bold shrink-0">•</span>
                <span>{formattedLine}</span>
              </div>
            );
          }

          return <p key={i}>{formattedLine}</p>;
        })}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col border-l border-slate-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-amber-400 text-slate-900 rounded-lg">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold">Costify AI Copilot</h2>
              <div className="text-[10px] text-slate-400">
                Gemini 3.1 Flash-Lite Preview · Continuous Decision Support
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'assistant' && (
                <div className="w-7 h-7 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-50 border border-slate-200 text-slate-800'
                }`}
              >
                {m.actionTaken && (
                  <div className="text-[10px] font-bold uppercase tracking-wider text-amber-600 mb-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Action: {m.actionTaken}</span>
                  </div>
                )}

                {m.role === 'assistant' ? (
                  renderFormattedContent(m.content)
                ) : (
                  <div className="whitespace-pre-wrap font-sans text-xs">
                    {m.content}
                  </div>
                )}

                {m.suggestedPrompts && m.suggestedPrompts.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-200 space-y-1">
                    <div className="text-[10px] font-bold text-slate-500 uppercase">Suggested Inquiries:</div>
                    <div className="flex flex-wrap gap-1">
                      {m.suggestedPrompts.map((p, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(p)}
                          className="text-left text-[11px] bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 py-1 px-2 rounded-md font-medium transition-colors"
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className={`text-[9px] mt-1.5 text-right ${m.role === 'user' ? 'text-slate-400' : 'text-slate-400'}`}>
                  {m.timestamp}
                </div>
              </div>

              {m.role === 'user' && (
                <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-2.5 items-center text-slate-500 text-xs pl-9">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-slate-700" />
              <span>Analyzing requirements & financial engine...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-slate-200 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask anything (English, Urdu, budget tweaks, products)..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              className="flex-1 text-xs py-2 px-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 disabled:opacity-40 transition-colors shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="text-[10px] text-slate-400 text-center mt-1.5">
            Adheres strictly to the 53 production agent guardrails. Live data vs estimates marked clearly.
          </div>
        </div>
      </div>
    </div>
  );
};
