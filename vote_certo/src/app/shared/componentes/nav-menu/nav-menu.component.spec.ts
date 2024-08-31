import { ComponentFixture, TestBed } from '@angular/core/testing';

import { navMenuComponent } from './nav-menu.component';

describe('navMenuComponent', () => {
  let component: navMenuComponent;
  let fixture: ComponentFixture<navMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [navMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(navMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
