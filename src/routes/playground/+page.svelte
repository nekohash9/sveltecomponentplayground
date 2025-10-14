<script lang="ts">
	const modules = import.meta.glob('/src/lib/components/*.svelte', { eager: true }) as Record<
		string,
		any
	>;

	type Comp = { name: string; Component: any; meta?: Record<string, any> };

	const comps: Comp[] = Object.entries(modules).map(([path, mod]) => {
		const filename = path.split('/').pop() || path;
		const name = (mod.meta && mod.meta.name) || filename.replace('.svelte', '');
		return { name, Component: mod.default, meta: mod.meta };
	});

	let state: Record<string, Record<string, any>> = {};
	for (const c of comps) {
		const props = c.meta?.props || {};
		state[c.name] = {};
		for (const [k, v] of Object.entries(props)) {
			state[c.name][k] = v?.default ?? (v?.type === 'boolean' ? false : '');
		}
	}

	function generateCode(name: string, props: Record<string, any>) {
		const attrs = Object.entries(props)
			.map(([k, v]) => {
				if (typeof v === 'boolean') return v ? k : '';
				if (typeof v === 'string') return `${k}="${String(v).replace(/"/g, '&quot;')}"`;
				return `${k}={${JSON.stringify(v)}}`;
			})
			.filter(Boolean)
			.join(' ');
		return `<${name}${attrs ? ' ' + attrs : ''} />`;
	}

	async function copy(text: string) {
		if (typeof navigator === 'undefined' || !navigator.clipboard) return;
		try {
			await navigator.clipboard.writeText(text);
		} catch {}
	}
</script>

