import { ComponentFixture, TestBed } from '@angular/core/testing'
import { UtilSharedModule } from '@geonetwork-ui/util/shared'
import { RECORDS_FULL_FIXTURE } from '@geonetwork-ui/util/shared/fixtures'
import { TranslateModule } from '@ngx-translate/core'
import { ContentGhostComponent } from '../content-ghost/content-ghost.component'
import { MetadataQualityComponent } from './metadata-quality.component'

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
})
