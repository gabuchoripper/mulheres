import prismacliente from "../prisma";

const HomeService = class HomeService{
    static async listorders(){
        const orders = [
            {
                message : 'Lista de objetos da ordem'
            }
        ];

        return orders
    }
}


export default HomeService;