<div class="container-root">
	<aside class="left">
		<div class="brand">Components</div>
		<nav class="comp-list">
			{#each comps as c}
				<button
					class="comp-item"
					on:click={() =>
						window.scrollTo({
							top: document.getElementById(c.name)?.offsetTop - 20 || 0,
							behavior: 'smooth'
						})}
				>
					{c.name}
				</button>
			{/each}
		</nav>
	</aside>

	<main class="content">
		<h1 class="page-title">Playground</h1>

		<div class="grid">
			{#each comps as c (c.name)}
				<section class="doc-card" id={c.name}>
					<header class="doc-head">
						<div class="title-block">
							<div class="comp-title">{c.name}</div>
							<div class="comp-sub">Svelte · local</div>
						</div>
						<button class="copy-btn" on:click={() => copy(generateCode(c.name, state[c.name]))}
							>Copy</button
						>
					</header>

					<div class="doc-body">
						<div class="preview">
							<svelte:component this={c.Component} {...state[c.name]}>
								{#if c.meta?.props && c.meta.props.label}
									{state[c.name].label}
								{/if}
							</svelte:component>
						</div>

						<div class="controls-code">
							<div class="controls">
								{#if c.meta?.props}
									{#each Object.entries(c.meta.props) as [propName, propMeta]}
										<label class="control-row">
											<span class="control-label">{propName}</span>
											{#if propMeta.type === 'boolean'}
												<input type="checkbox" bind:checked={state[c.name][propName]} />
											{:else if propMeta.type === 'enum' && propMeta.options}
												<select bind:value={state[c.name][propName]}>
													{#each propMeta.options as opt}
														<option value={opt}>{opt}</option>
													{/each}
												</select>
											{:else}
												<input type="text" bind:value={state[c.name][propName]} />
											{/if}
										</label>
									{/each}
								{/if}
							</div>

							<pre class="code">{generateCode(c.name, state[c.name])}</pre>
						</div>
					</div>
				</section>
			{/each}
		</div>
	</main>
</div>

<style>
	:global(:root) {
		--bg: #f8fafc;
		--card: #ffffff;
		--muted: #6b7280;
		--accent: #0b84ff;
		--radius: 10px;
		--shadow: 0 4px 14px rgba(2, 6, 23, 0.04);
		--container: 1100px;
	}

	.container-root {
		display: grid;
		grid-template-columns: 220px 1fr;
		gap: 24px;
		padding: 24px;
		min-height: 100vh;
		background: linear-gradient(180deg, #fff, var(--bg));
		box-sizing: border-box;
		font-family:
			Inter,
			ui-sans-serif,
			system-ui,
			-apple-system,
			'Segoe UI',
			Roboto,
			'Helvetica Neue',
			Arial;
	}

	.left {
		position: sticky;
		top: 24px;
		height: fit-content;
	}

	.brand {
		font-weight: 700;
		font-size: 14px;
		margin-bottom: 12px;
		color: #111827;
	}

	.comp-list {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.comp-item {
		text-align: left;
		padding: 8px 10px;
		border-radius: 8px;
		border: none;
		background: transparent;
		color: var(--muted);
		cursor: pointer;
		font-size: 14px;
		transition:
			background 0.15s,
			color 0.15s;
	}
	.comp-item:hover {
		background: rgba(11, 132, 255, 0.06);
		color: #0f172a;
	}

	.content {
		max-width: var(--container);
		margin: 0 auto;
		width: 100%;
	}

	.page-title {
		margin: 0 0 8px 0;
		font-size: 20px;
		color: #111827;
	}

	.grid {
		display: grid;
		gap: 12px;
		grid-auto-rows: minmax(120px, auto);
		grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
	}

	.doc-card {
		background: var(--card);
		border-radius: var(--radius);
		box-shadow: var(--shadow);
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		border: 1px solid rgba(15, 23, 42, 0.04);
	}

	.doc-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.title-block {
		display: flex;
		flex-direction: column;
		gap: 3px;
	}
	.comp-title {
		font-weight: 600;
		font-size: 15px;
		color: #111827;
	}
	.comp-sub {
		font-size: 12px;
		color: var(--muted);
	}

	.copy-btn {
		background: transparent;
		border: 1px solid rgba(11, 132, 255, 0.2);
		color: var(--accent);
		padding: 5px 9px;
		border-radius: 6px;
		cursor: pointer;
		font-weight: 500;
		font-size: 13px;
		transition: all 0.15s;
	}
	.copy-btn:hover {
		background: rgba(11, 132, 255, 0.05);
		border-color: rgba(11, 132, 255, 0.4);
	}

	.doc-body {
		display: flex;
		gap: 14px;
		align-items: flex-start;
		flex-wrap: wrap;
	}

	.preview {
		flex: 0 0 auto;
		min-width: 160px;
		min-height: 72px;
		background: linear-gradient(180deg, #fff, #f6f9ff);
		border-radius: 8px;
		padding: 18px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid rgba(15, 23, 42, 0.05);
	}

	.controls-code {
		display: flex;
		flex-direction: column;
		gap: 8px;
		flex: 1;
		min-width: 220px;
	}

	.controls {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.control-row {
		display: flex;
		gap: 8px;
		align-items: center;
		flex-wrap: wrap;
	}

	.control-label {
		width: 110px;
		color: var(--muted);
		font-size: 13px;
		word-break: break-word;
		line-height: 1.3;
	}

	input[type='text'],
	select {
		flex: 1;
		padding: 7px 10px;
		border-radius: 6px;
		border: 1px solid rgba(15, 23, 42, 0.06);
		outline: none;
		font-size: 13px;
		background: white;
	}
	input[type='checkbox'] {
		width: 16px;
		height: 16px;
	}

	.code {
		background: #0b1220;
		color: #e6eef8;
		padding: 10px;
		border-radius: 8px;
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, 'Roboto Mono', monospace;
		font-size: 13px;
		white-space: pre-wrap;
		overflow: auto;
	}

	@media (max-width: 900px) {
		.container-root {
			grid-template-columns: 1fr;
			padding: 16px;
		}
		.left {
			position: relative;
			top: auto;
			order: 0;
			margin-bottom: 12px;
		}
	}
</style>
