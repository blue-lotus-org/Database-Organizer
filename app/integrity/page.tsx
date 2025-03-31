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

export default function DataIntegrityPage() {
  const [constraints, setConstraints] = useState("")
  const [validationRules, setValidationRules] = useState("")
  const [triggers, setTriggers] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    // Load saved data when component mounts
    setConstraints(loadFromLocalStorage("integrity_constraints", ""))
    setValidationRules(loadFromLocalStorage("integrity_validation", ""))
    setTriggers(loadFromLocalStorage("integrity_triggers", ""))
  }, [])

  const saveConstraints = () => {
    saveToLocalStorage("integrity_constraints", constraints)
    toast({
      title: "Constraints saved",
      description: "Your data integrity constraints have been saved successfully.",
    })
  }

  const saveValidationRules = () => {
    saveToLocalStorage("integrity_validation", validationRules)
    toast({
      title: "Validation rules saved",
      description: "Your validation rules have been saved successfully.",
    })
  }

  const saveTriggers = () => {
    saveToLocalStorage("integrity_triggers", triggers)
    toast({
      title: "Triggers saved",
      description: "Your database triggers have been saved successfully.",
    })
  }

  return (
    <MainLayout>
      <div className="grid gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Data Integrity</h1>
          <p className="text-muted-foreground mt-2">
            Implement constraints and rules to ensure data accuracy and consistency
          </p>
        </div>

        <Tabs defaultValue="constraints">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="constraints">Constraints</TabsTrigger>
            <TabsTrigger value="validation">Validation Rules</TabsTrigger>
            <TabsTrigger value="triggers">Triggers</TabsTrigger>
          </TabsList>

          <TabsContent value="constraints" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Database Constraints</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Define database constraints to enforce data integrity:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Primary Key constraints to ensure unique identification</li>
                    <li>Foreign Key constraints to maintain referential integrity</li>
                    <li>Unique constraints to prevent duplicate values</li>
                    <li>Check constraints to enforce business rules</li>
                    <li>Not Null constraints to ensure required data is provided</li>
                  </ul>
                </p>
                <Textarea
                  placeholder="Document your database constraints..."
                  className="min-h-[200px] font-mono"
                  value={constraints}
                  onChange={(e) => setConstraints(e.target.value)}
                />
                <div className="flex justify-end mt-4 gap-2">
                  <Button variant="outline">Generate with AI</Button>
                  <Button onClick={saveConstraints}>Save</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="validation" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Application Validation Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Define application-level validation rules to complement database constraints:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Input validation for data formats (email, phone, etc.)</li>
                    <li>Business logic validation</li>
                    <li>Cross-field validation rules</li>
                    <li>Data transformation and normalization rules</li>
                  </ul>
                </p>
                <Textarea
                  placeholder="Document your application validation rules..."
                  className="min-h-[200px]"
                  value={validationRules}
                  onChange={(e) => setValidationRules(e.target.value)}
                />
                <div className="flex justify-end mt-4">
                  <Button onClick={saveValidationRules}>Save</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="triggers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Database Triggers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Define database triggers to automatically enforce complex integrity rules:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>BEFORE/AFTER INSERT triggers</li>
                    <li>BEFORE/AFTER UPDATE triggers</li>
                    <li>BEFORE/AFTER DELETE triggers</li>
                    <li>Triggers for auditing and logging</li>
                  </ul>
                </p>
                <Textarea
                  placeholder="CREATE TRIGGER before_user_update BEFORE UPDATE ON users FOR EACH ROW BEGIN ... END;"
                  className="min-h-[200px] font-mono"
                  value={triggers}
                  onChange={(e) => setTriggers(e.target.value)}
                />
                <div className="flex justify-end mt-4">
                  <Button onClick={saveTriggers}>Save</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="h-[400px]">
          <AIChat context="You are on the Data Integrity page. You can help implement constraints, validation rules, and triggers to ensure data accuracy and consistency." />
        </div>
      </div>
    </MainLayout>
  )
}

