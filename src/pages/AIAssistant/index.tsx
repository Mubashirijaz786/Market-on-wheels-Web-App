import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Bot,
  User,
  ShoppingBag,
  RefreshCw,
  HelpCircle,
  ShieldAlert,
  MapPin,
  CheckCircle2,
  Mic,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AutonomousOrderCard } from '../../components/ai/AutonomousOrderCard';
import { ProductCard } from '../../components/products/ProductCard';
import { Button } from '../../components/common/Button';

export const AIAssistantPage: React.FC = () => {
  const {
    aiMessages,
    isAiThinking,
    sendAiMessage,
    clearAiChat,
    currentLocation,
  } = useApp();

  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [aiMessages, isAiThinking]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isAiThinking) {
      sendAiMessage(input.trim());
      setInput('');
    }
  };

  const samplePrompts = [
    'I need 2 liters of milk, 1 bread, 6 eggs, and 1 kg of apples',
    'Find Panadol Extra and pain relief medicine near me',
    'Show fresh fruits and vegetables for breakfast',
    'Order 1 Truffle burger and 2 liters of pure milk',
    'Suggest items based on previous orders',
  ];

  const handleVoiceSim = () => {
    setIsListening(true);
    setTimeout(() => {
      setInput('I need 2 liters of milk, 1 bread, and Panadol Extra');
      setIsListening(false);
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
            <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
            <span>Autonomous Multi-Vendor Agent Laboratory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            AI Shopping Assistant & Autonomous Ordering
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            State what you need in plain words. The agent checks inventories across stores in{' '}
            <strong className="text-emerald-800">{currentLocation.name}</strong>, prepares your cart, and requests your approval.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={clearAiChat}
          leftIcon={<RefreshCw className="w-4 h-4" />}
        >
          Reset Session
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Chat Canvas */}
        <div className="lg:col-span-8 rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col h-[700px] overflow-hidden">
          {/* Agent Banner */}
          <div className="p-4 bg-gradient-to-r from-emerald-800 to-teal-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-emerald-200" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-white">Market on Wheels AI Agent</h3>
                <p className="text-[11px] text-emerald-200">
                  Status: Online • Connected to {currentLocation.zone} Catalog
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-emerald-200 bg-white/10 px-2.5 py-1 rounded-lg">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-300" />
              <span>Customer Approval Enforced</span>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-slate-50/50">
            {aiMessages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-1 shadow-sm">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[85%] ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-xs ${
                      msg.sender === 'user'
                        ? 'bg-slate-900 text-white rounded-br-none font-medium'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Render Autonomous Proposal card */}
                  {msg.proposal && (
                    <AutonomousOrderCard proposal={msg.proposal} />
                  )}

                  {/* Render Product Cards inside chat */}
                  {!msg.proposal && msg.products && msg.products.length > 0 && (
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {msg.products.map(p => (
                        <ProductCard key={p.id} product={p} />
                      ))}
                    </div>
                  )}

                  {/* Suggested chips */}
                  {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {msg.suggestedActions.map((action, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => sendAiMessage(action)}
                          className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isAiThinking && (
              <div className="flex items-center gap-2.5 text-xs text-emerald-800 bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200 w-fit">
                <Bot className="w-4 h-4 animate-spin text-emerald-600" />
                <span>Interpreting request, matching local stocks, calculating unified delivery...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Form */}
          <form
            onSubmit={handleSend}
            className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2 sm:gap-3"
          >
            <button
              type="button"
              onClick={handleVoiceSim}
              className={`p-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors ${
                isListening ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' : ''
              }`}
              title="Simulate Voice Input"
            >
              <Mic className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Tell me what you need, e.g. 2 milk, 1 bread, and Panadol..."
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />

            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={!input.trim() || isAiThinking}
              className="bg-emerald-600 hover:bg-emerald-700"
              rightIcon={<Send className="w-4 h-4" />}
            >
              Ask Agent
            </Button>
          </form>
        </div>

        {/* Right Column: Suggested Natural Language Shopping Lists & Autonomous Workflow Guide */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Trial Prompts */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
            <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Try Instant Sample Prompts</span>
            </h4>
            <p className="text-xs text-slate-500">
              Click any example below to test the autonomous multi-vendor shopping workflow:
            </p>

            <div className="space-y-2 pt-2">
              {samplePrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => sendAiMessage(prompt)}
                  className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200/80 hover:border-emerald-200 text-xs text-slate-800 transition-all font-medium"
                >
                  "{prompt}"
                </button>
              ))}
            </div>
          </div>

          {/* Workflow Steps Explanation Card */}
          <div className="rounded-3xl border border-emerald-200 bg-emerald-50/50 p-6 shadow-sm space-y-3 text-xs text-emerald-950">
            <h4 className="font-extrabold text-sm text-emerald-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>How the Autonomous Agent Works</span>
            </h4>

            <ol className="space-y-2 text-emerald-900 list-decimal list-inside leading-relaxed">
              <li>
                <strong>Intent & Quantity Extraction:</strong> Parses raw text to extract product names and counts.
              </li>
              <li>
                <strong>Multi-Vendor Matching:</strong> Searches active inventory of stores in your area.
              </li>
              <li>
                <strong>Consolidated Route Pricing:</strong> Computes delivery fee with multi-pickup consolidation savings.
              </li>
              <li>
                <strong>Approval Requirement:</strong> Prompts you with an exact total. <em>The agent will never place an order without your explicit approval.</em>
              </li>
              <li>
                <strong>Seamless Dispatch:</strong> After confirmation, triggers the same order service as standard checkout.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};
