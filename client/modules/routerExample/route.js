export default class Route {
    constructor(pathname, view, props) {
        this._pathname = pathname;
        this._block = view;
        this._props = props;
    }

    navigate(pathname) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
            this._block.resume();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname) {
        return pathname === this._pathname;
    }

    render() {
        if (!this._block) {
            let app = document.querySelector('.app');
            app.append(this._block.render());
            return;
        }

        this._block.show();
    }
}
