type AdPlaceholderProps = {
  label?: string;
  className?: string;
};

export function AdPlaceholder({ label = "Advertisement", className = "" }: AdPlaceholderProps) {
  return (
    <aside className={`ad-placeholder ${className}`} aria-label={label}>
      <span>{label}</span>
      <span className="ad-rule" aria-hidden="true" />
      <span className="ad-note">Reserved space</span>
    </aside>
  );
}