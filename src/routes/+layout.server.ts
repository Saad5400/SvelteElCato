import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals, request }) => {

  const quotes = [
    "“Any fool can write code that a computer can understand. Good programmers write code that humans can understand.”",
    "“Experience is the name everyone gives to their mistakes.”",
    "“Java is to Javascript what car is to Carpet.”",
    "“Knowledge is power”",
    "“Perfection is achieved not when there is nothing more to add, but rather when there is nothing more to take away.”",
    "“Code is like humor. When you have to explain it, it's bad.”",
    "“Never Gonna Give You Up”",
    "“Life is not a problem to be solved, but a reality to be experienced.”",
    "“Every saint has a past, and every sinner has a future.”",
    "“You will not be punished for your anger, you will be punished by your anger.”",
    "“Keep your face always toward the sunshine and shadows will fall behind you.”",
    "“Dead people receive more flowers than the living ones because regret is stronger than gratitude.”",
    "“Better a cruel truth than a comfortable delusion.”",
    "“Don't use yesterday's state of mind, to make today's decision.”",
    "“A ship in harbor is safe, but that is not what ships are built for.”",
    "“Once we accept our limits, we go beyond them.”",
    "“No.”"
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return {
    randomQuote,
    pb: structuredClone(locals.pb),
    user: locals.user,
    cookies: request.headers.get("cookie")
  };
};
