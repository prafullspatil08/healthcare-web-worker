import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PatientDataService {

  constructor(private http: HttpClient) { }

  getLocalData(){
    return this.http.get('http://localhost:3000/patients_records');
  }
}
