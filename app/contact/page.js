import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle, Facebook } from "lucide-react";
import { CONTACT } from "@/lib/contact";

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with RefinedReal — phone, WhatsApp, email, and address.",
};

const contactMethods = [
  {
    icon: Phone,
    label: "Call us",
    value: CONTACT.phone,
    href: CONTACT.phoneHref,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: CONTACT.whatsapp,
    href: CONTACT.whatsappHref,
    external: true,
  },
  {
    icon: Mail,
    label: "Email",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
  },
  {
    icon: Facebook,
    label: "Facebook",
    value: "RefinedReal",
    href: CONTACT.facebook,
    external: true,
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-content px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="font-serif text-3xl text-ink sm:text-4xl">Contact Us</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-muted">
          Questions about an order, a product, or anything else — reach us
          however's easiest for you. We read every message ourselves.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-5 sm:grid-cols-2">
        {contactMethods.map(({ icon: Icon, label, value, href, external }) => (
          <a
            key={label}
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="flex items-center gap-4 rounded-md border border-border bg-surface p-5 transition-colors hover:border-accent"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
              <Icon size={19} strokeWidth={1.75} />
            </span>
            <span>
              <span className="block text-[12.5px] uppercase tracking-wide text-muted">
                {label}
              </span>
              <span className="block text-[15px] text-ink">{value}</span>
            </span>
          </a>
        ))}
      </div>

      <div className="mx-auto mt-5 max-w-3xl">
        <div className="flex items-start gap-4 rounded-md border border-border bg-surface p-5">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
            <MapPin size={19} strokeWidth={1.75} />
          </span>
          <span>
            <span className="block text-[12.5px] uppercase tracking-wide text-muted">
              Address
            </span>
            <span className="block text-[15px] text-ink">{CONTACT.address}</span>
          </span>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-xl text-center">
        <p className="text-[14px] text-muted">
          Prefer to browse first?{" "}
          <Link href="/shop" className="text-accent hover:text-accent-deep">
            Head to the shop
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
