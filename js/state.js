// js/state.js — shared mutable app state. Imported by views, router, app.
export const state = {
  theme: localStorage.getItem('sarqt.theme')
    || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
  route: location.hash.slice(1) || '',
  share: {
    mode: 'restaurant', name: '', region: '', what: '',
    pickup_from: '', pickup_to: '', contact_phone: '', contact_tg: '',
    event_type: '', expiry: '', photoFile: null,
  },
  filterFind: 'all',
  filterStories: 'all',
  user: null,     // Supabase auth user, or null
  profile: null,  // profiles row, or null
};

/** Reset the share form to empty, keeping the chosen mode. */
export function freshShare(mode = 'restaurant') {
  return {
    mode, name: '', region: '', what: '',
    pickup_from: '', pickup_to: '', contact_phone: '', contact_tg: '',
    event_type: '', expiry: '', photoFile: null,
  };
}
