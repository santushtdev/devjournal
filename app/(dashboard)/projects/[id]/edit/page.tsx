
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function EditProjectPage() {
  const params = useParams();
  const router = useRouter();

  const projectId = params.id as string;

  const [title, setTitle] = useState("");
  const [desciption, setDesciption] = useState("");
  const [githubUrl, setGithubUrl] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProject() {
      try {
        const response = await fetch(`/api/projects/${projectId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch project");
        }

        const project = await response.json();

        setTitle(project.title);
        setDesciption(project.desciption);
        setGithubUrl(project.githubUrl);
      } catch (error) {
        console.error(error);
        setError("Failed to load project.");
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [projectId]);

  function validateForm() {
    const trimmedTitle = title.trim();
    const trimmedDescription = desciption.trim();
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
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          desciption: desciption.trim(),
          githubUrl: githubUrl.trim(),
        }),
      });

      if (!response.ok) {
        const data = await response.json();

        throw new Error(
          data.error || "Failed to update project"
        );
      }

      router.push(`/projects/${projectId}`);
      router.refresh();
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(
          "Unable to connect to the server. Please try again."
        );
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen p-4 sm:p-6">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm text-muted-foreground">
            Loading project...
          </p>
        </div>
      </main>
    );
  }

  if (error && !title) {
    return (
      <main className="min-h-screen p-4 sm:p-6">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-xl border p-5 sm:p-6">
            <p className="text-sm text-destructive">
              {error}
            </p>

            <Link
              href="/projects"
              className="mt-4 inline-block rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              ← Back to Projects
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-4 sm:p-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 sm:mb-8">
          <Link
            href={`/projects/${projectId}`}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to Project
          </Link>

          <h1 className="mt-4 text-2xl font-bold sm:text-3xl">
            Edit Project
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Update your project information.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border p-5 shadow-sm sm:p-6"
        >
          <div className="space-y-5">
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium"
              >
                Project Title
              </label>

              <input
                id="title"
                type="text"
                value={title}
                onChange={(event) =>
                  setTitle(event.target.value)
                }
                required
                disabled={saving}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter project title"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium"
              >
                Description
              </label>

              <textarea
                id="description"
                value={desciption}
                onChange={(event) =>
                  setDesciption(event.target.value)
                }
                required
                disabled={saving}
                rows={5}
                className="w-full resize-none rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Describe your project"
              />
            </div>

            <div>
              <label
                htmlFor="githubUrl"
                className="mb-2 block text-sm font-medium"
              >
                GitHub URL
              </label>

              <input
                id="githubUrl"
                type="url"
                value={githubUrl}
                onChange={(event) =>
                  setGithubUrl(event.target.value)
                }
                required
                disabled={saving}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="https://github.com/username/project"
              />
            </div>
          </div>

          {error && (
            <p className="mt-4 break-words text-sm text-destructive">
              {error}
            </p>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Link
              href={`/projects/${projectId}`}
              className="rounded-md border px-4 py-2 text-center text-sm font-medium hover:bg-muted"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}