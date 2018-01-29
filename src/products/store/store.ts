
import * as fromReducers from './reducers';

export class Store {
    private subscribers: Function[];
    private reducers: { [key: string]: Function };
    private state: { [key: string]: any };

    constructor(reducers = {}, initialState = fromReducers.initialState) {
        this.state = initialState;
        this.reducers = {
            todos: fromReducers.reducer
        };
    }

    get value() {
        return this.state;
    }

    dispatch(action: { type: string, payload: any }) {
        // this.state = {
        //     ...this.state,
        //     todos: [...this.state.todos, action.payload]
        // };
        const newState = this.reducers.todos(this.state, action);
        this.state = newState;
        console.log(this.state);
    }
}