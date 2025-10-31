/**
 * @fileoverview Unit tests for admin/chat/actions.ts
 */

// tests/admin/chat/actions.test.ts
jest.mock("@/database/models/source-model", () => ({
  SourceModel: {
    insertMany: jest.fn(),
    create: jest.fn(),
    deleteOne: jest.fn(),
    find: jest.fn().mockReturnThis(),
    sort: jest.fn().mockReturnThis(),
    lean: jest.fn(),
  },
}));

jest.mock("@/database/models/chat-model", () => ({
  ChatModel: {
    find: jest.fn().mockReturnThis(),
    sort: jest.fn().mockReturnThis(),
    lean: jest.fn(),
  },
}));

jest.mock("@/database/models/message-model", () => ({
  MessageModel: {
    find: jest.fn().mockReturnThis(),
    sort: jest.fn().mockReturnThis(),
    lean: jest.fn(),
    create: jest.fn(),
  },
}));


import {
  addFilesAction,
  addWebsiteAction,
  deleteSourceAction,
  fetchSourcesAction
} from "@/app/admin/chat/actions";

import apiClient from "@/lib/api-client";
import { SourceModel } from "@/database/models/source-model";
import { getObjectId } from "@/lib/utils";

// ✅ Mock dependencies
jest.mock("@/lib/api-client");
jest.mock("@/database/models/source-model");
jest.mock("@/lib/utils", () => ({
  getObjectId: jest.fn(() => "mockedObjectId"),
}));

describe("Admin Chat Actions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // --- 1. addFilesAction ---
  describe("addFilesAction", () => {
    it("should upload files and insert them into the SourceModel", async () => {
      const mockResponse = {
        data: [
          { unique_id: "id1", file_name: "test1.pdf", file_type: "pdf" },
          { unique_id: "id2", file_name: "test2.docx", file_type: "docx" },
        ],
      };

      (apiClient.post as jest.Mock).mockResolvedValueOnce({ data: mockResponse });
      (SourceModel.insertMany as jest.Mock).mockResolvedValueOnce(undefined);

      const formData = new FormData();
      const result = await addFilesAction(formData);

      expect(apiClient.post).toHaveBeenCalledWith("/upload/files", formData);
      expect(SourceModel.insertMany).toHaveBeenCalledWith([
        { sourceId: "id1", sourceName: "test1.pdf", sourceType: "pdf" },
        { sourceId: "id2", sourceName: "test2.docx", sourceType: "docx" },
      ]);
      expect(result).toEqual(mockResponse);
    });

    it("should throw if the API call fails", async () => {
      (apiClient.post as jest.Mock).mockRejectedValueOnce(new Error("Upload error"));
      const formData = new FormData();
      await expect(addFilesAction(formData)).rejects.toThrow("Upload error");
    });
  });

  // --- 2. addWebsiteAction ---
  describe("addWebsiteAction", () => {
    it("should upload website link and save to SourceModel", async () => {
      const mockResponse = { data: { unique_id: "abc123" } };
      (apiClient.post as jest.Mock).mockResolvedValueOnce({ data: mockResponse });
      (SourceModel.create as jest.Mock).mockResolvedValueOnce(undefined);

      const link = "https://www.mun.ca/finance/fees";
      const result = await addWebsiteAction(link);

      expect(apiClient.post).toHaveBeenCalledWith("/upload/website", { link });
      expect(SourceModel.create).toHaveBeenCalledWith({
        _id: "mockedObjectId",
        sourceId: "abc123",
        sourceName: link,
        sourceType: "website",
      });
      expect(result).toEqual(mockResponse);
    });
  });

  // --- 3. deleteSourceAction ---
  describe("deleteSourceAction", () => {
    it("should delete source by sourceId", async () => {
      (SourceModel.deleteOne as jest.Mock).mockResolvedValueOnce(undefined);
      const result = await deleteSourceAction("id1");

      expect(SourceModel.deleteOne).toHaveBeenCalledWith({ sourceId: "id1" });
      expect(result).toEqual({ message: "Deleted Successfully" });
    });
  });

  // --- 4. fetchSourcesAction ---
  describe("fetchSourcesAction", () => {
    it("should fetch and map sources correctly", async () => {
      const mockRecords = [
        { _id: "obj1", sourceId: "s1", sourceName: "file1", sourceType: "pdf" },
      ];

      (SourceModel.find as jest.Mock).mockReturnValueOnce({
        sort: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValueOnce(mockRecords),
      });

      const result = await fetchSourcesAction();

      expect(SourceModel.find).toHaveBeenCalled();
      expect(result).toEqual([
        { _id: "obj1", sourceId: "s1", sourceName: "file1", sourceType: "pdf" },
      ]);
    });
  });
});
