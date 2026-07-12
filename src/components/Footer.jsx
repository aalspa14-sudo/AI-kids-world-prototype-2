import { USER_DATA } from "../data/userData";

export default function Footer() {
  const { footer } = USER_DATA;

  return (
    <footer className="relative py-10 border-t border-[rgba(93,105,190,0.14)] bg-[rgba(255,255,255,0.6)] backdrop-blur-sm">
      <div className="wrap text-center">
        <p className="font-display font-bold text-sm">{footer.copyright}</p>
        <p className="mt-1.5 text-xs font-semibold text-[var(--text-muted)]">{footer.privacyLine}</p>
      </div>
    </footer>
  );
}
