


import { ProjectItem } from "./project-items"
import { FolderGit2, MoreHorizontal } from "lucide-react"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Project = {
  id: number
  title: string
  desciption: string
  githubUrl: string
  createdAt: Date
  updatedAt: Date
}

type RecentProjectProps = {
  projects : Project[],
}

export function RecentProject({projects}:RecentProjectProps) {

  return (
    <Card className="flex h-full flex-col rounded-xl border-border/70 bg-card/95 shadow-sm">
      <CardHeader className="min-h-36 border-b border-border/70 bg-muted/20 px-5 py-5 sm:px-6">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-primary">
          <FolderGit2 aria-hidden="true" className="size-3.5" />
          Workspace
        </div>

        <CardTitle className="mt-1 font-mono text-lg font-semibold tracking-tight">
          Recent Project
        </CardTitle>

        <CardDescription className="max-w-md leading-6">
          Your latest workspaces, ready to pick up where you left off.
        </CardDescription>

        <CardAction>
          <button
            type="button"
            aria-label="More project options"
            className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <MoreHorizontal aria-hidden="true" className="size-4" />
          </button>
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        {projects.map((project) => (
          <ProjectItem
            key={project.id}
            title={project.title}
            desciption={project.desciption}
            githubUrl={project.githubUrl}
            updatedAt={project.updatedAt.toLocaleDateString()}
          />
        ))}
      </CardContent>
    </Card>
  )
}