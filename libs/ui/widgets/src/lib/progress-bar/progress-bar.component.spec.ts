import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ProgressBarComponent } from './progress-bar.component'

jest.mock('@geonetwork-ui/util/app-config', () => ({
  getThemeConfig: () => ({
    PROGRESS_BAR_TEXT_CLASS: '',
  }),
  isConfigLoaded: jest.fn(() => true),
}))

describe('ProgressBarComponent', () => {
  let component: ProgressBarComponent
  let fixture: ComponentFixture<ProgressBarComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgressBarComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressBarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
