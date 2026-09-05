
"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  FileText,
  Plus,
  Trash2,
  Pencil,
  X,
} from "lucide-react";

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

  const [editingId, setEditingId] = useState<number | null>(
    null
  );

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

  function resetForm() {
    setTitle("");
    setContent("");
    setCategory("");
    setEditingId(null);
    setError("");
  }

  function handleEdit(note: Note) {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
    setCategory(note.category || "");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");

    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();
    const trimmedCategory = category.trim();

    if (!trimmedTitle) {
      setError("Note title is required.");
      return;
    }

    if (!trimmedContent) {
      setError("Note content is required.");
      return;
    }

    setLoading(true);

    try {
      const url = editingId
        ? `/api/notes/${editingId}`
        : "/api/notes";

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: trimmedTitle,
          content: trimmedContent,
          category: trimmedCategory || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.error ||
            `Failed to ${
              editingId ? "update" : "create"
            } note`
        );
        return;
      }

      if (editingId) {
        setNotes((current) =>
          current.map((note) =>
            note.id === editingId ? data : note
          )
        );
      } else {
        setNotes((current) => [data, ...current]);
      }

      resetForm();
    } catch (error) {
      console.error(
        editingId
          ? "UPDATE NOTE ERROR:"
          : "CREATE NOTE ERROR:",
        error
      );

      setError(
        "Unable to connect to the server. Please try again."
      );
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

    setError("");

    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();

        setError(
          data.error || "Failed to delete note"
        );

        return;
      }

      setNotes((current) =>
        current.filter((note) => note.id !== id)
      );

      if (editingId === id) {
        resetForm();
      }
    } catch (error) {
      console.error("DELETE NOTE ERROR:", error);
      setError("Failed to delete note");
    }
  }

  return (
    <main className="min-h-screen p-4 sm:p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-primary">
            <FileText className="size-4" />
            Knowledge Base
          </div>

          <h1 className="mt-2 font-mono text-2xl font-bold tracking-tight sm:text-3xl">
            Notes
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Capture concepts, ideas, learning notes, and
            technical knowledge.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[360px_1fr] lg:gap-8">
          <div className="h-fit rounded-xl border border-border/70 bg-card p-4 shadow-sm sm:p-5">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex min-w-0 items-center gap-2">
                {editingId ? (
                  <Pencil className="size-4 shrink-0 text-primary" />
                ) : (
                  <Plus className="size-4 shrink-0 text-primary" />
                )}

                <h2 className="truncate font-mono text-sm font-semibold">
                  {editingId ? "Edit Note" : "Create Note"}
                </h2>
              </div>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="shrink-0 rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                  aria-label="Cancel editing"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
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
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  required
                  disabled={loading}
                  className="w-full min-w-0 rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
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
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                  disabled={loading}
                  className="w-full min-w-0 rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
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
                  onChange={(e) =>
                    setContent(e.target.value)
                  }
                  required
                  disabled={loading}
                  rows={8}
                  className="w-full min-w-0 resize-none rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              {error && (
                <p className="break-words text-sm text-destructive">
                  {error}
                </p>
              )}

              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading
                    ? editingId
                      ? "Updating..."
                      : "Saving..."
                    : editingId
                      ? "Update Note"
                      : "Save Note"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    disabled={loading}
                    className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="min-w-0">
            {fetching ? (
              <div className="rounded-xl border p-6 text-center text-sm text-muted-foreground sm:p-8">
                Loading notes...
              </div>
            ) : notes.length === 0 ? (
              <div className="rounded-xl border p-6 text-center sm:p-10">
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
                    className="group min-w-0 rounded-xl border border-border/70 bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 sm:p-5"
                  >
                    <div className="flex items-start justify-between gap-3 sm:gap-4">
                      <div className="min-w-0">
                        <h2 className="truncate font-mono text-base font-semibold">
                          {note.title}
                        </h2>

                        {note.category && (
                          <span className="mt-2 inline-block max-w-full truncate rounded-full bg-primary/10 px-2 py-1 font-mono text-[10px] text-primary">
                            {note.category}
                          </span>
                        )}
                      </div>

                      <div className="flex shrink-0 gap-1">
                        <button
                          type="button"
                          onClick={() =>
                            handleEdit(note)
                          }
                          aria-label={`Edit ${note.title}`}
                          className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                          <Pencil className="size-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(note.id)
                          }
                          aria-label={`Delete ${note.title}`}
                          className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>

                    <p className="mt-4 line-clamp-5 whitespace-pre-wrap break-words text-sm leading-6 text-muted-foreground">
                      {note.content}
                    </p>

                    <div className="mt-5 border-t border-border/60 pt-3 font-mono text-[10px] text-muted-foreground">
                      Updated{" "}
                      {new Date(
                        note.updatedAt
                      ).toLocaleDateString()}
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
