import { addFilesAction } from "@/app/admin/chat/actions"
import apiClient from "@/lib/api-client"

// ✅ Mock the apiClient module
jest.mock("@/lib/api-client")

describe("addFilesAction", () => {
  const mockPost = jest.fn()
  const mockResponse = { data: { success: true, message: "File uploaded" } }

  beforeAll(() => {
    // Tell Jest what the mock should return
    ;(apiClient.post as jest.Mock) = mockPost
  })

  it("should call apiClient.post with the correct URL and form data", async () => {
    const formData = new FormData()
    formData.append("file", new Blob(["mock content"]), "test.txt")

    mockPost.mockResolvedValueOnce(mockResponse)

    const result = await addFilesAction(formData)

    // ✅ Check that apiClient.post was called correctly
    expect(mockPost).toHaveBeenCalledTimes(1)
    expect(mockPost).toHaveBeenCalledWith("/upload/files", formData)

    // ✅ Check that function returned response.data
    expect(result).toEqual(mockResponse.data)
  })

  it("should throw an error if the API call fails", async () => {
    const formData = new FormData()
    const mockError = new Error("Upload failed")

    mockPost.mockRejectedValueOnce(mockError)

    await expect(addFilesAction(formData)).rejects.toThrow("Upload failed")
  })
})
