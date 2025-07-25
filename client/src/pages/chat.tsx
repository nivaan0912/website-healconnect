import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { type ChatRoom } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Shield, Clock, Heart, MessageCircle } from "lucide-react";
import ChatRoomComponent from "@/components/chat-room";
import { Skeleton } from "@/components/ui/skeleton";

export default function Chat() {
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);

  const { data: rooms, isLoading, error } = useQuery<ChatRoom[]>({
    queryKey: ["/api/chat-rooms"],
  });

  if (selectedRoom) {
    return (
      <div className="h-screen bg-neutral-warm pt-20">
        <div className="h-[calc(100vh-5rem)] max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ChatRoomComponent
            room={selectedRoom}
            onBack={() => setSelectedRoom(null)}
          />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-warm py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6 text-center">
              <p className="text-red-600">Failed to load chat rooms. Please try again later.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/5 to-primary/5 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Anonymous Peer Support Chat
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with others who understand. Have real-time conversations in a safe,
            anonymous environment with people facing similar challenges.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Chat Rooms */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Active Chat Rooms
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-neutral-warm rounded-xl">
                        <div className="flex-1">
                          <Skeleton className="h-5 w-32 mb-2" />
                          <Skeleton className="h-4 w-48" />
                        </div>
                        <div className="text-right">
                          <Skeleton className="h-4 w-16 mb-1" />
                          <Skeleton className="w-3 h-3 rounded-full" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : rooms && rooms.length > 0 ? (
                  <div className="space-y-4">
                    {rooms.map((room) => (
                      <div
                        key={room.id}
                        className="flex items-center justify-between p-4 bg-neutral-warm rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                        onClick={() => setSelectedRoom(room)}
                      >
                        <div>
                          <h4 className="font-medium text-gray-900">{room.name}</h4>
                          <p className="text-sm text-gray-600">{room.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1 text-sm text-gray-500 mb-1">
                            <Users className="h-4 w-4" />
                            <span>{room.activeUsers} active</span>
                          </div>
                          <div className="w-3 h-3 bg-green-400 rounded-full ml-auto"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-center py-8">No chat rooms available.</p>
                )}

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <Button className="w-full bg-accent text-white hover:bg-accent/90">
                    Start 1-on-1 Chat
                  </Button>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    Coming soon - Direct peer support connections
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Features */}
          <div>
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Shield className="text-primary h-6 w-6" />
                    <h4 className="text-lg font-semibold text-gray-900">Complete Anonymity</h4>
                  </div>
                  <p className="text-gray-600">
                    No registration required. No personal information stored.
                    Your conversations are private and secure.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Clock className="text-secondary h-6 w-6" />
                    <h4 className="text-lg font-semibold text-gray-900">24/7 Availability</h4>
                  </div>
                  <p className="text-gray-600">
                    Someone is always here to listen. Connect with peer support
                    whenever you need it most.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Heart className="text-accent h-6 w-6" />
                    <h4 className="text-lg font-semibold text-gray-900">Moderated for Safety</h4>
                  </div>
                  <p className="text-gray-600">
                    Our community guidelines and moderation ensure a safe,
                    supportive environment for everyone.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
