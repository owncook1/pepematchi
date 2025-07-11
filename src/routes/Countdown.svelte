<script lang="ts">
	export let remaining: number;
	export let duration: number;
</script>

<div class="countdown">
	<button on:click
		><svg
			xmlns="http://www.w3.org/2000/svg"
			height="24"
			viewBox="0 -960 960 960"
			width="24"
			><path
				d="M360-320h80v-320h-80v320Zm160 0h80v-320h-80v320ZM480-80q-83
  0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0
  156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127
  85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93
  227t227 93Zm0-320Z"
				style="fill:var(--bg2); stroke:transparent"
			/></svg
		></button
	>
	<div class="duration">
		<div class="remaining" style="--p: {remaining / duration}" />
	</div>
</div>

<style>
	.countdown {
		display: flex;
		align-items: center;
		gap: 1em;
		width:100%;
		height: 100%;
	}
	button {
		font-size: max(8em,2.4em);
		width: 1em;
		height: 1em;
		background: transparent;
		border: none;
		padding:0;
	}
	svg {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
	}

	.duration {
		inline-size: 100%;
		block-size:1em;
		flex: 1;
		height: 1em;
		background: var(--bg4);;
		width:100%;
	}

	.remaining {
		position: absolute;
		inline-size: calc(100% * var(--p));
		background: var(--bg2);
		block-size: 100%;
	}
</style>
