import { prisma } from "@/lib/prisma";

export async function GET(){
    const projects=await prisma.project.findMany();

    return Response.json(projects); 
}

export async function POST(request: Request){

    const body=await request.json();
    const projects=await prisma.project.create({
        data: {
            title:body.title,
            desciption :body.desciption,
            githubUrl:body.githubUrl
        }})
}