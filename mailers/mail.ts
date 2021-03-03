import { log } from '@blitzjs/display';
import { sendgridDriver } from './drivers/sendgrid';
import { previewDriver } from './drivers/preview-email';

const mailDrivers = {
  SENDGRID: sendgridDriver,
  PREVIEW: previewDriver,
};

if ( ! mailDrivers[process.env.MAIL_DRIVER as keyof typeof mailDrivers] ) {
  const allowedDriversLabel = Object.keys( mailDrivers ).join( ', ' );

  const errorMessage = `Invalid MAIL_DRIVER environment variable. Must be one of: ${allowedDriversLabel}`;

  log.error( errorMessage );

  throw new Error( errorMessage );
}

const mailDriver = mailDrivers[process.env.MAIL_DRIVER as keyof typeof mailDrivers]();

export type MailDriver = () => {
  send: ( options: {
    from: {
      email: string
      name: string
    }
    to: string
    subject: string
    html: string
  } ) => Promise<any>
}

export const mail = {
  send: async ( {
    subject,
    to,
    html,
  }: {
    subject: string
    to: string
    html: string
  } ) => {
    try {
      return await mailDriver.send( {
        from: {
          email: process.env.MAIL_FROM_EMAIL!,
          name: process.env.MAIL_FROM_NAME!,
        },
        to,
        subject,
        html,
      } );
    } catch ( e ) {
      console.error( e?.response?.body || e );
    }
  },
};
