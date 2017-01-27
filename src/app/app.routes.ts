import { Routes, RouterModule } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './components/home/home.component';
import { PokePowahComponent } from './components/poke-powah/poke-powah.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const appRoutes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'poke-powah', component: PokePowahComponent },
    { path: '**', component: NotFoundComponent }
];