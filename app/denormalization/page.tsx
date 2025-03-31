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

export default function DenormalizationPage() {
  const [reasons, setReasons] = useState("")
  const [strategy, setStrategy] = useState("")
  const [implementation, setImplementation] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    // Load saved data when component mounts
    setReasons(loadFromLocalStorage("denormalization_reasons", ""))
    setStrategy(loadFromLocalStorage("denormalization_strategy", ""))
    setImplementation(loadFromLocalStorage("denormalization_implementation", ""))
  }, [])

  const saveReasons = () => {
    saveToLocalStorage("denormalization_reasons", reasons)
    toast({
      title: "Reasons saved",
      description: "Your denormalization reasons have been saved successfully.",
    })
  }

  const saveStrategy = () => {
    saveToLocalStorage("denormalization_strategy", strategy)
    toast({
      title: "Strategy saved",
      description: "Your denormalization strategy has been saved successfully.",
    })
  }

  const saveImplementation = () => {
    saveToLocalStorage("denormalization_implementation", implementation)
    toast({
      title: "Implementation saved",
      description: "Your denormalization implementation has been saved successfully.",
    })
  }

  return (
    <MainLayout>
      <div className="grid gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Denormalization</h1>
          <p className="text-muted-foreground mt-2">
            Strategically introduce redundancy to improve performance for read-heavy applications
          </p>
        </div>

        <Tabs defaultValue="reasons">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="reasons">Reasons</TabsTrigger>
            <TabsTrigger value="strategy">Strategy</TabsTrigger>
            <TabsTrigger value="implementation">Implementation</TabsTrigger>
          </TabsList>

          <TabsContent value="reasons" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Reasons for Denormalization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  While normalization helps maintain data integrity, denormalization can be necessary for:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Improving query performance for read-heavy applications</li>
                    <li>Reducing the need for complex joins</li>
                    <li>Supporting specific reporting or analytical requirements</li>
                    <li>Addressing scalability concerns</li>
                  </ul>
                </p>
                <Textarea
                  placeholder="Document your reasons for denormalization..."
                  className="min-h-[200px]"
                  value={reasons}
                  onChange={(e) => setReasons(e.target.value)}
                />
                <div className="flex justify-end mt-4 gap-2">
                  <Button variant="outline">Analyze with AI</Button>
                  <Button onClick={saveReasons}>Save</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="strategy" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Denormalization Strategy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Common denormalization strategies include:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Adding redundant columns to avoid joins</li>
                    <li>Creating summary tables for reporting</li>
                    <li>Combining tables that are frequently joined</li>
                    <li>Using materialized views</li>
                  </ul>
                </p>
                <Textarea
                  placeholder="Document your denormalization strategy..."
                  className="min-h-[200px]"
                  value={strategy}
                  onChange={(e) => setStrategy(e.target.value)}
                />
                <div className="flex justify-end mt-4 gap-2">
                  <Button variant="outline">Suggest with AI</Button>
                  <Button onClick={saveStrategy}>Save</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="implementation" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Implementation Details</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Document the specific changes you'll make to denormalize your database, including:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Which tables will be modified</li>
                    <li>What redundant data will be added</li>
                    <li>How data consistency will be maintained</li>
                    <li>Expected performance improvements</li>
                  </ul>
                </p>
                <Textarea
                  placeholder="Document your denormalization implementation details..."
                  className="min-h-[200px]"
                  value={implementation}
                  onChange={(e) => setImplementation(e.target.value)}
                />
                <div className="flex justify-end mt-4">
                  <Button onClick={saveImplementation}>Save</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="h-[400px]">
          <AIChat context="You are on the Denormalization page. You can help identify when denormalization is appropriate and suggest strategies for implementing it effectively." />
        </div>
      </div>
    </MainLayout>
  )
}

