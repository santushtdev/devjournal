import { SnippetItem } from "./snippets-item";

import { Braces, MoreHorizontal } from "lucide-react"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function RecentSnippets(){
    return(
       <Card className="flex h-full flex-col border-border/70 bg-card/95 shadow-sm rounded-xl">
      <CardHeader className="min-h-36 border-b border-border/70 bg-muted/20 px-5 py-5">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-primary">
          <Braces aria-hidden="true" className="size-3.5" />
          Code library
        </div>
        <CardTitle className="mt-1 font-mono text-lg font-semibold tracking-tight">
          Recent snippets
        </CardTitle>
        <CardDescription className="leading-6">
          Reusable code, ready when you need it.
        </CardDescription>
        <CardAction>
          <button type="button" aria-label="More snippet options" className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <MoreHorizontal aria-hidden="true" className="size-4" />
          </button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col p-4 sm:p-5">
        <SnippetItem name="API code" code="<include>" language={["Ts", "Js"]} updatedAt="Updated successfully" />
      </CardContent>
    </Card>
    )
}