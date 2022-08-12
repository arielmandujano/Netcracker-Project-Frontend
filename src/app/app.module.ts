import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { ModelsComponent } from './models/models.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RolesService } from './services/roles.service';
import { ModelsService } from './services/models.service';
import { ModelFiltersComponent } from './model-filters/model-filters.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { CreateReserveComponent } from './create-reserve/create-reserve.component';
import { ContainerComponent } from './container/container.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { InterceptorService } from './interceptors/interceptor.service';
import { CarsService } from './services/cars.service';
import { UsersService } from './services/users.service';
import { TokenService } from './services/token.service';
import { ReserveComponent } from './reserve/reserve.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    ModelsComponent,
    ModelFiltersComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CreateReserveComponent,
    ContainerComponent,
    CarDetailsComponent,
    ReserveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    TokenService,
    RolesService,
    ModelsService,
    CarsService,
    UsersService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : InterceptorService,
      multi : true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
