import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { DepositComponent } from './deposit.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { DetailComponent } from './detail/detail.component';
import { OrderDepositPipe } from './order-deposit.pipe';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '../../../node_modules/@ngrx/store';
import { DepositReducer } from './deposit.reducer';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardRoutingModule,
    StoreModule.forFeature('deposit', DepositReducer)
  ],
  declarations: [
    DashboardComponent,
    DepositComponent,
    StatisticsComponent,
    DetailComponent,
    OrderDepositPipe
  ],
  exports: [
    SharedModule
  ]
})
export class DepositModule { }
