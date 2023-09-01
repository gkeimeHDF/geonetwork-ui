import { ComponentFixture, TestBed } from '@angular/core/testing'
import {
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'
import { UtilSharedModule } from '@geonetwork-ui/util/shared'
import { TranslateModule } from '@ngx-translate/core'
import { MetadataQualityInfoComponent } from './metadata-quality-info.component'
import { By } from '@angular/platform-browser'
import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'


describe('MetadataQualityInfoComponent', () => {
  let component: MetadataQualityInfoComponent
  let fixture: ComponentFixture<MetadataQualityInfoComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MetadataQualityInfoComponent],
      imports: [
        UtilSharedModule,
        CommonModule,
        MatIconModule,
        UtilI18nModule,
        TranslateModule.forRoot(),
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataQualityInfoComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('title ok', () => {
    component.name = 'title'
    component.value = true
    fixture.detectChanges()

    const iconElement = fixture.debugElement.query(By.css('mat-icon'))
    expect(iconElement.nativeElement.innerHTML).toBe("check")

    const textElement = fixture.debugElement.query(By.css('.text'))
    expect(textElement.nativeElement.innerHTML).toBe("record.metadata.quality.title.success")
  })

  it('title ko', () => {
    component.name = 'title'
    component.value = false
    fixture.detectChanges()

    const iconElement = fixture.debugElement.query(By.css('mat-icon'))
    expect(iconElement.nativeElement.innerHTML).toBe("warning_amber")

    const textElement = fixture.debugElement.query(By.css('.text'))
    expect(textElement.nativeElement.innerHTML).toBe("record.metadata.quality.title.failed")
  })

  it('description ok', () => {
    component.name = 'description'
    component.value = true
    fixture.detectChanges()

    const iconElement = fixture.debugElement.query(By.css('mat-icon'))
    expect(iconElement.nativeElement.innerHTML).toBe("check")

    const textElement = fixture.debugElement.query(By.css('.text'))
    expect(textElement.nativeElement.innerHTML).toBe("record.metadata.quality.description.success")
  })

  it('description ko', () => {
    component.name = 'description'
    component.value = false
    fixture.detectChanges()

    const iconElement = fixture.debugElement.query(By.css('mat-icon'))
    expect(iconElement.nativeElement.innerHTML).toBe("warning_amber")

    const textElement = fixture.debugElement.query(By.css('.text'))
    expect(textElement.nativeElement.innerHTML).toBe("record.metadata.quality.description.failed")
  })
  
})
