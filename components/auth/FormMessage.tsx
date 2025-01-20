export type Message =
  | { success: string }
  | { error: string }
  | { message: string };

export function FormMessage({ message }: { message: Message }) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-md text-sm mt-2 text-justify">
      {"success" in message && (
        <div className="text-white border-l-2 border-white px-4 bg-[#67007a]">
          {message.success}
        </div>
      )}
      {"error" in message && (
        <div className="border-l-2 border-white px-4 text-white bg-[#c5220d">
          {message.error}
        </div>
      )}
      {"message" in message && (
        <div className="text-#c5220d border-l-2 px-4">{message.message}</div>
      )}
    </div>
  );
}
