import { useState, useEffect, useRef } from "react";
import { type ChatRoom, type ChatMessage } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Users, User } from "lucide-react";
import { wsManager } from "@/lib/websocket";
import { useQuery } from "@tanstack/react-query";

interface ChatRoomProps {
  room: ChatRoom;
  onBack: () => void;
}

export default function ChatRoom({ room, onBack }: ChatRoomProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch initial messages
  const { data: initialMessages } = useQuery({
    queryKey: ["/api/chat-rooms", room.id, "messages"],
    enabled: false, // We'll get messages via WebSocket
  });

  useEffect(() => {
    const connectAndJoin = async () => {
      try {
        await wsManager.connect();
        setIsConnected(true);
        wsManager.joinRoom(room.id);
      } catch (error) {
        console.error("Failed to connect to WebSocket:", error);
      }
    };

    const handleMessage = (data: any) => {
      if (data.type === "recent-messages") {
        setMessages(data.messages);
      } else if (data.type === "new-message") {
        setMessages(prev => [...prev, data.message]);
      }
    };

    wsManager.addMessageHandler(handleMessage);
    connectAndJoin();

    return () => {
      wsManager.removeMessageHandler(handleMessage);
    };
  }, [room.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() && isConnected) {
      wsManager.sendMessage(room.id, newMessage.trim());
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getTimeString = (date: Date | string) => {
    const messageDate = new Date(date);
    return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-full flex flex-col">
      <Card className="flex-1 flex flex-col">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">{room.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{room.description}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{room.activeUsers} active</span>
              </div>
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`} />
              <Button variant="outline" size="sm" onClick={onBack}>
                Back
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="text-white h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium">Anonymous</span>
                      <span className="text-xs text-muted-foreground">
                        {message.createdAt ? getTimeString(message.createdAt) : ""}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isConnected ? "Type your message..." : "Connecting..."}
                disabled={!isConnected}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim() || !isConnected}
                size="sm"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
