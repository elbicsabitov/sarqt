// js/state.js — shared mutable app state. Imported by views, router, app.
export const state = {
  theme: (typeof localStorage !== 'undefined' ? localStorage.getItem('sarqt.theme') : null)
    || (typeof matchMedia !== 'undefined' && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
  route: typeof location !== 'undefined' ? (location.hash.slice(1) || '') : '',
  share: {
    mode: 'restaurant', name: '', region: '', what: '',
    pickup_from: '', pickup_to: '', contact_phone: '', contact_tg: '',
    event_type: '', expiry: '', photoFile: null, contactExpanded: false,
  },
  filterFind: 'all',
  user: null,     // Supabase auth user, or null
  profile: null,  // profiles row, or null
};

/** Reset the share form to empty, keeping the chosen mode. */
export function freshShare(mode = 'restaurant') {
  return {
    mode, name: '', region: '', what: '',
    pickup_from: '', pickup_to: '', contact_phone: '', contact_tg: '',
    event_type: '', expiry: '', photoFile: null, contactExpanded: false,
  };
}

/** Fill empty contact fields of a share-state from the user's profile.
 *  Pure — returns a new object; user-entered values and a null profile are preserved. */
export function seededShare(share, profile) {
  if (!profile) return { ...share };
  return {
    ...share,
    region: share.region || profile.region || '',
    contact_phone: share.contact_phone || profile.phone || '',
    contact_tg: share.contact_tg || profile.tg || '',
  };
}
