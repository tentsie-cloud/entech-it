export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <span className="font-display font-bold text-foreground">
          ENTECH<span className="text-accent">IT</span>
        </span>
        <p>© {new Date().getFullYear()} ENTECH IT. All rights reserved.</p>
      </div>
    </footer>
  );
}
