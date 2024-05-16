import { useFetch } from "./useFetch";
import { renderHook } from "@testing-library/react-hooks";

describe("useFetch", () => {
  it("should fetch data and set it to the state", async () => {
    const mockUrl = "https://api.example.com/data";
    const { result, waitForNextUpdate } = renderHook(() => useFetch(mockUrl));

    await waitForNextUpdate();

    expect(result.current.data).toBeDefined();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should catch an error and set it to the state", async () => {
    const mockUrl = "https://api.example.com/error";
    const { result, waitForNextUpdate } = renderHook(() => useFetch(mockUrl));

    await waitForNextUpdate();

    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeDefined();
  });

  it("should not re-fetch when the url does not change", async () => {
    const mockUrl = "https://api.example.com/data";
    const { result, waitForNextUpdate } = renderHook(() => useFetch(mockUrl));

    await waitForNextUpdate();

    // Simulate a second render
    const { rerender } = renderHook(() => useFetch(mockUrl), {
      initialProps: {
        url: mockUrl,
      },
    });

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.data).toBeDefined();
  });

  it("should fetch data with a different url", async () => {
    const mockUrl1 = "https://api.example.com/data1";
    const mockUrl2 = "https://api.example.com/data2";
    const { result, waitForNextUpdate } = renderHook(() => useFetch(mockUrl1));

    await waitForNextUpdate();

    expect(result.current.data).toBeDefined();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();

    // Simulate a second render with a different url
    const { rerender } = renderHook(() => useFetch(mockUrl2), {
      initialProps: {
        url: mockUrl2,
      },
    });

    await waitForNextUpdate();

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.data).toBeNull();
  });

  it("should handle async errors", async () => {
    const mockUrl = "https://api.example.com/error";
    jest.spyOn(global, "setTimeout").mockImplementation(() => {
      throw new Error("Timeout error");
    });

    const { result, waitForNextUpdate } = renderHook(() => useFetch(mockUrl));

    await waitForNextUpdate();

    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeDefined();
  });
});