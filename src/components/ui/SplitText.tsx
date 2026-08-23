import { Children, cloneElement, isValidElement, type ReactNode } from 'react';

/**
 * Wraps every word in `.split-w > .split-word` so the heading can rise line by
 * line, staggering each word by 45ms. The original script mutated the DOM after
 * load; rendering the spans directly keeps the markup deterministic, which
 * matters because these pages are prerendered and then hydrated.
 *
 * Nested markup is preserved, so `<em>` inside a heading still gets its accent
 * treatment while its words animate individually.
 */
interface SplitTextProps {
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
  className?: string;
  children: ReactNode;
}

const STAGGER = 0.045;

function splitNodes(nodes: ReactNode, counter: { i: number }): ReactNode[] {
  return Children.toArray(nodes).flatMap((child, key): ReactNode[] => {
    if (typeof child === 'string') {
      return child.split(/(\s+)/).map((chunk, k) => {
        if (!chunk) return null;
        if (/^\s+$/.test(chunk)) return chunk;
        const delay = (counter.i++ * STAGGER).toFixed(3);
        return (
          <span className="split-w" key={`${key}-${k}`}>
            <span className="split-word" style={{ transitionDelay: `${delay}s` }}>
              {chunk}
            </span>
          </span>
        );
      });
    }
    if (isValidElement<{ children?: ReactNode }>(child)) {
      return [
        cloneElement(child, {
          key,
          children: splitNodes(child.props.children, counter),
        }),
      ];
    }
    return [child];
  });
}

export function SplitText({ as: Tag = 'h2', className, children }: SplitTextProps) {
  const counter = { i: 0 };
  // `split` is what the reveal observer watches and what `.split.in
  // .split-word` keys off; without it the words stay translated out of view.
  const cls = [className, 'split'].filter(Boolean).join(' ');
  return <Tag className={cls}>{splitNodes(children, counter)}</Tag>;
}
