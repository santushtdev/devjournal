import Link from "next/link";
import { ArrowUpRight, GitBranch } from "lucide-react";

type ProjectItemsProps = {
  id: number;
  title: string;
  desciption: string;
  githubUrl: string;
  updatedAt: string;
};

export function ProjectItem({
  id,
  title,
  desciption,
  githubUrl,
  updatedAt,
}: ProjectItemsProps) {
  return (
    <div className="cursor-pointer rounded-lg p-3 transition-all duration-200 hover:-translate-y-0.5 hover:bg-muted">
      <article className="group flex min-h-44 flex-1 flex-col justify-between gap-4 rounded-lg border border-border/70 bg-background/70 p-4 transition-colors hover:border-primary/30 hover:bg-muted/40">
        <div className="flex min-w-0 items-start gap-3">
          <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/15">
            <GitBranch aria-hidden="true" className="size-4" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <h3 className="truncate font-mono text-sm font-semibold tracking-tight text-foreground">
                {title}
              </h3>

              <span className="rounded-full bg-muted px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Active
              </span>
            </div>

            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {desciption}
            </p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              <span className="rounded-md border border-border bg-card px-2 py-1 font-mono text-[11px] text-muted-foreground">
                {githubUrl}
              </span>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-border/60 pt-3">
          <span className="font-mono text-[11px] text-muted-foreground">
            {updatedAt}
          </span>

          <Link
            href={`/projects/${id}`}
            aria-label={`Open ${title}`}
            className="inline-flex items-center gap-1 font-mono text-xs font-medium text-primary opacity-80 transition-opacity group-hover:opacity-100"
          >
            View project
            <ArrowUpRight aria-hidden="true" className="size-3.5" />
          </Link>
        </div>
      </article>
    </div>
  );
}