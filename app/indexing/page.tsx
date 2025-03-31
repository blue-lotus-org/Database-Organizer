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

export default function IndexingPage() {
  const [indexStrategy, setIndexStrategy] = useState("")
  const [indexDefinitions, setIndexDefinitions] = useState("")
  const [indexMaintenance, setIndexMaintenance] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    // Load saved data when component mounts
    setIndexStrategy(loadFromLocalStorage("indexing_strategy", ""))
    setIndexDefinitions(loadFromLocalStorage("indexing_definitions", ""))
    setIndexMaintenance(loadFromLocalStorage("indexing_maintenance", ""))
  }, [])

  const saveIndexStrategy = () => {
    saveToLocalStorage("indexing_strategy", indexStrategy)
    toast({
      title: "Index strategy saved",
      description: "Your indexing strategy has been saved successfully.",
    })
  }

  const saveIndexDefinitions = () => {
    saveToLocalStorage("indexing_definitions", indexDefinitions)
    toast({
      title: "Index definitions saved",
      description: "Your index definitions have been saved successfully.",
    })
  }

  const saveIndexMaintenance = () => {
    saveToLocalStorage("indexing_maintenance", indexMaintenance)
    toast({
      title: "Index maintenance saved",
      description: "Your index maintenance plan has been saved successfully.",
    })
  }

  return (
    <MainLayout>
      <div className="grid gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Indexing</h1>
          <p className="text-muted-foreground mt-2">
            Create indexes to improve query performance and optimize database operations
          </p>
        </div>

        <Tabs defaultValue="strategy">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="strategy">Strategy</TabsTrigger>
            <TabsTrigger value="definitions">Definitions</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          </TabsList>

          <TabsContent value="strategy" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Indexing Strategy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Develop an indexing strategy based on:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Query patterns and frequency</li>
                    <li>Tables with large volumes of data</li>
                    <li>Columns used in WHERE clauses, JOIN conditions, and ORDER BY</li>
                    <li>Balance between read and write operations</li>
                  </ul>
                </p>
                <Textarea
                  placeholder="Document your indexing strategy..."
                  className="min-h-[200px]"
                  value={indexStrategy}
                  onChange={(e) => setIndexStrategy(e.target.value)}
                />
                <div className="flex justify-end mt-4 gap-2">
                  <Button variant="outline">Analyze with AI</Button>
                  <Button onClick={saveIndexStrategy}>Save</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="definitions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Index Definitions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Define the specific indexes for your database, including:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Primary key indexes</li>
                    <li>Foreign key indexes</li>
                    <li>Composite indexes for multi-column queries</li>
                    <li>Unique indexes for enforcing uniqueness</li>
                  </ul>
                </p>
                <Textarea
                  placeholder="CREATE INDEX idx_user_email ON users(email);"
                  className="min-h-[200px] font-mono"
                  value={indexDefinitions}
                  onChange={(e) => setIndexDefinitions(e.target.value)}
                />
                <div className="flex justify-end mt-4 gap-2">
                  <Button variant="outline">Generate with AI</Button>
                  <Button onClick={saveIndexDefinitions}>Save</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="maintenance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Index Maintenance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Plan for ongoing index maintenance:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Regular index rebuilding or reorganization</li>
                    <li>Monitoring index usage and performance</li>
                    <li>Identifying and removing unused indexes</li>
                    <li>Updating statistics for the query optimizer</li>
                  </ul>
                </p>
                <Textarea
                  placeholder="Document your index maintenance plan..."
                  className="min-h-[200px]"
                  value={indexMaintenance}
                  onChange={(e) => setIndexMaintenance(e.target.value)}
                />
                <div className="flex justify-end mt-4">
                  <Button onClick={saveIndexMaintenance}>Save</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="h-[400px]">
          <AIChat context="You are on the Indexing page. You can help develop an indexing strategy, define specific indexes, and plan for index maintenance." />
        </div>
      </div>
    </MainLayout>
  )
}

