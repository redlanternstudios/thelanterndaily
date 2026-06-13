"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: "🧠",
    title: "AI-Curated",
    description:
      "Our agents scan thousands of sources daily, surfacing only what matters — no noise, no filler.",
  },
  {
    icon: "⚡",
    title: "Signal, Not Noise",
    description:
      "We cut through the information fog. Every briefing is distilled to its essential insight.",
  },
  {
    icon: "📡",
    title: "Broad Coverage",
    description:
      "AI, markets, geopolitics, future of work, and the technologies reshaping our world.",
  },
  {
    icon: "🎯",
    title: "Actionable Intelligence",
    description:
      "Not just news — context, analysis, and what it means for you. Make better decisions faster.",
  },
];

export default function FeaturesSection() {
  return (
    <section>
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <span className="mono inline-block text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent-gold)] mb-3">
            Why The Lantern
          </span>
          <h2 className="serif text-3xl md:text-4xl font-bold text-[var(--color-text-primary)]">
            Intelligence That
            <span className="block italic text-[var(--color-accent-gold)]">
              Cuts Through
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card-bg)] p-6"
            >
              <span className="text-3xl" aria-hidden="true">
                {feature.icon}
              </span>
              <h3 className="serif text-lg font-bold mt-3">{feature.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="section-divider mt-16" />
    </section>
  );
}
