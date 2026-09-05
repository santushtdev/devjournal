import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const notes = await prisma.notes.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return Response.json(notes);
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await request.json();

  if (!body.title || !body.content) {
    return Response.json(
      { error: "Title and content are required" },
      { status: 400 }
    );
  }

  const note = await prisma.notes.create({
    data: {
      title: body.title,
      content: body.content,
      category: body.category || null,
      userId: session.user.id,
    },
  });

  return Response.json(note, { status: 201 });
}