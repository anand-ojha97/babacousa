import { useEffect, useRef } from "react";
import { connectCounter } from "./counterAnimation.js";

export default function CountUp({ value, inline = false }) {
  const element = useRef(null);
  const label = String(value);
  useEffect(() => connectCounter(element.current, label), [label]);
  return (
    <span ref={element}  data-count-value={label}>
      <span className="sr-only">{label}</span>
      <span className="count-up-current" data-count-current aria-hidden="true">{label}</span>
    </span>
  );
}
