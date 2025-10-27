# Telegram Mini App – VSN Coffee Club

This repository contains a sample Telegram Mini App built with [React](https://react.dev/) and [Vite](https://vitejs.dev/). The experience simulates a coffee ordering flow that demonstrates how to consume Telegram Web Apps APIs while providing graceful fallbacks for a regular browser.

## Features

- Telegram theme synchronization with automatic updates when the user switches between light/dark modes.
- Sample catalogue with quantity controls and animated styling that matches the Telegram design language.
- Integration with the Telegram `MainButton` and `sendData` APIs to deliver the checkout payload back to the host bot.
- Haptic feedback for item additions on supported Telegram clients.
- Browser fallback with a standard checkout button so the experience remains testable outside Telegram.

## Getting Started

1. Install dependencies (Node.js 18+ recommended):

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

   By default Vite listens on `http://localhost:5173`. When testing inside Telegram, expose the dev server with a tunnelling service (such as `cloudflared` or `ngrok`) and add the URL to your bot via [@BotFather](https://t.me/BotFather) using the `Web App URL` setting.

   ### Using `cloudflared`

   1. Install [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/) for your platform.
   2. Authenticate once with your Cloudflare account by running:

      ```bash
      cloudflared login
      ```

      This opens a browser window so you can authorise the tunnel. After approval, close the browser—`cloudflared` writes the credentials locally for future use.
   3. Start a temporary tunnel that points to the Vite dev server:

      ```bash
      cloudflared tunnel --url http://localhost:5173
      ```

      The command prints an `https://` URL (usually `https://<random>.trycloudflare.com`). Share that URL with Telegram via BotFather. Leave the tunnel running while you test; press `Ctrl+C` to stop it when you are done.

3. Build for production:

   ```bash
   npm run build
   ```

   The output will be generated in the `dist/` directory. You can deploy these static files to any HTTPS host that supports Telegram Mini Apps.

## Local Development Without Telegram

The hook `useTelegramWebApp` safely checks for the Telegram object on the global `window`. If you open the application in a regular browser, the checkout button is rendered inside the app instead of using the Telegram `MainButton`. This makes it easy to iterate on the UI before integrating with a bot.

## Project Structure

```
├── index.html
├── package.json
├── src
│   ├── App.tsx
│   ├── components
│   │   ├── CartSummary.css
│   │   ├── CartSummary.tsx
│   │   ├── ProductCard.css
│   │   └── ProductCard.tsx
│   ├── hooks
│   │   └── useTelegramWebApp.ts
│   ├── main.tsx
│   ├── styles
│   │   ├── App.css
│   │   └── index.css
│   └── telegram.d.ts
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Deploying to Production

1. Build the project with `npm run build`.
2. Upload the `dist/` folder contents to a static hosting provider that serves files over HTTPS.
3. In [@BotFather](https://t.me/BotFather), configure your bot's `Menu Button` or `Web App` URL to the deployed location.
4. Optionally implement server-side validation of the payload received from `sendData` by verifying the `initData` hash as described in the [Telegram documentation](https://core.telegram.org/bots/webapps#validating-data-received-via-the-web-app).

## Pushing the project to GitHub

1. Create a new repository on GitHub (without initialising it with files) and copy the repository URL, e.g. `https://github.com/username/vsn-telegram-mini-app.git`.
2. Initialise Git locally if you have not already:

   ```bash
   git init
   ```

3. Add the GitHub repository as a remote named `origin`:

   ```bash
   git remote add origin https://github.com/username/vsn-telegram-mini-app.git
   ```

4. Commit your local work:

   ```bash
   git add .
   git commit -m "Initial commit"
   ```

5. Push the main branch to GitHub (create the branch first if necessary):

   ```bash
   git branch -M main
   git push -u origin main
   ```

After the push succeeds, the Telegram mini app source will be available in your GitHub repository so you can collaborate or deploy from there.

## License

MIT
