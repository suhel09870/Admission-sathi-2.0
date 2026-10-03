export default function BooksIllustration() {
  return (
    <svg
      className="books-illustration"
      viewBox="0 0 180 140"
      role="img"
      aria-labelledby="books-illustration-title"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="books-illustration-title">Stack of books topped with a graduation cap</title>
      <defs>
        <linearGradient id="books-green" x1="38" x2="143" y1="69" y2="105" gradientUnits="userSpaceOnUse">
          <stop stopColor="#79C68C" />
          <stop offset="1" stopColor="#39985A" />
        </linearGradient>
        <linearGradient id="books-gold" x1="28" x2="145" y1="96" y2="127" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F7D77F" />
          <stop offset="1" stopColor="#E9B64D" />
        </linearGradient>
      </defs>
      <ellipse cx="92" cy="125" rx="76" ry="9" fill="#7BB68A" fillOpacity=".24" />
      <path d="m34 96 75-21 51 17-76 23-50-19Z" fill="url(#books-green)" />
      <path d="m34 96 50 19v9L34 105v-9ZM84 115l76-23v9l-76 23v-9Z" fill="#2D824C" />
      <path d="m24 75 77-21 51 17-78 23-50-19Z" fill="#F4F8F3" />
      <path d="m24 75 50 19v9L24 84v-9ZM74 94l78-23v9L74 103v-9Z" fill="#C8D9CC" />
      <path d="m35 55 66-19 46 16-66 20-46-17Z" fill="url(#books-gold)" />
      <path d="m35 55 46 17v8L35 63v-8ZM81 72l66-20v8L81 80v-8Z" fill="#C98E34" />
      <path d="m52 36 43-15 42 15-43 15-42-15Z" fill="#2B8150" />
      <path d="m52 36 42 15v5L52 41v-5ZM94 51l43-15v5L94 56v-5Z" fill="#1F6940" />
      <path d="m90 18 49 17-49 17-49-17 49-17Z" fill="#378D58" />
      <path d="m90 18 49 17-49 4-49-4 49-17Z" fill="#57A86E" />
      <path d="M132 36v23" stroke="#D99E3F" strokeWidth="3" strokeLinecap="round" />
      <circle cx="132" cy="62" r="4" fill="#D99E3F" />
    </svg>
  );
}