import { Gem, Wallet, ShieldCheck, Headphones } from "lucide-react";

const features = [
  {
    icon: Gem,
    title: "Quality products",
    description: "Every item is picked and checked before it's listed — no filler, no fast-fashion gadgets.",
  },
  {
    icon: Wallet,
    title: "Affordable pricing",
    description: "Premium-feeling essentials priced for everyday people, not just early adopters.",
  },
  {
    icon: ShieldCheck,
    title: "Secure shopping",
    description: "Your details stay yours — a simple, protected checkout from browse to order.",
  },
  {
    icon: Headphones,
    title: "Customer support",
    description: "A real person behind the store, ready to help before and after you buy.",
  },
];

export default function WhyUs() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl text-ink sm:text-3xl">Why RefinedReal?</h2>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-border">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
              <Icon size={22} strokeWidth={1.5} className="text-accent" />
              <h3 className="mt-4 font-serif text-[17px] text-ink">{title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
