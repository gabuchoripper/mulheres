import prismacliente from "../prisma";
import { hash , compare} from "bcryptjs";
import { sign } from "jsonwebtoken";
import MailerService from "./MailerService";

interface UserInsert  {
    name:string,
    admin:boolean,
    cnpj:string,
    empresa:string,
    email:string,
    password:string
}

interface UserAuth  {
    email:string
    password:string
}

type UserUpdateProps = {
    name:string;
    id:string;
    cnpj:string;
    empresa:string;
    email:string;
}

type UserPasswordUpdateProps = {
    id:string;
    password:string;
}

type EditUserProps = {
    id :string,
    name :string,
    email:string,
    cnpj:string,
    empresa:string,
    admin:boolean,
    senha:string,
    confirmsenha:string,
}



const UserService = class UserService{


    static async getedituser(id:string){
        const user = await prismacliente.user.findFirst({
            where:{
                id:id
            }
        })
        return user
    }

    static async editeuser({senha,admin,confirmsenha,cnpj,empresa,name,email,id}:EditUserProps){

    }
    static async listusers({namesearch = null}){

        if(namesearch != null){
            const users  = await prismacliente.user.findMany({
                where:{
                    name:{
                        contains:namesearch
                    }
                },select:{
                    name:true,
                    id:true,
                    email:true,
                    empresa:true,
                    active:true,
                    admin:true,
                    inactivedate:true
                },orderBy:{
                    name:'asc'
                }
            })
            return users;
        }else{
            const users  = await prismacliente.user.findMany({
                select:{
                    name:true,
                    id:true,
                    email:true,
                    empresa:true,
                    active:true,
                    admin:true,
                    inactivedate:true
                },orderBy:{
                name:'asc'
            }
            })
            return users;
        }


    }
    static async insertUser({name,email,password,cnpj,empresa,admin}:UserInsert){

        
        if(!email){
            throw new Error("E-Mail é necessário"); 
        }

        const existsUser = await prismacliente.user.findFirst({
            where:{email:email}
        });
        
        if(existsUser){
            throw new Error("E-Mail já cadastrado");  
        }
        
        const passwordhashed = await hash(password, 8);
        
        const user = await prismacliente.user.create({
            data:{
                email:email,
                name:name,
                password:passwordhashed,
                cnpj:cnpj,
                empresa:empresa,
                admin:admin
                
            },select:{
                id:true,
                name:true,
                email:true,
                created_at:true,
                updated_at:true
            }
        })

        return user
    }

    static async activateuser(id:string){
        const response = await prismacliente.user.update({
            data:{
                active:true
            },
            where:{
                id:id
            },
            select:{
                name:true,
                admin:true,
                email:true,
                id:true,
                cnpj:true,
                empresa:true,
                active:true
            }
        })

        return response;
    }

    static async deactivateuser(id:string){
        const response = await prismacliente.user.update({
            data:{
                active:false
            },
            where:{
                id:id
            },
            select:{
                name:true,
                admin:true,
                email:true,
                id:true,
                cnpj:true,
                empresa:true,
                active:true
            }
        })

        return response;
    }

    static async Auth({email,password}:UserAuth){

            const admin = await prismacliente.user.findMany();

            if(admin.length < 1){
                const passwordhashed = await hash('1234', 8);
                const firstuser = await prismacliente.user.create({
                    data:{
                        name:'Administrador',
                        email:'suporte@heroica.com.br',
                        password:passwordhashed,
                        cnpj:'CNPJ',
                        empresa:'Heroica',
                        admin:true
                    }
                })
            }


            if(!email || !password ){
                throw new Error("E-Mail e senha devem ser enviados corretamente!!")
            }

            const user = await prismacliente.user.findFirst({
                where:{
                    email:email
                },select:{
                    id:true,
                    active:true,
                    name:true,
                    email:true,
                    created_at:true,
                    password:true,
                    updated_at:true,
                    admin:true
                }
            })

            if(!user){
                throw new Error("Usuário ou senha incorreto!!")
            }

            const hasedpassword = await compare(password ,user.password );
            if(!hasedpassword){
                throw new Error("Usuário ou senha incorreto!!")
            }

            if(user.active == false){
                throw new Error('Usuário inativo, entre em contato com a administração')
            }

            const token = sign({
                user:user.name,
                email:user.email
            },
            process.env.JWT_HASH,
            {
                subject:user.id,
                expiresIn:'30d'
            })
            return {
                id:user.id,
                name:user.name,
                email:user.email,
                admin:user.admin,
                token:token
            } ;
    

        
    }

    static async UpdateUser({cnpj,email,empresa,id,name}:UserUpdateProps){

        const user = await prismacliente.user.findFirst({where:{id:id}})
        if(!user){
            throw new Error('Usuário não encontrado')
        }

        if(!cnpj || !email || !empresa || !name){
            throw new Error('Preencha todos os campos')
        }

        const checkemail = await prismacliente.user.findMany({
            where:{
                id:{
                    not:id
                },
                email:email
            }
        })

        if(checkemail.length>0){
            throw new Error('Já existe esse e-mail cadastrado')
        }

        try{
            const response = await prismacliente.user.update({
                data:{
                    name:name,
                    email:email,
                    empresa:empresa,
                    cnpj:cnpj
                },where:{id:id}
            })

            return response;
        }catch(err){
            console.log(err)
            throw new Error(err);    
        }    
    }

    static async deleteaccountbykey(key:string){
        const request = await prismacliente.deleteUserRequest.findFirst({where:{
                userkey:key
            }
        })

        if(!request){
            throw new Error('Requisição inválida ou não existente')
        }

        const user = await prismacliente.user.findFirst({
            where:{
                id:request.id_user
            }
        })

        if(!user){
            throw new Error('User not found')
        }

        await prismacliente.user.delete({
            where:{
                id:user.id
            }
        })

        return prismacliente.deleteUserRequest.deleteMany({where:{
                userkey:key
            }
        })


    }

    static async deleteaccountbyemail(email:string){
        const user = await prismacliente.user.findFirst({
            where:{
                email:email
            }
        })

        if(!user){
            throw new Error('Usuário não encontrado');
        }

        let crypto = require('crypto');

        const md5 = crypto.createHash('md5').update(user.id).digest("hex");

        const checkrequest = await prismacliente.deleteUserRequest.findFirst(
            {
                where:{
                    id_user:  user.id
                    }
            })


        if(!checkrequest){
            try{
                const request = await prismacliente.deleteUserRequest.create({
                    data:{
                        id_user:  user.id,
                        userkey:md5
                    }
                })


                let message = `
            <h1>Prezado ${user.name}</h1>
            <p style="font-size: 14px" >Uma requisição para exclusão de sua conta foi realizada.</p>
            <p>Para confirmar a operação, copie e cole o endereço abaixo no navegador ou clique no botão de confirmação</p>
            <p style="font-size: 14px" >https://forumdasmulheresdenegocios.org/delete_acc.php?key=${request.userkey}</p>    
            <a style="color:#fff;text-align:center;display: block;width: 80%;margin: 20px auto;border: none;border-radius: 10px;background-color: #ff3f4b;text-decoration: none;cursor: pointer;padding: 20px;" href="https://forumdasmulheresdenegocios.org/delete_acc.php?key=${request.userkey}" target="_blank" >CONFIRMAR EXCLUSÃO</a> 
            <p style="font-size: 14px" >CASO NÃO RECONHEÇA ESSA MENSAGEM, IGNORE-A, E-MAIL GERADO AUTOMATICAMENTE, NÃO RESPONDA</p>
            `;

                let sendemail = await MailerService.send({message,to : user.email , subject:'Exclusão de conta'});
                return sendemail;


            }catch (err){
                throw new Error(err)
            }

        }else{
            throw new Error('Já existe uma requisição para esse e-mail, verifique sua caixa de e-mail, ou tente novamente mais tarde.')
        }


    }

    static async deleteuserapp(userid){
        const user = await prismacliente.user.findFirst({
            where:{
                id:userid
            }
        })


        if(!user){
            throw new Error('Usuário não encontrado');
        }


        await prismacliente.deleteUserRequest.deleteMany({
            where:{
                id_user:userid
            }
        })

        return prismacliente.user.delete({
            where:{
                id:userid
            }
        })

    }



    static async UserDetailService(userid:string){
        const user = await prismacliente.user.findFirst({
            where:{
                id:userid
            },
            select:{
                name:true,
                admin:true,
                email:true,
                id:true,
                cnpj:true,
                empresa:true,
                active:true
            }
        })
        return user;
    }

}

export default UserService