export interface Message {
  type: "error" | "success";
  content: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
}

export interface RegisterProps {
  searchParams: Promise<Message>;
}