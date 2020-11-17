import Route from "./route.js";

export default class Router {

    constructor(rootQuery){
        this.routes = [];
        this.currentRoute = null;
        this.rootQuery = rootQuery;
    }

    use(path, component, data){
        const route = new Route(path, component, this.rootQuery, data);
        this.routes.push(route);
        return this;
    }

    start(){
        window.onpopstate = (event => {
            this.redirect(event.currentTarget.location.pathname);
            return false;
        }).bind(this);

        this.redirect(window.location.pathname);
    }

    redirect(path){
        this.currentRoute = this.routes.find(route => route.path === path ||
            route.path.slice(0, route.path.lastIndexOf('/')) === path.slice(0, path.lastIndexOf('/'))
                && route.path.indexOf(':') !== -1);
        if(!this.currentRoute){
            this.redirect('/404');
        }
        else if(this.currentRoute.path.indexOf(':') !== -1){
            let data = {};
            let value = path.split('/')[path.split('/').length - 1];
            let key = this.currentRoute.path
                .split('/')[this.currentRoute.path.split('/').length - 1]
                    .split('')
                    .splice(1)
                    .join('');
            data[key] = value;
            this.currentRoute.render(data);
        }
        else
            this.currentRoute.render();
    }

    findRoute(path){
        //  path:   /item/1
        //  need:   /item/:index

    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }
}