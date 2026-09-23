export function SectionHeading({
  id,
  accent,
  children,
  align = 'center',
}: {
  id: string;
  accent: string;
  children: string;
  align?: 'center' | 'left';
}): React.JSX.Element {
  return (
    <h2
      id={id}
      className={`text-3xl font-bold tracking-tight sm:text-4xl ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      {children} <span className="text-accent">{accent}</span>
    </h2>
  );
}
