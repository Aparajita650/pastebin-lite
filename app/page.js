"use client";

import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  async function createPaste() {
    setError(null);
    setUrl(null);
    setCopied(false);

    try {
      const res = await fetch("/api/pastes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      let data;
      try {
        data = await res.json();
      } catch (jsonError) {
        setError("Server returned an invalid response");
        return;
      }

      if (!res.ok) {
        setError(data.error || "Failed to create paste");
        return;
      }

      setUrl(data.url);
    } catch (error) {
      setError("Network error: " + error.message);
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          padding: 40px;
          max-width: 700px;
          width: 100%;
          animation: fadeIn 0.5s ease-out;
        }

        .header {
          text-align: center;
          margin-bottom: 30px;
        }

        .title {
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 10px;
        }

        .subtitle {
          color: #666;
          font-size: 1rem;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .textarea {
          width: 100%;
          min-height: 250px;
          padding: 15px;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          font-size: 1rem;
          font-family: 'Monaco', 'Courier New', monospace;
          resize: vertical;
          transition: all 0.3s ease;
          background: #f8f9fa;
        }

        .textarea:focus {
          outline: none;
          border-color: #667eea;
          background: white;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .button {
          width: 100%;
          padding: 15px;
          font-size: 1.1rem;
          font-weight: 600;
          color: white;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }

        .button:active {
          transform: translateY(0);
        }

        .button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .alert {
          padding: 15px;
          border-radius: 12px;
          margin-top: 20px;
          animation: slideIn 0.3s ease-out;
        }

        .alert-error {
          background: #fee;
          color: #c33;
          border-left: 4px solid #c33;
        }

        .alert-success {
          background: #efe;
          color: #2a7;
          border-left: 4px solid #2a7;
        }

        .url-container {
          display: flex;
          gap: 10px;
          align-items: center;
          margin-top: 10px;
        }

        .url-link {
          flex: 1;
          padding: 12px;
          background: #f8f9fa;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          color: #667eea;
          text-decoration: none;
          font-weight: 500;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .url-link:hover {
          background: #e9ecef;
        }

        .copy-button {
          padding: 12px 20px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .copy-button:hover {
          background: #5568d3;
        }

        .copy-button.copied {
          background: #2a7;
        }

        .footer {
          text-align: center;
          margin-top: 20px;
          color: #999;
          font-size: 0.9rem;
        }
      `}</style>

      <div className="container">
        <div className="card">
          <div className="header">
            <h1 className="title">📋 Pastebin Lite</h1>
            <p className="subtitle">Share your text snippets instantly</p>
          </div>

          <div className="form-group">
            <textarea
              className="textarea"
              placeholder="Enter your paste here...\n\nType or paste your code, text, or any content you want to share."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <button 
            className="button" 
            onClick={createPaste}
            disabled={!content.trim()}
          >
            ✨ Create Paste
          </button>

          {error && (
            <div className="alert alert-error">
              ❌ {error}
            </div>
          )}

          {url && (
            <div className="alert alert-success">
              <div>✅ Paste created successfully!</div>
              <div className="url-container">
                <a href={url} className="url-link" target="_blank" rel="noreferrer">
                  {url}
                </a>
                <button 
                  className={`copy-button ${copied ? 'copied' : ''}`}
                  onClick={copyToClipboard}
                >
                  {copied ? '✓ Copied' : '📋 Copy'}
                </button>
              </div>
            </div>
          )}

          <div className="footer">
            Made with ❤️ using Next.js & Upstash Redis
          </div>
        </div>
      </div>
    </>
  );
}
