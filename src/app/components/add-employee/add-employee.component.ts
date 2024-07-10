import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent {
  employeeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private empService: EmployeeService,
    private router: Router
  ) {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required]],
      position: ['', [Validators.required]],
      department: ['', [Validators.required]],
      salary: ['', [Validators.required]],
    });
  }
  onSubmit() {
    this.empService.addEmployee(this.employeeForm.value).subscribe(
      (res) => {
        this.router.navigate(['/employees']);
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
