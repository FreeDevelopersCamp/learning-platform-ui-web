import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
:root {
  &, &.light-mode {
  /* Grey */
  --color-grey-0: #fff;
  --color-grey-50: #f9fafb;
  --color-grey-100: #f3f4f6;
  --color-grey-200: #e5e7eb;
  --color-grey-300: #d1d5db;
  --color-grey-400: #9ca3af;
  --color-grey-500: #6b7280;
  --color-grey-600: #4b5563;
  --color-grey-700: #374151;
  --color-grey-800: #1f2937;
  --color-grey-900: #111827;

  --color-blue-100: #e0f2fe;
  --color-blue-700: #0369a1;
  --color-green-100: #dcfce7;
  --color-green-700: #15803d;
  --color-yellow-100: #fef9c3;
  --color-yellow-700: #a16207;
  --color-silver-100: #e5e7eb;
  --color-silver-700: #374151;
  --color-indigo-100: #e0e7ff;
  --color-indigo-700: #4338ca;

  --color-red-100: #fee2e2;
  --color-red-700: #b91c1c;
  --color-red-800: #991b1b;

  --backdrop-color: rgba(255, 255, 255, 0.1);

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);
  

    --image-grayscale: 0;
  --image-opacity: 100%;
  }
  
  &.dark-mode {
    --color-grey-0: #18212f;
--color-grey-50: #111827;
--color-grey-100: #1f2937;
--color-grey-200: #374151;
--color-grey-300: #4b5563;
--color-grey-400: #6b7280;
--color-grey-500: #9ca3af;
--color-grey-600: #d1d5db;
--color-grey-700: #e5e7eb;
--color-grey-800: #f3f4f6;
--color-grey-900: #f9fafb;

--color-blue-100: #075985;
--color-blue-700: #e0f2fe;
--color-green-100: #166534;
--color-green-700: #dcfce7;
--color-yellow-100: #854d0e;
--color-yellow-700: #fef9c3;
--color-silver-100: #374151;
--color-silver-700: #f3f4f6;
--color-indigo-100: #3730a3;
--color-indigo-700: #e0e7ff;


--color-red-100: #fee2e2;
--color-red-700: #b91c1c;
--color-red-800: #991b1b;

--backdrop-color: rgba(0, 0, 0, 0.3);

--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
--shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
--shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

--image-grayscale: 10%;
--image-opacity: 90%;
  }
  
  
  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;

/* Indigo */
--color-indigo-50: #eef2ff;
--color-indigo-100: #e0e7ff;
--color-indigo-200: #c7d2fe;
--color-indigo-500: #6366f1;
--color-indigo-600: #4f46e5;
--color-indigo-700: #4338ca;
--color-indigo-800: #3730a3;
--color-indigo-900: #312e81;

/* Teal */
--color-teal-50: #f0fdfa;
--color-teal-100: #ccfbf1;
--color-teal-200: #99f6e4;
--color-teal-500: #14b8a6;
--color-teal-600: #0d9488;
--color-teal-700: #0f766e;
--color-teal-800: #115e59;
--color-teal-900: #134e4a;

/* Amber */
--color-amber-50: #fffbeb;
--color-amber-100: #fef3c7;
--color-amber-200: #fde68a;
--color-amber-500: #f59e0b;
--color-amber-600: #d97706;
--color-amber-700: #b45309;
--color-amber-800: #92400e;
--color-amber-900: #78350f;

/* Purple */
--color-purple-50: #f5f3ff;
--color-purple-100: #ede9fe;
--color-purple-200: #ddd6fe;
--color-purple-500: #8b5cf6;
--color-purple-600: #7c3aed;
--color-purple-700: #6d28d9;
--color-purple-800: #5b21b6;
--color-purple-900: #4c1d95;

/* Rose */
--color-rose-50: #fff1f2;
--color-rose-100: #ffe4e6;
--color-rose-200: #fecdd3;
--color-rose-500: #f43f5e;
--color-rose-600: #e11d48;
--color-rose-700: #be123c;
--color-rose-800: #9f1239;
--color-rose-900: #881337;

/* Cyan */
--color-cyan-50: #ecfeff;
--color-cyan-100: #cffafe;
--color-cyan-200: #a5f3fc;
--color-cyan-500: #06b6d4;
--color-cyan-600: #0891b2;
--color-cyan-700: #0e7490;
--color-cyan-800: #155e75;
--color-cyan-900: #164e63;

/* Orange */
--color-orange-50: #fff7ed;
--color-orange-100: #ffedd5;
--color-orange-200: #fed7aa;
--color-orange-500: #f97316;
--color-orange-600: #ea580c;
--color-orange-700: #c2410c;
--color-orange-800: #9a3412;
--color-orange-900: #7c2d12;

/* Lime */
--color-lime-50: #f7fee7;
--color-lime-100: #ecfccb;
--color-lime-200: #d9f99d;
--color-lime-500: #84cc16;
--color-lime-600: #65a30d;
--color-lime-700: #4d7c0f;
--color-lime-800: #3f6212;
--color-lime-900: #365314;

/* Pink */
--color-pink-50: #fdf2f8;
--color-pink-100: #fce7f3;
--color-pink-200: #fbcfe8;
--color-pink-500: #ec4899;
--color-pink-600: #db2777;
--color-pink-700: #be185d;
--color-pink-800: #9d174d;
--color-pink-900: #831843;

/* Emerald */
--color-emerald-50: #ecfdf5;
--color-emerald-100: #d1fae5;
--color-emerald-200: #a7f3d0;
--color-emerald-500: #10b981;
--color-emerald-600: #059669;
--color-emerald-700: #047857;
--color-emerald-800: #065f46;
--color-emerald-900: #064e3b;

/* Blue */
--color-blue-50: #eff6ff;
--color-blue-100: #dbeafe;
--color-blue-200: #bfdbfe;
--color-blue-500: #3b82f6;
--color-blue-600: #2563eb;
--color-blue-700: #1d4ed8;
--color-blue-800: #1e40af;
--color-blue-900: #1e3a8a;

/* Cool Gray */
--color-coolgray-50: #f9fafb;
--color-coolgray-100: #f3f4f6;
--color-coolgray-200: #e5e7eb;
--color-coolgray-500: #6b7280;
--color-coolgray-600: #4b5563;
--color-coolgray-700: #374151;
--color-coolgray-800: #1f2937;
--color-coolgray-900: #111827;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  /* Creating animations for dark mode */
  transition: background-color 0.3s, border 0.3s;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "Poppins", sans-serif;
  color: var(--color-grey-700);

  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-600);
  outline-offset: -1px;
}

/* Parent selector, finally 😃 */
button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;

  /* For dark mode */
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}

`;

export default GlobalStyles;

/*
FOR DARK MODE


*/
