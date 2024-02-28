// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        // interface Locals {}
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}

        interface BaseModel {
            collectionId: string;
            id: string;
            created: string;
            updated: string;
        }

        interface Tag extends BaseModel {
            displayName: string;
        }

        interface Post extends BaseModel {
            collectionName: string;
            content: string;
            displayName: string;
            urlName: string;
            hidden: boolean;
            views: number;
            tags: Tag[];
        }
    }
}

export {};
