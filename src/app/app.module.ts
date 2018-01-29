import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// not used in production
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';

import * as fromStore from '../products/store';

const reducers = {
  todos: fromStore.reducer
};
const store = new fromStore.Store(reducers);

let todoInput = document.querySelector('#todo-input') as HTMLInputElement;
let addTodoButton = document.querySelector('#artem-add-todo') as HTMLButtonElement;
addTodoButton.addEventListener(
  'click',
  (ev) => {
    let input = todoInput.value.trim();
    if (!input) return;

    let payload = {
      label: input,
      complete: false
    };

    store.dispatch({
      type: 'ADD_TODO',
      payload
    })

    console.log(store.value);
  })

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
