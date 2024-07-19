import { Component, OnInit } from '@angular/core';
import { PatientDataService } from '../../services/patients-data.service';
import { matchesCriteria } from '../../core/utility/utility';
import { ThemeService } from '../../core/services/theme-service.service';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss'],
})
export class PatientsListComponent implements OnInit {
  searchText = '';
  currentPage: number = 1;
  pageSize: number = 20;
  patientRecords: any = [];
  filteredPatientRecords: any = [];
  isListView = true;
  private recordFilterWorker!: Worker;

  constructor(private patientDataService: PatientDataService, public themeService: ThemeService) {}

  ngOnInit() {
    this.getClientList();
  }

  getClientList() {
    this.patientDataService?.getPatientRecords()?.subscribe((res) => {
      this.patientRecords = res;
      this.filteredPatientRecords = [...this.patientRecords];
    });
  }

  onSearch() {
    if (this.searchText) {
      let text = this.searchText?.toLowerCase();
      let startTime = performance?.now();
      while (performance?.now() - startTime < 2000) {
        this.filteredPatientRecords = this.patientRecords?.filter((item: any) =>
          matchesCriteria(item, text)
        );
      }
    } else {
      this.filteredPatientRecords = [...this.patientRecords];
    }
  }

  filterArrayWithWorker() {
    if (typeof Worker !== 'undefined') {
      this.recordFilterWorker = new Worker(
        new URL('../../filter.worker.ts', import.meta?.url)
      );
      this.recordFilterWorker.onmessage = ({ data }) => {
        this.filteredPatientRecords = data;
      };
      let text = this.searchText?.toLowerCase();
      this.recordFilterWorker?.postMessage({
        array: this.patientRecords,
        text: text,
      });
    } else {
      // Web Workers are not supported in this environment
      this.onSearch();
    }
  }

  toggleTheme() {
    this.themeService.theme = !this.themeService.isDark ? 'dark' : 'light';
  }

  clearSearch() {
    this.searchText = '';
  }
}
