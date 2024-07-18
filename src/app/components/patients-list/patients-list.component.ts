import { Component, OnInit } from '@angular/core';
import { PatientDataService } from '../../services/patients-data.service';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss']
})
export class PatientsListComponent implements OnInit {


  filteredData: any = [];
  searchTerm = '';
  page: number = 1;
  pageSize: number = 20;
  originalData: any = [];
  noRecordsFound: boolean = false;
  isBusy: boolean = false;
  isWebWorkerSearch: boolean = false;
  isListView = true;
  private worker!: Worker

  constructor(private patientDataService: PatientDataService) {}

  ngOnInit() {
    this.getClientList();
  }

  getClientList() {
    this.patientDataService.getLocalData().subscribe(res => {
      this.originalData = res;
      this.filteredData = [...this.originalData]
    });
  }

  onSearch() {
    this.isBusy = true;
    setTimeout(() => {
      if (this.searchTerm) {
        const term = this.searchTerm.toLowerCase();
        const startTime = performance.now();
        while (performance.now() - startTime < 2000) {
          this.filteredData = this.originalData.filter((item: any) => this.matchesCriteria(item, term));
          this.noRecordsFound = this.filteredData.length === 0;
          this.isBusy = false;
        }
    } else {
      this.filteredData = [...this.originalData];
      this.noRecordsFound = false;
      this.isBusy = false;
    }
    }, 1000);

  }

  matchesCriteria(item: any, term: string): boolean {
    const personalDetails = item.personal_details;
    const insuranceDetails = item.insurance_details;
    const medicalHistory = item.medical_history;
    const ongoingTreatment = item.ongoing_treatment;

    return (
      (personalDetails.first_name && personalDetails.first_name.toLowerCase().includes(term)) ||
      (personalDetails.last_name && personalDetails.last_name.toLowerCase().includes(term)) ||
      (insuranceDetails.provider && insuranceDetails.provider.toLowerCase().includes(term)) ||
      (ongoingTreatment.some((t: any) => t.treatment_name.toLowerCase().includes(term))) ||
      (medicalHistory.some((m: any) => m.condition.toLowerCase().includes(term))) ||
      (insuranceDetails.expiry_date && new Date(insuranceDetails.expiry_date).toISOString().toLowerCase().includes(term))
    );
  }


  filterArrayWithWorker() {
    this.isWebWorkerSearch = true;
    if (typeof Worker !== 'undefined') {
      this.worker = new Worker(new URL('../../filter.worker.ts', import.meta.url));
      this.worker.onmessage = ({ data }) => {
        this.filteredData = data;
        this.noRecordsFound = this.filteredData.length === 0;
        this.isWebWorkerSearch = false;
      };
      const term = this.searchTerm.toLowerCase();
      this.worker.postMessage({ array: this.originalData, term: term });
    } else {
      // Web Workers are not supported in this environment
      this.onSearch();
    }
  }

  toggle(){
    this.isListView = !this.isListView
  }
}
