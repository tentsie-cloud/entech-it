import Image from "next/image";

type Shot = {
  src: string;
  label: string;
  caption: string;
};

export default function BeforeAfter({
  before,
  after,
}: {
  before: Shot;
  after: Shot;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {[before, after].map((shot) => (
        <figure key={shot.label} className="m-0">
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-border">
            <Image
              src={shot.src}
              alt={shot.caption}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
            <span className="absolute left-4 top-4 rounded-full bg-background/85 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-foreground backdrop-blur-sm">
              {shot.label}
            </span>
          </div>
          <figcaption className="mt-3 text-sm text-muted">
            {shot.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
