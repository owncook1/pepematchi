<div class="modal-background" >
  <div class="modal">
		<slot/>
	</div>

</div>

<style>
  .modal-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color:black;
		display:grid;
		place-items:center;
		z-index: 1000;
		justify-content: center;
		align-items: center;
		text-align: center;
	}


</style>
