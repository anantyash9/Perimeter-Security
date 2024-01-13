import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainSplitComponent } from './components/main-split/main-split.component';
import { MapComponent } from './components/map/map.component';

const routes: Routes = [ { path: '', component: MainSplitComponent } , { path: 'map', component: MapComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
