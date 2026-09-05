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
  const snippetId = Number(id);

  if (Number.isNaN(snippetId)) {
    return Response.json(
      { error: "Invalid snippet ID" },
      { status: 400 }
    );
  }

  const snippet = await prisma.snippet.findFirst({
    where: {
      id: snippetId,
      userId: session.user.id,
    },
  });

  if (!snippet) {
    return Response.json(
      { error: "Snippet not found" },
      { status: 404 }
    );
  }

  return Response.json(snippet);
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
  const snippetId = Number(id);

  if (Number.isNaN(snippetId)) {
    return Response.json(
      { error: "Invalid snippet ID" },
      { status: 400 }
    );
  }

  const body = await request.json();

  const existingSnippet = await prisma.snippet.findFirst({
    where: {
      id: snippetId,
      userId: session.user.id,
    },
  });

  if (!existingSnippet) {
    return Response.json(
      { error: "Snippet not found" },
      { status: 404 }
    );
  }

  if (!body.title || !body.code || !body.language) {
    return Response.json(
      { error: "Title, code, and language are required" },
      { status: 400 }
    );
  }

  const snippet = await prisma.snippet.update({
    where: {
      id: snippetId,
    },
    data: {
      title: body.title,
      code: body.code,
      language: body.language,
      desciption: body.desciption || null,
    },
  });

  return Response.json(snippet);
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
  const snippetId = Number(id);

  if (Number.isNaN(snippetId)) {
    return Response.json(
      { error: "Invalid snippet ID" },
      { status: 400 }
    );
  }

  const existingSnippet = await prisma.snippet.findFirst({
    where: {
      id: snippetId,
      userId: session.user.id,
    },
  });

  if (!existingSnippet) {
    return Response.json(
      { error: "Snippet not found" },
      { status: 404 }
    );
  }

  await prisma.snippet.delete({
    where: {
      id: snippetId,
    },
  });

  return Response.json({
    message: "Snippet deleted successfully",
  });
}