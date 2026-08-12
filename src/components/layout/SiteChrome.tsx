/** Fixed overlays that sit above every page: the loading curtain, the scroll
 *  progress bar, and the two halves of the custom cursor. */
export function Preloader({ hidden }: { hidden: boolean }) {
  if (hidden) return null;
  return (
    <div className="preloader">
      <img className="preloader__mark" src="/images/brand/logo.png" alt="" />
      <div className="preloader__bar" />
    </div>
  );
}

export function ScrollProgress() {
  return <div className="scroll-progress" aria-hidden="true" />;
}

export function Cursor() {
  return (
    <>
      <div className="cursor" aria-hidden="true">
        <span>Play</span>
      </div>
      <div className="cursor-dot" aria-hidden="true" />
    </>
  );
}
