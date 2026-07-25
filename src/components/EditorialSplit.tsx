import Link from "next/link";
import Image from "next/image";

interface EditorialSplitProps {
  eyebrow: string;
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  videoSrc?: string;
  imageSrc?: string;
  youtubeId?: string;
  imageAlt?: string;
  reversed?: boolean;
  bgClass?: string;
}

export default function EditorialSplit({
  eyebrow,
  title,
  description,
  ctaText,
  ctaHref,
  videoSrc,
  imageSrc,
  youtubeId,
  imageAlt = "Editorial Media",
  reversed = false,
  bgClass = "bg-surface-canvas",
}: EditorialSplitProps) {
  return (
    <section className={`w-full py-16 md:py-24 lg:py-32 ${bgClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          <div className={`w-full aspect-[4/3] rounded-xl overflow-hidden bg-brand-dark relative shadow-card-hover border border-border-subtle group ${reversed ? 'lg:order-2' : ''}`}>
            {videoSrc ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
            ) : youtubeId ? (
              <div className="relative w-full h-full">
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full object-cover scale-125 pointer-events-none"
                ></iframe>
              </div>
            ) : imageSrc ? (
              imageSrc.endsWith('.gif') ? (
                <img
                  src={imageSrc} 
                  alt={imageAlt} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <Image 
                  src={imageSrc} 
                  alt={imageAlt} 
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                />
              )
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 font-sans">
                Görsel Alanı
              </div>
            )}
          </div>
          
          <div className={`flex flex-col items-start ${reversed ? 'lg:order-1' : ''}`}>
            <p className="font-sans uppercase text-xs sm:text-sm tracking-widest font-semibold text-brand-teal">
              {eyebrow}
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-text-primary mt-3 leading-tight">
              {title}
            </h2>
            <p className="font-sans text-base text-gray-600 leading-relaxed mt-4 max-w-lg">
              {description}
            </p>
            <Link 
              href={ctaHref}
              className="inline-flex items-center mt-8 text-sm font-semibold uppercase tracking-wider text-text-primary group link-underline"
            >
              {ctaText} 
              <span className="ml-2 transform transition-transform group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>
          
        </div>
      </div>
    </section>
  );
}
