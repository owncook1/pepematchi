<script lang="ts">
  import Game from "./Game.svelte";
  import "../styles.css";
  let state: "waiting" | "playing" | "paused" | "won" | "lost" | "showdonate" = "waiting";
  import { levels } from "./levels";
  import Modal from "./Modal.svelte";
  import { confetti } from "@neoconfetti/svelte";
  import { onMount } from "svelte";


  let game: Game;
  onMount(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/owncook1/pepecoin-donation@v1.0.0/pepecoin-donation.js';
    script.defer = true;
    document.body.appendChild(script);
  });

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

{#if state !== "playing" && state !=="showdonate"}
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
    
    <div class="donate-footer">
  <button class="donate-link" on:click={() => state = "showdonate"}>
    Donate
  </button>
</div>
  </Modal>
{/if}

{#if state === "showdonate"}
  <div class="donate-modal">
    <button class="close-btn" on:click={() => state = "waiting"}>×</button>
    <pepecoin-donation
      address="PqyhjZSdhQam4Biedt1uahE2gSdos38yo5"
      title="Donate Pepecoin"
    ></pepecoin-donation>
  </div>
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
  .donate-modal {
    position: fixed;
    inset: 0;
    background: rgb(0,0,0);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }
  .donate-footer {
  margin-top: auto;
  text-align: center;
  padding: 1rem 0;
}
.donate-link {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-family: grandstander, cursive;
  font-size: 1rem;
  text-decoration: underline;
  margin: 0;
  padding: 0;
}
.donate-link:hover {
  color: #aaa;
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
.close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 2rem;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
  }

button:hover{
  background-color: rgb(51, 49, 49);
}
</style>
