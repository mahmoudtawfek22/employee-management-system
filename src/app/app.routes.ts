import { Routes } from '@angular/router';
import { EmployeesComponent } from './components/employees/employees.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';

export const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeesComponent, title: 'Employees' },
  {
    path: 'employee/:id',
    component: EmployeeDetailsComponent,
    title: 'Employee Details',
  },
  {
    path: 'addemployee',
    component: AddEmployeeComponent,
    title: 'Add Employee',
  },
];
