export default class Route{
    constructor(path, component, rootQuery, data){
        this.path = path;
        this.component = component;
        this.rootQuery = rootQuery;
        this.data = data;
    }
    render(data){
        let root = document.querySelector(this.rootQuery);
        root.innerHTML = '';
        if(data)
            root.append(new this.component(data).render());
        else
            root.append(new this.component().render());
    }
}