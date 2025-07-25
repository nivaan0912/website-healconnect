import { 
  type Therapist, type InsertTherapist,
  type BlogPost, type InsertBlogPost,
  type BlogComment, type InsertBlogComment,
  type ChatRoom, type InsertChatRoom,
  type ChatMessage, type InsertChatMessage
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Therapists
  getTherapists(): Promise<Therapist[]>;
  getTherapist(id: string): Promise<Therapist | undefined>;
  createTherapist(therapist: InsertTherapist): Promise<Therapist>;
  
  // Blog Posts
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  likeBlogPost(id: string): Promise<BlogPost | undefined>;
  
  // Blog Comments
  getBlogComments(postId: string): Promise<BlogComment[]>;
  createBlogComment(comment: InsertBlogComment): Promise<BlogComment>;
  
  // Chat Rooms
  getChatRooms(): Promise<ChatRoom[]>;
  getChatRoom(id: string): Promise<ChatRoom | undefined>;
  createChatRoom(room: InsertChatRoom): Promise<ChatRoom>;
  updateChatRoomUsers(id: string, activeUsers: number): Promise<ChatRoom | undefined>;
  
  // Chat Messages
  getChatMessages(roomId: string): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
}

export class MemStorage implements IStorage {
  private therapists: Map<string, Therapist>;
  private blogPosts: Map<string, BlogPost>;
  private blogComments: Map<string, BlogComment>;
  private chatRooms: Map<string, ChatRoom>;
  private chatMessages: Map<string, ChatMessage>;

  constructor() {
    this.therapists = new Map();
    this.blogPosts = new Map();
    this.blogComments = new Map();
    this.chatRooms = new Map();
    this.chatMessages = new Map();
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Sample therapists
    const sampleTherapists: InsertTherapist[] = [
      {
        name: "Dr. Sarah Johnson",
        specialty: "Anxiety & Depression Specialist",
        education: "PhD in Clinical Psychology",
        experience: "8 years experience",
        rating: "4.9 (127 reviews)",
        email: "contact@example.com",
        phone: "(555) 123-4567",
        bio: "Dr. Johnson specializes in cognitive behavioral therapy and has extensive experience helping clients manage anxiety and depression.",
        imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400"
      },
      {
        name: "Dr. Michael Chen",
        specialty: "Relationship & Family Therapy",
        education: "MA in Marriage & Family Therapy",
        experience: "12 years experience",
        rating: "4.8 (89 reviews)",
        email: "contact@example.com",
        phone: "(555) 234-5678",
        bio: "Dr. Chen focuses on relationship dynamics and family systems therapy, helping couples and families build stronger connections.",
        imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400"
      },
      {
        name: "Dr. Emily Rodriguez",
        specialty: "Trauma & PTSD Specialist",
        education: "PsyD in Clinical Psychology",
        experience: "15 years experience",
        rating: "5.0 (156 reviews)",
        email: "contact@example.com",
        phone: "(555) 345-6789",
        bio: "Dr. Rodriguez specializes in trauma-informed therapy and EMDR, helping clients heal from traumatic experiences.",
        imageUrl: "https://images.unsplash.com/photo-1594824709602-7b64f4c78ded?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400"
      }
    ];

    sampleTherapists.forEach(therapist => {
      this.createTherapist(therapist);
    });

    // Sample chat rooms
    const sampleChatRooms: InsertChatRoom[] = [
      {
        name: "Anxiety Support Circle",
        description: "A safe space to discuss anxiety and coping strategies"
      },
      {
        name: "Depression Recovery",
        description: "Share experiences and find hope together"
      },
      {
        name: "General Support",
        description: "Open conversation for any topic"
      }
    ];

    sampleChatRooms.forEach(room => {
      this.createChatRoom(room);
    });
  }

  // Therapists
  async getTherapists(): Promise<Therapist[]> {
    return Array.from(this.therapists.values());
  }

  async getTherapist(id: string): Promise<Therapist | undefined> {
    return this.therapists.get(id);
  }

  async createTherapist(insertTherapist: InsertTherapist): Promise<Therapist> {
    const id = randomUUID();
    const therapist: Therapist = { ...insertTherapist, id };
    this.therapists.set(id, therapist);
    return therapist;
  }

  // Blog Posts
  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = randomUUID();
    const post: BlogPost = { 
      ...insertPost, 
      id, 
      likes: 0, 
      createdAt: new Date() 
    };
    this.blogPosts.set(id, post);
    return post;
  }

  async likeBlogPost(id: string): Promise<BlogPost | undefined> {
    const post = this.blogPosts.get(id);
    if (post) {
      const updatedPost = { ...post, likes: (post.likes || 0) + 1 };
      this.blogPosts.set(id, updatedPost);
      return updatedPost;
    }
    return undefined;
  }

  // Blog Comments
  async getBlogComments(postId: string): Promise<BlogComment[]> {
    return Array.from(this.blogComments.values())
      .filter(comment => comment.postId === postId)
      .sort((a, b) => new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime());
  }

  async createBlogComment(insertComment: InsertBlogComment): Promise<BlogComment> {
    const id = randomUUID();
    const comment: BlogComment = { 
      ...insertComment, 
      id, 
      createdAt: new Date() 
    };
    this.blogComments.set(id, comment);
    return comment;
  }

  // Chat Rooms
  async getChatRooms(): Promise<ChatRoom[]> {
    return Array.from(this.chatRooms.values()).filter(room => room.isActive);
  }

  async getChatRoom(id: string): Promise<ChatRoom | undefined> {
    return this.chatRooms.get(id);
  }

  async createChatRoom(insertRoom: InsertChatRoom): Promise<ChatRoom> {
    const id = randomUUID();
    const room: ChatRoom = { 
      ...insertRoom, 
      id, 
      activeUsers: Math.floor(Math.random() * 20) + 5, // Random active users for demo
      isActive: true 
    };
    this.chatRooms.set(id, room);
    return room;
  }

  async updateChatRoomUsers(id: string, activeUsers: number): Promise<ChatRoom | undefined> {
    const room = this.chatRooms.get(id);
    if (room) {
      const updatedRoom = { ...room, activeUsers };
      this.chatRooms.set(id, updatedRoom);
      return updatedRoom;
    }
    return undefined;
  }

  // Chat Messages
  async getChatMessages(roomId: string): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter(message => message.roomId === roomId)
      .sort((a, b) => new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime());
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = randomUUID();
    const message: ChatMessage = { 
      ...insertMessage, 
      id, 
      createdAt: new Date() 
    };
    this.chatMessages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
