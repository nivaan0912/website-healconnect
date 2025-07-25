import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { 
  insertBlogPostSchema, 
  insertBlogCommentSchema, 
  insertChatMessageSchema 
} from "@shared/schema";
import { randomUUID } from "crypto";

// Store active WebSocket connections
const wsConnections = new Map<string, { ws: WebSocket; roomId?: string; userId: string }>();

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // Therapists routes
  app.get("/api/therapists", async (req, res) => {
    try {
      const therapists = await storage.getTherapists();
      res.json(therapists);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch therapists" });
    }
  });

  app.get("/api/therapists/:id", async (req, res) => {
    try {
      const therapist = await storage.getTherapist(req.params.id);
      if (!therapist) {
        return res.status(404).json({ message: "Therapist not found" });
      }
      res.json(therapist);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch therapist" });
    }
  });

  // Blog posts routes
  app.get("/api/blog-posts", async (req, res) => {
    try {
      const posts = await storage.getBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.post("/api/blog-posts", async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse({
        ...req.body,
        authorId: randomUUID() // Generate anonymous user ID
      });
      const post = await storage.createBlogPost(validatedData);
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ message: "Invalid blog post data" });
    }
  });

  app.post("/api/blog-posts/:id/like", async (req, res) => {
    try {
      const post = await storage.likeBlogPost(req.params.id);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to like post" });
    }
  });

  // Blog comments routes
  app.get("/api/blog-posts/:postId/comments", async (req, res) => {
    try {
      const comments = await storage.getBlogComments(req.params.postId);
      res.json(comments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch comments" });
    }
  });

  app.post("/api/blog-posts/:postId/comments", async (req, res) => {
    try {
      const validatedData = insertBlogCommentSchema.parse({
        ...req.body,
        postId: req.params.postId,
        authorId: randomUUID() // Generate anonymous user ID
      });
      const comment = await storage.createBlogComment(validatedData);
      res.status(201).json(comment);
    } catch (error) {
      res.status(400).json({ message: "Invalid comment data" });
    }
  });

  // Chat rooms routes
  app.get("/api/chat-rooms", async (req, res) => {
    try {
      const rooms = await storage.getChatRooms();
      res.json(rooms);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch chat rooms" });
    }
  });

  app.get("/api/chat-rooms/:roomId/messages", async (req, res) => {
    try {
      const messages = await storage.getChatMessages(req.params.roomId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  // WebSocket server for real-time chat
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

  wss.on('connection', (ws: WebSocket) => {
    const connectionId = randomUUID();
    const userId = randomUUID(); // Anonymous user ID
    
    wsConnections.set(connectionId, { ws, userId });

    ws.on('message', async (data: Buffer) => {
      try {
        const message = JSON.parse(data.toString());
        
        if (message.type === 'join-room') {
          const connection = wsConnections.get(connectionId);
          if (connection) {
            connection.roomId = message.roomId;
            wsConnections.set(connectionId, connection);
            
            // Send recent messages to the new user
            const recentMessages = await storage.getChatMessages(message.roomId);
            ws.send(JSON.stringify({
              type: 'recent-messages',
              messages: recentMessages.slice(-20) // Last 20 messages
            }));
          }
        }
        
        if (message.type === 'send-message' && message.roomId && message.content) {
          const validatedData = insertChatMessageSchema.parse({
            roomId: message.roomId,
            content: message.content,
            authorId: userId
          });
          
          const chatMessage = await storage.createChatMessage(validatedData);
          
          // Broadcast message to all users in the same room
          wsConnections.forEach((connection, id) => {
            if (connection.roomId === message.roomId && connection.ws.readyState === WebSocket.OPEN) {
              connection.ws.send(JSON.stringify({
                type: 'new-message',
                message: chatMessage
              }));
            }
          });
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    });

    ws.on('close', () => {
      wsConnections.delete(connectionId);
    });
  });

  return httpServer;
}
