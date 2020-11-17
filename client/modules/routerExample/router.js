import Route from './route.js';

class Router {
    constructor(rootQuery) {
        // if (Router.__instance) {
        //     return Router.__instance;
        // }

        this.routes = [];
        this.history = window.history;
        this.currentRoute = null;
        this.rootQuery = rootQuery;
    }

    use(pathname, block) {
        const route = new Route(pathname, block, {rootQuery: this.rootQuery});

        this.routes.push(route);

        return this;
    }

    start() {
        window.onpopstate = (event => {
            this.onRoute(event.currentTarget.location.pathname);
        }).bind(this);

        this.onRoute(window.location.pathname);
    }

    onRoute(pathname) {
        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }

        if (this.currentRoute && this.currentRoute !== route) {
            this.currentRoute.leave();
        }

        this._currentRoute = route;
        route.render(route, pathname);
    }

    go(pathname) {
        this.history.pushState({}, '', pathname);
        this.onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname) {
        return this.routes.find(route => route.match(pathname));
    }
}

export default Router;
