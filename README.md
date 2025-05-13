# Email2Webhook

A Cloudflare Worker that forwards incoming emails to a webhook URL. This service allows you to receive email notifications and forward them to any webhook endpoint of your choice.

## Features

- Forwards incoming emails to a configurable webhook URL
- Includes fallback email for error notifications
- Built on Cloudflare Workers for high reliability and low latency
- Easy to deploy and configure

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) (Cloudflare Workers CLI)
- A Cloudflare account
- A webhook endpoint to receive the email data

## Setup

1. Clone this repository:
   ```bash
   git clone git@github.com:bnqtoan/email2webhook.git
   cd email2webhook
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your configuration:
   ```
   WEBHOOK_URL=your_webhook_url_here
   FALLBACK_EMAIL=your_fallback_email@example.com
   ```

4. Login to Cloudflare:
   ```bash
   wrangler login
   ```

## Deployment

1. Set up your environment variables in Cloudflare:
   ```bash
   wrangler secret put WEBHOOK_URL
   wrangler secret put FALLBACK_EMAIL
   ```

2. Deploy the worker:
   ```bash
   wrangler deploy
   ```

3. After deployment, you'll receive a workers.dev subdomain. You can also set up a custom domain in the Cloudflare dashboard.

## Usage

1. Once deployed, your worker will be available at `https://your-worker.your-subdomain.workers.dev`

2. Configure your email service to forward emails to your worker's address. The worker will:
   - Receive the email
   - Process it
   - Forward the content to your webhook URL
   - Send error notifications to your fallback email if something goes wrong

## Webhook Payload Format

The webhook will receive a POST request with the following JSON structure:

```json
{
  "from": "sender@example.com",
  "to": "your-worker@your-subdomain.workers.dev",
  "subject": "Email Subject",
  "text": "Email body in plain text",
  "html": "Email body in HTML format (if available)",
  "attachments": [
    {
      "filename": "attachment.pdf",
      "content": "base64_encoded_content",
      "contentType": "application/pdf"
    }
  ]
}
```

## Development

1. Run the worker locally:
   ```bash
   wrangler dev
   ```

2. Test your changes before deploying to production.

## Security Considerations

- Keep your `.env` file secure and never commit it to version control
- Use HTTPS for your webhook URL
- Regularly rotate your secrets and credentials
- Monitor your worker's logs for any suspicious activity

## Troubleshooting

If you encounter issues:

1. Check the Cloudflare Workers logs in the dashboard
2. Verify your webhook URL is accessible
3. Ensure your fallback email is correctly configured
4. Check that your email forwarding is properly set up

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. 
