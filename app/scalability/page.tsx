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

export default function ScalabilityPage() {
  const [verticalScaling, setVerticalScaling] = useState("")
  const [horizontalScaling, setHorizontalScaling] = useState("")
  const [partitioning, setPartitioning] = useState("")
  const [caching, setCaching] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    // Load saved data when component mounts
    setVerticalScaling(loadFromLocalStorage("scalability_vertical", ""))
    setHorizontalScaling(loadFromLocalStorage("scalability_horizontal", ""))
    setPartitioning(loadFromLocalStorage("scalability_partitioning", ""))
    setCaching(loadFromLocalStorage("scalability_caching", ""))
  }, [])

  const saveVerticalScaling = () => {
    saveToLocalStorage("scalability_vertical", verticalScaling)
    toast({
      title: "Vertical scaling saved",
      description: "Your vertical scaling strategy has been saved successfully.",
    })
  }

  const saveHorizontalScaling = () => {
    saveToLocalStorage("scalability_horizontal", horizontalScaling)
    toast({
      title: "Horizontal scaling saved",
      description: "Your horizontal scaling strategy has been saved successfully.",
    })
  }

  const savePartitioning = () => {
    saveToLocalStorage("scalability_partitioning", partitioning)
    toast({
      title: "Partitioning saved",
      description: "Your partitioning strategy has been saved successfully.",
    })
  }

  const saveCaching = () => {
    saveToLocalStorage("scalability_caching", caching)
    toast({
      title: "Caching saved",
      description: "Your caching strategy has been saved successfully.",
    })
  }

  return (
    <MainLayout>
      <div className="grid gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Scalability</h1>
          <p className="text-muted-foreground mt-2">Design the database to handle growth and increased load</p>
        </div>

        <Tabs defaultValue="vertical">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="vertical">Vertical Scaling</TabsTrigger>
            <TabsTrigger value="horizontal">Horizontal Scaling</TabsTrigger>
            <TabsTrigger value="partitioning">Partitioning</TabsTrigger>
            <TabsTrigger value="caching">Caching</TabsTrigger>
          </TabsList>

          <TabsContent value="vertical" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Vertical Scaling</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Vertical scaling involves adding more resources to a single server:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>CPU upgrades</li>
                    <li>Memory upgrades</li>
                    <li>Storage upgrades</li>
                    <li>Network bandwidth improvements</li>
                  </ul>
                </p>
                <Textarea
                  placeholder="Document your vertical scaling strategy..."
                  className="min-h-[200px]"
                  value={verticalScaling}
                  onChange={(e) => setVerticalScaling(e.target.value)}
                />
                <div className="flex justify-end mt-4">
                  <Button onClick={saveVerticalScaling}>Save</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="horizontal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Horizontal Scaling</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Horizontal scaling involves adding more servers to distribute the load:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Read replicas</li>
                    <li>Sharding</li>
                    <li>Distributed databases</li>
                    <li>Load balancing</li>
                  </ul>
                </p>
                <Textarea
                  placeholder="Document your horizontal scaling strategy..."
                  className="min-h-[200px]"
                  value={horizontalScaling}
                  onChange={(e) => setHorizontalScaling(e.target.value)}
                />
                <div className="flex justify-end mt-4">
                  <Button onClick={saveHorizontalScaling}>Save</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="partitioning" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Partitioning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Partitioning involves dividing large tables into smaller, more manageable pieces:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Horizontal partitioning (sharding)</li>
                    <li>Vertical partitioning</li>
                    <li>Range partitioning</li>
                    <li>Hash partitioning</li>
                  </ul>
                </p>
                <Textarea
                  placeholder="Document your partitioning strategy..."
                  className="min-h-[200px]"
                  value={partitioning}
                  onChange={(e) => setPartitioning(e.target.value)}
                />
                <div className="flex justify-end mt-4">
                  <Button onClick={savePartitioning}>Save</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="caching" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Caching</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Caching involves storing frequently accessed data in memory for faster access:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Database query caching</li>
                    <li>Application-level caching</li>
                    <li>Distributed caching systems</li>
                    <li>Cache invalidation strategies</li>
                  </ul>
                </p>
                <Textarea
                  placeholder="Document your caching strategy..."
                  className="min-h-[200px]"
                  value={caching}
                  onChange={(e) => setCaching(e.target.value)}
                />
                <div className="flex justify-end mt-4">
                  <Button onClick={saveCaching}>Save</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="h-[400px]">
          <AIChat context="You are on the Scalability page. You can help design a scalable database that can handle growth and increased load." />
        </div>
      </div>
    </MainLayout>
  )
}

