<script lang="ts">
	import Grid from "./Grid.svelte";
	import { shuffle } from "./utils";
	import { levels } from "./levels";
	import type { Level } from "./levels";
	import Found from "./Found.svelte";
	import Countdown from "./Countdown.svelte";
	import { onMount } from "svelte";
	import { createEventDispatcher } from "svelte";


	const dispatch = createEventDispatcher();

	let size: number;
	let grid: string[] = [];
	let found: string[] = [];
	let	remaining: number ;
	let duration: number ;
	let playing:boolean = false;

	export function start(level: Level) {
		size = level.size;
		grid = create_grid(level);
		remaining = level.duration;
		duration = level.duration;
		const sliced =level.emojis.slice();
		const pairs: string[] = [];

		for (let i = 0; i < level.size ** 2 / 2; i++) {
			const index = Math.floor(Math.random() * sliced.length);
			const emoji = sliced[index];
			sliced.splice(index, 1);
			pairs.push(emoji);
		}

		grid = shuffle([...pairs, ...pairs]);
		found = [];

		resume();
	}

	export function resume() {
		playing = true;
		countdown();

		dispatch("play");
	}
	export function quit() {
		playing = false;
		found = [];
		dispatch("quit");
	}

	function create_grid(level: Level) {
		const copy = level.emojis.slice();
		const pairs: string[] = [];
		for (let i = 0; i < level.size ** 2 / 2; i++) {
			const index = Math.floor(Math.random() * copy.length);
			const emoji = copy[index];
			copy.splice(index, 1);
			pairs.push(emoji);
		}
		pairs.push(...pairs);
		return shuffle(pairs);
	}

	function countdown(){
		const start = Date.now();
		let ramaining_at_start = remaining;
		function loop(){
			if(!playing) return;
			requestAnimationFrame(loop);
			remaining = ramaining_at_start - (Date.now()- start);

			if(remaining <= 0){
				//TODO Game has been lost
				dispatch("lose");
				playing = false;
			}
		}
		loop();
	}


</script>

<div class="game" style="--size: {size}">
	<div class="info">
	{#if playing}
	<Countdown {remaining} {duration} on:click={()=>{
		playing = false;
		dispatch("pause");
	}}/>
	{/if}

	</div>
	<div class="grid-container">
		<Grid
			{grid}
			on:found={(e) => {
				found = [...found, e.detail.emoji];
				if(found.length === size*size/2){
					//ToDO win the game
					playing = false;
					setTimeout(()=>{
						playing =  false;
						dispatch("win");
					},1000);

				}

			}}
			{found}
		/>
	</div>
	<div class="info">
		<Found {found} />
	</div>
</div>

<style>
	.game {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
		font-size: min(1vmin, 0.5rem);
	}
	.info {
		width: 80em;
		height: 10em;
	}
	.grid-container {
		width: 80em;
		height: 80em;
	}
</style>
