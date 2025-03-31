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

export default function SecurityPage() {
  const [authentication, setAuthentication] = useState("")
  const [authorization, setAuthorization] = useState("")
  const [encryption, setEncryption] = useState("")
  const [auditing, setAuditing] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    // Load saved data when component mounts
    setAuthentication(loadFromLocalStorage("security_authentication", ""))
    setAuthorization(loadFromLocalStorage("security_authorization", ""))
    setEncryption(loadFromLocalStorage("security_encryption", ""))
    setAuditing(loadFromLocalStorage("security_auditing", ""))
  }, [])

  const saveAuthentication = () => {
    saveToLocalStorage("security_authentication", authentication)
    toast({
      title: "Authentication saved",
      description: "Your authentication strategy has been saved successfully.",
    })
  }

  const saveAuthorization = () => {
    saveToLocalStorage("security_authorization", authorization)
    toast({
      title: "Authorization saved",
      description: "Your authorization strategy has been saved successfully.",
    })
  }

  const saveEncryption = () => {
    saveToLocalStorage("security_encryption", encryption)
    toast({
      title: "Encryption saved",
      description: "Your encryption strategy has been saved successfully.",
    })
  }

  const saveAuditing = () => {
    saveToLocalStorage("security_auditing", auditing)
    toast({
      title: "Auditing saved",
      description: "Your auditing strategy has been saved successfully.",
    })
  }

  return (
    <MainLayout>
      <div className="grid gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Security</h1>
          <p className="text-muted-foreground mt-2">
            Design the database with security in mind to protect sensitive data
          </p>
        </div>

        <Tabs defaultValue="authentication">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="authentication">Authentication</TabsTrigger>
            <TabsTrigger value="authorization">Authorization</TabsTrigger>
            <TabsTrigger value="encryption">Encryption</TabsTrigger>
            <TabsTrigger value="auditing">Auditing</TabsTrigger>
          </TabsList>

          <TabsContent value="authentication" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Authentication</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Define how users will be authenticated to access the database:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>User authentication mechanisms</li>
                    <li>Password policies and storage</li>
                    <li>Multi-factor authentication</li>
                    <li>Integration with identity providers</li>
                  </ul>
                </p>
                <Textarea
                  placeholder="Document your authentication strategy..."
                  className="min-h-[200px]"
                  value={authentication}
                  onChange={(e) => setAuthentication(e.target.value)}
                />
                <div className="flex justify-end mt-4">
                  <Button onClick={saveAuthentication}>Save</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="authorization" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Authorization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Define how access control will be implemented:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Role-based access control (RBAC)</li>
                    <li>Database user permissions</li>
                    <li>Row-level security</li>
                    <li>Column-level security</li>
                  </ul>
                </p>
                <Textarea
                  placeholder="Document your authorization strategy..."
                  className="min-h-[200px]"
                  value={authorization}
                  onChange={(e) => setAuthorization(e.target.value)}
                />
                <div className="flex justify-end mt-4">
                  <Button onClick={saveAuthorization}>Save</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="encryption" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Encryption</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Define how sensitive data will be encrypted:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Data-at-rest encryption</li>
                    <li>Data-in-transit encryption</li>
                    <li>Column-level encryption for sensitive data</li>
                    <li>Key management</li>
                  </ul>
                </p>
                <Textarea
                  placeholder="Document your encryption strategy..."
                  className="min-h-[200px]"
                  value={encryption}
                  onChange={(e) => setEncryption(e.target.value)}
                />
                <div className="flex justify-end mt-4">
                  <Button onClick={saveEncryption}>Save</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="auditing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Auditing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Define how database activities will be audited:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Audit logging for sensitive operations</li>
                    <li>User activity tracking</li>
                    <li>Change tracking</li>
                    <li>Compliance reporting</li>
                  </ul>
                </p>
                <Textarea
                  placeholder="Document your auditing strategy..."
                  className="min-h-[200px]"
                  value={auditing}
                  onChange={(e) => setAuditing(e.target.value)}
                />
                <div className="flex justify-end mt-4">
                  <Button onClick={saveAuditing}>Save</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="h-[400px]">
          <AIChat context="You are on the Security page. You can help design a secure database with proper authentication, authorization, encryption, and auditing." />
        </div>
      </div>
    </MainLayout>
  )
}

