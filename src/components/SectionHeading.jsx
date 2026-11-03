import { headingText } from "../styles.js";

// Headings are ordinary, selectable HTML text. Edit their words in the JSX.
export default function SectionHeading({ children, className = "", ...props }) {
  return (
    <h2 className={`${headingText} ${className}`} {...props}>
      {children}
    </h2>
  );
}
