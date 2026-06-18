"use client";

import { useState, FormEvent } from "react";

interface SubscribeFormProps {
  variant?: "hero" | "sidebar" | "inline";
  placeholder?: string;
}

export function SubscribeForm({ variant = "inline", placeholder = "operator@email.com" }: SubscribeFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMsg("Enter a valid email address.");
      return;
    }
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Subscription failed.");
      }

      setStatus("success");
      setEmail("");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        style={{
          padding: variant === "sidebar" ? "16px 0" : "0",
          fontFamily: "Space Mono, monospace",
          fontSize: "12px",
          color: "var(--green, #4ade80)",
          letterSpacing: "0.04em",
        }}
      >
        ✓ You&apos;re in. Check your inbox.
      </div>
    );
  }

  const isHero = variant === "hero";
  const isSidebar = variant === "sidebar";

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div
        style={{
          display: "flex",
          gap: "0",
          flexDirection: isSidebar ? "column" : "row",
          maxWidth: isHero ? "480px" : "100%",
          margin: isHero ? "0 auto" : "0",
        }}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          disabled={status === "loading"}
          style={{
            flex: 1,
            padding: isSidebar ? "12px 16px" : "16px 20px",
            background: "var(--bg)",
            border: "1px solid var(--border-2, #2a2f3d)",
            borderRight: isSidebar ? "1px solid var(--border-2, #2a2f3d)" : "none",
            borderBottom: isSidebar ? "none" : "1px solid var(--border-2, #2a2f3d)",
            color: "var(--off)",
            fontFamily: "Space Mono, monospace",
            fontSize: "13px",
            outline: "none",
            opacity: status === "loading" ? 0.6 : 1,
          }}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="join-button"
          style={{
            flexShrink: 0,
            opacity: status === "loading" ? 0.7 : 1,
            cursor: status === "loading" ? "not-allowed" : "pointer",
            padding: isSidebar ? "12px 20px" : undefined,
            width: isSidebar ? "100%" : undefined,
          }}
        >
          {status === "loading" ? "Joining..." : "Join Free"}
        </button>
      </div>

      {errorMsg && (
        <p
          style={{
            fontSize: "11px",
            color: "var(--red)",
            marginTop: "10px",
            fontFamily: "Space Mono, monospace",
          }}
        >
          {errorMsg}
        </p>
      )}

      {status !== "error" && (
        <p
          style={{
            fontSize: "11px",
            color: "var(--dim)",
            marginTop: "14px",
            fontFamily: "Space Mono, monospace",
          }}
        >
          Free tier · No spam · Unsubscribe anytime
        </p>
      )}
    </form>
  );
}
