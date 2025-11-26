import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-10 px-6 py-16">
      <section className="space-y-6">
        <p className="text-sm uppercase tracking-[0.35em] text-brand-300/70">
          Invoice Generator Pro
        </p>
        <h1 className="font-display text-4xl text-white sm:text-5xl lg:text-6xl">
          Build elegant invoices, quotes, and payment journeys from a single
          modern workspace.
        </h1>
        <p className="max-w-2xl text-base text-slate-300 sm:text-lg">
          Lightning-fast UI, real-time status tracking, and ready-to-use
          workflows crafted for scaling agencies and small businesses. This is
          the foundation of the full product experience you&apos;ll interact
          with throughout development.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/"
            className="rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-400"
          >
            Enter dashboard
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/40 hover:text-white"
          >
            View roadmap
          </a>
        </div>
      </section>
      <section className="rounded-3xl border border-white/5 bg-white/5 p-6 text-slate-200 backdrop-blur">
        <p className="text-sm uppercase tracking-[0.3em] text-brand-200/70">
          Coming Soon
        </p>
        <ul className="mt-4 grid gap-3 text-base text-slate-300 sm:grid-cols-2">
          <li>• Multi-currency quote builder</li>
          <li>• Automated reminders & approvals</li>
          <li>• Embedded payment options</li>
          <li>• Contact timelines & insights</li>
        </ul>
      </section>
    </main>
  )
}

export default Landing
