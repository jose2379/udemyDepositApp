import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "../../../node_modules/@angular/router";

import { AngularFireAuthModule } from "angularfire2/auth";

import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";


@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        AngularFireAuthModule,
        RouterModule
    ]
})
export class AuthModule {}
