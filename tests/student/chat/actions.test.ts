/**
 * @fileoverview Unit tests for student chat actions.
 */

// All mocks must come BEFORE importing the tested module

jest.mock("@/database/models/chat-model", () => ({
  ChatModel: {
    findById: jest.fn(),
    create: jest.fn(),
    find: jest.fn().mockReturnThis(),
    sort: jest.fn().mockReturnThis(),
    lean: jest.fn(),
  },
}));

jest.mock("@/database/models/message-model", () => ({
  MessageModel: {
    find: jest.fn().mockReturnThis(),
    create: jest.fn(),
    lean: jest.fn(),
  },
}));

jest.mock("@/lib/api-client", () => ({
  post: jest.fn(),
}));

jest.mock("@/lib/utils", () => ({
  getObjectId: jest.fn(() => "mockedObjectId"),
  firstWords: jest.fn((msg: string) => msg.split(" ").slice(0, 10).join(" ")),
}));

jest.mock("@/lib/constants", () => ({
  ai: { extId: "mockedAIId" },
}));

// Import AFTER all mocks are set up

import {
  sendMessage,
  fetchChatMessages,
  fetchChatsConversations,
} from "@/app/student/chat/actions";

import apiClient from "@/lib/api-client";
import { ChatModel } from "@/database/models/chat-model";
import { MessageModel } from "@/database/models/message-model";
import { getObjectId, firstWords } from "@/lib/utils";
import { ai } from "@/lib/constants";

// ✅ Mock all dependencies
jest.mock("@/lib/api-client");
jest.mock("@/database/models/chat-model");
jest.mock("@/database/models/message-model");
jest.mock("@/lib/utils", () => ({
  getObjectId: jest.fn(() => "mockedObjectId"),
  firstWords: jest.fn((msg: string) => msg.split(" ").slice(0, 10).join(" ")),
}));
jest.mock("@/lib/constants", () => ({
  ai: { extId: "mockedAIId" },
}));

describe("Student Chat Actions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "log").mockImplementation(() => {}); // mute logs
  });

  // --- 1️⃣ sendMessage ---
  describe("sendMessage", () => {
    const payload = {
      chatId: "123",
      studentId: "student1",
      message: "Hello, I have a question about fees",
      isFirst: true,
    };

    it("should create a new chat and handle AI response normally", async () => {
      const mockChat = { _id: "mockChatId", escalated: false };
      const mockAIResponse = {
        data: {
          ai: "Here’s the fee breakdown for you.",
          escalate: "no",
        },
      };

      // Mock ChatModel
      (ChatModel.findById as jest.Mock).mockResolvedValueOnce(null);
      (ChatModel.create as jest.Mock).mockResolvedValueOnce(mockChat);

      // Mock MessageModel
      (MessageModel.create as jest.Mock).mockResolvedValue(undefined);

      // Mock API response
      (apiClient.post as jest.Mock).mockResolvedValueOnce({ data: mockAIResponse });

      await sendMessage(payload);

      // ✅ Chat should be created
      expect(ChatModel.create).toHaveBeenCalledWith({
        _id: "mockedObjectId",
        title: firstWords(payload.message, 10),
        studentId: payload.studentId,
        hasMessages: true,
      });

      // ✅ Student message stored
      expect(MessageModel.create).toHaveBeenCalledWith({
        chatId: mockChat._id,
        text: payload.message,
        senderId: payload.studentId,
        sentBy: "student",
      });

      // ✅ AI query called
      expect(apiClient.post).toHaveBeenCalledWith("/chat/query", {
        message: payload.message,
      });

      // ✅ AI response stored
      expect(MessageModel.create).toHaveBeenCalledWith({
        chatId: mockChat._id,
        text: "Here’s the fee breakdown for you.",
        senderId: "mockedAIId",
        sentBy: "ai",
        endedAI: false,
      });
    });

    it("should mark chat as escalated if AI requests escalation", async () => {
      const mockChat = { _id: "mockChatId", escalated: false };
      const mockAIResponse = {
        data: {
          ai: "Unclear question",
          escalate: "yes",
        },
      };

      (ChatModel.findById as jest.Mock).mockResolvedValueOnce(null);
      (ChatModel.create as jest.Mock).mockResolvedValueOnce(mockChat);
      (MessageModel.create as jest.Mock).mockResolvedValue(undefined);
      (ChatModel.findById as jest.Mock).mockReturnValue({
        updateOne: jest.fn().mockResolvedValue(undefined),
      });
      (apiClient.post as jest.Mock).mockResolvedValueOnce({ data: mockAIResponse });

      await sendMessage(payload);

      // ✅ Should mark as escalated
      expect(ChatModel.findById).toHaveBeenCalledWith("mockChatId");
      expect(MessageModel.create).toHaveBeenCalledWith({
        chatId: mockChat._id,
        text:
          "Sorry, I don't have enough information to answer this question. I will disconnect now and connect you to a Support Agent",
        senderId: "mockedAIId",
        sentBy: "ai",
        endedAI: true,
      });
    });

    it("should throw error if chat creation fails", async () => {
      (ChatModel.findById as jest.Mock).mockResolvedValueOnce(null);
      (ChatModel.create as jest.Mock).mockResolvedValueOnce(null);

      await expect(sendMessage(payload)).rejects.toThrow("Unable to create chat");
    });
  });

  // --- 2️⃣ fetchChatMessages ---
  describe("fetchChatMessages", () => {
    it("should return mapped messages correctly", async () => {
      const mockRecords = [
        {
          _id: "1",
          chatId: "mockedChat",
          text: "Hi",
          senderId: "student",
          sentBy: "student",
        },
      ];

      (MessageModel.find as jest.Mock).mockReturnValueOnce({
        lean: jest.fn().mockResolvedValueOnce(mockRecords),
      });

      const result = await fetchChatMessages("chat1");

      expect(MessageModel.find).toHaveBeenCalledWith({
        chatId: "mockedObjectId",
      });
      expect(result).toEqual([
        {
          _id: "1",
          chatId: "mockedChat",
          text: "Hi",
          senderId: "student",
          sentBy: "student",
        },
      ]);
    });

    it("should return empty array if chatId is null", async () => {
      const result = await fetchChatMessages(null);
      expect(result).toEqual([]);
    });
  });

  // --- 3️⃣ fetchChatsConversations ---
  describe("fetchChatsConversations", () => {
    it("should fetch and map conversations", async () => {
      const mockRecords = [
        { _id: "1", title: "Fee info", studentId: "s1" },
      ];

      (ChatModel.find as jest.Mock).mockReturnValueOnce({
        sort: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValueOnce(mockRecords),
      });

      const result = await fetchChatsConversations("s1");

      expect(ChatModel.find).toHaveBeenCalledWith({ studentId: "s1" });
      expect(result).toEqual([
        { _id: "1", title: "Fee info", studentId: "s1" },
      ]);
    });
  });
});
