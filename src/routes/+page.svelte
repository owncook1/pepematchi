<script lang="ts">
  import Game from "./Game.svelte";
  import "../styles.css";
  let state: "waiting" | "playing" | "paused" | "won" | "lost" = "waiting";
  import { levels } from "./levels";
  import Modal from "./Modal.svelte";
  import { confetti } from "@neoconfetti/svelte";

  let game: Game;
</script>

<Game
  bind:this={game}
  on:play={() => {
    state = "playing";
  }}
  on:pause={() => {
    state = "paused";
  }}
  on:win={() => {
    state = "won";
  }}
  on:lose={() => {
    state = "lost";
  }}
  on:quit={() => {
    state = "waiting";
  }}
/>

{#if state !== "playing"}
  <Modal>
    <header>
      <h1>pepe<span>match</span>i</h1>
      <p>the emoji matching game</p>
    </header>
    {#if state === "won" || state === "lost"}
      <p>you {state} the game!</p>
    {:else if state === "paused"}
      <p>game paused</p>
    {:else if state === "waiting"}
      <p>choose a level:</p>
    {/if}

    <div class="buttons">
      {#if state === "paused"}
        <button on:click={()=>
          game.resume()}>resume</button>
        <button on:click={()=>game.quit()}>Quit</button>
      {:else}
        {#each levels as level}
          <button
            on:click={() => {
              game.start(level);
              state = 'playing';
            }}>{level.label}</button
          >
        {/each}
      {/if}
    </div>
  </Modal>
{/if}

{#if state === "won"}
  <div
    class="confetti"
    use:confetti={{
      stageWidth: innerWidth,
      stageHeight: innerHeight,
    }}
  >
  </div>
{/if}

<style>
  h1 {
    font-size: 4em;
    margin: 0;
    color:#269B4D;
  }
  h1 span {
    color: rgb(231, 219, 231);
  }
  p {
    font-family: grandstander;
  }
  .confetti {
    position: fixed;
    top: 30%;
    left: 50%;
    width: 100%;
    height: 100%;
    z-index: 1001;
    pointer-events: none;
  }

button{
	font-family: grandstander, cursive;
	font-size: 1rem;
	padding: 0.5rem 1rem;
	border: none;
	border-radius: 0.5rem;
	background-color: rgb(31, 29, 29);
	color: white;
	cursor: pointer;
	margin:0.5em 0.5em 0 0;
} 

button:hover{
  background-color: rgb(51, 49, 49);
}
</style>
