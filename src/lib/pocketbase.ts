import { PUBLIC_POCKETBASE_URL } from "$env/static/public";
import PocketBase from "pocketbase";
import type TypedPocketBase from "$lib/models/TypedPocketBase";

export function createPbInstance() {
  return new PocketBase(PUBLIC_POCKETBASE_URL) as TypedPocketBase;
}
