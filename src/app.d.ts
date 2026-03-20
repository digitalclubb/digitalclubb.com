/// <reference types="@sveltejs/kit" />

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

declare module '*.md' {
	import type { SvelteComponent } from 'svelte';

	export default class extends SvelteComponent {}

	export const metadata: Record<string, unknown>;
}

declare module '*.svx' {
	import type { SvelteComponent } from 'svelte';

	export default class extends SvelteComponent {}

	export const metadata: Record<string, unknown>;
}

export {};
