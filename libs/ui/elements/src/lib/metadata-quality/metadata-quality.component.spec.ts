import { ComponentFixture, TestBed } from '@angular/core/testing'
import {
  MetadataQualityComponent,
  MetadataQualityDisplay,
} from './metadata-quality.component'
import { DATASET_RECORDS } from '@geonetwork-ui/common/fixtures'
import { MatIconModule } from '@angular/material/icon'
import { CommonModule } from '@angular/common'
import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'
import { TranslateModule } from '@ngx-translate/core'
import { MetadataQualityInfoComponent } from '../metadata-quality-info/metadata-quality-info.component'
import { ProgressBarComponent } from '@geonetwork-ui/ui/widgets'
import { UtilSharedModule } from '@geonetwork-ui/util/shared'
import { By } from '@angular/platform-browser'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { cold } from 'jasmine-marbles'
import { of } from 'rxjs'

describe('MetadataQualityComponent', () => {
  let component: MetadataQualityComponent
  let fixture: ComponentFixture<MetadataQualityComponent>
  const expectedInfo = [
    { name: 'title', value: true },
    { name: 'description', value: true },
    { name: 'topic', value: false },
    { name: 'keywords', value: true },
    { name: 'legalConstraints', value: false },
    { name: 'organisation', value: true },
    { name: 'contact', value: true },
    { name: 'updateFrequency', value: true },
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        MetadataQualityComponent,
        MetadataQualityInfoComponent,
        ProgressBarComponent,
      ],
      imports: [
        UtilSharedModule,
        CommonModule,
        MatIconModule,
        UtilI18nModule,
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataQualityComponent)
    component = fixture.componentInstance
    component.metadata = DATASET_RECORDS[0]
    component.metadataQualityDisplay = {
      widget: true,
    } as MetadataQualityDisplay
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('focus should show menu / blur should hide', () => {
    const progressBar = fixture.debugElement.query(By.css('gn-ui-progress-bar'))
    progressBar.nativeElement.focus()
    expect(component.isMenuShown).toBe(true)
    progressBar.nativeElement.blur()
    expect(component.isMenuShown).toBe(false)
  })

  it('mouseenter should show menu / mouseleave should hide', () => {
    const metadataQuality = fixture.debugElement.query(
      By.css('.metadata-quality')
    )

    const mouseEnterEvent = new Event('mouseenter')
    metadataQuality.nativeElement.dispatchEvent(mouseEnterEvent)
    expect(component.isMenuShown).toBe(true)

    const mouseLeaveEvent = new Event('mouseleave')
    metadataQuality.nativeElement.dispatchEvent(mouseLeaveEvent)
    expect(component.isMenuShown).toBe(false)
  })

  it('content', () => {
    expect(component.metadata?.contacts[0]?.email).toBe('bob@org.net')
  })

  it('should populate info', () => {
    const infoObservable = of(component.info)
    const expected$ = cold('(a|)', { a: expectedInfo })
    expect(infoObservable).toBeObservable(expected$)
  })

  it('should display sub-components with correct inputs', () => {
    const metadataInfoElements = fixture.debugElement.queryAll(
      By.directive(MetadataQualityInfoComponent)
    )
    const expectedInfoCount = expectedInfo.length
    expect(metadataInfoElements.length).toBe(expectedInfoCount)

    for (let i = 0; i < expectedInfoCount; i++) {
      const el = metadataInfoElements[i].componentInstance
      expect(el.name).toBe(expectedInfo[i].name)
      expect(el.value).toBe(expectedInfo[i].value)
    }
  })
})
