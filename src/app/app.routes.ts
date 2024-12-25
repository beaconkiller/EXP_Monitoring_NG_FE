import { Routes } from '@angular/router';
import { PLayoutComponent } from './p-layout/p-layout.component';
import { PHomeComponent } from './p-home/p-home.component';
import { PNewApprovalComponent } from './.p-new-approval/p-new-approval.component';
import { PNewApprovalV2Component } from './p-new-approval-v2/p-new-approval-v2.component';
import { AuthGuard } from './auth.guard';
import { PLoginComponent } from './p-login/p-login.component';
import { PCekPengajuanComponent } from './p-cek-pengajuan/p-cek-pengajuan.component';
import { PApprovePengajuanComponent } from './p-approve-pengajuan/p-approve-pengajuan.component';
import { PInfoPengajuanComponent } from './p-info-pengajuan/p-info-pengajuan.component';
import { PRevisiPengajuanComponent } from './p-revisi-pengajuan/p-revisi-pengajuan.component';
import { PUserProfileComponent } from './p-user-profile/p-user-profile.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home', // Redirects base URL to '/home'
        pathMatch: 'full' // Ensures the entire path is matched
    },

    {
        path: '',
        component: PLayoutComponent,
        // canActivateChild: [AuthGuard],
        children: [
            { path: 'home', component: PHomeComponent },
            { path: 'new-approval', component: PNewApprovalComponent },
            { path: 'cek-pengajuan', component: PCekPengajuanComponent },
            { path: 'approve-pengajuan', component: PApprovePengajuanComponent },
            { path: 'info-pengajuan', component: PInfoPengajuanComponent },
            { path: 'revisi-pengajuan', component: PRevisiPengajuanComponent },
            { path: 'user-settings', component: PNewApprovalComponent },
            { path: 'profile', component: PUserProfileComponent }
        ]
    },
    {
        path: 'login',
        component: PLoginComponent,
        // canActivate: [AuthGuard],
    },
    // { path: '**', component: PLoginComponent },

];
