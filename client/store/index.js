import Store from '../modules/store/store.js';

const state = {
    items: [
        'Привет',
        'Как дела'
    ]
};

export default new Store({
    state,
    actions: {
        addItem(context, payload) {
            context.commit('addItem', payload);
        },
        clearItem(context, payload) {
            context.commit('clearItem', payload);
        }
    },
    mutations: {
        addItem(state, payload) {
            state.items.push(payload);

            return state;
        },
        clearItem(state, payload) {
            state.items.splice(state.items.indexOf(payload.text), 1);

            return state;
        }
    }
});