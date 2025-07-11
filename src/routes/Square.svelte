<script lang="ts">
	export let emoji: string;
	export let selected: boolean;
	export let found: boolean;
	export let group: 'a' | 'b';
	import { get_custom_svg_url, get_twemoji_url } from "./utils";
	import {send} from "./transition";
</script>

<div class="square" class:flipped={selected || found } >
	<button on:click />

	<div class="background" />
:width
	{#if !found}
		<img 
		out:send={{ key:`${emoji}:${group}` }}
		alt ={emoji}
		src={`/svg/${emoji}`}
		/>
	{/if}
</div>

<style>
	.square {
		display: flex;
		justify-content: center;
		align-items: center;
		transform-style: preserve-3d;
		transition: transform 0.4s;
		
	}
	.flipped  {
		transform: rotateY(180deg);
	}
	button {
		position: absolute;
		width: 100%;
		height: 100%;
		backface-visibility: hidden;
		background: var(--bg4);;
		border:0;
		border-radius: 1em;
		font-size: inherit;
	}
	.background {
		position: absolute;
		background-color: var(--bg);
		border:0.3em solid var(--bg2);
		transform: rotateY(180deg);
		backface-visibility: hidden;
		width: 100%;
		height: 100%;
		border-radius: 1em;
	}
	img {
		width:6em;
		height:6em;
		pointer-events: none;
		transform: rotateY(180deg);
		backface-visibility: hidden;
	}
</style>
