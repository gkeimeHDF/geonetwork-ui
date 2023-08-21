import { ComponentFixture, TestBed } from '@angular/core/testing'
import { UtilSharedModule } from '@geonetwork-ui/util/shared'
import { RECORDS_FULL_FIXTURE } from '@geonetwork-ui/util/shared/fixtures'
import { TranslateModule } from '@ngx-translate/core'
import { ContentGhostComponent } from '../content-ghost/content-ghost.component'
import { MetadataQualityComponent } from './metadata-quality.component'
import { By } from '@angular/platform-browser'

describe('MetadataQualityComponent', () => {
  let component: MetadataQualityComponent
  let fixture: ComponentFixture<MetadataQualityComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), UtilSharedModule],
      declarations: [MetadataQualityComponent, ContentGhostComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataQualityComponent)
    component = fixture.componentInstance
    component.metadata = RECORDS_FULL_FIXTURE[0]
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('focus should show menu / blur should hide', () => {
    const progressBar = fixture.debugElement.query(By.css('gn-ui-progress-bar'))
    progressBar.nativeElement.focus();
    expect(component.isMenuShown).toBe(true)
    progressBar.nativeElement.blur();
    expect(component.isMenuShown).toBe(false)
  })

  it('mouseenter should show menu / mouseleave should hide', () => {
    const metadataQuality = fixture.debugElement.query(By.css('.metadata-quality'))

    const mouseEnterEvent = new Event('mouseenter');
    metadataQuality.nativeElement.dispatchEvent(mouseEnterEvent);
    expect(component.isMenuShown).toBe(true)

    const mouseLeaveEvent = new Event('mouseleave');
    metadataQuality.nativeElement.dispatchEvent(mouseLeaveEvent);
    expect(component.isMenuShown).toBe(false)
  })

  it('content', () => {
    expect(component.metadata?.contact?.organisation).toBe("Ifremer");
  })
})
