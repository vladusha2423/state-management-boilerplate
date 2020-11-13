import store from './store/index.js';
import App from './components/app.component.js';

const app = new App();

const init = function(){
    document.body.innerHTML = app.render();
}
store.events.subscribe('stateChange', init);
init();

document.addEventListener('click', function(event){
    let input = document.querySelector('.list__input');
    if(event.target instanceof HTMLButtonElement &&
        event.target.classList.contains('list__button')){
        store.dispatch('addItem', input.value);
    }
    if(event.target instanceof HTMLButtonElement &&
        event.target.classList.contains('list__delete-button')){
        let text = event.target.previousSibling.textContent.trim();
        store.dispatch('clearItem', { text });
    }
});
