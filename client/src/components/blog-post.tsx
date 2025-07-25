import { useState } from "react";
import { type BlogPost } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, User } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface BlogPostProps {
  post: BlogPost;
}

export default function BlogPost({ post }: BlogPostProps) {
  const [liked, setLiked] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const likeMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", `/api/blog-posts/${post.id}/like`);
    },
    onSuccess: () => {
      setLiked(true);
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts"] });
      toast({
        title: "Post liked!",
        description: "Thanks for showing support to the community.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to like the post. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleLike = () => {
    if (!liked) {
      likeMutation.mutate();
    }
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - new Date(date).getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "anxiety":
        return "bg-primary/20 text-primary";
      case "depression":
        return "bg-accent/20 text-accent";
      case "relationships":
        return "bg-secondary/20 text-secondary";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
            <User className="text-white h-5 w-5" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm font-medium text-gray-900">Anonymous User</span>
              <span className="text-sm text-gray-500">
                {post.createdAt ? getTimeAgo(post.createdAt) : "Unknown time"}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(post.category)}`}>
                {post.category}
              </span>
            </div>
            
            <h4 className="text-lg font-medium text-gray-900 mb-3">{post.title}</h4>
            <p className="text-gray-600 mb-4 whitespace-pre-wrap">{post.content}</p>
            
            <div className="flex items-center space-x-6 text-sm">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                disabled={liked || likeMutation.isPending}
                className={`flex items-center space-x-2 ${
                  liked ? "text-red-500" : "text-gray-500 hover:text-red-500"
                }`}
              >
                <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
                <span>{post.likes} likes</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 text-gray-500 hover:text-primary"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Reply</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
