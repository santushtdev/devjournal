"use client";

import { FormEvent, useEffect, useState } from "react";
import { Code2, Plus, Trash2 } from "lucide-react";

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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/snippet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          code,
          language,
          desciption: description || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to create snippet");
        return;
      }

      setSnippets((current) => [data, ...current]);

      setTitle("");
      setLanguage("");
      setCode("");
      setDescription("");
    } catch (error) {
      console.error("CREATE SNIPPET ERROR:", error);
      setError("Something went wrong");
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

    try {
      const response = await fetch(`/api/snippet/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to delete snippet");
        return;
      }

      setSnippets((current) =>
        current.filter((snippet) => snippet.id !== id)
      );
    } catch (error) {
      console.error("DELETE SNIPPET ERROR:", error);
      setError("Failed to delete snippet");
    }
  }

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-primary">
            <Code2 className="size-4" />
            Code Library
          </div>

          <h1 className="mt-2 font-mono text-3xl font-bold tracking-tight">
            Snippets
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Save reusable code and solutions for your future projects.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
          <div className="h-fit rounded-xl border border-border/70 bg-card p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-2">
              <Plus className="size-4 text-primary" />

              <h2 className="font-mono text-sm font-semibold">
                Create Snippet
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
                  placeholder="e.g. Binary Search"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
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
                  onChange={(e) => setLanguage(e.target.value)}
                  required
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
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
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
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
                  onChange={(e) => setCode(e.target.value)}
                  required
                  rows={10}
                  className="w-full resize-none rounded-md border bg-background px-3 py-2 font-mono text-xs outline-none focus:ring-2 focus:ring-ring"
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
                {loading ? "Saving..." : "Save Snippet"}
              </button>
            </form>
          </div>

          <div>
            {fetching ? (
              <div className="rounded-xl border p-8 text-center text-sm text-muted-foreground">
                Loading snippets...
              </div>
            ) : snippets.length === 0 ? (
              <div className="rounded-xl border p-10 text-center">
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
                    className="rounded-xl border border-border/70 bg-card p-5 shadow-sm transition-all hover:border-primary/30"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h2 className="font-mono text-base font-semibold">
                          {snippet.title}
                        </h2>

                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-primary/10 px-2 py-1 font-mono text-[10px] text-primary">
                            {snippet.language}
                          </span>

                          {snippet.desciption && (
                            <span className="text-xs text-muted-foreground">
                              {snippet.desciption}
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDelete(snippet.id)}
                        aria-label={`Delete ${snippet.title}`}
                        className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>

                    <pre className="mt-5 overflow-x-auto rounded-lg border border-border/70 bg-background p-4 font-mono text-xs leading-6">
                      <code>{snippet.code}</code>
                    </pre>

                    <div className="mt-4 border-t border-border/60 pt-3 font-mono text-[10px] text-muted-foreground">
                      Updated{" "}
                      {new Date(snippet.updatedAt).toLocaleDateString()}
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