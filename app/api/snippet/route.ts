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

  const snippets = await prisma.snippet.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return Response.json(snippets);
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

  if (!body.title || !body.code || !body.language) {
    return Response.json(
      { error: "Title, code, and language are required" },
      { status: 400 }
    );
  }

  const snippet = await prisma.snippet.create({
    data: {
      title: body.title,
      code: body.code,
      language: body.language,
      desciption: body.desciption || null,
      userId: session.user.id,
    },
  });

  return Response.json(snippet, { status: 201 });
}