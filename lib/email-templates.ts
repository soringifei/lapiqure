export type EmailTemplateType = 
  | 'collection-launch' 
  | 'product-spotlight' 
  | 'private-viewing' 
  | 'newsletter' 
  | 'lookbook' 
  | 'seasonal-campaign';

export interface EmailTemplateData {
  heroImage?: string;
  headline: string;
  subheadline?: string;
  bodyText: string;
  ctaText?: string;
  ctaUrl?: string;
  productImage?: string;
  productName?: string;
  productPrice?: string;
  productUrl?: string;
  secondaryImage?: string;
  footerText?: string;
  personalization?: {
    firstName?: string;
    lastName?: string;
  };
}

export interface EmailTemplate {
  id: EmailTemplateType;
  name: string;
  description: string;
  previewImage?: string;
}

export const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: 'collection-launch',
    name: 'Collection Launch',
    description: 'Announce a new collection with hero imagery and CTA',
  },
  {
    id: 'product-spotlight',
    name: 'Product Spotlight',
    description: 'Feature a single product with details and pricing',
  },
  {
    id: 'private-viewing',
    name: 'Private Viewing Invitation',
    description: 'Invite subscribers to exclusive atelier viewings',
  },
  {
    id: 'newsletter',
    name: 'Newsletter',
    description: 'Monthly updates with multiple sections',
  },
  {
    id: 'lookbook',
    name: 'Lookbook Showcase',
    description: 'Editorial-style lookbook presentation',
  },
  {
    id: 'seasonal-campaign',
    name: 'Seasonal Campaign',
    description: 'Seasonal collection or promotional campaign',
  },
];

/**
 * Render email template to HTML
 */
