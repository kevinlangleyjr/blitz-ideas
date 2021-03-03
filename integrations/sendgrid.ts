import * as SendGridMail from '@sendgrid/mail';

if ( process?.env?.SENDGRID_API_KEY ) {
  SendGridMail.setApiKey( process?.env?.SENDGRID_API_KEY as string );
}

export default SendGridMail;
