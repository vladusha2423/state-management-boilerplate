import Router from './modules/router/router.js';
import Todo from "./components/todo/todo.component.js";
import Example from "./components/example/example.component.js";
import Item from "./components/item/item.component.js";
import NotFound from "./components/notFound/notFound.component.js";

const router = new Router('.app');

router
    .use('/', Todo)
    .use('/example', Example)
    .use('/item/:index', Item)
    .use('/404', NotFound)
    .start();

window.router = router;


