import { Routes } from '@angular/router';
import { PLayoutComponent } from './p-layout/p-layout.component';
import { PHomeComponent } from './pages/p-home/p-home.component';
import { PServersComponent } from './pages/p-servers/p-servers.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home', // Redirects base URL to '/home'
        pathMatch: 'full' // Ensures the entire path is matched
    },
    {
        path: '',
        component: PLayoutComponent,
        children: [
            { path: 'home', component: PHomeComponent },
            { path: 'servers', component: PServersComponent },
        ]
    },
    // { path: '**', component: PLoginComponent },

];
