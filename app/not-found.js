"use client";

import Link from "next/link";

export default function NotFound() {
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
          padding: 60px 40px;
          max-width: 500px;
          width: 100%;
          text-align: center;
          animation: fadeIn 0.5s ease-out;
        }

        .icon {
          font-size: 5rem;
          margin-bottom: 20px;
        }

        .title {
          font-size: 3rem;
          font-weight: 700;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 15px;
        }

        .subtitle {
          font-size: 1.2rem;
          color: #666;
          margin-bottom: 30px;
        }

        .description {
          color: #999;
          margin-bottom: 30px;
          line-height: 1.6;
        }

        .button {
          display: inline-block;
          padding: 15px 30px;
          font-size: 1.1rem;
          font-weight: 600;
          color: white;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          text-decoration: none;
          border-radius: 12px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }
      `}</style>

      <div className="container">
        <div className="card">
          <div className="icon">🔍</div>
          <h1 className="title">404</h1>
          <h2 className="subtitle">Paste Not Found</h2>
          <p className="description">
            The requested paste does not exist, has expired, or is no longer available.
          </p>
          <Link href="/" className="button">
            ← Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}
