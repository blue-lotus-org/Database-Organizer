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

export default function NormalizationPage() {
  const [firstNF, setFirstNF] = useState("")
  const [secondNF, setSecondNF] = useState("")
  const [thirdNF, setThirdNF] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    // Load saved data when component mounts
    setFirstNF(loadFromLocalStorage("normalization_1nf", ""))
    setSecondNF(loadFromLocalStorage("normalization_2nf", ""))
    setThirdNF(loadFromLocalStorage("normalization_3nf", ""))
  }, [])

  const saveFirstNF = () => {
    saveToLocalStorage("normalization_1nf", firstNF)
    toast({
      title: "1NF saved",
      description: "Your First Normal Form transformations have been saved successfully.",
    })
  }

  const saveSecondNF = () => {
    saveToLocalStorage("normalization_2nf", secondNF)
    toast({
      title: "2NF saved",
      description: "Your Second Normal Form transformations have been saved successfully.",
    })
  }

  const saveThirdNF = () => {
    saveToLocalStorage("normalization_3nf", thirdNF)
    toast({
      title: "3NF saved",
      description: "Your Third Normal Form transformations have been saved successfully.",
    })
  }

  return (
    <MainLayout>
      <div className="grid gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Normalization</h1>
          <p className="text-muted-foreground mt-2">
            Apply normalization rules to eliminate redundancy and ensure data integrity
          </p>
        </div>

        <Tabs defaultValue="1nf">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="1nf">First Normal Form</TabsTrigger>
            <TabsTrigger value="2nf">Second Normal Form</TabsTrigger>
            <TabsTrigger value="3nf">Third Normal Form</TabsTrigger>
          </TabsList>

          <TabsContent value="1nf" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>First Normal Form (1NF)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  First Normal Form requires that:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Each table has a primary key</li>
                    <li>No repeating groups or arrays</li>
                    <li>Each column contains atomic (indivisible) values</li>
                  </ul>
                </p>
                <Textarea
                  placeholder="Document your 1NF transformations..."
                  className="min-h-[200px]"
                  value={firstNF}
                  onChange={(e) => setFirstNF(e.target.value)}
                />
                <div className="flex justify-end mt-4 gap-2">
                  <Button variant="outline">Check with AI</Button>
                  <Button onClick={saveFirstNF}>Save</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="2nf" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Second Normal Form (2NF)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Second Normal Form requires that:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>The table is in 1NF</li>
                    <li>All non-key attributes are fully dependent on the primary key</li>
                    <li>No partial dependencies on a composite key</li>
                  </ul>
                </p>
                <Textarea
                  placeholder="Document your 2NF transformations..."
                  className="min-h-[200px]"
                  value={secondNF}
                  onChange={(e) => setSecondNF(e.target.value)}
                />
                <div className="flex justify-end mt-4 gap-2">
                  <Button variant="outline">Check with AI</Button>
                  <Button onClick={saveSecondNF}>Save</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="3nf" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Third Normal Form (3NF)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Third Normal Form requires that:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>The table is in 2NF</li>
                    <li>No transitive dependencies</li>
                    <li>Every non-key attribute depends directly on the primary key</li>
                  </ul>
                </p>
                <Textarea
                  placeholder="Document your 3NF transformations..."
                  className="min-h-[200px]"
                  value={thirdNF}
                  onChange={(e) => setThirdNF(e.target.value)}
                />
                <div className="flex justify-end mt-4 gap-2">
                  <Button variant="outline">Check with AI</Button>
                  <Button onClick={saveThirdNF}>Save</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="h-[400px]">
          <AIChat context="You are on the Normalization page. You can help apply normalization rules to eliminate redundancy and ensure data integrity." />
        </div>
      </div>
    </MainLayout>
  )
}

