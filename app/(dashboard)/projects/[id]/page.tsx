
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

type Project = {
  id: number;
  title: string;
  desciption: string;
  githubUrl: string;
  createdAt: string;
  updatedAt: string;
};

export default function ProjectDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const projectId = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProject() {
      try {
        const response = await fetch(`/api/projects/${projectId}`);

        if (!response.ok) {
          throw new Error("Project not found");
        }

        const data = await response.json();

        setProject(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load project.");
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [projectId]);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project? This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    setDeleting(true);
    setError("");

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();

        throw new Error(
          data.error || "Failed to delete project"
        );
      }

      router.push("/projects");
      router.refresh();
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong.");
      }

      setDeleting(false);
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

  if (!project) {
    return (
      <main className="min-h-screen p-4 sm:p-6">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-xl border p-5 sm:p-6">
            <h1 className="text-lg font-semibold">
              Project not found
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              {error || "The project could not be found."}
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
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm text-muted-foreground">
              Project Details
            </p>

            <h1 className="mt-1 break-words text-3xl font-bold">
              {project.title}
            </h1>
          </div>

          <Link
            href="/projects"
            className="self-start rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted sm:self-auto"
          >
            ← Back
          </Link>
        </div>

        <div className="rounded-xl border p-5 shadow-sm sm:p-6">
          <div className="mb-6">
            <h2 className="text-sm font-medium text-muted-foreground">
              Description
            </h2>

            <p className="mt-2 break-words leading-7">
              {project.desciption || "No description provided."}
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-sm font-medium text-muted-foreground">
              GitHub Repository
            </h2>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block max-w-full break-all text-sm font-medium underline underline-offset-4"
            >
              Open GitHub Repository →
            </a>
          </div>

          <div className="grid gap-4 border-t pt-6 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Created
              </p>

              <p className="mt-1 text-sm">
                {new Date(
                  project.createdAt
                ).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Last Updated
              </p>

              <p className="mt-1 text-sm">
                {new Date(
                  project.updatedAt
                ).toLocaleDateString()}
              </p>
            </div>
          </div>

          {error && (
            <p className="mt-6 text-sm text-destructive">
              {error}
            </p>
          )}

          <div className="mt-8 flex flex-col gap-3 border-t pt-6 sm:flex-row sm:justify-end">
            <Link
              href={`/projects/${project.id}/edit`}
              className="rounded-md border px-4 py-2 text-center text-sm font-medium hover:bg-muted"
            >
              Edit Project
            </Link>

            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {deleting ? "Deleting..." : "Delete Project"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}