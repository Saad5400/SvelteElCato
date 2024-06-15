import "unplugin-icons/types/svelte";
import type TypedPocketBase from "$lib/models/TypedPocketBase";
import type User from "$lib/models/User";

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      pb: TypedPocketBase;
      user: User | null;
      course: any;
    }

    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }

  interface ListResult<T> {
    items: T[];
    total: number;
  }

  interface ViewTransition {
    updateCallbackDone: Promise<void>;
    ready: Promise<void>;
    finished: Promise<void>;
    skipTransition: () => void;
  }

  interface Document {
    startViewTransition(updateCallback: () => Promise<void>): ViewTransition;
  }
}

export {};
