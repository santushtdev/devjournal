import { SnippetItem } from "./snippets-item";
import { Braces, MoreHorizontal } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Snippet = {
  id: number;
  title: string;
  code: string;
  language: string;
  createdAt: Date;
  updatedAt: Date;
};

type RecentSnippetsProps = {
  snippets: Snippet[];
};

export function RecentSnippets({
  snippets,
}: RecentSnippetsProps) {
  const recentSnippets = snippets.slice(0, 3);

  return (
    <Card className="flex h-full flex-col rounded-xl border-border/70 bg-card/95 shadow-sm">
      <CardHeader className="min-h-36 border-b border-border/70 bg-muted/20 px-5 py-5">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-primary">
          <Braces aria-hidden="true" className="size-3.5" />
          Code Library
        </div>

        <CardTitle className="mt-1 font-mono text-lg font-semibold tracking-tight">
          Recent Snippets
        </CardTitle>

        <CardDescription className="leading-6">
          Reusable code, ready when you need it.
        </CardDescription>

        <CardAction>
          <button
            type="button"
            aria-label="More snippet options"
            className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <MoreHorizontal
              aria-hidden="true"
              className="size-4"
            />
          </button>
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        {recentSnippets.length === 0 ? (
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed p-6 text-center">
            <div>
              <Braces className="mx-auto size-7 text-muted-foreground" />

              <p className="mt-3 font-mono text-sm font-medium">
                No snippets yet
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Save a snippet to see it here.
              </p>
            </div>
          </div>
        ) : (
          recentSnippets.map((snippet) => (
            <SnippetItem
              key={snippet.id}
              title={snippet.title}
              code={snippet.code}
              language={snippet.language}
              updatedAt={snippet.updatedAt.toLocaleDateString()}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
}