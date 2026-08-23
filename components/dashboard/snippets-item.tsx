import { ArrowUpRight, Code2 } from "lucide-react"
type SnippetItemsProps={
    title: string;
    code: string;
    language: string;
    updatedAt: string;
}

export function SnippetItem({
    title,
    code,
    language,
    updatedAt
}:SnippetItemsProps){
    return(<div className="cursor-pointer rounded-lg p-3 transition-all duration-200 hover:-translate-y-0.5 hover:bg-muted">
        <article className="group flex min-h-44 flex-col justify-between gap-6 rounded-lg border border-border/70 bg-background/70 p-4 transition-colors hover:border-primary/30 hover:bg-muted/40">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/15">
            <Code2 aria-hidden="true" className="size-4" />
          </div>
          <h3 className="truncate font-mono text-sm font-semibold tracking-tight text-foreground">
            {title}
          </h3>
        </div>
        <code className="block truncate rounded-md border border-border/60 bg-muted/40 px-3 py-2 font-mono text-xs text-muted-foreground">
          {code}
        </code>
        <div className="flex flex-wrap gap-1.5">
          <span>
            {language}
            </span>
          
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
          Open snippet
          <ArrowUpRight aria-hidden="true" className="size-3.5" />
        </button>
      </div>
    </article></div>
    )
}