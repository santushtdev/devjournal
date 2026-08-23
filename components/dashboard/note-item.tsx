import { ArrowUpRight, FileText } from "lucide-react"
type NoteItemProps={
    title:string 
    content : string
    category : string | null
    
    updatedAt: string;
}
export function NoteItem({
    title,
    content,
    category,
    updatedAt

}:NoteItemProps){
    return(<div className="cursor-pointer rounded-lg p-3 transition-all duration-200 hover:-translate-y-0.5 hover:bg-muted">
       <article className="group flex min-h-44 flex-col justify-between gap-6 rounded-lg border border-border/70 bg-background/70 p-4 transition-colors hover:border-primary/30 hover:bg-muted/40">
      <div className="flex items-start gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/15">
          <FileText aria-hidden="true" className="size-4" />
        </div>
        <div className="min-w-0">
          <h3 className="truncate font-mono text-sm font-semibold tracking-tight text-foreground">
            {title}
          </h3>
          <h3 className="truncate font-mono text-sm font-semibold tracking-tight text-foreground">
            {category}
          </h3>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            {content}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-border/60 pt-3">
        <span className="font-mono text-[11px] text-muted-foreground">
          {updatedAt}
        </span>
        <button
          type="button"
          aria-label={`Open ${title}`}
          className="inline-flex items-center gap-1 font-mono text-xs font-medium text-primary opacity-80 transition-opacity group-hover:opacity-100"
        >
          Open note
          <ArrowUpRight aria-hidden="true" className="size-3.5" />
        </button>
      </div>
    </article></div>
    )
}