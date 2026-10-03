export default function StudentIllustration() {
  return (
    <svg
      className="student-illustration"
      viewBox="0 0 500 430"
      role="img"
      aria-labelledby="student-illustration-title"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="student-illustration-title">Student holding books outside a college campus</title>
      <defs>
        <linearGradient id="student-backdrop" x1="45" x2="458" y1="42" y2="394" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F7FFF6" />
          <stop offset="1" stopColor="#D8F1D9" />
        </linearGradient>
        <linearGradient id="student-hoodie" x1="198" x2="332" y1="202" y2="411" gradientUnits="userSpaceOnUse">
          <stop stopColor="#55B979" />
          <stop offset="1" stopColor="#23834C" />
        </linearGradient>
        <linearGradient id="student-book-cover" x1="300" x2="424" y1="252" y2="325" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F3C969" />
          <stop offset="1" stopColor="#DE9E36" />
        </linearGradient>
      </defs>
      <ellipse cx="251" cy="231" rx="225" ry="181" fill="url(#student-backdrop)" />
      <path d="M71 105c14-19 41-20 56-2 22-7 43 8 44 29H62c-2-11 2-21 9-27ZM381 77c11-15 32-16 44-2 17-5 33 6 34 22h-84c-1-8 2-15 6-20Z" fill="#FFF" fillOpacity=".9" />
      <g opacity=".92">
        <path d="M310 207h143v120H310z" fill="#F9FFF7" />
        <path d="M295 211c5-57 39-91 86-91s81 34 86 91H295Z" fill="#75B781" />
        <path d="M324 205c5-39 27-62 57-62s52 23 57 62H324Z" fill="#E6F5E3" />
        <path d="M343 207h76v120h-76z" fill="#D4EBD1" />
        <path d="M356 219h15v50h-15zM391 219h15v50h-15z" fill="#80B98A" />
        <path d="M301 327h162v11H301z" fill="#6DA976" />
        <path d="M379 144v62" stroke="#76AD7B" strokeWidth="5" />
      </g>
      <g fill="#73B77D">
        <circle cx="89" cy="242" r="29" />
        <circle cx="108" cy="214" r="34" />
        <circle cx="129" cy="247" r="25" />
        <circle cx="431" cy="264" r="29" />
        <circle cx="411" cy="232" r="34" />
        <circle cx="392" cy="268" r="24" />
      </g>
      <path d="M111 252v93M416 264v83" stroke="#7E9D69" strokeWidth="8" strokeLinecap="round" />
      <ellipse cx="266" cy="394" rx="129" ry="18" fill="#8EBD8C" fillOpacity=".32" />
      <path d="M207 111c0-34 24-61 56-61 31 0 54 25 54 59v31c0 34-24 62-56 62-30 0-54-27-54-60v-31Z" fill="#3D302B" />
      <path d="M223 111c0-25 17-43 39-43s39 18 39 43v32c0 25-17 44-39 44s-39-19-39-44v-32Z" fill="#D99470" />
      <path d="M218 115c-3-37 17-64 47-65 23 0 42 16 47 42-19 2-32-4-42-16-12 17-29 28-52 29Z" fill="#312924" />
      <path d="M299 92c24 4 35 20 33 40-2 14-10 24-22 31l-11-18V92Z" fill="#312924" />
      <path d="M238 126h.5M284 126h.5" stroke="#49352C" strokeWidth="5" strokeLinecap="round" />
      <path d="M250 151c6 5 14 5 20 0" stroke="#A45E53" strokeWidth="3" strokeLinecap="round" />
      <path d="M248 177v35h37v-35" fill="#C57B5F" />
      <path d="M178 226c12-23 35-36 68-38l20 23 20-23c36 3 60 18 70 43l24 166H145l33-171Z" fill="url(#student-hoodie)" />
      <path d="m246 188 20 23 20-23 15 18-27 35h-16l-27-35 15-18Z" fill="#E9F7E8" />
      <path d="M265 241v80M243 293h45" stroke="#1D6C40" strokeWidth="4" strokeLinecap="round" />
      <path d="M180 234c-25 20-32 50-12 70l47 30 18-22-37-35 28-38" fill="#42A966" />
      <path d="M340 230c26 13 38 37 25 62l-34 41-24-18 23-44-31-30" fill="#2D9255" />
      <path d="M214 310c21-21 48-32 75-30 26 2 48 15 61 37l-17 51H195l19-58Z" fill="#2F9254" />
      <path d="M215 308c26-8 58-9 86 0l-6 54h-83l3-54Z" fill="#F8FCF4" />
      <path d="m205 300 62-17 94 26-61 21-95-30Z" fill="url(#student-book-cover)" />
      <path d="m205 300 95 30v9l-95-30v-9ZM300 330l61-21v9l-61 21v-9Z" fill="#C9822E" />
      <path d="m215 284 59-16 91 26-58 17-92-27Z" fill="#EAF4FA" />
      <path d="m215 284 92 27v8l-92-27v-8ZM307 311l58-17v8l-58 17v-8Z" fill="#AEC9D7" />
      <path d="M261 289c14-9 29-7 41 3" stroke="#D99470" strokeWidth="14" strokeLinecap="round" />
      <path d="M335 304c-11 9-26 8-37-2" stroke="#D99470" strokeWidth="14" strokeLinecap="round" />
      <path d="M154 353h225" stroke="#83B783" strokeWidth="5" strokeLinecap="round" opacity=".5" />
    </svg>
  );
}