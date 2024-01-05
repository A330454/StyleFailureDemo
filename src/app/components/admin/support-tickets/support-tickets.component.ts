import { Component, ViewChild } from '@angular/core';
import { StrapiService } from 'src/app/services/Backend/strapi.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Table } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { MessageService, PrimeNGConfig, ConfirmationService } from 'primeng/api';

interface Status {
  status: string;
}

@Component({
  selector: 'app-support-tickets',
  templateUrl: './support-tickets.component.html',
  styleUrls: ['./support-tickets.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class SupportTicketsComponent {
  @ViewChild('dt') dt!: Table; // Access the PrimeNG table using ViewChild

  public SearchForm = new FormGroup({
    param: new FormControl()
  });

  public supportTicketForm = new FormGroup({
    description: new FormControl(),
    object: new FormControl(),
    subject: new FormControl(),
    status: new FormControl(),
    accountJson: new FormControl(),
    companyJson: new FormControl(),
    accountEmail: new FormControl(),
    date: new FormControl(),
    // this fields are not in the backend
    companyName: new FormControl(),
    accountName: new FormControl(),
  });

  public patchTicketForm = new FormGroup({
    description: new FormControl(),
    status: new FormControl()
  });


  dialogoTicket=false;

  editTicket:any;

  constructor(
    private strapiService: StrapiService,
    private datePipe: DatePipe,
    private PrimeNGConfig: PrimeNGConfig,
    private messageService: MessageService,
    ) {
    this.SearchForm.get('param')?.valueChanges.subscribe((value) => {
      // console.log('Input value changed:', value);
      this.dt.filterGlobal(value, 'contains');
      // Additional actions or logging based on the new value can be performed here.
    });
  }
  
  selectedStatus:any;

  statuces: Status[] = [
    { status: 'Pendiente' },
    { status: 'En Proceso' },
    { status: 'Resuelto' },
  ];

  ngOnInit(): void {
    this.getReportedProblems();
    this.PrimeNGConfig.ripple = true
  }

  reportedProblemsList:any;

  getReportedProblems() {
    // this.strapiService
    this.strapiService.getReportedProblems().subscribe((data: any) => {
      // console.log(data);
      this.reportedProblemsList=data.data
      // console.log(this.reportedProblemsList);

    }, (error: any) => {
      console.log(error);
    });
  }

  editTicketMode(){
    if (this.editTicket == true) {
      this.editTicket=null;
    }else{
      this.editTicket=true;
    }
  }

  selectedTicket:any;

  openTicketModal(ticket:any) { 
    this.selectedTicket=ticket;

    // format date
    const dateString = ticket.attributes.createdAt;
    const formatedDate = this.datePipe.transform(new Date(dateString), 'MMM d \'at\' h:mm a');

     // Asumiendo que supportTicketForm.value.status tiene un valor
     this.selectedStatus = this.statuces.find(
      (item: Status) => item.status === ticket.attributes.status
    ) || null; // null si no se encuentra el valor


    this.supportTicketForm.patchValue({
      description: ticket.attributes.description,
      object: ticket.attributes.object,
      subject: ticket.attributes.subject,
      status: ticket.attributes.status,
      accountJson: ticket.attributes.accountJson,
      companyJson: ticket.attributes.companyJson,
      accountName: ticket.attributes.accountJson.firstName + ' ' + ticket.attributes.accountJson.lastName,
      accountEmail: ticket.attributes.accountEmail,
      companyName: ticket.attributes.companyJson.name,
      date: formatedDate,
    });
    this.dialogoTicket = true;
  }

  consoleLogJsons() {
    console.log('Account Json:');
    console.log(this.supportTicketForm.value.accountJson);

    console.log('Company Json:');
    console.log(this.supportTicketForm.value.companyJson);
  }

  closeTicketModal() {
    this.editTicket = null
    this.dialogoTicket = false
  }

  updateTicket() {
    console.log(this.supportTicketForm.value);
    console.log(this.selectedStatus.status);
    

    let dataJson = {
      data: {
        description: this.supportTicketForm.value.description,
        status: this.selectedStatus.status
      }
    }

    this.strapiService.updateTicket(this.selectedTicket.id,dataJson).subscribe((res: any) => {
      console.log(res);
      this.getReportedProblems();
      this.showSuccess('Exito', 'Ticket actualizado');
    }, (error: any) => {
      console.log(error);
      this.showError('Error', 'No se pudo actualizar el ticket');
    });
  }

  // ------| Alerts |----------------------------------------------------------------------------------------------------------------------------------------------------------------

  showError(summary:any, detail:any) {
    this.messageService.add({severity:'error', summary: summary, detail: detail});
  }

  showSuccess(summary:any, detail:any) {
    this.messageService.add({severity:'success', summary: summary, detail: detail});
  }

}
