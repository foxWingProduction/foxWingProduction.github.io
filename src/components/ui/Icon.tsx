/**
 * Renders inline SVG markup carried in the content data. The strings are
 * authored in this repo, never user input, so injecting them is safe and keeps
 * the icons alongside the copy they belong to.
 */
export function Icon({ svg, className }: { svg: string; className?: string }) {
  return <span className={className} aria-hidden="true" dangerouslySetInnerHTML={{ __html: svg }} />;
}
