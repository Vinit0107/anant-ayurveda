interface BrandLogoProps {
  className?: string;
}

export default function BrandLogo({ className = '' }: BrandLogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        aria-hidden="true"
        className="h-full aspect-square shrink-0"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="24" cy="24" r="21.5" stroke="#C6A56C" strokeWidth="1.2" />
        <path d="M24 36C22.1 28.6 21.8 22.5 24 15.4" stroke="#E8DCC0" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M22.7 27.6C15.3 27.1 11.4 22.3 12.7 15.7C19.3 14.4 24.1 18.3 24.6 25.7L22.7 27.6Z" fill="#87A07B" />
        <path d="M25.1 22.8C25.5 15.4 30.3 11.5 36.9 12.8C38.2 19.4 34.3 24.2 26.9 24.6L25.1 22.8Z" fill="#C6A56C" />
      </svg>
      <span className="flex flex-col gap-[0.3em] leading-none">
        <span className="font-playfair font-semibold tracking-[0.16em] text-[#E8DCC0]">ANANT</span>
        <span className="text-[0.62em] font-medium tracking-[0.22em] text-[#87A07B]">AYURVEDA</span>
      </span>
    </span>
  );
}
