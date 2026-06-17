export default function MarketSignals() {
  const signals = [
    { asset: "Nasdaq 100 (NDX)", latest: "18,708.34", day24h: "+1.32%", day7d: "+4.78%", signal: "Bullish" },
    { asset: "S&P 500 (SPY)", latest: "5,297.10", day24h: "+0.95%", day7d: "+2.21%", signal: "Bullish" },
    { asset: "Gold (XAU/USD)", latest: "2,382.51", day24h: "-0.41%", day7d: "+1.12%", signal: "Neutral" },
    { asset: "Brent Oil (USO)", latest: "83.21", day24h: "-1.05%", day7d: "-1.63%", signal: "Bearish" },
    { asset: "BTC (USD)", latest: "66,160.00", day24h: "+1.84%", day7d: "+3.22%", signal: "Bullish" },
    { asset: "AI Infra Basket*", latest: "132.47", day24h: "+1.61%", day7d: "+2.11%", signal: "Bullish" },
    { asset: "Global Cloud Spend (Est. Q1 2025)", latest: "$78.68", day24h: "+1.47%", day7d: "+9.20%", signal: "Bullish" },
  ];

  const signalColor = (signal: string) => {
    if (signal === "Bullish") return "#10b981";
    if (signal === "Bearish") return "#ef4444";
    return "#71717A";
  };

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
          color: "#F4F4F5",
          margin: 0,
        }}>
          MARKET SIGNALS
        </h2>
        <a href="/archive" style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#D92532",
          textDecoration: "none",
        }}>
          View Archive →
        </a>
      </div>

      <table style={{
        width: "100%",
        borderCollapse: "collapse",
      }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #1F1F23" }}>
            <th style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#71717A",
              textAlign: "left",
              padding: "12px 0",
            }}>
              ASSET / SEGMENT
            </th>
            <th style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#71717A",
              textAlign: "right",
              padding: "12px 0",
            }}>
              LATEST
            </th>
            <th style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#71717A",
              textAlign: "right",
              padding: "12px 0",
            }}>
              24H
            </th>
            <th style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#71717A",
              textAlign: "right",
              padding: "12px 0",
            }}>
              7D
            </th>
            <th style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#71717A",
              textAlign: "right",
              padding: "12px 0",
            }}>
              SIGNAL
            </th>
          </tr>
        </thead>
        <tbody>
          {signals.map((row, idx) => (
            <tr key={idx} style={{ borderBottom: "1px solid #1F1F23" }}>
              <td style={{
                fontSize: 12,
                color: "#F4F4F5",
                padding: "12px 0",
                textAlign: "left",
              }}>
                {row.asset}
              </td>
              <td style={{
                fontSize: 12,
                color: "#F4F4F5",
                padding: "12px 0",
                textAlign: "right",
              }}>
                {row.latest}
              </td>
              <td style={{
                fontSize: 12,
                color: "#71717A",
                padding: "12px 0",
                textAlign: "right",
              }}>
                {row.day24h}
              </td>
              <td style={{
                fontSize: 12,
                color: "#71717A",
                padding: "12px 0",
                textAlign: "right",
              }}>
                {row.day7d}
              </td>
              <td style={{
                fontSize: 12,
                padding: "12px 0",
                textAlign: "right",
              }}>
                <span style={{
                  background: signalColor(row.signal) + "20",
                  color: signalColor(row.signal),
                  padding: "4px 8px",
                  borderRadius: 4,
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}>
                  {row.signal}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p style={{
        fontSize: 10,
        color: "#71717A",
        fontStyle: "italic",
        marginTop: 16,
        margin: "16px 0 0 0",
      }}>
        *Proprietary basket of public AI Infrastructure & cloud enablement companies. Source: RedLantern Research
      </p>
    </div>
  );
}
