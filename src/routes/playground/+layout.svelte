<script>
	import '/src/app.css';
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width,initial-scale=1" />
	<title>Component library</title>
</svelte:head>

<div class="app-root">
	<header class="site-header">
		<div class="container">nComponents</div>
	</header>

	<main class="container">
		<slot />
	</main>

	<footer class="site-footer">
		<div class="container">nhash AI skibidi industry</div>
	</footer>
</div>

<style>
	:global(:root) {
		--container-width: 1200px;
	}

	.app-root {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background: linear-gradient(180deg, #f7fafc, #eef2ff);
	}
	.site-header {
		background: transparent;
		padding: 12px 0;
	}
	.container {
		width: 100%;
		max-width: var(--container-width);
		margin: 0 auto;
		padding: 0 20px;
		box-sizing: border-box;
	}
	main.container {
		flex: 1;
		padding-top: 18px;
		padding-bottom: 40px;
	}
	.site-footer {
		padding: 12px 0;
		font-size: 13px;
		color: #6b7280;
	}
</style>
