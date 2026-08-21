import { NoteItem } from "./note-item";
import { FileText, MoreHorizontal } from "lucide-react"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function RecentNotes(){
    return(
        <Card  className="flex h-full flex-col border-border/70 bg-card/95 shadow-sm">
  <CardHeader className="min-h-36 border-b border-border/70 bg-muted/20 px-5 py-5">
  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-primary">
          <FileText aria-hidden="true" className="size-3.5" />
          Notes
 </div>
    <CardTitle  className="mt-1 font-mono text-lg font-semibold tracking-tight">Recent Notes</CardTitle>
    <CardDescription className="leading-6">Your latest ideas and documentation.</CardDescription>
    <CardAction>
         <button type="button" aria-label="More note options" className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <MoreHorizontal aria-hidden="true" className="size-4" />
          </button>
    </CardAction>
  </CardHeader>
  <CardContent className="flex flex-1 flex-col p-4 sm:p-5">
        <NoteItem name="My Note" description="Some description" updatedAt="Updated recently" />
      </CardContent>
 
</Card>
    )
}