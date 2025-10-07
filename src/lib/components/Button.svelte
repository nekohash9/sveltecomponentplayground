<script lang="ts">
  export let label: string = '';
  export let variant: 'primary' | 'secondary' | 'ghost' = 'primary';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let disabled: boolean = false;
  export let type: 'button' | 'submit' | 'reset' = 'button';

  // реактивный список классов
  $: classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    disabled ? 'btn--disabled' : ''
  ].filter(Boolean).join(' ');
</script>

<button class={classes} disabled={disabled} type={type} aria-disabled={disabled} aria-pressed={disabled}>
  <slot>{label}</slot>
</button>

<style>
  .btn {
    display:inline-flex;
    align-items:center;
    justify-content:center;
    gap:.5rem;
    padding:.55rem 1rem;
    border-radius:10px;
    font-weight:600;
    cursor:pointer;
    border:1px solid transparent;
    transition: transform .06s ease, box-shadow .08s ease, opacity .08s;
    user-select:none;
  }
  .btn:active { transform: translateY(1px); }

  .btn--primary { background:#0b84ff; color:#fff; border-color: rgba(11,132,255,0.15); box-shadow: 0 6px 18px rgba(11,132,255,0.12); }
  .btn--secondary { background:transparent; color:#0b84ff; border-color: rgba(15,23,42,0.06); }
  .btn--ghost { background:transparent; color:inherit; border-color:transparent; }

  .btn--sm { font-size:.85rem; padding:.35rem .7rem; }
  .btn--md { font-size:1rem; padding:.55rem 1rem; }
  .btn--lg { font-size:1.05rem; padding:.8rem 1.2rem; }

  .btn--disabled { opacity:.5; cursor:not-allowed; pointer-events:none; transform: none; }
</style>
