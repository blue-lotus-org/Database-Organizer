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

export default function ConceptualDesignPage() {
  const [entityDefinitions, setEntityDefinitions] = useState("")
  const [diagramNotes, setDiagramNotes] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    // Load saved data when component mounts
    setEntityDefinitions(loadFromLocalStorage("conceptual_entity_definitions", ""))
    setDiagramNotes(loadFromLocalStorage("conceptual_diagram_notes", ""))
  }, [])

  const saveDiagram = () => {
    saveToLocalStorage("conceptual_diagram_notes", diagramNotes)
    toast({
      title: "Diagram notes saved",
      description: "Your diagram notes have been saved successfully.",
    })
  }

  const saveDefinitions = () => {
    saveToLocalStorage("conceptual_entity_definitions", entityDefinitions)
    toast({
      title: "Entity definitions saved",
      description: "Your entity definitions have been saved successfully.",
    })
  }

  return (
    <MainLayout>
      <div className="grid gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Conceptual Design</h1>
          <p className="text-muted-foreground mt-2">
            Create a high-level model of the database using Entity-Relationship diagrams
          </p>
        </div>

        <Tabs defaultValue="er-diagram">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="er-diagram">ER Diagram</TabsTrigger>
            <TabsTrigger value="entity-definitions">Entity Definitions</TabsTrigger>
          </TabsList>

          <TabsContent value="er-diagram" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Entity-Relationship Diagram</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Create an ER diagram to visualize the entities and their relationships. You can use the AI assistant
                  to help generate a diagram based on your requirements.
                </p>
                <div className="border rounded-md p-4 min-h-[300px] flex items-center justify-center bg-muted/50">
                  <p className="text-muted-foreground">ER diagram will be displayed here</p>
                </div>
                <Textarea
                  placeholder="Notes about your ER diagram..."
                  className="min-h-[100px] mt-4"
                  value={diagramNotes}
                  onChange={(e) => setDiagramNotes(e.target.value)}
                />
                <div className="flex justify-end mt-4 gap-2">
                  <Button variant="outline">Generate with AI</Button>
                  <Button onClick={saveDiagram}>Save Diagram</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="entity-definitions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Entity Definitions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Define each entity in detail, including its purpose, attributes, and relationships with other
                  entities. This will serve as documentation for your database design.
                </p>
                <Textarea
                  placeholder="Define your entities in detail..."
                  className="min-h-[200px]"
                  value={entityDefinitions}
                  onChange={(e) => setEntityDefinitions(e.target.value)}
                />
                <div className="flex justify-end mt-4">
                  <Button onClick={saveDefinitions}>Save Definitions</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="h-[400px]">
          <AIChat context="You are on the Conceptual Design page. You can help create ER diagrams and define entities for database design." />
        </div>
      </div>
    </MainLayout>
  )
}

