
import * as fromReducers from './reducers';

export class Store {
  private subscribers: Function[];
  private reducers: { [key: string]: Function };
  private state: { [key: string]: any };

  constructor(reducers = {}, initialState = {} /* fromReducers.initialState */) {
    this.reducers = reducers;

    this.state = this.reduce(initialState, {}); // setup initial state
  }

  get value() {
    return {...this.state};
  }

  dispatch(action: { type: string, payload: any }) {
    this.state = this.reduce(this.state, action);
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