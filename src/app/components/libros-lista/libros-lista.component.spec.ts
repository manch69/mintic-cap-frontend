import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrosListaComponent } from './libros-lista.component';

describe('LibrosListaComponent', () => {
  let component: LibrosListaComponent;
  let fixture: ComponentFixture<LibrosListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibrosListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrosListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
