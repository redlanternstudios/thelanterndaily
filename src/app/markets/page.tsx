import { Metadata } from "next";
import Masthead from "@/components/Masthead";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Market Signals | The Lantern Daily",
  description: "Real-time Islamic finance market signals and halal compliance analysis.",
};

export default function MarketsPage() {
  return (
    <>
      <Masthead />
      <main style={{
        background: "#07080F",
        color: "#9CA3AF",
        minHeight: "100vh",
        padding: "48px 24px",
      }}>
        <div style={{
          maxWidth: 1200,
          margin: "0 auto",
        }}>
          <h1 style={{
            fontFamily: "Georgia, serif",
            fontSize: 48,
            fontWeight: 700,
            color: "#F7F2EE",
            marginBottom: 32,
          }}>
            Market Signals
          </h1>
          
          <div style={{
            background: "#0D0F1C",
            border: "1px solid #1A1F2E",
            borderRadius: 8,
            padding: 32,
            textAlign: "center",
          }}>
            <p style={{ fontSize: 18, marginBottom: 16 }}>
              Live market signals and halal compliance analysis coming soon.
            </p>
            <p style={{ fontSize: 14, color: "#9CA3AF" }}>
              Real-time data from Musaffa with DeepSeek-powered compliance scoring.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
