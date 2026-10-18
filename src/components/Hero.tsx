import heroImage from '../assets/img/bobines/IMG_0531.jpg';
import { company } from '../data/soquibat';
import { CTAButton } from './CTAButton';

export function Hero() {
  return (
    <section
      className="relative flex h-screen min-h-screen w-screen items-center overflow-hidden bg-ink"
      aria-label="Soquibat, bâtir des relations de confiance"
    >
      <img
        src={heroImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full rounded-none object-cover"
        draggable={false}
      />
      <div aria-hidden="true" className="hero-image-overlay--left absolute inset-0 z-10" />

      <div className="relative z-20 mx-auto w-full max-w-[1400px] px-6 py-32 lg:px-12">
        <div className="hero-copy w-full max-w-2xl">
          <p className="mb-4 font-display text-xs tracking-[0.2em] text-orange uppercase sm:text-sm">
            Avec nos partenaires
          </p>
          <h1 className="font-display text-4xl leading-[0.96] uppercase sm:text-5xl lg:text-6xl xl:text-7xl">
            Bâtir des relations
          </h1>
          <p className="mt-3 font-display text-base leading-snug uppercase sm:text-xl lg:text-2xl">
            De confiance
          </p>
          <p className="hero-copy-muted mt-5 max-w-xl text-sm leading-relaxed sm:text-base lg:mt-7">
            {company.description}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4 sm:mt-9">
            <CTAButton href="/produits">Nos produits</CTAButton>
            <CTAButton href="/groupe" variant="ghost">Le groupe</CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}
