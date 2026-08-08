export const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com", tone: "linkedin" },
  { label: "Instagram", href: "https://www.instagram.com", tone: "instagram" },
  { label: "X/Twitter", href: "https://x.com", tone: "x" },
  { label: "YouTube", href: "https://www.youtube.com", tone: "youtube" },
  { label: "Facebook", href: "https://www.facebook.com", tone: "facebook" },
];

export default function SocialFollow({ label = "Follow AI-Kids World", className = "" }) {
  return (
    <div className={`social-follow ${className}`}>
      <span className="social-follow-label">{label}</span>
      <div className="social-follow-icons" aria-label={label}>
        {SOCIAL_LINKS.map(({ label: itemLabel, href, tone }) => (
          <a
            key={itemLabel}
            href={href}
            target="_blank"
            rel="noreferrer"
            className={`social-follow-link social-follow-${tone}`}
            aria-label={`${label} on ${itemLabel}`}
            title={itemLabel}
          >
            <BrandSocialLogo tone={tone} />
          </a>
        ))}
      </div>
    </div>
  );
}

export function BrandSocialLogo({ tone }) {
  if (tone === "linkedin") {
    return (
      <svg className="brand-social-logo" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z"
        />
      </svg>
    );
  }

  if (tone === "instagram") {
    return (
      <svg className="brand-social-logo" viewBox="0 0 24 24" aria-hidden="true">
        <rect width="18" height="18" x="3" y="3" rx="5" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="12" cy="12" r="4.15" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="17.35" cy="6.65" r="1.25" fill="currentColor" />
      </svg>
    );
  }

  if (tone === "x") {
    return (
      <svg className="brand-social-logo" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M18.9 2h3.3l-7.2 8.24L23.5 22h-6.65l-5.2-6.8L5.7 22H2.4l7.7-8.8L2 2h6.82l4.7 6.22L18.9 2Zm-1.16 17.93h1.83L7.82 3.96H5.86l11.88 15.97Z"
        />
      </svg>
    );
  }

  if (tone === "youtube") {
    return (
      <svg className="brand-social-logo" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M23.5 6.2a3 3 0 0 0-2.1-2.13C19.55 3.58 12 3.58 12 3.58s-7.55 0-9.4.49A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.13c1.85.49 9.4.49 9.4.49s7.55 0 9.4-.49a3 3 0 0 0 2.1-2.13A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8Z"
        />
        <path fill="#fff" d="M9.6 15.53V8.47L15.86 12 9.6 15.53Z" />
      </svg>
    );
  }

  return (
    <svg className="brand-social-logo" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.03 1.8-4.7 4.53-4.7 1.31 0 2.68.23 2.68.23v2.96h-1.51c-1.49 0-1.96.93-1.96 1.89v2.27h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z"
      />
    </svg>
  );
}
