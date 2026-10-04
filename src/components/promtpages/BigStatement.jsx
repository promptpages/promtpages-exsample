export default function BigStatement({ children, className = "" }) {
  return (
    <p className={`text-2xl md:text-3xl font-display font-semibold leading-tight tracking-tight ${className}`}>
      {children}
    </p>
  );
}
