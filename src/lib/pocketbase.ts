import { PUBLIC_POCKETBASE_URL } from "$env/static/public";
import PocketBase, { type SendOptions } from "pocketbase";
import type TypedPocketBase from "$lib/models/TypedPocketBase";
// @ts-ignore
import { AbortController, abortableFetch } from "abortcontroller-polyfill/dist/cjs-ponyfill";

export function createPbInstance(_fetch: any) {

  const { fetch } = abortableFetch(_fetch);
  const pb = new PocketBase(PUBLIC_POCKETBASE_URL) as TypedPocketBase;

  pb.beforeSend = function(url: string, options: SendOptions) {
    options.fetch = fetch;

    return { url, options };
  };

  return pb;
}
