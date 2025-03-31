"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

type AIProvider = "mistral" | "gemini" | "custom"

interface AISettings {
  provider: AIProvider
  apiKey: string
  model: string
  temperature: number
  customEndpoint?: string
}

const defaultSettings: AISettings = {
  provider: "mistral",
  apiKey: "",
  model: "mistral-small-latest",
  temperature: 0.7,
}

const modelOptions = {
  mistral: ["mistral-small-latest", "mistral-medium-latest", "mistral-large-latest", "pixtral-large-latest"],
  gemini: ["gemini-2.0-flash", "gemini-2.0-flash-exp", "gemini-2.0-pro", "gemini-2.0-pro-exp"],
  custom: ["custom-model"],
}

export default function SettingsModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [settings, setSettings] = useState<AISettings>(defaultSettings)
  const { toast } = useToast()

  useEffect(() => {
    // Load settings from localStorage when component mounts
    const savedSettings = localStorage.getItem("aiSettings")
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings))
      } catch (e) {
        console.error("Failed to parse saved settings:", e)
      }
    }
  }, [])

  const handleSave = () => {
    // Save settings to localStorage
    localStorage.setItem("aiSettings", JSON.stringify(settings))
    toast({
      title: "Settings saved",
      description: "Your AI settings have been saved to local storage.",
    })
    onClose()
  }

  const handleProviderChange = (value: string) => {
    const provider = value as AIProvider
    setSettings({
      ...settings,
      provider,
      model: modelOptions[provider][0],
    })
  }

  const getApiKeyHelp = () => {
    switch (settings.provider) {
      case "mistral":
        return "Get your Mistral API key from https://console.mistral.ai/api-keys/"
      case "gemini":
        return "Get your Gemini API key from https://aistudio.google.com/app/apikey"
      case "custom":
        return "Enter your custom API provider's API key"
      default:
        return ""
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>AI Settings</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="provider" className="text-right">
              Provider
            </Label>
            <Select value={settings.provider} onValueChange={handleProviderChange}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mistral">Mistral</SelectItem>
                <SelectItem value="gemini">Gemini</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="apiKey" className="text-right">
              API Key
            </Label>
            <div className="col-span-3 space-y-2">
              <Input
                id="apiKey"
                type="password"
                value={settings.apiKey}
                onChange={(e) => setSettings({ ...settings, apiKey: e.target.value })}
              />
              <Alert variant="outline" className="py-2">
                <InfoIcon className="h-4 w-4" />
                <AlertDescription className="text-xs ml-2">{getApiKeyHelp()}</AlertDescription>
              </Alert>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="model" className="text-right">
              Model
            </Label>
            <Select value={settings.model} onValueChange={(value) => setSettings({ ...settings, model: value })}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                {modelOptions[settings.provider].map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {settings.provider === "custom" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="endpoint" className="text-right">
                API Endpoint
              </Label>
              <Input
                id="endpoint"
                value={settings.customEndpoint || ""}
                onChange={(e) => setSettings({ ...settings, customEndpoint: e.target.value })}
                className="col-span-3"
                placeholder="https://api.example.com/v1/chat/completions"
              />
            </div>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="temperature" className="text-right">
              Temperature
            </Label>
            <div className="col-span-3 flex items-center gap-2">
              <Slider
                id="temperature"
                min={0}
                max={1}
                step={0.1}
                value={[settings.temperature]}
                onValueChange={(value) => setSettings({ ...settings, temperature: value[0] })}
              />
              <span className="w-12 text-center">{settings.temperature.toFixed(1)}</span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

