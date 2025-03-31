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

export default function PerformancePage() {
  const [queryOptimization, setQueryOptimization] = useState("")
  const [schemaOptimization, setSchemaOptimization] = useState("")
  const [monitoring, setMonitoring] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    // Load saved data when component mounts
    setQueryOptimization(loadFromLocalStorage("performance_query", ""))
    setSchemaOptimization(loadFromLocalStorage("performance_schema", ""))
    setMonitoring(loadFromLocalStorage("performance_monitoring", ""))
  }, [])

  const saveQueryOptimization = () => {
    saveToLocalStorage("performance_query", queryOptimization)
    toast({
      title: "Query optimization saved",
      description: "Your query optimization strategy has been saved successfully.",
    })
  }

  const saveSchemaOptimization = () => {
    saveToLocalStorage("performance_schema", schemaOptimization)
    toast({
      title: "Schema optimization saved",
      description: "Your schema optimization strategy has been saved successfully.",
    })
  }

  const saveMonitoring = () => {
    saveToLocalStorage("performance_monitoring", monitoring)
    toast({
      title: "Monitoring saved",
      description: "Your performance monitoring strategy has been saved successfully.",
    })
  }

  return (
    <MainLayout>
      <div className="grid gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Performance Optimization</h1>
          <p className="text-muted-foreground mt-2">
            Optimize the database for performance by analyzing query patterns and tuning configurations
          </p>
        </div>

        <Tabs defaultValue="query">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="query">Query Optimization</TabsTrigger>
            <TabsTrigger value="schema">Schema Optimization</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          </TabsList>

          <TabsContent value="query" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Query Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Optimize database queries for better performance:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Identify and optimize slow queries</li>
                    <li>Use appropriate indexes</li>
                    <li>Optimize JOIN operations</li>
                    <li>Use query hints when necessary</li>
                    <li>Implement pagination for large result sets</li>
                  </ul>
                </p>
                <Textarea
                  placeholder="Document your query optimization strategies..."
                  className="min-h-[200px]"
                  value={queryOptimization}
                  onChange={(e) => setQueryOptimization(e.target.value)}
                />
                <div className="flex justify-end mt-4">
                  <Button onClick={saveQueryOptimization}>Save</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schema" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Schema Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Optimize the database schema for better performance:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Use appropriate data types</li>
                    <li>Normalize or denormalize as needed</li>
                    <li>Implement table partitioning</li>
                    <li>Use efficient storage engines</li>
                    <li>Optimize table structure and relationships</li>
                  </ul>
                </p>
                <Textarea
                  placeholder="Document your schema optimization strategies..."
                  className="min-h-[200px]"
                  value={schemaOptimization}
                  onChange={(e) => setSchemaOptimization(e.target.value)}
                />
                <div className="flex justify-end mt-4">
                  <Button onClick={saveSchemaOptimization}>Save</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Implement monitoring to identify and address performance issues:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Monitor query performance</li>
                    <li>Track resource utilization</li>
                    <li>Set up alerts for performance thresholds</li>
                    <li>Implement regular performance reviews</li>
                    <li>Use database profiling tools</li>
                  </ul>
                </p>
                <Textarea
                  placeholder="Document your performance monitoring strategies..."
                  className="min-h-[200px]"
                  value={monitoring}
                  onChange={(e) => setMonitoring(e.target.value)}
                />
                <div className="flex justify-end mt-4">
                  <Button onClick={saveMonitoring}>Save</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="h-[400px]">
          <AIChat context="You are on the Performance Optimization page. You can help optimize database performance through query optimization, schema optimization, and performance monitoring." />
        </div>
      </div>
    </MainLayout>
  )
}

