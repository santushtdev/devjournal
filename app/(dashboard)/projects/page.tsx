
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function ProjectsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const projects = await prisma.project.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <main className="min-h-screen p-4 sm:p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Projects
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage all your development projects.
            </p>
          </div>

          <Link
            href="/projects/create"
            className="w-full rounded-md bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground hover:opacity-90 sm:w-auto"
          >
            + Create Project
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className="rounded-xl border p-6 text-center sm:p-10">
            <h2 className="text-lg font-semibold">
              No projects yet
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Create your first project to start building your DevJournal.
            </p>

            <Link
              href="/projects/create"
              className="mt-5 inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Create Project
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((project) => (
              <div
                key={project.id}
                className="rounded-xl border p-5 shadow-sm"
              >
                <div className="mb-4">
                  <h2 className="break-words text-xl font-semibold">
                    {project.title}
                  </h2>

                  <p className="mt-2 break-words text-sm text-muted-foreground">
                    {project.desciption}
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium underline underline-offset-4"
                  >
                    GitHub
                  </a>

                  <div className="flex gap-2">
                    <Link
                      href={`/projects/${project.id}/edit`}
                      className="rounded-md border px-3 py-1.5 text-sm hover:bg-muted"
                    >
                      Edit
                    </Link>

                    <Link
                      href={`/projects/${project.id}`}
                      className="rounded-md border px-3 py-1.5 text-sm hover:bg-muted"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
