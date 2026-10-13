export type FakeMessage = { side: "sent" | "received"; text: string; time?: string };

export function validateMessage(message: FakeMessage): string | null {
  if (!message.text.trim()) return "Message text is required.";
  if (message.text.length > 500) return "Message text must be 500 characters or fewer.";
  return null;
}

export function canAddMessage(messages: FakeMessage[]): boolean { return messages.length < 30; }
