
"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  Code2,
  Plus,
  Trash2,
  Pencil,
  X,
} from "lucide-react";

type Snippet = {
  id: number;
  title: string;
  code: string;
  language: string;
  desciption: string | null;
  createdAt: string;
  updatedAt: string;
};

export default function SnippetsPage() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);

  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState<number | null>(
    null
  );

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  async function loadSnippets() {
    try {
      const response = await fetch("/api/snippet");

      if (!response.ok) {
        throw new Error("Failed to fetch snippets");
      }

      const data = await response.json();

      setSnippets(data);
    } catch (error) {
      console.error("LOAD SNIPPETS ERROR:", error);
      setError("Failed to load snippets");
    } finally {
      setFetching(false);
    }
  }

  useEffect(() => {
    loadSnippets();
  }, []);

  function resetForm() {
    setTitle("");
    setLanguage("");
    setCode("");
    setDescription("");
    setEditingId(null);
    setError("");
  }

  function handleEdit(snippet: Snippet) {
    setEditingId(snippet.id);
    setTitle(snippet.title);
    setLanguage(snippet.language);
    setCode(snippet.code);
    setDescription(snippet.desciption || "");
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
    const trimmedLanguage = language.trim();
    const trimmedCode = code.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle) {
      setError("Snippet title is required.");
      return;
    }

    if (!trimmedLanguage) {
      setError("Programming language is required.");
      return;
    }

    if (!trimmedCode) {
      setError("Code is required.");
      return;
    }

    setLoading(true);

    try {
      const url = editingId
        ? `/api/snippet/${editingId}`
        : "/api/snippet";

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: trimmedTitle,
          language: trimmedLanguage,
          code: trimmedCode,
          desciption: trimmedDescription || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.error ||
            `Failed to ${
              editingId ? "update" : "create"
            } snippet`
        );
        return;
      }

      if (editingId) {
        setSnippets((current) =>
          current.map((snippet) =>
            snippet.id === editingId ? data : snippet
          )
        );
      } else {
        setSnippets((current) => [data, ...current]);
      }

      resetForm();
    } catch (error) {
      console.error(
        editingId
          ? "UPDATE SNIPPET ERROR:"
          : "CREATE SNIPPET ERROR:",
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
      "Are you sure you want to delete this snippet?"
    );

    if (!confirmed) {
      return;
    }

    setError("");

    try {
      const response = await fetch(
        `/api/snippet/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.error || "Failed to delete snippet"
        );
        return;
      }

      setSnippets((current) =>
        current.filter((snippet) => snippet.id !== id)
      );

      if (editingId === id) {
        resetForm();
      }
    } catch (error) {
      console.error("DELETE SNIPPET ERROR:", error);
      setError("Failed to delete snippet");
    }
  }

  return (
    <main className="min-h-screen p-4 sm:p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-primary">
            <Code2 className="size-4" />
            Code Library
          </div>

          <h1 className="mt-2 font-mono text-2xl font-bold tracking-tight sm:text-3xl">
            Snippets
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Save reusable code and solutions for your
            future projects.
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
                  {editingId
                    ? "Edit Snippet"
                    : "Create Snippet"}
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
                  placeholder="e.g. Binary Search"
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
                  htmlFor="language"
                  className="text-sm font-medium"
                >
                  Language
                </label>

                <input
                  id="language"
                  type="text"
                  placeholder="e.g. C++, JavaScript"
                  value={language}
                  onChange={(e) =>
                    setLanguage(e.target.value)
                  }
                  required
                  disabled={loading}
                  className="w-full min-w-0 rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="description"
                  className="text-sm font-medium"
                >
                  Description
                </label>

                <input
                  id="description"
                  type="text"
                  placeholder="What does this snippet do?"
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  disabled={loading}
                  className="w-full min-w-0 rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="code"
                  className="text-sm font-medium"
                >
                  Code
                </label>

                <textarea
                  id="code"
                  placeholder="Paste your code here..."
                  value={code}
                  onChange={(e) =>
                    setCode(e.target.value)
                  }
                  required
                  disabled={loading}
                  rows={10}
                  className="w-full min-w-0 resize-none rounded-md border bg-background px-3 py-2 font-mono text-xs outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
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
                      ? "Update Snippet"
                      : "Save Snippet"}
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
                Loading snippets...
              </div>
            ) : snippets.length === 0 ? (
              <div className="rounded-xl border p-6 text-center sm:p-10">
                <Code2 className="mx-auto size-8 text-muted-foreground" />

                <h2 className="mt-4 font-mono text-lg font-semibold">
                  No snippets yet
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  Save your first reusable piece of code.
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {snippets.map((snippet) => (
                  <article
                    key={snippet.id}
                    className="min-w-0 rounded-xl border border-border/70 bg-card p-4 shadow-sm transition-all hover:border-primary/30 sm:p-5"
                  >
                    <div className="flex items-start justify-between gap-3 sm:gap-4">
                      <div className="min-w-0">
                        <h2 className="break-words font-mono text-base font-semibold">
                          {snippet.title}
                        </h2>

                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-primary/10 px-2 py-1 font-mono text-[10px] text-primary">
                            {snippet.language}
                          </span>

                          {snippet.desciption && (
                            <span className="break-words text-xs text-muted-foreground">
                              {snippet.desciption}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex shrink-0 gap-1">
                        <button
                          type="button"
                          onClick={() =>
                            handleEdit(snippet)
                          }
                          aria-label={`Edit ${snippet.title}`}
                          className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                          <Pencil className="size-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(snippet.id)
                          }
                          aria-label={`Delete ${snippet.title}`}
                          className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>

                    <pre className="mt-5 max-w-full overflow-x-auto rounded-lg border border-border/70 bg-background p-3 font-mono text-xs leading-6 sm:p-4">
                      <code>{snippet.code}</code>
                    </pre>

                    <div className="mt-4 border-t border-border/60 pt-3 font-mono text-[10px] text-muted-foreground">
                      Updated{" "}
                      {new Date(
                        snippet.updatedAt
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
