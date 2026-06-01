'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Trophy, Utensils, Award, Sparkles, ChefHat, 
  MapPin, Calendar, Users, Phone, Mail, 
  CheckCheck, ArrowRight, Loader2, ImageOff,
  Instagram, Menu, X, Flame, CakeSlice, Martini
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: bold
// Depth Treatment: layered
// Divider Style: D-RULE
// Typography Personality: oversized

const brand = {
  name: "D Kitchen Addict",
  tagline: "Luxury in every meal.",
  description: "Award-nominated catering powerhouse delivering premium culinary experiences across Osun, Ibadan, and Ondo. From artisanal small chops to elite event catering, we redefine the art of the palate.",
  industry: "Food",
  region: "Nigeria",
  currency: "₦"
};

const contact = {
  instagram: "d_kitchen_addict",
  address: "Osun | Ibadan | Ondo"
};

const products = [
  {
    name: "Elite Small Chops Platter",
    description: "A sophisticated selection of puff-puff, samosas, spring rolls, and mosi, prepared with our signature award-winning spice blend.",
    price: "₦15,500",
    image: "https://images.unsplash.com/photo-1666190091090-1d312a4b04c2?auto=format&fit=crop&q=80"
  },
  {
    name: "Signature Grill Feast",
    description: "Succulent flame-grilled proteins including spiced chicken, fish, and turkey served with glazed plantains.",
    price: "₦28,000",
    image: "https://images.unsplash.com/photo-1665332195309-9d75071138f0?auto=format&fit=crop&q=80"
  },
  {
    name: "Artisan Dessert Box",
    description: "Curated luxury sweets featuring mini-parfaits, chocolate truffles, and gourmet glazed doughnuts.",
    price: "₦18,000",
    image: "https://images.unsplash.com/photo-1530648672449-81f6c723e2f1?auto=format&fit=crop&q=80"
  },
  {
    name: "Craft Cocktail Service",
    description: "Bespoke beverage catering featuring exotic fruit blends and premium spirit infusions for any event size.",
    price: "₦12,500",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80"
  }
];

const features = [
  { title: "Award-Nominated Quality", description: "Recognized as a nominee for Caterer of the Year, ensuring excellence in every bite.", icon: <Trophy /> },
  { title: "Full-Scale Catering", description: "From intimate dinners to massive weddings across South-West Nigeria.", icon: <Utensils /> },
  { title: "Certified Excellence", description: "Professional culinary certification backing every recipe and service protocol.", icon: <Award /> },
  { title: "Event Aesthetics", description: "We don't just cook; we design the visual experience of your food service.", icon: <Sparkles /> }
];

const testimonials = [
  { name: "Adewale Taiwo", text: "Their small chops were the talk of my wedding in Ibadan. Pure class!", role: "Groom" },
  { name: "Seyi Olugbenga", text: "The grills are on another level. You can taste the certification in the quality.", role: "Event Planner" },
  { name: "Bisi Akande", text: "Luxury in every meal is not just a slogan, it is their reality. Best desserts in Osogbo.", role: "Corporate Client" }
];

const stats = [
  { number: "40k+", label: "Social Followers" },
  { number: "3", label: "States Covered" },
  { number: "500+", label: "Events Hosted" }
];

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

const useTypewriter = (text: string, speed = 55) => {
  const [display, setDisplay] = useState('');
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) { setDisplay(prev => prev + text.charAt(i)); i++; }
      else clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return display;
};

