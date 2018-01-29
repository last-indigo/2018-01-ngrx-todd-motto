
import * as fromReducers from './reducers';

export class Store {
  private subscribers: Function[];
  private reducers: { [key: string]: Function };
  private state: { [key: string]: any };

  constructor(reducers = {}, initialState = {} /* fromReducers.initialState */) {
    this.subscribers = [];
    this.reducers = reducers;

    this.state = this.reduce(initialState, {}); // setup initial state
  }

  get value() {
    return {...this.state};
  }

  subscribe(fn: Function) {
    this.subscribers = [...this.subscribers, fn];
    this.notify();  // to immediately receive the data, otherwise store would need to change again
  }

  dispatch(action: { type: string, payload: any }) {
    this.state = this.reduce(this.state, action);
    this.notify();  // logically, notify on any given change
  }

  private notify() {
    this.subscribers.forEach((fn) => fn(this.value));
  }

  private reduce(state: any, action: any) {
    let newState: any = {};

    for (const prop in this.reducers) {
      // restrict access just to a slice of the state
      // state.todos = { data, loaded, loading ... }
      const stateSlice = state[prop];

      // thus, each reducer manages its own piece of state
      newState[prop] = this.reducers[prop](stateSlice, action);
    }

    return newState;
  }
}