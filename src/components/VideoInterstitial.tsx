interface VideoInterstitialProps {
  videoSrc?: string;
  youtubeId?: string;
  imageSrc?: string;
  posterSrc?: string;
  caption?: string;
}

export default function VideoInterstitial({ 
  videoSrc = "/assets/main (3).mp4", 
  youtubeId,
  imageSrc,
  posterSrc, 
  caption 
}: VideoInterstitialProps) {
  return (
    <section className="relative w-full aspect-video lg:aspect-[21/9] overflow-hidden bg-brand-dark flex items-center justify-center border-y border-border-subtle">
      {videoSrc ? (
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          poster={posterSrc}
          className="absolute inset-0 w-full h-full object-cover opacity-85"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : youtubeId ? (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
            title="LeadUSG Video Interstitial"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="w-[150%] h-[150%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover opacity-80"
          ></iframe>
        </div>
      ) : imageSrc ? (
        <img 
          src={imageSrc} 
          alt={caption || "Video Interstitial"}
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 w-full h-full"></div>
      )}
      
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] pointer-events-none"></div>

      {caption && (
        <>
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none"></div>
          <div className="absolute bottom-8 lg:bottom-12 inset-x-0 px-4 flex flex-col items-center justify-center text-center z-10">
            <span className="text-brand-teal-light font-mono-tech text-xs uppercase tracking-widest font-semibold mb-2">
              CANLI KLİNİK DEMO & GÖRÜNTÜLEME
            </span>
            <p className="font-display text-2xl sm:text-3xl lg:text-4xl text-white font-semibold max-w-4xl drop-shadow-md">
              {caption}
            </p>
          </div>
        </>
      )}
    </section>
  );
}
