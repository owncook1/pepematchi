<script lang="ts">
	export let found: string[] = [];
	import { get_custom_svg_url, get_twemoji_url } from "./utils";
	import {receive} from "./transition";
</script>

<div class="found">
	{#each found as emoji (emoji)}
		<div class="pair">
		<img
		in:receive={{ key:`${emoji}:a` }}
		alt={emoji} src={get_custom_svg_url(emoji)} />
		<img
		in:receive={{ key:`${emoji}:b` }}
		alt={emoji} src={get_custom_svg_url(emoji)} />
		</div>
	{/each}
</div>

<style>
	.found {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5em;
		height:100%;
		filter: drop-shadow(0.2em 0.2em 0.2em rgba(0,0,0,0.2));
	}
	.pair {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 1em;
		width:4em;
		height:100%;
		}

	img {
		position: absolute;
		pointer-events: none;
		width:4em;
	}
</style>
