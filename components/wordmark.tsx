export function Wordmark({
  variant = "header",
}: {
  variant?: "header" | "footer";
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/onsite-mark.png"
      alt="ON SITE Professional Event Supplier"
      width={1600}
      height={739}
      className={variant === "footer" ? "wordmark wordmark-footer" : "wordmark"}
    />
  );
}
