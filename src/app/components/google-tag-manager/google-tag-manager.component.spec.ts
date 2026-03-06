import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoogleTagManagerComponent } from './google-tag-manager.component';

describe('GoogleTagManagerComponent', () => {
  let component: GoogleTagManagerComponent;
  let fixture: ComponentFixture<GoogleTagManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoogleTagManagerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleTagManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
