import { ProjectItem } from "./project-items";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function RecentProject(){
    return(
        <Card>
  <CardHeader>
    <CardTitle className="font-semibold">Recent Project</CardTitle>
    <CardDescription>These are recent updated projects</CardDescription>
    <CardAction></CardAction>
  </CardHeader>
  <CardContent className="space-y-2">
    <ProjectItem
    name="DevJournal"
    description="Developer knowledge management application"
    technologies={["Next.js", "Prisma", "PostgreSQL"]}
    updatedAt="Updated recently"
  />
  </CardContent>
  
</Card>
    )
}