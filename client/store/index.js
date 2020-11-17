import Store from '../modules/store/store.js';
import {cpmStore} from "./cpm.js";

const state = {
    items: [
        'Привет',
        'Как дела',
        'Заебись',
        'А ты как',
        'Тоже заебись'
    ],
    cpm: cpmStore.state
};

export default new Store({
    state,
    actions: {
        addItem(context, payload) {
            context.commit('addItem', payload);
        },
        clearItem(context, payload) {
            context.commit('clearItem', payload);
        },
        ...cpmStore.actions
    },
    mutations: {
        addItem(state, payload) {
            state.items.push(payload);

            return state;
        },
        clearItem(state, payload) {
            state.items.splice(state.items.indexOf(payload.text), 1);

            return state;
        },
        ...cpmStore.mutations
    }
});