import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // primeng needs this lib for some of its components
import { CommonModule, DatePipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { LOCALE_ID } from '@angular/core';
import { LoginComponent } from './pages/generics/login/login.component';
import { NavbarComponent } from './components/generics/navbar/navbar.component';
import { ManageCorporateUsersComponent } from './components/settings/manage-corporate-users/manage-corporate-users.component';
import { ManageBillingComponent } from './components/settings/manage-billing/manage-billing.component';
import { CourseManagementComponent } from './components/settings/course-management/course-management.component';
import { ManageGroupsComponent } from './components/settings/manage-groups/manage-groups.component';
import { ManageBrandingComponent } from './components/settings/manage-branding/manage-branding.component';
import { EditProfileComponent } from './components/settings/edit-profile/edit-profile.component';
import { CompanyInfoCardsComponent } from './components/dashboard-components/company-info-cards/company-info-cards.component';
import { CoursesTableComponent } from './components/dashboard-components/courses-table/courses-table.component';
import { HomeComponent } from './components/admin/home/home.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { SliderModule } from 'primeng/slider';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { StyleClassModule } from 'primeng/styleclass';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { FileUploadModule } from 'primeng/fileupload';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ColorPickerModule } from 'primeng/colorpicker';
import { AccordionModule } from 'primeng/accordion';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { CarouselModule } from 'primeng/carousel';
import { DividerModule } from 'primeng/divider';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputMaskModule } from 'primeng/inputmask';
import { SkeletonModule } from 'primeng/skeleton';
import { CheckboxModule } from 'primeng/checkbox';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { TagModule } from 'primeng/tag';
import { ConfirmationService } from 'primeng/api';
import { BlockUIModule } from 'primeng/blockui';
import { RippleModule } from 'primeng/ripple';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { QRCodeModule } from 'angularx-qrcode';
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LandingNavbarComponent } from './components/generics/landing-navbar/landing-navbar.component';
import { SupportTicketsComponent } from './components/admin/support-tickets/support-tickets.component';
import { StaffInviteComponent } from './components/admin/staff-invite/staff-invite.component';

registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    ManageCorporateUsersComponent,
    ManageBillingComponent,
    CourseManagementComponent,
    ManageGroupsComponent,
    ManageBrandingComponent,
    EditProfileComponent,
    CompanyInfoCardsComponent,
    CoursesTableComponent,
    LandingNavbarComponent,
    HomeComponent,
    SupportTicketsComponent,
    StaffInviteComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MenubarModule,
    ConfirmPopupModule,
    SkeletonModule,
    CarouselModule,
    InputTextareaModule,
    BlockUIModule,
    CalendarModule,
    AnimateOnScrollModule,
    ButtonModule,
    SliderModule,
    ColorPickerModule,
    InputNumberModule,
    AvatarGroupModule,
    InputTextModule,
    RippleModule,
    TagModule,
    AccordionModule,
    InputSwitchModule,
    ConfirmDialogModule,
    CheckboxModule,
    InputMaskModule,
    DividerModule,
    ToastModule,
    MessageModule,
    MessagesModule,
    MenuModule,
    CardModule,
    AvatarModule,
    ChartModule,
    DropdownModule,
    FileUploadModule,
    TableModule,
    DialogModule,
    StyleClassModule,
    QRCodeModule,
    ClipboardModule,
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory:httpTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    ConfirmationService,
    DatePipe,
    { provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
  export function httpTranslateLoader(http:HttpClient) {
    return new TranslateHttpLoader(http);
  }
 
