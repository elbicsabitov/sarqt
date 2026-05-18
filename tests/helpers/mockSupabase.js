// tests/helpers/mockSupabase.js — hand-rolled Supabase-client mock.
// Test infrastructure only; never shipped. Records every call and returns
// canned responses configured per test. One singleton per test file
// (Vitest isolates module registries between files).

function build() {
  const state = {
    calls: [],
    queryResult: { data: null, error: null },
    authResults: {},
    storageResults: {},
    functionResults: {},
    authChangeCb: null,
  };
  const record = (scope, method, args) => state.calls.push({ scope, method, args });

  function queryBuilder(table) {
    const b = {
      select(...a) { record('from:' + table, 'select', a); return b; },
      insert(...a) { record('from:' + table, 'insert', a); return b; },
      update(...a) { record('from:' + table, 'update', a); return b; },
      delete(...a) { record('from:' + table, 'delete', a); return b; },
      eq(...a) { record('from:' + table, 'eq', a); return b; },
      gt(...a) { record('from:' + table, 'gt', a); return b; },
      order(...a) { record('from:' + table, 'order', a); return b; },
      single(...a) { record('from:' + table, 'single', a); return b; },
      maybeSingle(...a) { record('from:' + table, 'maybeSingle', a); return b; },
      then(resolve, reject) {
        return Promise.resolve(state.queryResult).then(resolve, reject);
      },
    };
    return b;
  }

  return {
    from(table) { record('client', 'from', [table]); return queryBuilder(table); },
    rpc(fn, params) { record('client', 'rpc', [fn, params]); return Promise.resolve(state.queryResult); },
    auth: {
      signUp(...a) {
        record('auth', 'signUp', a);
        return Promise.resolve(state.authResults.signUp ?? { data: { user: null, session: null }, error: null });
      },
      signInWithPassword(...a) {
        record('auth', 'signInWithPassword', a);
        return Promise.resolve(state.authResults.signInWithPassword ?? { data: { user: null, session: null }, error: null });
      },
      signOut(...a) {
        record('auth', 'signOut', a);
        return Promise.resolve(state.authResults.signOut ?? { error: null });
      },
      getSession(...a) {
        record('auth', 'getSession', a);
        return Promise.resolve(state.authResults.getSession ?? { data: { session: null }, error: null });
      },
      onAuthStateChange(cb) {
        record('auth', 'onAuthStateChange', []);
        state.authChangeCb = cb;
        return { data: { subscription: { unsubscribe() {} } } };
      },
    },
    functions: {
      invoke(name, opts) {
        record('functions', 'invoke', [name, opts]);
        return Promise.resolve(state.functionResults[name] ?? { data: null, error: null });
      },
    },
    storage: {
      from(bucket) {
        record('storage', 'from', [bucket]);
        return {
          upload(...a) {
            record('storage:' + bucket, 'upload', a);
            return Promise.resolve(state.storageResults.upload ?? { data: { path: a[0] }, error: null });
          },
          getPublicUrl(...a) {
            record('storage:' + bucket, 'getPublicUrl', a);
            return state.storageResults.getPublicUrl ?? { data: { publicUrl: 'https://example.test/' + a[0] } };
          },
        };
      },
    },
    // ---- test control surface ----
    __setQueryResult(r) { state.queryResult = r; },
    __setAuthResult(method, r) { state.authResults[method] = r; },
    __setStorageResult(method, r) { state.storageResults[method] = r; },
    __setFunctionResult(name, r) { state.functionResults[name] = r; },
    __calls() { return state.calls; },
    __fireAuthChange(event, session) { if (state.authChangeCb) state.authChangeCb(event, session); },
    __reset() {
      state.calls = [];
      state.queryResult = { data: null, error: null };
      state.authResults = {};
      state.storageResults = {};
      state.functionResults = {};
      state.authChangeCb = null;
    },
  };
}

export const mockSupabase = build();
export function resetMock() { mockSupabase.__reset(); }
