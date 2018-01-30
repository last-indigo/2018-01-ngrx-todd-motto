import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// not used in production
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';

/* ===================== */
/* TODOS EXAMPLE - START */
import * as fromTodosStore from '../products/store-todos';

const todosReducers = {
  todos: fromTodosStore.reducer
};
const todosStore = new fromTodosStore.Store(todosReducers);  // NOTE: NOT injectable to components!

let todoInput = document.querySelector('#todo-input') as HTMLInputElement;
let addTodoButton = document.querySelector('#artem-add-todo') as HTMLButtonElement;
addTodoButton.addEventListener(
  'click',
  (ev) => {
    let input = todoInput.value.trim();
    if (!input) return;

    let newTodo = {
      label: input,
      complete: false
    };

    todosStore.dispatch(new fromTodosStore.AddTodo(newTodo));
  })

// so that we can see the changes as we make them
todosStore.subscribe(
  (state: any) => {
    console.log("STATE:::", state);
    renderTodos(state.todos.data);
  }
);

function renderTodos(todos: Array<any>) {
  const container = document.querySelector('#todos-outlet');
  container.innerHTML = '';
  todos.forEach(todo => {
    const el = document.createElement('LI');
    el.innerHTML = todo.label;
    container.appendChild(el)
  });
}
/* TODOS EXAMPLE - END */
/* =================== */

// this would be done dynamically with webpack for builds
const environment = {
  development: true,
  production: false,
};

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : [];

// bootstrap
import { AppComponent } from './containers/app/app.component';

// routes
export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'products' },
  {
    path: 'products',
    loadChildren: '../products/products.module#ProductsModule',
  },
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES),
    StoreModule.forRoot({}, { metaReducers }),
    EffectsModule.forRoot([]),
    environment.development ? StoreDevtoolsModule.instrument() : [],
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
