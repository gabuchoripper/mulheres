import prismacliente from "../prisma";


type CursoInsertProp = {
    name: string,
    descricao : string,
    professor : string,
    local : string,
    data : string,
    vagas : number,
    label: string,

}

type CursoUpdateProp = {
    id:string,
    name: string,
    descricao : string,
    professor : string,
    local : string,
    data : string,
    vagas : number,
    label: string,

}

type GetInscritosDetailProps = {
    userid:string,
    id:string
}

const CursosService = class CursosService{

    static async getcursos(name = null){

        if(name != null){
            name = name.trim();
            return  prismacliente.curso.findMany({
                where:{
                    name:{
                        contains:name
                    }
            }
            })

        }else{
            return prismacliente.curso.findMany({})
        }
    }

    static getcursodetail(id:string){
        return prismacliente.curso.findFirst({where:{
            id:id
            }

        })
    }

    static async insert({label,descricao,local,professor,vagas,name,data}:CursoInsertProp){
        name = name.trim()



        if(name === ''){

            throw new Error('Nome necessário')
        }

        data = !!data?data:null;
        vagas = !!vagas?vagas:null;



        try{
            return await prismacliente.curso.create({
                data: {
                    name: name,
                    data: data,
                    label: label,
                    descricao: descricao,
                    local: local,
                    professor: professor,
                    vagas: vagas
                }

            });
        }catch (err: any){
            throw new Error(err.message)
        }


    }

    static async updatecurso({label,descricao,local,professor,vagas,name,data,id}:CursoUpdateProp){
        name = name.trim()



        if(name === ''){

            throw new Error('Nome necessário')
        }

        data = !!data?data:null;
        vagas = !!vagas?vagas:null;

        try{
            return await prismacliente.curso.update({
                data: {
                    name: name,
                    data: data,
                    label: label,
                    descricao: descricao,
                    local: local,
                    professor: professor,
                    vagas: vagas
                },where:{
                    id:id
                }
            });
        }catch (err: any){
            throw new Error(err.message)
        }
    }

    static async setinscricao({userid , id}:GetInscritosDetailProps){
        const jainscrito = await prismacliente.inscricaoCurso.findFirst({
            where:{
                id_curso:id,
                id_user:userid
            }
        })

        if(!!jainscrito){
            throw new Error('Já inscrito no curso')
        }

        const inscritos = await prismacliente.user.findMany({
            where:{
                inscricaocurso:{
                    some:{
                        id_curso:id
                    }
                }
            }
        })

        const curso = await prismacliente.curso.findFirst({where:{
            id:id
            }
        })

        if(curso.vagas > inscritos.length ){

            const response = await prismacliente.inscricaoCurso.create({
                data:{
                    id_curso:id,
                    id_user:userid
                }
            })
            return response;

        }else{
            throw new Error('Não há vagas disponíveis')
        }

    }

    static async unsetinscricao({id,userid}:GetInscritosDetailProps){

        const checkinscricao = await prismacliente.inscricaoCurso.findFirst({
            where:{
                id_user:userid,
                id_curso:id
            }
        })

        if(!!checkinscricao == false){
            throw new Error('Inscrição não encontrada')
        }

         await prismacliente.inscricaoCurso.deleteMany({
             where:{
                 id_curso:id,
                 id_user:userid
             }
        }).then((response)=>{
             return response;
        }).catch((err)=>{
            throw new Error(err)
         })


    }

    static async getinscritosdetail({userid , id}:GetInscritosDetailProps){

        const inscritos = await prismacliente.user.findMany({
            where:{
                inscricaocurso:{
                    some:{
                        id_curso:id
                    }
                },
                active:true
            },
            select:{
                name:true,
                id:true
            }
        })

        const meinscrito = await prismacliente.inscricaoCurso.findFirst({
            where:{
                id_curso:id,
                id_user:userid
            },select:{
                id:true
            }
        })

        const response = {
            inscritos:inscritos,
            inscricao: meinscrito
        }
        return response

    }

    static async deletecurso(id:string){
        const checkcurso = await prismacliente.curso.findFirst({
            where:{
                id
            }
        })


        if(!!checkcurso == false){
            throw new Error('Curso não encontrado')
        }

        const response = await prismacliente.curso.delete({
            where:{
                id
            }
        })
        return response
    }

}

export  default CursosService;