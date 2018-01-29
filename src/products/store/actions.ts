/* ACTION CONSTANTS */
/* =============== */
export const ADD_TODO = '[Todo] Add Todo';


/* ACTION CREATORS */
/* =============== */

// wrapper functions to not manually type props every time
// also, less error-prone
export class AddTodo {
    // cannot be added or modified after class has been instantiated

    readonly type = ADD_TODO;

    constructor(
        private payload: any
    ) {}
}