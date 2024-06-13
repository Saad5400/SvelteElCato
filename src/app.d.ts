import "unplugin-icons/types/svelte";
import type TypedPocketBase from "$lib/models/TypedPocketBase";
import type BaseModel from "$lib/models/BaseModel";

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      pb: TypedPocketBase;
      user: BaseModel & {
        email: string;
        emailVisibility: boolean;
        username: string;
        verified: boolean;
        registeredCourses: string[];
        markedQuestions: string[];
        solvedQuestions: string[];
      };
      course: any;
    }

    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
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
