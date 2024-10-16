import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectColumnComponent } from './project-column.component';

describe('ProjectColumnComponent', () => {
  let component: ProjectColumnComponent;
  let fixture: ComponentFixture<ProjectColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectColumnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
