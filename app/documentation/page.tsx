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

export default function DocumentationPage() {
  const [schemaDoc, setSchemaDoc] = useState("")
  const [dataDict, setDataDict] = useState("")
  const [procedures, setProcedures] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    // Load saved data when component mounts
    setSchemaDoc(loadFromLocalStorage("documentation_schema", ""))
    setDataDict(loadFromLocalStorage("documentation_dictionary", ""))
    setProcedures(loadFromLocalStorage("documentation_procedures", ""))
  }, [])

  const saveSchemaDoc = () => {
    saveToLocalStorage("documentation_schema", schemaDoc)
    toast({
      title: "Schema documentation saved",
      description: "Your schema documentation has been saved successfully.",
    })
  }

  const saveDataDict = () => {
    saveToLocalStorage("documentation_dictionary", dataDict)
    toast({
      title: "Data dictionary saved",
      description: "Your data dictionary has been saved successfully.",
    })
  }

  const saveProcedures = () => {
    saveToLocalStorage("documentation_procedures", procedures)
    toast({
      title: "Procedures saved",
      description: "Your procedures documentation has been saved successfully.",
    })
  }

  return (
    <MainLayout>
      <div className="grid gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documentation</h1>
          <p className="text-muted-foreground mt-2">
            Document the database design, including schema, relationships, and assumptions
          </p>
        </div>

        <Tabs defaultValue="schema">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="schema">Schema Documentation</TabsTrigger>
            <TabsTrigger value="dictionary">Data Dictionary</TabsTrigger>
            <TabsTrigger value="procedures">Procedures & Standards</TabsTrigger>
          </TabsList>

          <TabsContent value="schema" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Schema Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Document your database schema, including:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Tables and their purposes</li>
                    <li>Relationships between tables</li>
                    <li>Primary and foreign keys</li>
                    <li>Indexes and constraints</li>
                    <li>ER diagrams and visual representations</li>
                  </ul>
                </p>
                <Textarea
                  placeholder="Document your database schema..."
                  className="min-h-[200px]"
                  value={schemaDoc}
                  onChange={(e) => setSchemaDoc(e.target.value)}
                />
                <div className="flex justify-end mt-4 gap-2">
                  <Button variant="outline">Generate with AI</Button>
                  <Button onClick={saveSchemaDoc}>Save</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dictionary" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Data Dictionary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Create a data dictionary that defines:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Column names and descriptions</li>
                    <li>Data types and constraints</li>
                    <li>Valid values or ranges</li>
                    <li>Default values</li>
                    <li>Business rules and validation rules</li>
                  </ul>
                </p>
                <Textarea
                  placeholder="Create your data dictionary..."
                  className="min-h-[200px]"
                  value={dataDict}
                  onChange={(e) => setDataDict(e.target.value)}
                />
                <div className="flex justify-end mt-4">
                  <Button onClick={saveDataDict}>Save</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="procedures" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Procedures & Standards</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Document database procedures and standards:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Naming conventions</li>
                    <li>Coding standards</li>
                    <li>Change management procedures</li>
                    <li>Backup and recovery procedures</li>
                    <li>Performance monitoring procedures</li>
                  </ul>
                </p>
                <Textarea
                  placeholder="Document your database procedures and standards..."
                  className="min-h-[200px]"
                  value={procedures}
                  onChange={(e) => setProcedures(e.target.value)}
                />
                <div className="flex justify-end mt-4">
                  <Button onClick={saveProcedures}>Save</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="h-[400px]">
          <AIChat context="You are on the Documentation page. You can help document the database design, including schema, data dictionary, and procedures." />
        </div>
      </div>
    </MainLayout>
  )
}

