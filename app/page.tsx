
import { prisma } from "@/lib/prisma"
import { RecentProject } from "@/components/dashboard/recent-project";
import { RecentNotes } from "@/components/dashboard/recent-notes";
import { RecentSnippets } from "@/components/dashboard/recent-snippets";

export default async function Home() {

  const projects= await prisma.project.findMany(
    {
      orderBy:{
        updatedAt:"desc",
      },
    }
  )
  const notes = await prisma.notes.findMany({
  orderBy: {
    updatedAt: "desc",
  },
})
const snippets = await prisma.snippet.findMany({
  orderBy: {
    updatedAt: "desc",
  },
})
  

  return (
    <div className="flex min-h-[calc(100vh-40px)] w-full items-center p-6">
      <main className="grid w-full grid-cols-3 gap-6">

      <RecentProject projects={projects}/>
      <RecentNotes notes={notes}/>
      <RecentSnippets snippets={snippets} />
      </main>
    </div>
  );
}