export function renderEmailTemplate(
  templateType: EmailTemplateType,
  data: EmailTemplateData,
  unsubscribeUrl?: string
): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lapiqure.vercel.app';
  const firstName = data.personalization?.firstName || '';
  const greeting = firstName ? `Dear ${firstName},` : 'Dear Valued Client,';
  
  const unsubscribeLink = unsubscribeUrl || `${baseUrl}/unsubscribe?email={email}`;
  
  // Common header and footer
  const header = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>LA PIQÛRE</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #F6F2EB; color: #1F1A17;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #F6F2EB; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color: #FFFFFF; max-width: 600px; width: 100%;">
  `;

  const footer = `
              <tr>
                <td style="padding: 60px 40px 40px; text-align: center; border-top: 1px solid #E8E5E0;">
                  <p style="margin: 0 0 20px; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #4F4843;">LA PIQÛRE</p>
                  <p style="margin: 0 0 10px; font-size: 12px; color: #4F4843; line-height: 1.6;">
                    New York, USA<br>
                    <a href="mailto:alin@lapiqure.com" style="color: #1F1A17; text-decoration: none;">alin@lapiqure.com</a>
                  </p>
                  <p style="margin: 30px 0 0; font-size: 10px; color: #8B8680; line-height: 1.6;">
                    <a href="${unsubscribeLink}" style="color: #8B8680; text-decoration: underline;">Unsubscribe</a> | 
                    <a href="${baseUrl}/privacy" style="color: #8B8680; text-decoration: underline;">Privacy Policy</a>
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  let content = '';

  switch (templateType) {
    case 'collection-launch':
      content = `
        <tr>
          <td style="padding: 60px 40px 40px;">
            ${data.heroImage ? `
              <img src="${data.heroImage}" alt="${data.headline}" style="width: 100%; height: auto; display: block; margin-bottom: 40px;" />
            ` : ''}
            <p style="margin: 0 0 20px; font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: #8B8680;">${greeting}</p>
            <h1 style="margin: 0 0 20px; font-size: 32px; font-weight: 300; letter-spacing: 0.05em; color: #1F1A17; line-height: 1.2;">${data.headline}</h1>
            ${data.subheadline ? `<p style="margin: 0 0 30px; font-size: 14px; color: #4F4843; line-height: 1.8;">${data.subheadline}</p>` : ''}
            <p style="margin: 0 0 40px; font-size: 14px; color: #1F1A17; line-height: 1.8;">${data.bodyText}</p>
            ${data.ctaText && data.ctaUrl ? `
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="left">
                    <a href="${data.ctaUrl}" style="display: inline-block; padding: 14px 32px; background-color: #1F1A17; color: #FFFFFF; text-decoration: none; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 400;">${data.ctaText}</a>
                  </td>
                </tr>
              </table>
            ` : ''}
          </td>
        </tr>
      `;
      break;

    case 'product-spotlight':
      content = `
        <tr>
          <td style="padding: 60px 40px 40px;">
            <p style="margin: 0 0 20px; font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: #8B8680;">${greeting}</p>
            <h1 style="margin: 0 0 20px; font-size: 28px; font-weight: 300; letter-spacing: 0.05em; color: #1F1A17; line-height: 1.2;">${data.headline}</h1>
            ${data.productImage ? `
              <img src="${data.productImage}" alt="${data.productName || 'Product'}" style="width: 100%; height: auto; display: block; margin: 30px 0;" />
            ` : ''}
            ${data.productName ? `<h2 style="margin: 30px 0 10px; font-size: 18px; font-weight: 400; letter-spacing: 0.1em; color: #1F1A17;">${data.productName}</h2>` : ''}
            ${data.productPrice ? `<p style="margin: 0 0 20px; font-size: 14px; color: #4F4843;">${data.productPrice}</p>` : ''}
            <p style="margin: 0 0 40px; font-size: 14px; color: #1F1A17; line-height: 1.8;">${data.bodyText}</p>
            ${data.productUrl ? `
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="left">
                    <a href="${data.productUrl}" style="display: inline-block; padding: 14px 32px; background-color: #1F1A17; color: #FFFFFF; text-decoration: none; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 400;">View Piece</a>
                  </td>
                </tr>
              </table>
            ` : ''}
          </td>
        </tr>
      `;
      break;

    case 'private-viewing':
      content = `
        <tr>
          <td style="padding: 60px 40px 40px; background-color: #1F1A17; color: #FFFFFF;">
            <p style="margin: 0 0 20px; font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: #D9C6A3;">${greeting}</p>
            <h1 style="margin: 0 0 20px; font-size: 32px; font-weight: 300; letter-spacing: 0.05em; color: #FFFFFF; line-height: 1.2;">${data.headline}</h1>
            ${data.subheadline ? `<p style="margin: 0 0 30px; font-size: 14px; color: #D9C6A3; line-height: 1.8;">${data.subheadline}</p>` : ''}
            <p style="margin: 0 0 40px; font-size: 14px; color: #FFFFFF; line-height: 1.8;">${data.bodyText}</p>
            ${data.ctaText && data.ctaUrl ? `
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="left">
                    <a href="${data.ctaUrl}" style="display: inline-block; padding: 14px 32px; background-color: #FFFFFF; color: #1F1A17; text-decoration: none; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 400;">${data.ctaText}</a>
                  </td>
                </tr>
              </table>
            ` : ''}
          </td>
        </tr>
      `;
      break;

    case 'newsletter':
      content = `
        <tr>
          <td style="padding: 60px 40px 40px;">
            <p style="margin: 0 0 20px; font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: #8B8680;">${greeting}</p>
            <h1 style="margin: 0 0 20px; font-size: 28px; font-weight: 300; letter-spacing: 0.05em; color: #1F1A17; line-height: 1.2;">${data.headline}</h1>
            <p style="margin: 0 0 40px; font-size: 14px; color: #1F1A17; line-height: 1.8;">${data.bodyText}</p>
            ${data.secondaryImage ? `
              <img src="${data.secondaryImage}" alt="" style="width: 100%; height: auto; display: block; margin: 40px 0;" />
            ` : ''}
            ${data.ctaText && data.ctaUrl ? `
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top: 40px;">
                <tr>
                  <td align="left">
                    <a href="${data.ctaUrl}" style="display: inline-block; padding: 14px 32px; background-color: #1F1A17; color: #FFFFFF; text-decoration: none; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 400;">${data.ctaText}</a>
                  </td>
                </tr>
              </table>
            ` : ''}
          </td>
        </tr>
      `;
      break;

    case 'lookbook':
      content = `
        <tr>
          <td style="padding: 0;">
            ${data.heroImage ? `
              <img src="${data.heroImage}" alt="${data.headline}" style="width: 100%; height: auto; display: block;" />
            ` : ''}
            <div style="padding: 60px 40px 40px;">
              <p style="margin: 0 0 20px; font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: #8B8680;">${greeting}</p>
              <h1 style="margin: 0 0 20px; font-size: 32px; font-weight: 300; letter-spacing: 0.05em; color: #1F1A17; line-height: 1.2;">${data.headline}</h1>
              <p style="margin: 0 0 40px; font-size: 14px; color: #1F1A17; line-height: 1.8;">${data.bodyText}</p>
              ${data.ctaText && data.ctaUrl ? `
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="left">
                      <a href="${data.ctaUrl}" style="display: inline-block; padding: 14px 32px; background-color: #1F1A17; color: #FFFFFF; text-decoration: none; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 400;">${data.ctaText}</a>
                    </td>
                  </tr>
                </table>
              ` : ''}
            </div>
          </td>
        </tr>
      `;
      break;

    case 'seasonal-campaign':
      content = `
        <tr>
          <td style="padding: 60px 40px 40px;">
            ${data.heroImage ? `
              <img src="${data.heroImage}" alt="${data.headline}" style="width: 100%; height: auto; display: block; margin-bottom: 40px;" />
            ` : ''}
            <p style="margin: 0 0 20px; font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: #8B8680;">${greeting}</p>
            <h1 style="margin: 0 0 20px; font-size: 32px; font-weight: 300; letter-spacing: 0.05em; color: #1F1A17; line-height: 1.2;">${data.headline}</h1>
            ${data.subheadline ? `<p style="margin: 0 0 30px; font-size: 16px; color: #4F4843; line-height: 1.8; font-weight: 300;">${data.subheadline}</p>` : ''}
            <p style="margin: 0 0 40px; font-size: 14px; color: #1F1A17; line-height: 1.8;">${data.bodyText}</p>
            ${data.ctaText && data.ctaUrl ? `
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="${data.ctaUrl}" style="display: inline-block; padding: 16px 40px; background-color: #1F1A17; color: #FFFFFF; text-decoration: none; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 400;">${data.ctaText}</a>
                  </td>
                </tr>
              </table>
            ` : ''}
          </td>
        </tr>
      `;
      break;

    default:
      content = `
        <tr>
          <td style="padding: 60px 40px 40px;">
            <p style="margin: 0 0 20px; font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: #8B8680;">${greeting}</p>
            <h1 style="margin: 0 0 20px; font-size: 28px; font-weight: 300; letter-spacing: 0.05em; color: #1F1A17; line-height: 1.2;">${data.headline}</h1>
            <p style="margin: 0 0 40px; font-size: 14px; color: #1F1A17; line-height: 1.8;">${data.bodyText}</p>
          </td>
        </tr>
      `;
  }

  return header + content + footer;
}

