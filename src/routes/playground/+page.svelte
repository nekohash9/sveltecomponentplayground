<script lang="ts">
	import Button from '../../lib/components/Button.svelte';
	import Card from '../../lib/components/Card.svelte';


	let label = 'Click me';
	let variant: 'primary' | 'secondary' | 'ghost' = 'primary';
	let size: 'sm' | 'md' | 'lg' = 'md';
	let disabled = false;
	let copied = false;

	function generateCode() {
		const attrs = [
			`label="${String(label).replace(/"/g, '&quot;')}"`,
			variant !== 'primary' ? `variant="${variant}"` : '',
			size !== 'md' ? `size="${size}"` : '',
			disabled ? 'disabled' : ''
		]
			.filter(Boolean)
			.join(' ');
		return `<Button ${attrs} />`;
	}

	async function copyCode() {
		if (typeof navigator === 'undefined' || !navigator.clipboard) {
			alert('Clipboard API unavailable.');
			return;
		}
		try {
			await navigator.clipboard.writeText(generateCode());
			copied = true;
			setTimeout(() => (copied = false), 1200);
		} catch (e) {
			alert('Copy failed: ' + e);
		}
	}

	
	
</script>

<div class="wrap">
	<aside class="sidebar" aria-labelledby="controls-title">
		<div>
			<h2 id="controls-title" class="title">Controls</h2>
			<p class="subtitle">Change the props and see the result in real time.</p>
		</div>

		<fieldset class="field">
			<label for="labelInput"><span>Label</span></label>
			<input id="labelInput" type="text" bind:value={label} />
		</fieldset>

		<fieldset class="field">
			<label for="variantSelect"><span>Variant</span></label>
			<select id="variantSelect" bind:value={variant}>
				<option value="primary">primary</option>
				<option value="secondary">secondary</option>
				<option value="ghost">ghost</option>
			</select>
		</fieldset>

		<fieldset class="field">
			<label for="sizeSelect"><span>Size</span></label>
			<select id="sizeSelect" bind:value={size}>
				<option value="sm">sm</option>
				<option value="md">md</option>
				<option value="lg">lg</option>
			</select>
		</fieldset>

		<div class="field">
			<label class="checkbox-row">
				<input id="disabledCheckbox" type="checkbox" bind:checked={disabled} />
				<span>Disabled</span>
			</label>
		</div>

		<div class="actions" role="group" aria-label="Actions">
			<button class="btn" on:click={copyCode} aria-label="Copy component code">
				<!-- simple copy icon (inline SVG) -->
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden='false'>
					<path
						d="M16 2H7a2 2 0 0 0-2 2v11"
						stroke="currentColor"
						stroke-width="1.6"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<rect
						x="9"
						y="6"
						width="12"
						height="14"
						rx="2"
						stroke="currentColor"
						stroke-width="1.6"
					/>
				</svg>
				Copy
			</button>
			{#if copied}
				<div class="copied" role="status" aria-live="polite">Copied!</div>
			{/if}
		</div>
	</aside>

	<main class="main">
		<section class="panel">
			<div class="meta-row">
				<div class="meta-left">
					<strong style="font-size:16px">Preview</strong>
					<div style="font-size:13px; color:var(--muted)">Interactive live preview</div>
				</div>
				<div style="font-size:13px; color:var(--muted)">Rendered by local component</div>
			</div>

			<div style="height:14px"></div>

			<div class="preview-row">
				<div class="preview-box" aria-live="polite">
					<!-- вариант: передаём текст как слот — всегда обновляется -->
					<Button {variant} {size} {disabled}>
						{label}
					</Button>
				</div>

				<div style="flex:1; min-width:260px">
					<div style="display:flex; justify-content:space-between; align-items:center;">
						<div style="font-weight:600">Component</div>
						<div style="color:var(--muted); font-size:13px">Svelte · local</div>
					</div>

					<div class="code-block" role="region" aria-label="Component code">
						{generateCode()}
					</div>
				</div>
			</div>
		</section>
	</main>
</div>

<style>
	:global(:root) {
		--bg: #0f172a;
		--surface: #0b1220;
		--muted: #94a3b8;
		--card: #ffffff;
		--accent: #0b84ff;
		--radius: 12px;
		--shadow: 0 6px 20px rgba(2, 6, 23, 0.6);
		--gap: 20px;
	}

	/* Page layout */
	.wrap {
		display: grid;
		grid-template-columns: 320px 1fr;
		gap: var(--gap);
		padding: 32px;
		min-height: calc(100vh - 40px);
		background: linear-gradient(180deg, #f7fafc 0%, #eef2ff 100%);
		font-family:
			Inter,
			ui-sans-serif,
			system-ui,
			-apple-system,
			'Segoe UI',
			Roboto,
			'Helvetica Neue',
			Arial;
		color: #0f172a;
	}

	/* Sidebar (controls) */
	.sidebar {
		background: var(--card);
		border-radius: var(--radius);
		padding: 20px;
		box-shadow: var(--shadow);
		display: flex;
		flex-direction: column;
		gap: 12px;
		position: sticky;
		top: 24px;
		height: fit-content;
	}

	.title {
		margin: 0 0 6px;
		font-size: 18px;
		font-weight: 700;
		letter-spacing: -0.01em;
	}
	.subtitle {
		margin: 0 0 12px;
		font-size: 13px;
		color: var(--muted);
	}

	fieldset {
		border: 0;
		padding: 0;
		margin: 0;
	}
	.field {
		display: flex;
		flex-direction: column;
		gap: 6px;
		margin-bottom: 10px;
	}
	label span {
		font-size: 13px;
		color: #0f172a;
		font-weight: 600;
	}
	input[type='text'],
	select {
		appearance: none;
		border: 1px solid #e6eef8;
		padding: 10px 12px;
		border-radius: 8px;
		background: #fff;
		outline: none;
		font-size: 14px;
	}
	input[type='text']:focus,
	select:focus {
		box-shadow: 0 0 0 4px rgba(11, 132, 255, 0.12);
		border-color: var(--accent);
	}

	.checkbox-row {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 14px;
	}

	.actions {
		display: flex;
		gap: 8px;
		margin-top: 6px;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		padding: 8px 12px;
		background: var(--accent);
		color: white;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		font-weight: 600;
		font-size: 14px;
	}
	.btn:active {
		transform: translateY(1px);
	}
	.btn:focus {
		box-shadow: 0 0 0 4px rgba(11, 132, 255, 0.12);
		outline: none;
	}

	/* Main area */
	.main {
		display: flex;
		flex-direction: column;
		gap: 18px;
	}

	.panel {
		background: var(--card);
		border-radius: var(--radius);
		padding: 22px;
		box-shadow: var(--shadow);
	}

	.preview-row {
		display: flex;
		gap: 20px;
		align-items: center;
		flex-wrap: wrap;
	}

	.preview-box {
		padding: 28px;
		background: linear-gradient(180deg, #fbfdff, #f6f9ff);
		border-radius: 10px;
		border: 1px solid rgba(15, 23, 42, 0.04);
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	.code-block {
		margin-top: 12px;
		background: #0b1220;
		color: #e6eef8;
		padding: 14px;
		border-radius: 8px;
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, 'Roboto Mono', monospace;
		font-size: 13px;
		white-space: pre-wrap;
		overflow: auto;
	}

	.meta-row {
		display: flex;
		justify-content: space-between;
		gap: 12px;
		align-items: center;
	}
	.meta-left {
		color: var(--muted);
		font-size: 13px;
	}

	/* small states */
	.copied {
		color: #10b981;
		font-weight: 700;
	}

	/* responsive */
	@media (max-width: 900px) {
		.wrap-button {
			grid-template-columns: 1fr;
			padding: 16px;
		}
		.sidebar {
			position: relative;
			top: auto;
			width: 100%;
		}
	}
</style>
