export default function OperatorStack() {
  const stacks = [
    {
      label: "Infra",
      description: "Scalable compute, storage, and networking for modern AI.",
      logos: ["AWS", "Azure", "Nvidia"],
    },
    {
      label: "Models & APIs",
      description: "Best-in-class models and embeddings to build on and scale.",
      logos: ["OpenAI", "Anthropic", "Mistral"],
    },
    {
      label: "Data & Tools",
      description: "Databases, caching, evals, and workflow orchestration.",
      logos: ["Databricks", "Pinecone", "LangSmith"],
    },
    {
      label: "Applications",
      description: "Production apps users love—with modern UX and durable backends.",
      logos: ["Vercel", "Retool", "Supabase"],
    },
    {
      label: "Governance",
      description: "Security, observability, and policy frameworks you can trust.",
      logos: ["Okta", "Vanta", "TrustLayer"],
    },
  ];

  return (
    <div>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 24,
      }}>
        <h2 style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#9CA3AF",
          margin: 0,
        }}>
          OPERATOR STACK
        </h2>
        <a href="/stack" style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#D42535",
          textDecoration: "none",
        }}>
          Explore Stack →
        </a>
      </div>

      <div>
        {stacks.map((stack, idx) => (
          <div
            key={idx}
            style={{
              padding: "14px 0",
              borderBottom: idx < stacks.length - 1 ? "1px solid #1A1F2E" : "none",
              display: "flex",
              gap: 16,
              alignItems: "flex-start",
            }}
          >
            <div style={{ minWidth: 32 }}>
              <div
                style={{
                  width: 24,
                  height: 24,
                  background: "#1A1F2E",
                  borderRadius: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  color: "#D42535",
                }}
              >
                ⊞
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#9CA3AF",
                marginBottom: 4,
              }}>
                {stack.label}
              </div>
              <div style={{
                fontSize: 11,
                color: "#9CA3AF",
              }}>
                {stack.description}
              </div>
            </div>
            <div style={{
              display: "flex",
              gap: 12,
              minWidth: 120,
              justifyContent: "flex-end",
            }}>
              {stack.logos.map((logo, logoIdx) => (
                <div
                  key={logoIdx}
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#9CA3AF",
                    maxWidth: 80,
                    textAlign: "right",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {logo}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
