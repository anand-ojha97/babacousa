import { Link } from "react-router";

export default function NotFound() {
  return (
    <section className="flex min-h-[65vh] flex-col items-center justify-center gap-6 px-6 pb-16 pt-48 text-center font-copy">
      <p className="text-lg font-semibold text-babco-orange">404</p>
      <h1 className="text-4xl font-bold text-babco-red">Page not found</h1>
      <p>The page you are looking for may have moved.</p>
      <Link to="/" className="action-hover rounded-full bg-babco-orange px-6 py-3 font-semibold">
        Back to home
      </Link>
    </section>
  );
}
