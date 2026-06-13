"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="hero-gradient relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[var(--color-accent-gold)]/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-[var(--max-w-content)] px-6 py-24 md:py-32">
        <div className="max-w-3xl">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="mono inline-block text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent-gold-light)] mb-6">
              Daily Intelligence Briefing
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="serif text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight text-balance"
          >
            Signal Before
            <span className="block text-[var(--color-accent-gold)]">
              Consensus
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg md:text-xl text-gray-300 leading-relaxed"
          >
            AI-curated intelligence for the signal-driven reader. Daily briefings
            on AI, markets, geopolitics, and the future of work — delivered
            before the noise catches up.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#issues"
              className="rounded-full bg-[var(--color-accent-gold)] px-8 py-3.5 text-sm font-semibold text-white hover:bg-[var(--color-accent-gold)]/90 transition-all shadow-lg shadow-[var(--color-accent-gold)]/20"
            >
              Read Latest Issue
            </a>
            <a
              href="#subscribe"
              className="rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-all"
            >
              Subscribe Free
            </a>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 flex flex-wrap gap-8 md:gap-12"
          >
            <div>
              <p className="serif text-2xl font-bold text-white">24K+</p>
              <p className="text-sm text-gray-400 mt-1">Active Readers</p>
            </div>
            <div>
              <p className="serif text-2xl font-bold text-white">150+</p>
              <p className="text-sm text-gray-400 mt-1">Daily Issues</p>
            </div>
            <div>
              <p className="serif text-2xl font-bold text-white">5 min</p>
              <p className="text-sm text-gray-400 mt-1">Avg. Read Time</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
