import prismacliente from "../prisma";

type AssociadaInsertProp =  {

    name: string,
    razaosocial: string,
    ramo: string,
    website: string,
    description: string,
    discount: string,
    imagepath: string
}

interface AssociadaProp extends AssociadaInsertProp  {
    id:string

}


const AssociadasService = class  AssociadasService{

    static async getAssociadaInfo(id:string){
        return prismacliente.associado.findFirst({
            where:{
                id:id
            }
        })
    }

    static async getallassociadas(name = null){
        if(name!= null){
            return prismacliente.associado.findMany({
                where:{
                   OR:[
                       {name:{
                           contains:name
                           }
                       },
                       {
                           razaosocial:{
                               contains:name
                           }
                       }
                   ]
                }
            })
        }else{
            return prismacliente.associado.findMany()
        }

    }

    static async insertassociada({name,description,discount,imagepath,ramo,razaosocial,website}:AssociadaInsertProp){

        if(!!name == false) {
            throw new Error('Nome inválido')
        }
        const checkexist = await prismacliente.associado.findFirst({
            where:{
                name:name,
                razaosocial:razaosocial
            }
        })

        if(!!checkexist){
            throw new Error('Já existe um associado com esse nome e razão')
        }

        const response = await prismacliente.associado.create({
            data:{
                name,
                razaosocial,
                description,
                discount,
                imagepath,
                ramo,
                website

            }
        })
        return response


    }

    static async getassociada(id){
        return prismacliente.associado.findFirst({
            where:{
                id
            }
        })
    }

    static async updateassociada({id,name,description,discount,imagepath,ramo,razaosocial,website}:AssociadaProp){

    }

}

export  default AssociadasService