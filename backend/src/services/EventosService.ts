import prismacliente from "../prisma";


type EventoInsertProp = {
    name: string,
    descricao : string,
    palestrante : string,
    local : string,
    data : string,
    vagas : number,
    label: string,

}

type EventoUpdateProp = {
    id:string,
    name: string,
    descricao : string,
    palestrante : string,
    local : string,
    data : string,
    vagas : number,
    label: string,

}

type GetInscritosDetailProps = {
    userid:string,
    id:string
}

const EventosService = class EventosService{

    static async geteventos(name = null){

        if(name != null){
            name = name.trim();
            return  prismacliente.evento.findMany({
                where:{
                    name:{
                        contains:name
                    }
                }
            })

        }else{
            return prismacliente.evento.findMany({})
        }
    }

    static geteventodetail(id:string){
        return prismacliente.evento.findFirst({where:{
                id:id
            }

        })
    }

    static async insert({label,descricao,local,palestrante,vagas,name,data}:EventoInsertProp){
        name = name.trim()



        if(name === ''){

            throw new Error('Nome necessário')
        }

        data = !!data?data:null;
        vagas = !!vagas?vagas:null;



        try{
            return await prismacliente.evento.create({
                data: {
                    name: name,
                    data: data,
                    label: label,
                    descricao: descricao,
                    local: local,
                    palestrante: palestrante,
                    vagas: vagas
                }

            });
        }catch (err: any){
            throw new Error(err.message)
        }


    }

    static async updateevento({label,descricao,local,palestrante,vagas,name,data,id}:EventoUpdateProp){
        name = name.trim()



        if(name === ''){

            throw new Error('Nome necessário')
        }

        data = !!data?data:null;
        vagas = !!vagas?vagas:null;

        try{
            return await prismacliente.evento.update({
                data: {
                    name: name,
                    data: data,
                    label: label,
                    descricao: descricao,
                    local: local,
                    palestrante: palestrante,
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
        const jainscrito = await prismacliente.inscricaoEvento.findFirst({
            where:{
                id_evento:id,
                id_user:userid
            }
        })

        if(!!jainscrito){
            throw new Error('Já inscrito no curso')
        }

        const inscritos = await prismacliente.user.findMany({
            where:{
                inscricaoevento:{
                    some:{
                        id_evento:id
                    }
                }
            }
        })

        const evento = await prismacliente.evento.findFirst({where:{
                id:id
            }
        })

        if(evento.vagas > inscritos.length ){

            const response = await prismacliente.inscricaoEvento.create({
                data:{
                    id_evento:id,
                    id_user:userid
                }
            })
            return response;

        }else{
            throw new Error('Não há vagas disponíveis')
        }

    }

    static async unsetinscricao({id,userid}:GetInscritosDetailProps){

        const checkinscricao = await prismacliente.inscricaoEvento.findFirst({
            where:{
                id_user:userid,
                id_evento:id
            }
        })

        if(!!checkinscricao == false){
            throw new Error('Inscrição não encontrada')
        }

        await prismacliente.inscricaoEvento.deleteMany({
            where:{
                id_evento:id,
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
                inscricaoevento:{
                    some:{
                        id_evento:id
                    }
                },
                active:true
            },
            select:{
                name:true,
                id:true
            }
        })

        const meinscrito = await prismacliente.inscricaoEvento.findFirst({
            where:{
                id_evento:id,
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

    static async deleteevento(id:string){
        const checkevento = await prismacliente.evento.findFirst({
            where:{
                id
            }
        })


        if(!!checkevento == false){
            throw new Error('Evento não encontrado')
        }

        const response = await prismacliente.evento.delete({
            where:{
                id
            }
        })
        return response
    }

}

export  default EventosService;