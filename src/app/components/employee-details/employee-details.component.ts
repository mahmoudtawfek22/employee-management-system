import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../interfaces/employee';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CurrencyPipe],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css',
})
export class EmployeeDetailsComponent {
  employeeDetails?: Employee;
  id!: string;
  employeeForm!: FormGroup;

  constructor(
    private empService: EmployeeService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required]],
      position: ['', [Validators.required]],
      department: ['', [Validators.required]],
      salary: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.empService.getSingleEmployee(this.id).subscribe((res) => {
      this.employeeDetails = res;
      this.employeeForm.patchValue({
        name: this.employeeDetails.name,
        position: this.employeeDetails.position,
        department: this.employeeDetails.department,
        salary: this.employeeDetails.salary,
      });
    });
  }

  onSubmit() {
    this.empService.updateEmployee(this.id, this.employeeForm.value).subscribe(
      (res) => {
        // this.router.navigate(['/employee', this.employeeDetails?._id]);
        this.ngOnInit();
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
