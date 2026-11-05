"use client";

import { useState, useRef, useEffect } from "react";

// ── Icons ───────────────────────────────────────────────────────────────────

function ChatBubbleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
    </svg>
  );
}

// ── Markdown-lite renderer ──────────────────────────────────────────────────

function renderMessage(text) {
  if (!text) return null;
  const lines = text.split("\n");
  const rendered = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      rendered.push(
        <h3 key={i} className="font-bold text-sm mt-3 mb-1 text-white">
          {line.slice(3)}
        </h3>
      );
      continue;
    }
    if (line.startsWith("# ")) {
      rendered.push(
        <h2 key={i} className="font-bold text-base mt-3 mb-1 text-white">
          {line.slice(2)}
        </h2>
      );
      continue;
    }

    if (line.startsWith("• ") || line.startsWith("- ")) {
      const content = line.slice(2);
      rendered.push(
        <li key={i} className="ml-4 text-sm list-disc">
          {renderInline(content)}
        </li>
      );
      continue;
    }

    if (line.startsWith("|")) {
      if (line.match(/^\|[\s\-|]+$/)) continue;
      const cells = line
        .split("|")
        .filter((c) => c.trim())
        .map((c) => c.trim());
      rendered.push(
        <div
          key={i}
          className="grid grid-cols-4 sm:grid-cols-5 gap-1 text-xs py-1 border-b border-zinc-700/50"
        >
          {cells.map((cell, j) => (
            <span key={j} className={j === 0 ? "font-medium" : ""}>
              {renderInline(cell)}
            </span>
          ))}
        </div>
      );
      continue;
    }

    if (line.trim() === "") {
      rendered.push(<br key={i} />);
      continue;
    }

    rendered.push(
      <p key={i} className="text-sm leading-relaxed">
        {renderInline(line)}
      </p>
    );
  }

  return rendered;
}

function renderInline(text) {
  if (!text) return "";
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    const linkParts = part.split(/(\/destinations\/[\w-]+)/g);
    return linkParts.map((lp, j) => {
      if (lp.startsWith("/destinations/")) {
        return (
          <a
            key={`${i}-${j}`}
            href={lp}
            className="text-blue-400 hover:text-blue-300 underline underline-offset-2 font-medium"
          >
            {lp}
          </a>
        );
      }
      return lp;
    });
  });
}

// ── Quick Suggestions ───────────────────────────────────────────────────────

const SUGGESTIONS = [
  "🏖️ Show me beach destinations",
  "💰 Trips under $1500",
  "⭐ Top-rated destinations",
  "🧗 Adventure trips",
];

// ── Chat Widget Component ───────────────────────────────────────────────────

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const sendMessage = async (contentToSend) => {
    const text = contentToSend || input;
    if (!text || !text.trim() || isLoading) return;

    const userMsg = { id: Date.now().toString(), role: "user", content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to get response");
      }

      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: data.reply || data.error || "No response received",
          },
        ]);
      } else {
        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let assistantContent = "";
        const assistantMsgId = (Date.now() + 1).toString();

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            
            const lines = chunk.split("\n");
            for (const line of lines) {
              if (line.startsWith('0:"')) {
                try {
                  const parsed = JSON.parse(line.slice(2));
                  assistantContent += parsed;
                } catch {
                  assistantContent += line;
                }
              } else if (!line.startsWith("d:") && !line.startsWith("e:") && !line.startsWith("f:")) {
                assistantContent += line;
              }
            }

            setMessages((prev) => {
              const withoutCurrent = prev.filter((m) => m.id !== assistantMsgId);
              return [
                ...withoutCurrent,
                { id: assistantMsgId, role: "assistant", content: assistantContent },
              ];
            });
          }
        }
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: `⚠️ ${err.message || "Something went wrong. Please check your setup."}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const handleSuggestionClick = (suggestion) => {
    sendMessage(suggestion);
  };

  return (
    <>
      {/* ── Floating Chat Button ─────────────────────────────────────── */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full
            bg-gradient-to-br from-blue-600 to-purple-600
            hover:from-blue-500 hover:to-purple-500
            text-white shadow-lg shadow-blue-500/25
            flex items-center justify-center
            transition-all duration-300 hover:scale-110
            animate-bounce-slow cursor-pointer"
          aria-label="Open travel assistant"
        >
          <ChatBubbleIcon />
        </button>
      )}

      {/* ── Chat Panel ───────────────────────────────────────────────── */}
      {isOpen && (
        <div
          className="fixed bottom-6 right-6 z-50
            w-[380px] h-[560px] max-h-[80vh]
            bg-zinc-900/95 backdrop-blur-xl
            border border-zinc-700/50
            rounded-2xl shadow-2xl shadow-black/50
            flex flex-col overflow-hidden
            animate-slide-up"
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3
              bg-gradient-to-r from-blue-600/20 to-purple-600/20
              border-b border-zinc-700/50"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <SparkleIcon />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">
                  TravelBot
                </h3>
                <p className="text-[10px] text-zinc-400">
                  AI Travel Assistant • MCP Agent
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-white transition-colors p-1 cursor-pointer"
              aria-label="Close chat"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin">
            {/* Welcome message */}
            {messages.length === 0 && (
              <div className="space-y-3">
                <div className="bg-zinc-800/50 rounded-xl p-3 border border-zinc-700/30">
                  <p className="text-sm text-zinc-300">
                    👋 Hey! I&apos;m <strong className="text-white">TravelBot</strong>, your AI travel
                    assistant powered by MCP.
                  </p>
                  <p className="text-sm text-zinc-400 mt-1">
                    I can search destinations, compare prices, and give personalized
                    recommendations. Try asking me anything!
                  </p>
                </div>

                {/* Quick suggestions */}
                <div className="grid grid-cols-2 gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSuggestionClick(s)}
                      className="text-xs text-left px-3 py-2
                        bg-zinc-800/30 hover:bg-zinc-700/50
                        border border-zinc-700/30 hover:border-zinc-600/50
                        rounded-lg text-zinc-300 hover:text-white
                        transition-all duration-200 cursor-pointer"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat messages */}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-3 py-2 ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-zinc-800/80 text-zinc-200 border border-zinc-700/30"
                  }`}
                >
                  {message.role === "user" ? (
                    <p className="text-sm">{message.content}</p>
                  ) : (
                    <div className="space-y-1">
                      {renderMessage(message.content)}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-zinc-800/80 rounded-xl px-4 py-3 border border-zinc-700/30">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0ms]" />
                      <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:150ms]" />
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:300ms]" />
                    </div>
                    <span className="text-xs text-zinc-500">
                      Searching destinations...
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="px-3 py-3 border-t border-zinc-700/50 bg-zinc-900/80"
          >
            <div className="flex items-center gap-2 bg-zinc-800/50 rounded-xl border border-zinc-700/30 px-3 py-1 focus-within:border-blue-500/50 transition-colors">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about destinations..."
                className="flex-1 bg-transparent text-sm text-white placeholder-zinc-500 py-2 outline-none"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="text-blue-400 hover:text-blue-300 disabled:text-zinc-600
                  transition-colors p-1 cursor-pointer disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <SendIcon />
              </button>
            </div>
            <p className="text-[10px] text-zinc-600 mt-1.5 text-center">
              Powered by MCP + Gemini AI
            </p>
          </form>
        </div>
      )}
    </>
  );
}
