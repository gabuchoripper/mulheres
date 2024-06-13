import nodemailer from "nodemailer";


interface MessageProps  {
    message:string;
    to:string;
    subject:string
}

const MailerService = class MailerService{


    static  transporter = nodemailer.createTransport({
        host: "mail.forumdasmulheresdenegocios.org",
        port: 465,
        secure: true,
        auth: {
            user: "no-reply@forumdasmulheresdenegocios.org",
            pass: "JB1RiOedWnnH",
        },
    });


    static async send({message,to,subject}:MessageProps) {


        return this.transporter.sendMail({
            from: '"No-Reply" <no-reply@forumdasmulheresdenegocios.org>',
            to: to,
            subject: subject,
            html: message,
        });

    }

}






export default MailerService;
