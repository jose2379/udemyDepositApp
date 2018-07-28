import { Routes } from "@angular/router";

import { StatisticsComponent } from "../deposit/statistics/statistics.component";
import { DepositComponent } from "../deposit/deposit.component";
import { DetailComponent } from "../deposit/detail/detail.component";

export const dashboardRoutes: Routes = [
    { path: '', component: StatisticsComponent },
    { path: 'deposit', component: DepositComponent },
    { path: 'detail', component: DetailComponent },
]
