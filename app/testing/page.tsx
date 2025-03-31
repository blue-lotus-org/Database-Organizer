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

export default function TestingPage() {
  const [unitTests, setUnitTests] = useState("")
  const [integrationTests, setIntegrationTests] = useState("")
  const [performanceTests, setPerformanceTests] = useState("")
  const [securityTests, setSecurityTests] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    // Load saved data when component mounts
    setUnitTests(loadFromLocalStorage("testing_unit", ""))
    setIntegrationTests(loadFromLocalStorage("testing_integration", ""))
    setPerformanceTests(loadFromLocalStorage("testing_performance", ""))
    setSecurityTests(loadFromLocalStorage("testing_security", ""))
  }, [])

  const saveUnitTests = () => {
    saveToLocalStorage("testing_unit", unitTests)
    toast({
      title: "Unit tests saved",
      description: "Your unit tests have been saved successfully.",
    })
  }

  const saveIntegrationTests = () => {
    saveToLocalStorage("testing_integration", integrationTests)
    toast({
      title: "Integration tests saved",
      description: "Your integration tests have been saved successfully.",
    })
  }

  const savePerformanceTests = () => {
    saveToLocalStorage("testing_performance", performanceTests)
    toast({
      title: "Performance tests saved",
      description: "Your performance tests have been saved successfully.",
    })
  }

  const saveSecurityTests = () => {
    saveToLocalStorage("testing_security", securityTests)
    toast({
      title: "Security tests saved",
      description: "Your security tests have been saved successfully.",
    })
  }

  return (
    <MainLayout>
      <div className="grid gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Testing</h1>
          <p className="text-muted-foreground mt-2">
            Thoroughly test the database design with sample data to ensure it meets requirements
          </p>
        </div>

        <Tabs defaultValue="unit">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="unit">Unit Testing</TabsTrigger>
            <TabsTrigger value="integration">Integration Testing</TabsTrigger>
            <TabsTrigger value="performance">Performance Testing</TabsTrigger>
            <TabsTrigger value="security">Security Testing</TabsTrigger>
          </TabsList>

          <TabsContent value="unit" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Unit Testing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Define unit tests for individual database components:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Table creation and constraints</li>
                    <li>Stored procedures and functions</li>
                    <li>Triggers</li>
                    <li>Data validation rules</li>
                  </ul>
                </p>
                <Textarea
                  placeholder="Document your unit tests..."
                  className="min-h-[200px]"
                  value={unitTests}
                  onChange={(e) => setUnitTests(e.target.value)}
                />
                <div className="flex justify-end mt-4">
                  <Button onClick={saveUnitTests}>Save</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integration" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Integration Testing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Define integration tests for database interactions:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Relationships between tables</li>
                    <li>Cascading updates and deletes</li>
                    <li>Transaction management</li>
                    <li>Application-database interactions</li>
                  </ul>
                </p>
                <Textarea
                  placeholder="Document your integration tests..."
                  className="min-h-[200px]"
                  value={integrationTests}
                  onChange={(e) => setIntegrationTests(e.target.value)}
                />
                <div className="flex justify-end mt-4">
                  <Button onClick={saveIntegrationTests}>Save</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Testing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Define performance tests for the database:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Load testing with realistic data volumes</li>
                    <li>Query performance testing</li>
                    <li>Concurrent user testing</li>
                    <li>Stress testing</li>
                  </ul>
                </p>
                <Textarea
                  placeholder="Document your performance tests..."
                  className="min-h-[200px]"
                  value={performanceTests}
                  onChange={(e) => setPerformanceTests(e.target.value)}
                />
                <div className="flex justify-end mt-4">
                  <Button onClick={savePerformanceTests}>Save</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Testing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Define security tests for the database:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Authentication and authorization testing</li>
                    <li>SQL injection testing</li>
                    <li>Data encryption testing</li>
                    <li>Privilege escalation testing</li>
                  </ul>
                </p>
                <Textarea
                  placeholder="Document your security tests..."
                  className="min-h-[200px]"
                  value={securityTests}
                  onChange={(e) => setSecurityTests(e.target.value)}
                />
                <div className="flex justify-end mt-4">
                  <Button onClick={saveSecurityTests}>Save</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="h-[400px]">
          <AIChat context="You are on the Testing page. You can help define tests to ensure your database design meets requirements and performs well." />
        </div>
      </div>
    </MainLayout>
  )
}

