import MainLayout from "./components/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import AIChat from "./components/ai-chat"

export default function Home() {
  return (
    <MainLayout>
      <div className="grid gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Database Design Organizer</h1>
          <p className="text-muted-foreground mt-2">Plan, design, and document your database with AI assistance</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Requirements Analysis</CardTitle>
              <CardDescription>Understand data requirements and identify entities</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Identify the entities, attributes, and relationships needed for your database.</p>
              <Button asChild>
                <Link href="/requirements">Get Started</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Conceptual Design</CardTitle>
              <CardDescription>Create ER diagrams to visualize entities</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Create high-level models using Entity-Relationship diagrams.</p>
              <Button asChild>
                <Link href="/conceptual">Get Started</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Logical Design</CardTitle>
              <CardDescription>Translate conceptual design into a logical model</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Define tables, columns, data types, and constraints.</p>
              <Button asChild>
                <Link href="/logical">Get Started</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Normalization</CardTitle>
              <CardDescription>Apply normalization rules to eliminate redundancy</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Organize data into tables and define relationships between them.</p>
              <Button asChild>
                <Link href="/normalization">Get Started</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance & Security</CardTitle>
              <CardDescription>Optimize and secure your database design</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Implement indexing, security measures, and performance optimizations.</p>
              <Button asChild>
                <Link href="/performance">Get Started</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Documentation & Testing</CardTitle>
              <CardDescription>Document and test your database design</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Create comprehensive documentation and test your database design.</p>
              <Button asChild>
                <Link href="/documentation">Get Started</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="h-[400px]">
          <AIChat context="You are on the dashboard of the Database Design Organizer. You can help with general database design questions." />
        </div>
      </div>
    </MainLayout>
  )
}

