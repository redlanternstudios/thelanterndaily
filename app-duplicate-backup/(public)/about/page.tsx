export default function AboutPage() {
  return (
    <div className="min-h-screen py-16 px-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">About The Lantern Daily</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6">Muslim-built. AI-native. Every morning.</p>
        <p className="mb-4">The Lantern Daily is a curated newsletter and platform for Muslim founders, builders, and developers.</p>
        <h2 className="text-xl font-semibold mt-8 mb-4">Our Mission</h2>
        <p className="mb-4">To accelerate Muslim builders by delivering curated technical intelligence every morning.</p>
        <h2 className="text-xl font-semibold mt-8 mb-4">Editorial Principles</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Signal before consensus:</strong> We find tools before they trend</li>
          <li><strong>Halal-curated:</strong> Every tool screened for compliance</li>
          <li><strong>Builder-first:</strong> We spotlight the people behind the code</li>
          <li><strong>No hype:</strong> Just what works, with honest takes</li>
        </ul>
      </div>
    </div>
  )
}
