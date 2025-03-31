"use client"

import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/components/ui/use-toast"
import { loadFromLocalStorage } from "../utils/storage"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface AISettings {
  provider: "mistral" | "gemini" | "custom"
  apiKey: string
  model: string
  temperature: number
  customEndpoint?: string
}

interface AIChatProps {
  context?: string
}

export default function AIChat({ context = "" }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Get AI settings from localStorage
    const settings = loadFromLocalStorage("aiSettings") as AISettings | null
    if (!settings) {
      toast({
        title: "AI settings not found",
        description: "Please configure your AI settings first.",
        variant: "destructive",
      })
      return
    }

    if (!settings.apiKey) {
      toast({
        title: "API key missing",
        description: "Please add your API key in the settings.",
        variant: "destructive",
      })
      return
    }

    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Prepare the conversation history including the context
      const conversationHistory = [
        { role: "system", content: `You are a helpful AI assistant for database design. ${context}` },
        ...messages.map((msg) => ({ role: msg.role, content: msg.content })),
        { role: "user", content: input },
      ]

      // Determine which API to call based on the provider
      let response

      if (settings.provider === "mistral") {
        response = await callMistralAPI(settings, conversationHistory)
      } else if (settings.provider === "gemini") {
        response = await callGeminiAPI(settings, conversationHistory)
      } else if (settings.provider === "custom") {
        response = await callCustomAPI(settings, conversationHistory)
      } else {
        throw new Error("Unsupported AI provider")
      }

      // Add the AI response to the messages
      const aiResponse: Message = {
        role: "assistant",
        content: response,
      }

      setMessages((prev) => [...prev, aiResponse])
    } catch (error) {
      console.error("Error calling AI API:", error)
      toast({
        title: "Error",
        description: `Failed to get AI response: ${error instanceof Error ? error.message : "Unknown error"}`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Function to call Mistral API
  const callMistralAPI = async (settings: AISettings, messages: any[]) => {
    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${settings.apiKey}`,
      },
      body: JSON.stringify({
        model: settings.model,
        messages: messages,
        temperature: settings.temperature,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(`Mistral API error: ${response.status} ${JSON.stringify(errorData)}`)
    }

    const data = await response.json()
    return data.choices[0].message.content
  }

  // Function to call Gemini API
  const callGeminiAPI = async (settings: AISettings, messages: any[]) => {
    // Convert messages to Gemini format
    const geminiMessages = messages.map((msg) => ({
      role: msg.role === "assistant" ? "model" : msg.role,
      parts: [{ text: msg.content }],
    }))

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/${settings.model}:generateContent?key=${settings.apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: geminiMessages,
          generationConfig: {
            temperature: settings.temperature,
          },
        }),
      },
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(`Gemini API error: ${response.status} ${JSON.stringify(errorData)}`)
    }

    const data = await response.json()
    return data.candidates[0].content.parts[0].text
  }

  // Function to call Custom API
  const callCustomAPI = async (settings: AISettings, messages: any[]) => {
    if (!settings.customEndpoint) {
      throw new Error("Custom API endpoint not specified")
    }

    const response = await fetch(settings.customEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${settings.apiKey}`,
      },
      body: JSON.stringify({
        model: settings.model,
        messages: messages,
        temperature: settings.temperature,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(`Custom API error: ${response.status} ${JSON.stringify(errorData)}`)
    }

    const data = await response.json()
    // This assumes the custom API returns a similar format to OpenAI
    // Adjust this based on your custom API's response format
    return data.choices?.[0]?.message?.content || data.response || "No response from API"
  }

  return (
    <div className="flex flex-col h-full border rounded-md">
      <div className="p-3 border-b">
        <h3 className="font-medium">AI Assistant</h3>
      </div>
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              Ask the AI assistant for help with your database design.
            </p>
          ) : (
            messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce delay-75" />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce delay-150" />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="p-3 border-t">
        <div className="flex gap-2">
          <Textarea
            placeholder="Ask the AI assistant..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
            className="min-h-10 resize-none"
          />
          <Button size="icon" onClick={handleSendMessage} disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

