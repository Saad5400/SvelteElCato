import PocketBase from "pocketbase";
import { PUBLIC_POCKETBASE_URL } from "$env/static/public";
import type TypedPocketBase from "$lib/models/TypedPocketBase";

export default function usePb() {
  const pb = new PocketBase(PUBLIC_POCKETBASE_URL) as TypedPocketBase;
  return pb;
}
