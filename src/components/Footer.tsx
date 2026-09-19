import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <span className="font-display font-bold text-foreground">
          ENTECH<span className="text-accent">IT</span>
        </span>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/services" className="transition-colors hover:text-foreground">
            Services &amp; pricing
          </Link>
          <Link href="/repairs/ps5" className="transition-colors hover:text-foreground">
            PS5 repair
          </Link>
        </nav>
        <p>© {new Date().getFullYear()} ENTECH IT. All rights reserved.</p>
      </div>
    </footer>
  );
}
