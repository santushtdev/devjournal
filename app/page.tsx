import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { LogoutButton } from "@/components/auth/logout-button";
import { RecentProject } from "@/components/dashboard/recent-project";
import { RecentNotes } from "@/components/dashboard/recent-notes";
import { RecentSnippets } from "@/components/dashboard/recent-snippets";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

export default async function Home() {
  const session = await auth();

  const projects = session?.user?.id
    ? await prisma.project.findMany({
        where: {
          userId: session.user.id,
        },
        orderBy: {
          updatedAt: "desc",
        },
      })
    : [];

  const notes = session?.user?.id
    ? await prisma.notes.findMany({
        where: {
          userId: session.user.id,
        },
        orderBy: {
          updatedAt: "desc",
        },
      })
    : [];

  const snippets = session?.user?.id
    ? await prisma.snippet.findMany({
        where: {
          userId: session.user.id,
        },
        orderBy: {
          updatedAt: "desc",
        },
      })
    : [];

  const userName = session?.user?.name || session?.user?.email || "User";

  const initials = userName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex min-h-[calc(100vh-40px)] w-full items-center p-6">

      <main className="grid w-full grid-cols-3 gap-6">

        <RecentProject projects={projects} />
        <RecentNotes notes={notes} />
        <RecentSnippets snippets={snippets} />

      </main>

      {/* Authentication Buttons */}
      <div className="fixed right-6 top-6 flex items-center gap-3">
        {!session ? (
          <>
            <Link
              href="/login"
              className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Avatar>
              <AvatarImage
                src={session.user?.image || ""}
                alt={userName}
              />
              <AvatarFallback>
                {initials}
              </AvatarFallback>
            </Avatar>

            <LogoutButton />
          </>
        )}
      </div>

    </div>
  );
}