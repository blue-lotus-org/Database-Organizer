"use client"

import { useState, useEffect } from "react"
import MainLayout from "../components/main-layout"
import AIChat from "../components/ai-chat"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { saveToLocalStorage, loadFromLocalStorage } from "../utils/storage"
import { useToast } from "@/components/ui/use-toast"
import { Lightbulb } from "lucide-react"

export default function RequirementsPage() {
  const [entities, setEntities] = useState("")
  const [attributes, setAttributes] = useState("")
  const [relationships, setRelationships] = useState("")
  const [isGeneratingEntities, setIsGeneratingEntities] = useState(false)
  const [isGeneratingAttributes, setIsGeneratingAttributes] = useState(false)
  const [isGeneratingRelationships, setIsGeneratingRelationships] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Load saved data when component mounts
    setEntities(loadFromLocalStorage("requirements_entities", ""))
    setAttributes(loadFromLocalStorage("requirements_attributes", ""))
    setRelationships(loadFromLocalStorage("requirements_relationships", ""))
  }, [])

  const saveEntities = () => {
    saveToLocalStorage("requirements_entities", entities)
    toast({
      title: "Entities saved",
      description: "Your entities have been saved successfully.",
    })
  }

  const saveAttributes = () => {
    saveToLocalStorage("requirements_attributes", attributes)
    toast({
      title: "Attributes saved",
      description: "Your attributes have been saved successfully.",
    })
  }

  const saveRelationships = () => {
    saveToLocalStorage("requirements_relationships", relationships)
    toast({
      title: "Relationships saved",
      description: "Your relationships have been saved successfully.",
    })
  }

  const generateEntitiesSuggestion = async () => {
    setIsGeneratingEntities(true)
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
      const prompt =
        "Suggest common entities for a database design. Format the response as a bulleted list with brief descriptions."

      if (settings.provider === "mistral") {
        response = await callMistralAPI(settings, prompt)
      } else if (settings.provider === "gemini") {
        response = await callGeminiAPI(settings, prompt)
      } else if (settings.provider === "custom") {
        response = await callCustomAPI(settings, prompt)
      } else {
        throw new Error("Unsupported AI provider")
      }

      // Update the entities state with the AI suggestion
      setEntities((prev) => (prev ? `${prev}\n\n${response}` : response))

      toast({
        title: "Entities generated",
        description: "AI has suggested some common entities for your database.",
      })
    } catch (error) {
      console.error("Error generating entities:", error)
      toast({
        title: "Error",
        description: `Failed to generate entities: ${error instanceof Error ? error.message : "Unknown error"}`,
        variant: "destructive",
      })
    } finally {
      setIsGeneratingEntities(false)
    }
  }

  const generateAttributesSuggestion = async () => {
    if (!entities.trim()) {
      toast({
        title: "No entities defined",
        description: "Please define some entities first before generating attributes.",
        variant: "destructive",
      })
      return
    }

    setIsGeneratingAttributes(true)
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
      const prompt = `Based on these entities:\n\n${entities}\n\nSuggest appropriate attributes for each entity. Format the response as a bulleted list grouped by entity.`

      if (settings.provider === "mistral") {
        response = await callMistralAPI(settings, prompt)
      } else if (settings.provider === "gemini") {
        response = await callGeminiAPI(settings, prompt)
      } else if (settings.provider === "custom") {
        response = await callCustomAPI(settings, prompt)
      } else {
        throw new Error("Unsupported AI provider")
      }

      // Update the attributes state with the AI suggestion
      setAttributes((prev) => (prev ? `${prev}\n\n${response}` : response))

      toast({
        title: "Attributes generated",
        description: "AI has suggested attributes for your entities.",
      })
    } catch (error) {
      console.error("Error generating attributes:", error)
      toast({
        title: "Error",
        description: `Failed to generate attributes: ${error instanceof Error ? error.message : "Unknown error"}`,
        variant: "destructive",
      })
    } finally {
      setIsGeneratingAttributes(false)
    }
  }

  const generateRelationshipsSuggestion = async () => {
    if (!entities.trim()) {
      toast({
        title: "No entities defined",
        description: "Please define some entities first before generating relationships.",
        variant: "destructive",
      })
      return
    }

    setIsGeneratingRelationships(true)
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
      const prompt = `Based on these entities:\n\n${entities}\n\nAnd these attributes (if available):\n\n${attributes || "No attributes defined yet."}\n\nSuggest logical relationships between the entities. Include the relationship type (one-to-one, one-to-many, many-to-many) and a brief explanation of each relationship.`

      if (settings.provider === "mistral") {
        response = await callMistralAPI(settings, prompt)
      } else if (settings.provider === "gemini") {
        response = await callGeminiAPI(settings, prompt)
      } else if (settings.provider === "custom") {
        response = await callCustomAPI(settings, prompt)
      } else {
        throw new Error("Unsupported AI provider")
      }

      // Update the relationships state with the AI suggestion
      setRelationships((prev) => (prev ? `${prev}\n\n${response}` : response))

      toast({
        title: "Relationships generated",
        description: "AI has suggested relationships between your entities.",
      })
    } catch (error) {
      console.error("Error generating relationships:", error)
      toast({
        title: "Error",
        description: `Failed to generate relationships: ${error instanceof Error ? error.message : "Unknown error"}`,
        variant: "destructive",
      })
    } finally {
      setIsGeneratingRelationships(false)
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
          { role: "system", content: "You are a helpful database design assistant." },
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
          { role: "system", content: "You are a helpful database design assistant." },
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
          <h1 className="text-3xl font-bold tracking-tight">Requirements Analysis</h1>
          <p className="text-muted-foreground mt-2">Understand the data requirements of your application or system</p>
        </div>

        <Tabs defaultValue="entities">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="entities">Entities</TabsTrigger>
            <TabsTrigger value="attributes">Attributes</TabsTrigger>
            <TabsTrigger value="relationships">Relationships</TabsTrigger>
          </TabsList>

          <TabsContent value="entities" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Identify Entities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Entities are objects or concepts that can be identified uniquely in the context of your application.
                  Examples include: Person, Product, Order, etc.
                </p>
                <Textarea
                  placeholder="List the entities for your database..."
                  className="min-h-[150px]"
                  value={entities}
                  onChange={(e) => setEntities(e.target.value)}
                />
                <div className="flex justify-end mt-4 gap-2">
                  <Button variant="outline" onClick={generateEntitiesSuggestion} disabled={isGeneratingEntities}>
                    <Lightbulb className="mr-2 h-4 w-4" />
                    {isGeneratingEntities ? "Generating..." : "Suggest Entities"}
                  </Button>
                  <Button onClick={saveEntities}>Save Entities</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attributes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Define Attributes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Attributes are properties that describe each entity. For example, a Person entity might have
                  attributes like name, age, address, etc.
                </p>
                <Textarea
                  placeholder="Define attributes for your entities..."
                  className="min-h-[150px]"
                  value={attributes}
                  onChange={(e) => setAttributes(e.target.value)}
                />
                <div className="flex justify-end mt-4 gap-2">
                  <Button variant="outline" onClick={generateAttributesSuggestion} disabled={isGeneratingAttributes}>
                    <Lightbulb className="mr-2 h-4 w-4" />
                    {isGeneratingAttributes ? "Generating..." : "Suggest Attributes"}
                  </Button>
                  <Button onClick={saveAttributes}>Save Attributes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="relationships" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Establish Relationships</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Relationships define how entities are connected to each other. Common types include one-to-one,
                  one-to-many, and many-to-many relationships.
                </p>
                <Textarea
                  placeholder="Describe the relationships between your entities..."
                  className="min-h-[150px]"
                  value={relationships}
                  onChange={(e) => setRelationships(e.target.value)}
                />
                <div className="flex justify-end mt-4 gap-2">
                  <Button
                    variant="outline"
                    onClick={generateRelationshipsSuggestion}
                    disabled={isGeneratingRelationships}
                  >
                    <Lightbulb className="mr-2 h-4 w-4" />
                    {isGeneratingRelationships ? "Generating..." : "Suggest Relationships"}
                  </Button>
                  <Button onClick={saveRelationships}>Save Relationships</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="h-[400px]">
          <AIChat context="You are on the Requirements Analysis page. You can help identify entities, attributes, and relationships for database design." />
        </div>
      </div>
    </MainLayout>
  )
}

