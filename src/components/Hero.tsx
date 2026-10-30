import { useEffect, useRef, useState } from 'react';
import heroVideo from '../assets/video/Compilation MSC ET TUNISCO.mp4';
import { company } from '../data/soquibat';
import { CTAButton } from './CTAButton';

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(1);
  const [isDraggingVolume, setIsDraggingVolume] = useState(false);

  const changeVolume = (value: number) => {
    setVolume(value);
    if (videoRef.current) videoRef.current.volume = value;
    setIsMuted(value === 0);
  };

  const toggleMuted = () => {
    if (isMuted && volume === 0) {
      changeVolume(0.5);
      return;
    }
    setIsMuted((muted) => !muted);
  };

  useEffect(() => {
    const hero = heroRef.current;
    const video = videoRef.current;
    if (!hero || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch((error: unknown) => {
            if (error instanceof DOMException && error.name === 'AbortError') return;
            console.error('Unable to play the homepage hero video.', error);
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex h-screen min-h-screen w-screen items-center overflow-hidden bg-ink"
      aria-label="Soquibat, bâtir des relations de confiance"
    >
      <video
        ref={videoRef}
        src={heroVideo}
        autoPlay
        muted={isMuted}
        playsInline
        loop
        aria-hidden="true"
        className="absolute inset-0 h-full w-full rounded-none object-cover"
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
      <div className="group absolute bottom-6 right-6 z-30 flex items-center gap-3 lg:bottom-8 lg:right-12">
        <div className="pointer-events-none flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3 py-2 opacity-0 backdrop-blur transition-opacity group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(event) => changeVolume(Number(event.currentTarget.value))}
            onPointerDown={() => setIsDraggingVolume(true)}
            onPointerUp={() => setIsDraggingVolume(false)}
            onPointerCancel={() => setIsDraggingVolume(false)}
            onBlur={() => setIsDraggingVolume(false)}
            aria-label="Volume de la vidéo"
            aria-valuetext={`${Math.round(volume * 100)} %`}
            className={`h-1 w-24 cursor-pointer sm:w-32 ${isDraggingVolume ? 'accent-orange' : 'accent-white'}`}
          />
          <span className="w-8 text-right text-xs tabular-nums text-white/80">{Math.round(volume * 100)}%</span>
        </div>
        <button
          type="button"
          onClick={toggleMuted}
          aria-label={isMuted ? 'Activer le son de la vidéo' : 'Couper le son de la vidéo'}
          aria-pressed={!isMuted}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/60 text-white backdrop-blur transition hover:border-orange hover:text-orange focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
        >
          {isMuted ? (
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5 6 9H3v6h3l5 4V5Z" />
              <path d="m17 9 4 6m0-6-4 6" />
            </svg>
          ) : (
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5 6 9H3v6h3l5 4V5Z" />
              <path d="M15.5 8.5a5 5 0 0 1 0 7m3-10a9 9 0 0 1 0 13" />
            </svg>
          )}
        </button>
      </div>
    </section>
  );
}
