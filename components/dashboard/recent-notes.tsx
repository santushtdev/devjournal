import { NoteItem } from "./note-item";
import { FileText, MoreHorizontal } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Notes = {
  id: number;
  title: string;
  content: string;
  category: string | null;
  createdAt: Date;
  updatedAt: Date;
};

type RecentNotesProps = {
  notes: Notes[];
};

export function RecentNotes({ notes }: RecentNotesProps) {
  const recentNotes = notes.slice(0, 3);

  return (
    <Card className="flex h-full flex-col rounded-xl border-border/70 bg-card/95 shadow-sm">
      <CardHeader className="min-h-36 border-b border-border/70 bg-muted/20 px-5 py-5">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-primary">
          <FileText aria-hidden="true" className="size-3.5" />
          Notes
        </div>

        <CardTitle className="mt-1 font-mono text-lg font-semibold tracking-tight">
          Recent Notes
        </CardTitle>

        <CardDescription className="leading-6">
          Your latest ideas and documentation.
        </CardDescription>

        <CardAction>
          <button
            type="button"
            aria-label="More note options"
            className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <MoreHorizontal aria-hidden="true" className="size-4" />
          </button>
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        {recentNotes.length === 0 ? (
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed p-6 text-center">
            <div>
              <FileText className="mx-auto size-7 text-muted-foreground" />

              <p className="mt-3 font-mono text-sm font-medium">
                No notes yet
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Create a note to see it here.
              </p>
            </div>
          </div>
        ) : (
          recentNotes.map((note) => (
            <NoteItem
              key={note.id}
              title={note.title}
              content={note.content}
              category={note.category}
              updatedAt={note.updatedAt.toLocaleDateString()}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
}