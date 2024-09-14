import type { Handle } from "@sveltejs/kit";
import { createPbInstance } from "$lib/pocketbase";
import { PUBLIC_ENVIRONMENT } from "$env/static/public";
import type User from "$lib/models/User";

export const handle: Handle = async ({ event, resolve }) => {
  const pb = createPbInstance();
  pb.authStore.loadFromCookie(event.request.headers.get("cookie") || "");

  try {
    if (pb.authStore.isValid) await pb.collection("users").authRefresh();
  } catch (_) {
    pb.authStore.clear();
  }

  const user = pb.authStore.model as User | null;
  if (user) {
    console.log(user.clientAddress);
    console.log(event.getClientAddress());
    if (user.clientAddress != '' && user.clientAddress !== event.getClientAddress()) {
      await pb.collection("emails").create({
        toAddress: "sdbtwa@gmail.com",
        subject: "User logged in from different IP",
        html: `<h3>User ${user.displayName} Id: ${user.id} logged in from different IP.</h3><a href="https://pbelcato.sb.sa/_/#/collections?collectionId=_pb_users_auth_&recordId=${user.clientAddress}">IP Info</a>`,
        status: "pending"
      });
      throw new Error("Invalid client address");
    }
    await pb.collection("users").update(user.id, { clientAddress: event.getClientAddress() });
  }

  event.locals.pb = pb;
  event.locals.user = pb.authStore.model as User | null;

  const response = await resolve(event);

  response.headers.set(
    "set-cookie",
    pb.authStore.exportToCookie({
      httpOnly: false,
      sameSite: PUBLIC_ENVIRONMENT === "production" ? "None" : "Lax",
      secure: PUBLIC_ENVIRONMENT === "production"
    })
  );

  return response;
};
