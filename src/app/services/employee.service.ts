import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, retry } from 'rxjs';
import { Employee } from '../interfaces/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  employees: BehaviorSubject<Employee[]>;
  options: {};
  constructor(private http: HttpClient) {
    this.employees = new BehaviorSubject<Employee[]>([]);
    this.options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-type': 'application/json',
      }),
    };
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.http
      .get<Employee[]>(
        'https://task-dot-fe-task-428108.uc.r.appspot.com/employees'
      )
      .pipe(retry(3));
  }

  addEmployee(empData: {}) {
    return this.http.post(
      'https://task-dot-fe-task-428108.uc.r.appspot.com/employees',
      empData,
      this.options
    );
  }

  getSingleEmployee(id: string): Observable<Employee> {
    return this.http.get<Employee>(
      `https://task-dot-fe-task-428108.uc.r.appspot.com/employees/${id}`
    );
  }
  updateEmployee(id: string, empData: {}) {
    return this.http.put(
      `https://task-dot-fe-task-428108.uc.r.appspot.com/employees/${id}`,
      empData,
      this.options
    );
  }
  deleteEmployee(id: string) {
    let options = { ...this.options, responseType: 'text' as 'json' };
    return this.http.delete(
      `https://task-dot-fe-task-428108.uc.r.appspot.com/employees/${id}`,
      options
    );
  }
}
