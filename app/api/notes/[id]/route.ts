import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: Request,
  context: RouteContext
) {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await context.params;
  const noteId = Number(id);

  if (Number.isNaN(noteId)) {
    return Response.json(
      { error: "Invalid note ID" },
      { status: 400 }
    );
  }

  const note = await prisma.notes.findFirst({
    where: {
      id: noteId,
      userId: session.user.id,
    },
  });

  if (!note) {
    return Response.json(
      { error: "Note not found" },
      { status: 404 }
    );
  }

  return Response.json(note);
}

export async function PUT(
  request: Request,
  context: RouteContext
) {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await context.params;
  const noteId = Number(id);

  if (Number.isNaN(noteId)) {
    return Response.json(
      { error: "Invalid note ID" },
      { status: 400 }
    );
  }

  const body = await request.json();

  const existingNote = await prisma.notes.findFirst({
    where: {
      id: noteId,
      userId: session.user.id,
    },
  });

  if (!existingNote) {
    return Response.json(
      { error: "Note not found" },
      { status: 404 }
    );
  }

  if (!body.title || !body.content) {
    return Response.json(
      { error: "Title and content are required" },
      { status: 400 }
    );
  }

  const note = await prisma.notes.update({
    where: {
      id: noteId,
    },
    data: {
      title: body.title,
      content: body.content,
      category: body.category || null,
    },
  });

  return Response.json(note);
}

export async function DELETE(
  request: Request,
  context: RouteContext
) {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await context.params;
  const noteId = Number(id);

  if (Number.isNaN(noteId)) {
    return Response.json(
      { error: "Invalid note ID" },
      { status: 400 }
    );
  }

  const existingNote = await prisma.notes.findFirst({
    where: {
      id: noteId,
      userId: session.user.id,
    },
  });

  if (!existingNote) {
    return Response.json(
      { error: "Note not found" },
      { status: 404 }
    );
  }

  await prisma.notes.delete({
    where: {
      id: noteId,
    },
  });

  return Response.json({
    message: "Note deleted successfully",
  });
}