import sgMail from '@sendgrid/mail';
import { MailDriver } from '../mail';

export const sendgridDriver: MailDriver = () => {
  sgMail.setApiKey( process.env.SENDGRID_API_KEY! );

  return sgMail;
};
