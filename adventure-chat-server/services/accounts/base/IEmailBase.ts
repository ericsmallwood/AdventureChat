export default interface IEmailBase {
    send(recipient: string, subject: string, text: string): Promise<any>;
}
