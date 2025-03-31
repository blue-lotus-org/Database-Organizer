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

export default function BackupRecoveryPage() {
  const [backupStrategy, setBackupStrategy] = useState("")
  const [recoveryPlan, setRecoveryPlan] = useState("")
  const [disasterRecovery, setDisasterRecovery] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    // Load saved data when component mounts
    setBackupStrategy(loadFromLocalStorage("backup_strategy", ""))
    setRecoveryPlan(loadFromLocalStorage("recovery_plan", ""))
    setDisasterRecovery(loadFromLocalStorage("disaster_recovery", ""))
  }, [])

  const saveBackupStrategy = () => {
    saveToLocalStorage("backup_strategy", backupStrategy)
    toast({
      title: "Backup strategy saved",
      description: "Your backup strategy has been saved successfully.",
    })
  }

  const saveRecoveryPlan = () => {
    saveToLocalStorage("recovery_plan", recoveryPlan)
    toast({
      title: "Recovery plan saved",
      description: "Your recovery plan has been saved successfully.",
    })
  }

  const saveDisasterRecovery = () => {
    saveToLocalStorage("disaster_recovery", disasterRecovery)
    toast({
      title: "Disaster recovery saved",
      description: "Your disaster recovery plan has been saved successfully.",
    })
  }

  return (
    <MainLayout>
      <div className="grid gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Backup & Recovery</h1>
          <p className="text-muted-foreground mt-2">
            Implement a backup and recovery strategy to protect against data loss
          </p>
        </div>

        <Tabs defaultValue="backup">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="backup">Backup Strategy</TabsTrigger>
            <TabsTrigger value="recovery">Recovery Plan</TabsTrigger>
            <TabsTrigger value="disaster">Disaster Recovery</TabsTrigger>
          </TabsList>

          <TabsContent value="backup" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Backup Strategy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Define your database backup strategy:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Full backups vs. incremental backups</li>
                    <li>Backup frequency and scheduling</li>
                    <li>Backup storage and retention policies</li>
                    <li>Backup verification and testing</li>
                    <li>Automated backup processes</li>
                  </ul>
                </p>
                <Textarea
                  placeholder="Document your backup strategy..."
                  className="min-h-[200px]"
                  value={backupStrategy}
                  onChange={(e) => setBackupStrategy(e.target.value)}
                />
                <div className="flex justify-end mt-4">
                  <Button onClick={saveBackupStrategy}>Save</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recovery" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recovery Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Define your database recovery plan:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Recovery time objectives (RTO)</li>
                    <li>Recovery point objectives (RPO)</li>
                    <li>Recovery procedures and documentation</li>
                    <li>Regular recovery testing</li>
                    <li>Roles and responsibilities during recovery</li>
                  </ul>
                </p>
                <Textarea
                  placeholder="Document your recovery plan..."
                  className="min-h-[200px]"
                  value={recoveryPlan}
                  onChange={(e) => setRecoveryPlan(e.target.value)}
                />
                <div className="flex justify-end mt-4">
                  <Button onClick={saveRecoveryPlan}>Save</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="disaster" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Disaster Recovery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Define your disaster recovery plan for catastrophic failures:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Offsite backup storage</li>
                    <li>Standby databases and replication</li>
                    <li>Geographic redundancy</li>
                    <li>Disaster recovery testing</li>
                    <li>Business continuity planning</li>
                  </ul>
                </p>
                <Textarea
                  placeholder="Document your disaster recovery plan..."
                  className="min-h-[200px]"
                  value={disasterRecovery}
                  onChange={(e) => setDisasterRecovery(e.target.value)}
                />
                <div className="flex justify-end mt-4">
                  <Button onClick={saveDisasterRecovery}>Save</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="h-[400px]">
          <AIChat context="You are on the Backup & Recovery page. You can help implement a backup and recovery strategy to protect against data loss." />
        </div>
      </div>
    </MainLayout>
  )
}

