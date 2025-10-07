<script>
  // mdsvex передаёт frontmatter в эту компоненту как prop
  export let frontmatter = {};
</script>

<article class="md-doc">
  {#if frontmatter.title}
    <h1>{frontmatter.title}</h1>
  {/if}

  <slot />
</article>

<style>
  .md-doc { max-width: 60ch; margin: 0 auto; padding: 1rem; }
  .md-doc h1 { margin-bottom: .5rem; }
</style>
