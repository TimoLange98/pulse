import { AbstractControl, ValidationErrors } from "@angular/forms";

export type FormFieldType<T> = (T | ((control: AbstractControl<any, any>) => ValidationErrors | null))[]