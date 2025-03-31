"use client"

import { useState, useEffect } from "react"
import MainLayout from "../components/main-layout"
import AIChat from "../components/ai-chat"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { saveToLocalStorage, loadFromLocalStorage } from "../utils/storage"
import { useToast } from "@/components/ui/use-toast"
import { Lightbulb } from "lucide-react"

export default function LogicalDesignPage() {
  const [schema, setSchema] = useState("")
  const [tables, setTables] = useState(`CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Add more tables here...`)
  const [constraints, setConstraints] = useState("")
  const [isGeneratingTables, setIsGeneratingTables] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Load saved data when component mounts
    setSchema(loadFromLocalStorage("logical_schema", ""))
    setTables(loadFromLocalStorage("logical_tables", tables))
    setConstraints(loadFromLocalStorage("logical_constraints", ""))
  }, [])

  const saveSchema = () => {
    saveToLocalStorage("logical_schema", schema)
    toast({
      title: "Schema saved",
      description: "Your database schema has been saved successfully.",
    })
  }

  const saveTables = () => {
    saveToLocalStorage("logical_tables", tables)
    toast({
      title: "Tables saved",
      description: "Your table definitions have been saved successfully.",
    })
  }

  const saveConstraints = () => {
    saveToLocalStorage("logical_constraints", constraints)
    toast({
      title: "Constraints saved",
      description: "Your constraint definitions have been saved successfully.",
    })
  }

  const generateTablesWithAI = async () => {
    // Get entities and attributes from localStorage
    const entities = loadFromLocalStorage("requirements_entities", "")
    const attributes = loadFromLocalStorage("requirements_attributes", "")
    const relationships = loadFromLocalStorage("requirements_relationships", "")

    if (!entities) {
      toast({
        title: "No entities defined",
        description: "Please define entities in the Requirements Analysis page first.",
        variant: "destructive",
      })
      return
    }

    setIsGeneratingTables(true)
    try {
      // Get AI settings from localStorage
      const settings = loadFromLocalStorage("aiSettings")
      if (!settings || !settings.apiKey) {
        toast({
          title: "AI settings not found",
          description: "Please configure your AI settings first.",
          variant: "destructive",
        })
        return
      }

      // Call the appropriate API based on the provider
      let response
      const prompt = `Based on the following database design information, generate SQL CREATE TABLE statements with appropriate data types, primary keys, foreign keys, and constraints:

Entities:
${entities}

Attributes:
${attributes || "No specific attributes defined."}

Relationships:
${relationships || "No specific relationships defined."}

Schema Description:
${schema || "No specific schema description provided."}

Please generate complete SQL statements that follow best practices for database design. Include appropriate indexes, constraints, and comments.`

      if (settings.provider === "mistral") {
        response = await callMistralAPI(settings, prompt)
      } else if (settings.provider === "gemini") {
        response = await callGeminiAPI(settings, prompt)
      } else if (settings.provider === "custom") {
        response = await callCustomAPI(settings, prompt)
      } else {
        throw new Error("Unsupported AI provider")
      }

      // Update the tables state with the AI-generated SQL
      setTables(response)

      toast({
        title: "SQL generated",
        description: "AI has generated SQL CREATE TABLE statements based on your requirements.",
      })
    } catch (error) {
      console.error("Error generating SQL:", error)
      toast({
        title: "Error",
        description: `Failed to generate SQL: ${error instanceof Error ? error.message : "Unknown error"}`,
        variant: "destructive",
      })
    } finally {
      setIsGeneratingTables(false)
    }
  }

  // Function to call Mistral API
  const callMistralAPI = async (settings: any, prompt: string) => {
    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${settings.apiKey}`,
      },
      body: JSON.stringify({
        model: settings.model,
        messages: [
          {
            role: "system",
            content:
              "You are a database expert who specializes in SQL. Generate clean, well-formatted SQL code with appropriate comments.",
          },
          { role: "user", content: prompt },
        ],
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
  const callGeminiAPI = async (settings: any, prompt: string) => {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/${settings.model}:generateContent?key=${settings.apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
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
  const callCustomAPI = async (settings: any, prompt: string) => {
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
        messages: [
          {
            role: "system",
            content:
              "You are a database expert who specializes in SQL. Generate clean, well-formatted SQL code with appropriate comments.",
          },
          { role: "user", content: prompt },
        ],
        temperature: settings.temperature,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(`Custom API error: ${response.status} ${JSON.stringify(errorData)}`)
    }

    const data = await response.json()
    return data.choices?.[0]?.message?.content || data.response || "No response from API"
  }

  return (
    <MainLayout>
      <div className="grid gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Logical Design</h1>
          <p className="text-muted-foreground mt-2">
            Translate the conceptual design into a logical model with tables, columns, and relationships
          </p>
        </div>

        <Tabs defaultValue="schema">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="schema">Schema Definition</TabsTrigger>
            <TabsTrigger value="tables">Tables & Columns</TabsTrigger>
            <TabsTrigger value="constraints">Constraints</TabsTrigger>
          </TabsList>

          <TabsContent value="schema" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Schema Definition</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Define your database schema, including the overall structure and organization of your database.
                </p>
                <Textarea
                  placeholder="Define your database schema..."
                  className="min-h-[200px]"
                  value={schema}
                  onChange={(e) => setSchema(e.target.value)}
                />
                <div className="flex justify-end mt-4">
                  <Button onClick={saveSchema}>Save Schema</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tables" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tables & Columns</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Define the tables and columns in your database, including data types and default values.
                </p>
                <Textarea
                  className="font-mono text-sm min-h-[300px] w-full"
                  value={tables}
                  onChange={(e) => setTables(e.target.value)}
                />
                <div className="flex justify-end mt-4 gap-2">
                  <Button variant="outline" onClick={generateTablesWithAI} disabled={isGeneratingTables}>
                    <Lightbulb className="mr-2 h-4 w-4" />
                    {isGeneratingTables ? "Generating..." : "Generate with AI"}
                  </Button>
                  <Button onClick={saveTables}>Save Tables</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="constraints" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Constraints</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Define constraints such as primary keys, foreign keys, unique constraints, and check constraints.
                </p>
                <Textarea
                  placeholder="Define your database constraints..."
                  className="min-h-[200px]"
                  value={constraints}
                  onChange={(e) => setConstraints(e.target.value)}
                />
                <div className="flex justify-end mt-4">
                  <Button onClick={saveConstraints}>Save Constraints</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="h-[400px]">
          <AIChat context="You are on the Logical Design page. You can help create database schemas, define tables and columns, and establish constraints." />
        </div>
      </div>
    </MainLayout>
  )
}

