import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../interfaces/employee';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, NgxPaginationModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
})
export class EmployeesComponent {
  employees!: Employee[];
  lastEmployees!: Employee[];
  searchValue!: string;
  p: number = 1;

  total: number = 0;
  constructor(private empService: EmployeeService) {}
  ngOnInit(): void {
    this.getAllEmp();
  }
  getAllEmp() {
    this.empService.getAllEmployees().subscribe(
      (res) => {
        console.log(res);
        this.employees = res;
        this.lastEmployees = [...this.employees];
        this.total = this.lastEmployees.length;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  deleteEmp(id: string) {
    this.empService.deleteEmployee(id).subscribe(
      (res) => {
        console.log(res);
        this.getAllEmp();
      },
      (err) => {
        console.error(err);
      }
    );
  }
  search() {
    console.log(this.searchValue);

    this.searchValue = this.searchValue.toLowerCase();
    this.employees = this.lastEmployees.filter((emp) =>
      emp.name.toLowerCase().includes(this.searchValue)
    );
    if (this.searchValue.length == 0) {
      this.employees = this.lastEmployees;
    }
  }
}
