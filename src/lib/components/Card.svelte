<script context="module" lang="ts">
    export const meta = {
        name: 'Card',
        props: {
            title: {type: "string", default: "Card title"},
            subtitle: {type: "string", default: "Card subtitle"},
            image: {type: "image", default: "image"},
            variant: {type: 'enum'},
            size: { type: 'enum', options: ['sm', 'md', 'lg'], default: 'md' },
			disabled: { type: 'boolean', default: false }
        }
    }



</script>

<script lang="ts">

    export let title = "";
    export let subtitle = "";
    export let image = "";
</script>

<div class="card">
    {#if image}
        <img class="card-image" src={image} alt={title} />
    {/if}
    <div class="card-content">
        {#if title}
            <h2 class="card-title">{title}</h2>
        {/if}
        {#if subtitle}
            <p class="card-subtitle">{subtitle}</p>
        {/if}
        <slot />
    </div>
</div>

<style>
    .card {
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        background: #fff;
        overflow: hidden;
        max-width: 350px;
        margin: 1rem;
        transition: box-shadow 0.2s;
    }
    .card:hover {
        box-shadow: 0 4px 16px rgba(0,0,0,0.10);
    }
    .card-image {
        width: 100%;
        height: 180px;
        object-fit: cover;
        display: block;
    }
    .card-content {
        padding: 1rem;
    }
    .card-title {
        margin: 0 0 0.5rem 0;
        font-size: 1.25rem;
        font-weight: 600;
    }
    .card-subtitle {
        margin: 0 0 1rem 0;
        color: #666;
        font-size: 1rem;
    }
</style>