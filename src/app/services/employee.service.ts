import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  retry,
  throwError,
} from 'rxjs';
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

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.http
      .get<Employee[]>(
        'https://task-dot-fe-task-428108.uc.r.appspot.com/employees'
      )
      .pipe(retry(3), catchError(this.handleError));
  }

  addEmployee(empData: {}) {
    return this.http
      .post(
        'https://task-dot-fe-task-428108.uc.r.appspot.com/employees',
        empData,
        this.options
      )
      .pipe(retry(3), catchError(this.handleError));
  }

  getSingleEmployee(id: string): Observable<Employee> {
    return this.http
      .get<Employee>(
        `https://task-dot-fe-task-428108.uc.r.appspot.com/employees/${id}`
      )
      .pipe(retry(3), catchError(this.handleError));
  }
  updateEmployee(id: string, empData: {}) {
    return this.http
      .put(
        `https://task-dot-fe-task-428108.uc.r.appspot.com/employees/${id}`,
        empData,
        this.options
      )
      .pipe(retry(3), catchError(this.handleError));
  }
  deleteEmployee(id: string) {
    let options = { ...this.options, responseType: 'text' as 'json' };
    return this.http
      .delete(
        `https://task-dot-fe-task-428108.uc.r.appspot.com/employees/${id}`,
        options
      )
      .pipe(retry(3), catchError(this.handleError));
  }
}
