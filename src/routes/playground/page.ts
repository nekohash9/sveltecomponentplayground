import type { PageLoad } from './$types';

export const load: PageLoad = () => {
  // путь относительный к этому файлу: ../../lib/components/*.svelte
  const modules = import.meta.glob('../../lib/components/*.svelte', { eager: true }) as Record<string, any>;
  const comps = Object.keys(modules).map(p => {
    const name = p.split('/').pop()!.replace('.svelte','');
    return { id: name.toLowerCase(), name };
  }).sort((a,b)=>a.name.localeCompare(b.name));
  return { components: comps };
};