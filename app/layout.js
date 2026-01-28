export const metadata = {
  title: "Pastebin Lite",
  description: "Minimal Pastebin-like application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            color: #333;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideIn {
            from {
              transform: translateX(-10px);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}</style>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
