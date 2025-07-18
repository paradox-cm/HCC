export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export interface ChatSession {
  id: string
  messages: ChatMessage[]
  createdAt: Date
  updatedAt: Date
}

const CHAT_STORAGE_KEY = "hcc-chat-session"

export class ChatStorage {
  static getCurrentSession(): ChatSession | null {
    if (typeof window === "undefined") return null

    try {
      const stored = localStorage.getItem(CHAT_STORAGE_KEY)
      if (!stored) return null

      const session = JSON.parse(stored)
      // Convert date strings back to Date objects
      session.createdAt = new Date(session.createdAt)
      session.updatedAt = new Date(session.updatedAt)
      session.messages = session.messages.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      }))

      return session
    } catch (error) {
      console.error("Error loading chat session:", error)
      return null
    }
  }

  static saveSession(session: ChatSession): void {
    if (typeof window === "undefined") return

    try {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(session))
    } catch (error) {
      console.error("Error saving chat session:", error)
    }
  }

  static addMessage(message: Omit<ChatMessage, "id" | "timestamp">): ChatSession {
    let session = this.getCurrentSession()

    if (!session) {
      session = {
        id: `chat-${Date.now()}`,
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    }

    const newMessage: ChatMessage = {
      ...message,
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
    }

    session.messages.push(newMessage)
    session.updatedAt = new Date()

    this.saveSession(session)
    return session
  }

  static clearSession(): void {
    if (typeof window === "undefined") return
    localStorage.removeItem(CHAT_STORAGE_KEY)
  }

  static exportSession(): string {
    const session = this.getCurrentSession()
    if (!session) return "No chat history to export."

    let exportText = `Chat Session Export\n`
    exportText += `Created: ${session.createdAt.toLocaleString()}\n`
    exportText += `Last Updated: ${session.updatedAt.toLocaleString()}\n`
    exportText += `\n${"=".repeat(50)}\n\n`

    session.messages.forEach((message) => {
      const role = message.role === "user" ? "You" : "HCC Assistant"
      const time = message.timestamp.toLocaleTimeString()
      exportText += `[${time}] ${role}: ${message.content}\n\n`
    })

    return exportText
  }
}
