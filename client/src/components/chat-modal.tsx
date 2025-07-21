import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Mic, MicOff, Send } from "lucide-react";
import { useAudioRecorder } from "@/hooks/use-audio-recorder";
import { sendToWebhook, type WebhookMessage } from "@/lib/webhook";
import { AgentConfig } from "./agent-card";

interface Message {
  id: string;
  sender: "user" | "bot";
  content: string;
  type: "text" | "audio";
  timestamp: Date;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  agent: AgentConfig | null;
  sessionId: string;
}

export function ChatModal({ isOpen, onClose, agent, sessionId }: ChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { isRecording, startRecording, stopRecording, error: audioError } = useAudioRecorder();

  useEffect(() => {
    if (isOpen && agent) {
      // Add welcome message
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        sender: "bot",
        content: `Olá! Sou o ${agent.name}. Como posso ajudá-lo hoje?`,
        type: "text",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    } else {
      setMessages([]);
    }
  }, [isOpen, agent]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async (content: string, type: "text" | "audio" = "text") => {
    if (!agent || !content.trim() || isSending) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: type === "audio" ? "Mensagem de áudio enviada" : content,
      type,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsSending(true);
    setIsTyping(true);

    try {
      const webhookPayload: WebhookMessage = {
        agent: agent.id,
        message: content,
        type,
        session_id: sessionId,
      };

      const response = await sendToWebhook(webhookPayload);
      
      setIsTyping(false);
      
      // Process multiple messages with 2s delay between them
      if (response.messages && response.messages.length > 0) {
        for (let i = 0; i < response.messages.length; i++) {
          const messageData = response.messages[i];
          
          // Add delay between messages (except for the first one)
          if (i > 0) {
            await new Promise(resolve => setTimeout(resolve, 2000));
          }
          
          const botMessage: Message = {
            id: (Date.now() + i).toString(),
            sender: "bot",
            content: messageData.message,
            type: messageData.type || "text",
            timestamp: new Date(),
          };

          setMessages(prev => [...prev, botMessage]);
        }
      } else {
        // Fallback for old format
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          content: "Resposta recebida do webhook.",
          type: "text",
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (error) {
      setIsTyping(false);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        content: "Desculpe, ocorreu um erro. Tente novamente.",
        type: "text",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsSending(false);
    }
  };

  const handleSendText = () => {
    sendMessage(inputValue, "text");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendText();
    }
  };

  const handleAudioToggle = async () => {
    if (isRecording) {
      const audioBase64 = await stopRecording();
      if (audioBase64) {
        sendMessage(audioBase64, "audio");
      }
    } else {
      await startRecording();
    }
  };

  if (!isOpen || !agent) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-space-800 rounded-lg shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-space-600">
          <div className="flex items-center">
            <div className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center mr-3">
              <span className="text-xl">{agent.icon}</span>
            </div>
            <div>
              <h3 className="font-semibold">{agent.name}</h3>
              <p className="text-sm text-gray-400">Online agora</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 min-h-[300px] max-h-[400px]">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-space-700 text-gray-100"
                }`}
              >
                {message.type === "audio" ? (
                  <div className="flex items-center space-x-2">
                    <Mic className="h-4 w-4" />
                    <span>Mensagem de áudio</span>
                  </div>
                ) : (
                  <span>{message.content}</span>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 gradient-bg rounded-full flex items-center justify-center">
                  <span className="text-sm">{agent.icon}</span>
                </div>
                <div className="bg-space-700 rounded-lg px-3 py-2">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-space-600">
          {audioError && (
            <div className="text-red-400 text-sm mb-2">{audioError}</div>
          )}
          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua mensagem..."
                className="bg-space-700 border-space-600 focus:border-blue-500"
                disabled={isSending}
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={handleAudioToggle}
              className={`transition-all duration-300 ${
                isRecording 
                  ? "bg-red-600 hover:bg-red-700 border-red-500 text-white animate-pulse" 
                  : "bg-space-700 hover:bg-space-600 border-space-600 text-gray-400 hover:text-white"
              }`}
            >
              {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
            <Button
              onClick={handleSendText}
              className="gradient-bg hover:shadow-lg"
              disabled={!inputValue.trim() || isSending}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
