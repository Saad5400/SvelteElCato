import type { Handle } from "@sveltejs/kit";
import { createPbInstance } from "$lib/pocketbase";
import { PUBLIC_ENVIRONMENT } from "$env/static/public";

export const handle: Handle = async ({ event, resolve }) => {
  const pb = createPbInstance();
  pb.authStore.loadFromCookie(event.request.headers.get("cookie") || "");

  try {
    if (pb.authStore.isValid) await pb.collection("users").authRefresh();
  } catch (_) {
    pb.authStore.clear();
  }

  event.locals.pb = pb;
  event.locals.user = pb.authStore.model;

  const response = await resolve(event);

  response.headers.set("set-cookie", pb.authStore.exportToCookie({
    httpOnly: false,
    secure: PUBLIC_ENVIRONMENT === "production",
  }));

  return response;
};