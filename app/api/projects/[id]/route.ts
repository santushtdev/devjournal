import { prisma } from "@/lib/prisma";

export async function GET(request:Request,{params}:{params:Promise<{id:string}>})
{

    const { id }= await params;

    const projects=await prisma.project.findUnique(
        {
            where:{
                id:Number(id)
            }
        }
    );

    return Response.json(projects); 
}
export async function PATCH(request:Request,{params}:{params:Promise<{id:string}>}){

    const {id}= await params;
    const body= await request.json();
    const projects=await prisma.project.update({
        where:{
            id:Number(id)
        },
        data:{
            ...(body.title!==undefined && {title:body.title}),
            ...(body.desciption!==undefined && {desciption:body.   desciption}),
            ...(body.githubUrl==!undefined && {githubUrl:body.githubUrl})
        }
    });

    return Response.json(projects);
}

export async function DELETE(request:Request,{params}:{params:Promise<{id:string}>}){
    const {id}=await params;
    const projects=await prisma.project.delete({
        where:{
            id:Number(id)
        }
    });

    return Response.json(projects);

}
 
 
   

