import PostalMime from 'postal-mime';

export default {
	async email(message, env, ctx) {
		// Webhook URL (store securely in environment variables)
		const webhookUrl = env.WEBHOOK_URL || 'https://your-webhook-url.com';

		try {
			// Parse the email using postal-mime
			const email = await PostalMime.parse(message.raw, { attachmentEncoding: 'base64' });

			// Prepare payload for the webhook
			const payload = {
				from: message.from,
				to: message.to,
				subject: email.subject || 'No Subject',
				text: email.text || 'No Text Content',
				html: email.html || 'No HTML Content',
				attachments: email.attachments.map((attachment) => ({
					filename: attachment.filename,
					mimeType: attachment.mimeType,
					size: attachment.content?.length || 0,
				})),
			};

			// Send the payload to the webhook
			const response = await fetch(webhookUrl, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				console.error(`Webhook request failed: ${response.status}`);
				// Optionally forward to a fallback email
				await message.forward(env.FALLBACK_EMAIL || 'fallback@yourdomain.com');
				return;
			}

			console.log('Webhook sent successfully');
			// Optionally forward or reject the email
			// await message.forward('destination@yourdomain.com');
			// message.setReject('Processed by webhook');
		} catch (error) {
			console.error(`Error processing email: ${error}`);
			// Forward to fallback email on error
			await message.forward(env.FALLBACK_EMAIL || 'fallback@yourdomain.com');
		}
	},
};