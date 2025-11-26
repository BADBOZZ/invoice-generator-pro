import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center text-slate-200">
      <p className="text-base uppercase tracking-[0.4em] text-brand-300/60">
        404
      </p>
      <h1 className="font-display text-4xl text-white sm:text-5xl">
        The page you&apos;re after hasn&apos;t been invoiced yet.
      </h1>
      <p className="max-w-xl text-slate-400">
        Double-check the URL or head back to the dashboard to continue building
        the experience. Everything you need lives there.
      </p>
      <Link
        to="/"
        className="rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-400"
      >
        Return home
      </Link>
    </section>
  )
}

export default NotFound
