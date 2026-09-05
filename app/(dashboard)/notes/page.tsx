"use client";

import { FormEvent, useEffect, useState } from "react";
import { FileText, Plus, Trash2 } from "lucide-react";

type Note = {
  id: number;
  title: string;
  content: string;
  category: string | null;
  createdAt: string;
  updatedAt: string;
};

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  async function loadNotes() {
    try {
      const response = await fetch("/api/notes");

      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }

      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("LOAD NOTES ERROR:", error);
      setError("Failed to load notes");
    } finally {
      setFetching(false);
    }
  }

  useEffect(() => {
    loadNotes();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          category: category || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to create note");
        return;
      }

      setNotes((current) => [data, ...current]);

      setTitle("");
      setContent("");
      setCategory("");
    } catch (error) {
      console.error("CREATE NOTE ERROR:", error);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Failed to delete note");
        return;
      }

      setNotes((current) =>
        current.filter((note) => note.id !== id)
      );
    } catch (error) {
      console.error("DELETE NOTE ERROR:", error);
      setError("Failed to delete note");
    }
  }

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-primary">
            <FileText className="size-4" />
            Knowledge Base
          </div>

          <h1 className="mt-2 font-mono text-3xl font-bold tracking-tight">
            Notes
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Capture concepts, ideas, learning notes, and technical knowledge.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
          <div className="h-fit rounded-xl border border-border/70 bg-card p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-2">
              <Plus className="size-4 text-primary" />

              <h2 className="font-mono text-sm font-semibold">
                Create Note
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="title"
                  className="text-sm font-medium"
                >
                  Title
                </label>

                <input
                  id="title"
                  type="text"
                  placeholder="e.g. Next.js Server Components"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="category"
                  className="text-sm font-medium"
                >
                  Category
                </label>

                <input
                  id="category"
                  type="text"
                  placeholder="e.g. Next.js"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="content"
                  className="text-sm font-medium"
                >
                  Content
                </label>

                <textarea
                  id="content"
                  placeholder="Write your note..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={8}
                  className="w-full resize-none rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {error && (
                <p className="text-sm text-red-500">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Note"}
              </button>
            </form>
          </div>

          <div>
            {fetching ? (
              <div className="rounded-xl border p-8 text-center text-sm text-muted-foreground">
                Loading notes...
              </div>
            ) : notes.length === 0 ? (
              <div className="rounded-xl border p-10 text-center">
                <FileText className="mx-auto size-8 text-muted-foreground" />

                <h2 className="mt-4 font-mono text-lg font-semibold">
                  No notes yet
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  Create your first note using the form.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {notes.map((note) => (
                  <article
                    key={note.id}
                    className="group rounded-xl border border-border/70 bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h2 className="truncate font-mono text-base font-semibold">
                          {note.title}
                        </h2>

                        {note.category && (
                          <span className="mt-2 inline-block rounded-full bg-primary/10 px-2 py-1 font-mono text-[10px] text-primary">
                            {note.category}
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDelete(note.id)}
                        aria-label={`Delete ${note.title}`}
                        className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>

                    <p className="mt-4 line-clamp-5 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                      {note.content}
                    </p>

                    <div className="mt-5 border-t border-border/60 pt-3 font-mono text-[10px] text-muted-foreground">
                      Updated{" "}
                      {new Date(note.updatedAt).toLocaleDateString()}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}