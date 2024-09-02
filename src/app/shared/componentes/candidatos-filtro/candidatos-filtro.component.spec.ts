import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatosFiltroComponent } from './candidatos-filtro.component';

describe('CandidatosFiltroComponent', () => {
  let component: CandidatosFiltroComponent;
  let fixture: ComponentFixture<CandidatosFiltroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatosFiltroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatosFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
