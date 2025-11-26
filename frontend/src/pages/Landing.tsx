import { Link } from 'react-router-dom'

const features = [
  {
    title: 'Realtime invoices',
    description: 'Send beautifully branded invoices with live status tracking and reminders.',
  },
  {
    title: 'Approval workflows',
    description: 'Route quotes to finance or legal with one click approvals and audit trails.',
  },
  {
    title: 'Automated reminders',
    description: 'Trigger smart nudges and SMS updates the moment invoices become overdue.',
  },
  {
    title: 'Payment insights',
    description: 'See risk, cash velocity, and churn signals without exporting spreadsheets.',
  },
]

const Landing = () => {
  return (
    <main className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-6 py-16 text-white sm:px-10">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),_transparent_45%)]" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-12">
        <section className="space-y-6 text-center md:text-left">
          <p className="text-xs uppercase tracking-[0.35em] text-brand-300/80">Invoice Generator Pro</p>
          <h1 className="font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Build elegant invoices, quotes, and payment journeys from a single modern workspace.
          </h1>
          <p className="mx-auto max-w-3xl text-base text-slate-300 sm:text-lg md:mx-0">
            Lightning-fast UI, real-time status tracking, and ready-to-use workflows crafted for scaling
            agencies and small businesses. This is the foundation of the full product experience you&apos;ll
            interact with throughout development.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:justify-start">
            <Link
              to="/app"
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

        <section className="grid gap-6 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-white/30"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-brand-200/70">Capability</p>
              <h2 className="mt-3 text-2xl font-semibold">{feature.title}</h2>
              <p className="mt-2 text-sm text-slate-300">{feature.description}</p>
            </div>
          ))}
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/10 p-6 text-slate-200 backdrop-blur md:flex md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-brand-200/70">Coming soon</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Multi-currency + embeddable checkout</h3>
            <p className="mt-2 text-sm text-slate-200/80">
              Accept payments anywhere while letting customers approve quotes from their inbox.
            </p>
          </div>
          <dl className="mt-6 grid grid-cols-2 gap-4 text-center md:mt-0 md:w-1/2">
            <div>
              <dt className="text-xs uppercase tracking-[0.3em] text-slate-300/80">Currencies</dt>
              <dd className="text-3xl font-display">12</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.3em] text-slate-300/80">Automations</dt>
              <dd className="text-3xl font-display">48</dd>
            </div>
          </dl>
        </section>
      </div>
    </main>
  )
}

export default Landing
