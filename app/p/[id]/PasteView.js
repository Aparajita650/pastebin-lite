"use client";

import Link from "next/link";

export default function PasteView({ paste, id }) {
  return (
    <>
      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 40px 20px;
        }

        .content {
          max-width: 900px;
          margin: 0 auto;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          animation: fadeIn 0.5s ease-out;
        }

        .title {
          font-size: 2rem;
          font-weight: 700;
          color: white;
        }

        .home-link {
          padding: 10px 20px;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .home-link:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .paste-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          overflow: hidden;
          animation: fadeIn 0.6s ease-out;
        }

        .paste-header {
          padding: 20px 25px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .paste-title {
          font-size: 1.2rem;
          font-weight: 600;
        }

        .paste-id {
          font-family: 'Monaco', 'Courier New', monospace;
          font-size: 0.9rem;
          opacity: 0.9;
        }

        .paste-content {
          padding: 30px;
          background: #f8f9fa;
        }

        .code-block {
          background: #1e1e1e;
          color: #d4d4d4;
          padding: 25px;
          border-radius: 12px;
          font-family: 'Monaco', 'Courier New', monospace;
          font-size: 0.95rem;
          line-height: 1.6;
          overflow-x: auto;
          white-space: pre-wrap;
          word-wrap: break-word;
          box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.5);
        }

        .paste-footer {
          padding: 20px 25px;
          background: white;
          border-top: 1px solid #e0e0e0;
          color: #666;
          font-size: 0.9rem;
          text-align: center;
        }
      `}</style>

      <div className="container">
        <div className="content">
          <div className="header">
            <h1 className="title">📄 View Paste</h1>
            <Link href="/" className="home-link">
              ← Create New
            </Link>
          </div>

          <div className="paste-card">
            <div className="paste-header">
              <div className="paste-title">Paste Content</div>
              <div className="paste-id">ID: {id}</div>
            </div>

            <div className="paste-content">
              <pre className="code-block">{paste.content}</pre>
            </div>

            <div className="paste-footer">
              {paste.max_views && (
                <span>Views: {paste.views} / {paste.max_views} • </span>
              )}
              {paste.expires_at ? (
                <span>Expires: {new Date(paste.expires_at).toLocaleString()}</span>
              ) : (
                <span>No expiration</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
