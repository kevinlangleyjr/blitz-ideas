import * as SendGridMail from '@sendgrid/mail';

SendGridMail.setApiKey( process?.env?.SENDGRID_API_KEY as string );

export default SendGridMail;
