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
          color: "#1a1a1a",
          margin: 0,
        }}>
          OPERATOR STACK
        </h2>
        <a href="/stack" style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#b91c1c",
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
              borderBottom: idx < stacks.length - 1 ? "1px solid #e5e0d8" : "none",
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
                  background: "#e5e0d8",
                  borderRadius: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  color: "#b91c1c",
                }}
              >
                ⊞
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#1a1a1a",
                marginBottom: 4,
              }}>
                {stack.label}
              </div>
              <div style={{
                fontSize: 11,
                color: "#6b6b6b",
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
                    color: "#6b6b6b",
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
