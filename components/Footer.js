import Link from "next/link";
import Image from "next/image";
import { Facebook, Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { getCategories } from "@/lib/products";
import { CONTACT } from "@/lib/contact";

export default function Footer() {
  const categories = getCategories();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-content px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Image
              src="/images/logo.png"
              alt="RefinedReal"
              width={150}
              height={125}
              className="h-10 w-auto"
            />
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-muted">
              Refined essentials for everyday life — a small, independent
              shop built around thoughtful products and honest presentation.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={CONTACT.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="RefinedReal on Facebook"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-ink transition-colors hover:border-accent hover:text-accent"
              >
                <Facebook size={16} strokeWidth={1.75} />
              </a>
              <a
                href={CONTACT.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message RefinedReal on WhatsApp"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-ink transition-colors hover:border-accent hover:text-accent"
              >
                <MessageCircle size={16} strokeWidth={1.75} />
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                aria-label="Email RefinedReal"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-ink transition-colors hover:border-accent hover:text-accent"
              >
                <Mail size={16} strokeWidth={1.75} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-[15px] text-ink">Quick links</h3>
            <ul className="mt-4 space-y-2.5 text-[14px] text-muted">
              <li><Link href="/" className="transition-colors hover:text-accent">Home</Link></li>
              <li><Link href="/shop" className="transition-colors hover:text-accent">Shop</Link></li>
              <li><Link href="/about" className="transition-colors hover:text-accent">About</Link></li>
              <li><Link href="/contact" className="transition-colors hover:text-accent">Contact</Link></li>
              <li><Link href="/cart" className="transition-colors hover:text-accent">Cart</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-[15px] text-ink">Categories</h3>
            <ul className="mt-4 space-y-2.5 text-[14px] text-muted">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/shop?category=${encodeURIComponent(cat)}`}
                    className="transition-colors hover:text-accent"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-[15px] text-ink">Customer support</h3>
            <ul className="mt-4 space-y-2.5 text-[14px] text-muted">
              <li>
                <a href={CONTACT.phoneHref} className="flex items-center gap-2 transition-colors hover:text-accent">
                  <Phone size={14} strokeWidth={1.75} className="shrink-0" />
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-colors hover:text-accent">
                  <MessageCircle size={14} strokeWidth={1.75} className="shrink-0" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 transition-colors hover:text-accent">
                  <Mail size={14} strokeWidth={1.75} className="shrink-0" />
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} strokeWidth={1.75} className="mt-0.5 shrink-0" />
                <span>{CONTACT.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-[13px] text-muted sm:flex-row">
          <p>© {year} RefinedReal. All rights reserved.</p>
          <p>Designed for a smoother, simpler way to shop.</p>
        </div>
      </div>
    </footer>
  );
}

