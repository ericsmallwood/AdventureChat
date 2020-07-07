import {injectable} from "inversify";
import IEmailDao from "../IEmailDao";
import {mailDetails} from "../../config";
const nodemailer = require('nodemailer');

@injectable()
export default class EmailNodeMailerDao implements IEmailDao {
    send(recipient: string, subject: string, text: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const transporter = nodemailer.createTransport(mailDetails);
            const mailOptions = {
                from: mailDetails.auth.user,
                to: recipient,
                subject: subject,
                text: text
            }

            transporter.sendMail(mailOptions, (error: any, info: any) => {
                if (error) {
                    reject(error);
                } else {
                    resolve('Email sent: ' + info.response);
                }
            });
        });
    }
}