function SafeImage({ src, alt, fill, width, height, className, priority }: any) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-zinc-100 ${className}`}>
        <ImageOff size={28} className="text-zinc-300" />
      </div>
    );
  }
  return (
    <Image 
      src={src} alt={alt} fill={fill} 
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} 
    />
  );
}

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const typedTagline = useTypewriter("LUXURY IN EVERY BITE.");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main className="relative">
      {/* HEADER */}
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        scrolled ? 'bg-white shadow-xl py-4' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-white p-2 font-heading font-bold text-xl leading-none">
              DKA
            </div>
            <span className={`font-heading font-bold text-2xl tracking-tighter ${scrolled ? 'text-accent' : 'text-white md:text-accent'}`}>
              D KITCHEN ADDICT
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['Menu', 'About', 'Contact'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} 
                className="font-medium text-sm uppercase tracking-widest hover:text-primary transition-colors">
                {link}
              </a>
            ))}
            <a href="#contact" className="bg-primary text-white px-6 py-3 font-bold text-sm uppercase tracking-widest hover:brightness-110 transition-all">
              Book Now
            </a>
          </div>

          <button onClick={() => setMenuOpen(true)} className="md:hidden text-accent">
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* MOBILE NAV */}
      <div className={`fixed inset-0 z-[110] bg-primary transition-transform duration-500 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 flex flex-col h-full">
          <button onClick={() => setMenuOpen(false)} className="self-end text-white mb-12">
            <X size={32} />
          </button>
          <div className="flex flex-col gap-8">
            {['Menu', 'About', 'Contact'].map((link) => (
              <a key={link} onClick={() => setMenuOpen(false)} href={`#${link.toLowerCase()}`} className="font-heading text-6xl font-bold text-white uppercase italic">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* HERO (HR-D) */}
      <section id="home" className="min-h-screen flex flex-col justify-center bg-white px-6 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <SafeImage src="https://images.unsplash.com/photo-1709396759392-63c7853638a3?auto=format&fit=crop&q=80" alt="Texture" fill className="object-cover grayscale" />
        </div>
        
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto w-full pt-20">
          <h1 className="font-heading text-[12vw] md:text-[10vw] font-bold text-accent leading-[0.8] tracking-tighter uppercase italic">
            {typedTagline}<span className="text-primary animate-pulse">_</span>
          </h1>
          <div className="mt-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 border-t-4 border-accent pt-12">
            <p className="text-accent/70 text-xl md:text-2xl max-w-xl leading-tight font-medium uppercase italic">
              {brand.description}
            </p>
            <div className="flex flex-col gap-4 w-full md:w-auto">
              <a href="#contact" className="bg-primary text-white px-12 py-6 font-bold text-xl uppercase italic
                shadow-[8px_8px_0px_#1A1A1A] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all duration-200 text-center">
                Book Your Event
              </a>
              <p className="text-accent/40 font-mono text-xs text-right tracking-widest">
                SERVING OSUN · IBADAN · ONDO
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DIVIDER RULE */}
      <div className="py-16 flex items-center gap-8 px-8 max-w-6xl mx-auto">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <span className="text-primary font-heading font-bold text-sm tracking-[0.4em] uppercase whitespace-nowrap opacity-70">
          {brand.tagline}
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </div>

      {/* FEATURES (F-ICON-GRID) - V4 Staggered */}
      <SectionWrapper variant="V4" className="py-28 px-6 bg-accent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="font-heading text-6xl md:text-8xl font-bold text-white uppercase italic tracking-tighter">
              Why D Kitchen Addict
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <FeatureCard key={i} index={i} feature={f} />
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* GALLERY (Bonus) - V7 Blur Cascade */}
      <SectionWrapper variant="V7" className="py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-6xl font-bold text-accent mb-12 uppercase italic">Visual Feast</h2>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {[
              "https://images.unsplash.com/photo-1617796110169-c4ebdb3eeaf8?auto=format&fit=crop&q=80",
              "https://images.unsplash.com/photo-1661775085411-7ad692c9a436?auto=format&fit=crop&q=80",
              "https://images.unsplash.com/photo-1666190091090-1d312a4b04c2?auto=format&fit=crop&q=80",
              "https://images.unsplash.com/photo-1665332195309-9d75071138f0?auto=format&fit=crop&q=80",
              "https://images.unsplash.com/photo-1530648672449-81f6c723e2f1?auto=format&fit=crop&q=80"
            ].map((src, i) => (
              <div key={i} className="break-inside-avoid relative rounded-xl overflow-hidden group">
                <SafeImage src={src} alt="Catering" className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* PRODUCTS (P-STAGGER) - V2 Scale Reveal */}
      <section id="menu" className="py-28 px-6 bg-accent overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-32">
          {products.map((p, i) => (
            <ProductRow key={i} index={i} product={p} />
          ))}
        </div>
      </section>

      {/* ABOUT (Bonus) - V3 Horizontal Split + V9 Stats */}
      <SectionWrapper variant="V3" className="py-28 px-6 bg-primary overflow-hidden" id="about">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-square relative z-10 rounded-3xl overflow-hidden shadow-2xl">
              <SafeImage src="https://images.unsplash.com/photo-1617796110169-c4ebdb3eeaf8?auto=format&fit=crop&q=80" alt="Kitchen" fill className="object-cover" />
            </div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl" />
          </div>
          <div className="text-white">
            <h2 className="font-heading text-6xl md:text-7xl font-bold uppercase italic leading-none mb-8">
              The Culinary Addict Story
            </h2>
            <p className="text-xl leading-relaxed opacity-90 mb-12">
              Founded on the principle that food should be a luxury experience regardless of the scale. D Kitchen Addict has grown from a local secret to a tri-state catering powerhouse, recognized for our commitment to quality, taste, and visual presentation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-white/20 pt-12">
              {stats.map((s, i) => (
                <div key={i} className="animate-slideUp" style={{ transitionDelay: `${i * 150}ms` }}>
                  <p className="font-heading text-5xl font-bold">{s.number}</p>
                  <p className="text-sm uppercase tracking-widest opacity-70 font-medium">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* TESTIMONIALS (T-SPOTLIGHT) - V4 Staggered */}
      <SectionWrapper variant="V4" className="py-28 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-6xl font-bold text-accent mb-20 uppercase italic">Voices of Satisfaction</h2>
          <div className="space-y-12">
            {testimonials.map((t, i) => (
              <div key={i} className="relative py-12 px-10 rounded-3xl border border-zinc-100 bg-zinc-50 group hover:border-primary/30 transition-all duration-500">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-bold">
                  &ldquo;
                </div>
                <p className="text-accent text-2xl md:text-3xl leading-relaxed font-medium italic">
                  {t.text}
                </p>
                <div className="mt-8 flex items-center justify-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-accent text-white flex items-center justify-center font-heading font-bold text-xl">
                    {t.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-accent uppercase tracking-tighter text-lg">{t.name}</p>
                    <p className="text-primary text-sm font-bold uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* CONTACT (C3) - V1 Fade Slide */}
      <section id="contact" className="py-32 px-6 bg-accent">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-primary font-mono text-xs tracking-[0.4em] uppercase mb-4 font-bold">Secure Your Date</p>
          <h2 className="font-heading text-6xl md:text-8xl font-bold text-white mb-6 uppercase italic tracking-tighter">Let&apos;s Cook.</h2>
          <p className="text-white/40 mb-16 text-xl">Experience the pinnacle of Nigerian luxury catering. Serving Osun, Ibadan, and Ondo.</p>
          <ContactForm />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-zinc-100 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-primary text-white p-2 font-heading font-bold text-xl leading-none">DKA</div>
                <span className="font-heading font-bold text-2xl tracking-tighter text-accent">D KITCHEN ADDICT</span>
              </div>
              <p className="text-accent/50 max-w-xs leading-relaxed italic">
                Redefining the art of the palate with luxury in every single meal. Serving luxury vibes, nationwide.
              </p>
            </div>
            <div>
              <h4 className="font-heading font-bold text-xl uppercase mb-6">Experience</h4>
              <ul className="space-y-4 text-accent/60 font-medium">
                <li><a href="#menu" className="hover:text-primary transition-colors">Signature Menu</a></li>
                <li><a href="#about" className="hover:text-primary transition-colors">Our Story</a></li>
                <li><a href="#contact" className="hover:text-primary transition-colors">Private Events</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-bold text-xl uppercase mb-6">Connect</h4>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 text-accent/60">
                  <MapPin size={18} className="text-primary" />
                  <span>{contact.address}</span>
                </div>
                {contact.instagram && (
                  <a href={`https://instagram.com/${contact.instagram}`} className="flex items-center gap-3 text-accent/60 hover:text-primary transition-colors">
                    <Instagram size={18} className="text-primary" />
                    <span>@{contact.instagram}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-zinc-100 text-zinc-400 text-xs tracking-widest uppercase font-bold">
            <p>© {new Date().getFullYear()} D KITCHEN ADDICT. ALL RIGHTS RESERVED.</p>
            <p className="mt-4 md:mt-0">MADE WITH LUXURY</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

function SectionWrapper({ children, variant, className, id }: any) {
  const { ref, isVisible } = useScrollReveal();
  
  const getVariantClass = () => {
    switch(variant) {
      case 'V1': return isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12';
      case 'V2': return isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0';
      case 'V3': return isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20';
      case 'V4': return isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10';
      case 'V5': return isVisible ? 'opacity-100 skew-y-0 translate-y-0' : 'opacity-0 skew-y-2 translate-y-8';
      case 'V7': return isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-6 blur-sm';
      default: return '';
    }
  };

  return (
    <section id={id} ref={ref} className={`${className} transition-all duration-1000 ${getVariantClass()}`}>
      {children}
    </section>
  );
}

function FeatureCard({ feature, index, index: idx }: any) {
  return (
    <div className="p-8 rounded-3xl border border-white/5 bg-white/5 hover:bg-primary/10 hover:border-primary/30 transition-all duration-500 group"
      style={{ transitionDelay: `${idx * 150}ms` }}>
      <div className="mb-8 w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
        {feature.icon}
      </div>
      <h3 className="font-heading text-3xl font-bold text-white uppercase italic mb-4">{feature.title}</h3>
      <p className="text-white/50 text-lg leading-snug">{feature.description}</p>
    </div>
  );
}

function ProductRow({ product, index }: any) {
  const { ref, isVisible } = useScrollReveal();
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
      <div className="w-full md:w-1/2 relative group">
        <div className="aspect-[4/5] relative rounded-[3rem] overflow-hidden shadow-[30px_30px_0px_#FF5F1F]">
          <SafeImage src={product.image} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
        </div>
      </div>
      <div className={`w-full md:w-1/2 ${isEven ? 'text-left' : 'md:text-right'}`}>
        <span className="font-mono text-primary text-sm font-bold tracking-[0.3em] uppercase mb-6 block">
          0{index + 1} — SIGNATURE SERIES
        </span>
        <h3 className="font-heading text-6xl md:text-7xl font-bold text-white leading-[0.9] uppercase italic mb-8">
          {product.name}
        </h3>
        <p className="text-white/60 text-xl leading-relaxed mb-10 max-w-xl">
          {product.description}
        </p>
        <div className="flex flex-col gap-6">
          <span className="text-5xl font-heading font-bold text-primary">{product.price}</span>
          <a href="#contact" className="bg-white text-accent px-10 py-5 font-bold uppercase italic text-lg w-fit
            hover:bg-primary hover:text-white transition-all duration-300">
            Secure Platter
          </a>
        </div>
      </div>
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  if (sent) {
    return (
      <div className="bg-white p-12 rounded-[2rem] text-center animate-scaleIn">
        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
          <CheckCheck size={40} />
        </div>
        <h3 className="font-heading text-4xl font-bold text-accent uppercase italic mb-4">Message Received</h3>
        <p className="text-accent/60 text-lg">Thank you. Our luxury specialists will reach out to confirm your booking details.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative text-left">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {['name', 'email', 'phone'].map((field) => (
          <input
            key={field}
            type={field === 'email' ? 'email' : 'text'}
            placeholder={field.toUpperCase()}
            required
            className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-xl px-6 py-4 text-accent placeholder-accent/30 font-bold uppercase text-sm focus:border-primary outline-none transition-all"
            onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
          />
        ))}
      </div>
      <textarea
        placeholder="TELL US ABOUT YOUR EVENT..."
        rows={4}
        required
        className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-xl px-6 py-4 text-accent placeholder-accent/30 font-bold uppercase text-sm focus:border-primary outline-none transition-all"
        onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white py-6 rounded-xl font-bold text-xl uppercase italic hover:brightness-110 transition-all flex justify-center items-center gap-3 disabled:opacity-50"
      >
        {loading ? <Loader2 className="animate-spin" /> : "Initiate Experience"}
      </button>
    </form>
  );
}