import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnDestroy,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ToDoService } from '../to-do-service.service';
import { Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-to-do-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './to-do-form.component.html',
  styleUrl: './to-do-form.component.scss',
})
export class TodoFormComponent implements AfterViewInit, OnDestroy {
  @Output() newItem = new EventEmitter<string>();
  @ViewChild('newItemForm') newItemForm!: NgForm;

  item: string = '';

  private readonly service = inject(ToDoService);

  private readonly destroying$: Subject<null> = new Subject<null>();

  constructor() {
    this.service.save.pipe(takeUntilDestroyed()).subscribe(() => {
      this.newItemForm.reset();
      this.newItemForm?.form.disable();
    });

    this.service.clear.pipe(takeUntilDestroyed()).subscribe(() => {
      this.newItemForm.form.enable();
      this.newItemForm?.reset();
    });
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.destroying$.next(null);
    this.destroying$.complete();
  }

  onSubmit(): void {
    this.newItem.emit(this.item);
    this.newItemForm.reset();
  }
}
