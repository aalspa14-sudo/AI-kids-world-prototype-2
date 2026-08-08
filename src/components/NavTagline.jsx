import { BrandSocialLogo, SOCIAL_LINKS } from "./SocialFollow";

export default function NavTagline() {
  return (
    <div className="nav-tagline-wrap" aria-label="Follow AI-kids world on">
      <p className="nav-tagline-3d">
        <span className="nav-tagline-word nav-tagline-learn">Follow</span>
        <span className="nav-tagline-word nav-tagline-imagine">AI-kids</span>
        <span className="nav-tagline-word nav-tagline-build">world</span>
        <span className="nav-tagline-word nav-tagline-learn">on</span>
        <span className="nav-tagline-socials" aria-label="Social media links">
          {SOCIAL_LINKS.map(({ label, href, tone }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className={`nav-tagline-social-link nav-tagline-social-${tone}`}
              aria-label={`Follow AI-kids world on ${label}`}
              title={label}
            >
              <BrandSocialLogo tone={tone} />
            </a>
          ))}
        </span>
      </p>
    </div>
  );
}
