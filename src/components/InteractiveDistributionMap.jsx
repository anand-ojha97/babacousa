import { useEffect, useRef } from "react";
import markup from "./distributionMapMarkup.html?raw";
import { connectDistributionMap } from "./distributionMap.js";
import "../distribution-map.css";

export default function InteractiveDistributionMap() {
  const root = useRef(null);
  useEffect(() => connectDistributionMap(root.current), []);
  // Static, locally maintained SVG and controls from the supplied reference.
  return <div className="babco-network" ref={root} dangerouslySetInnerHTML={{ __html: markup }} />;
}
