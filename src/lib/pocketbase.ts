import { PUBLIC_POCKETBASE_URL } from "$env/static/public";
import PocketBase from "pocketbase";

export function createPbInstance() {
  return new PocketBase(PUBLIC_POCKETBASE_URL);
}
