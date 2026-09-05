
"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateProjectPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function validateForm() {
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    const trimmedGithubUrl = githubUrl.trim();

    if (!trimmedTitle) {
      return "Project title is required.";
    }

    if (trimmedTitle.length < 2) {
      return "Project title must be at least 2 characters.";
    }

    if (!trimmedDescription) {
      return "Project description is required.";
    }

    if (trimmedDescription.length < 10) {
      return "Project description must be at least 10 characters.";
    }

    if (!trimmedGithubUrl) {
      return "GitHub URL is required.";
    }

    try {
      const url = new URL(trimmedGithubUrl);

      if (
        url.protocol !== "https:" ||
        url.hostname !== "github.com"
      ) {
        return "Please enter a valid GitHub URL.";
      }
    } catch {
      return "Please enter a valid GitHub URL.";
    }

    return "";
  }

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          desciption: description.trim(),
          githubUrl: githubUrl.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.error || "Failed to create project"
        );
        return;
      }

      router.push("/projects");
      router.refresh();
    } catch (error) {
      console.error("CREATE PROJECT ERROR:", error);
      setError(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-2xl rounded-xl border p-5 shadow-sm sm:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            Create Project
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Add a project to your DevJournal.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="text-sm font-medium"
            >
              Project Title
            </label>

            <input
              id="title"
              type="text"
              placeholder="e.g. DevJournal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={loading}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-sm font-medium"
            >
              Description
            </label>

            <textarea
              id="description"
              placeholder="Describe your project..."
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              required
              disabled={loading}
              rows={5}
              className="w-full resize-none rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="githubUrl"
              className="text-sm font-medium"
            >
              GitHub URL
            </label>

            <input
              id="githubUrl"
              type="url"
              placeholder="https://github.com/username/project"
              value={githubUrl}
              onChange={(e) =>
                setGithubUrl(e.target.value)
              }
              required
              disabled={loading}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          {error && (
            <p className="text-sm text-destructive">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Creating Project..."
              : "Create Project"}
          </button>
        </form>
      </div>
    </main>
  );
}
