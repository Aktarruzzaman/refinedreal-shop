import Image from "next/image";
import Link from "next/link";
import { Gem, Wallet, ShieldCheck, Headphones, Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { CONTACT } from "@/lib/contact";

export const metadata = {
  title: "About",
  description: "The story behind RefinedReal — a small, independent shop for refined everyday essentials.",
};

const values = [
  {
    icon: Gem,
    title: "Chosen, not stocked",
    description: "Every product earns its place in the catalog. We'd rather sell fifteen things we believe in than a hundred we don't.",
  },
  {
    icon: Wallet,
    title: "Honest pricing",
    description: "Premium doesn't have to mean overpriced. We keep our margins fair so quality stays within reach.",
  },
  {
    icon: ShieldCheck,
    title: "Straightforward shopping",
    description: "No dark patterns, no upsell mazes — just a clean path from browsing to your doorstep.",
  },
  {
    icon: Headphones,
    title: "A real person to reach",
    description: "Questions before or after you buy go to an actual person who reads them, not a ticket queue.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-content px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <Image
          src="/images/logo.png"
          alt="RefinedReal"
          width={160}
          height={134}
          className="mx-auto h-14 w-auto"
        />
        <h1 className="mt-6 font-serif text-3xl text-ink sm:text-4xl">
          Refined essentials, chosen with care.
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-muted">
          RefinedReal started as a simple idea: everyday products don't have
          to look or feel like an afterthought. We're a small, independent
          shop that hand-picks audio, desk setup, and lifestyle gadgets we'd
          actually want on our own desks and shelves — then presents them
          without the clutter that usually comes with online shopping.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-2">
        {values.map(({ icon: Icon, title, description }) => (
          <div key={title} className="rounded-md border border-border bg-surface p-6">
            <Icon size={22} strokeWidth={1.5} className="text-accent" />
            <h3 className="mt-4 font-serif text-[16px] text-ink">{title}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-muted">{description}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-14 max-w-2xl rounded-md border border-border bg-surface p-8 text-center">
        <h2 className="font-serif text-xl text-ink">Have a question?</h2>
        <p className="mt-2 text-[14.5px] text-muted">
          We read every message. Reach out and we'll get back to you shortly.
        </p>

        <div className="mx-auto mt-6 grid max-w-md grid-cols-1 gap-3 text-left sm:grid-cols-2">
          <a
            href={CONTACT.phoneHref}
            className="flex items-center gap-2.5 rounded-md border border-border bg-paper px-4 py-3 text-[14px] text-ink transition-colors hover:border-accent"
          >
            <Phone size={16} strokeWidth={1.75} className="shrink-0 text-accent" />
            {CONTACT.phone}
          </a>
          <a
            href={CONTACT.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 rounded-md border border-border bg-paper px-4 py-3 text-[14px] text-ink transition-colors hover:border-accent"
          >
            <MessageCircle size={16} strokeWidth={1.75} className="shrink-0 text-accent" />
            WhatsApp
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            className="flex items-center gap-2.5 rounded-md border border-border bg-paper px-4 py-3 text-[14px] text-ink transition-colors hover:border-accent"
          >
            <Mail size={16} strokeWidth={1.75} className="shrink-0 text-accent" />
            {CONTACT.email}
          </a>
          <span className="flex items-center gap-2.5 rounded-md border border-border bg-paper px-4 py-3 text-[14px] text-ink">
            <MapPin size={16} strokeWidth={1.75} className="shrink-0 text-accent" />
            {CONTACT.address}
          </span>
        </div>

        <Link
          href="/contact"
          className="mt-6 inline-flex items-center rounded-full bg-accent px-6 py-3 text-[14.5px] font-medium text-white transition-colors hover:bg-accent-deep"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
