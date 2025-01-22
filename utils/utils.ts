import { redirect } from "next/navigation";

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirect(
  type: "error" | "success",
  path: string,
  message: string
) {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}

// Define TypeScript types for clarity and error-checking
type ResponseType = "error" | "success";

interface ResponseMessage {
  // Depending on usage, you might opt for a more specific typing
  error?: string; // Using string to hold the error message if needed
  success?: string; // Using string to hold the success message if needed
}

// The function returnError
export function returnError(
  type: ResponseType,
  message: string
): ResponseMessage {
  if (type === "error") {
    return { error: message };
  } else if (type === "success") {
    return { success: message };
  } else {
    // Fallback or unexpected type, consider what to do here, either throw an error
    throw new Error("Invalid response type provided.");
  }
}
