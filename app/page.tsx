import Image from "next/image";
import { RecentProject } from "@/components/dashboard/recent-project";
import { RecentNotes } from "@/components/dashboard/recent-notes";
import { RecentSnippets } from "@/components/dashboard/recent-snippets";

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-40px)] w-full items-center p-6">
      <main className="grid w-full grid-cols-3 gap-6">

      <RecentProject />
      <RecentNotes />
      <RecentSnippets />
      </main>
    </div>
  );
}
