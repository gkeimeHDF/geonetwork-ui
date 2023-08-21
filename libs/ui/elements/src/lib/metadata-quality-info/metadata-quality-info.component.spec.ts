import { ComponentFixture, TestBed } from '@angular/core/testing'
import { UtilSharedModule } from '@geonetwork-ui/util/shared'
import { TranslateModule } from '@ngx-translate/core'
import { ContentGhostComponent } from '../content-ghost/content-ghost.component'
import { MetadataQualityInfoComponent } from './metadata-quality-info.component'

describe('MetadataQualityInfoComponent', () => {
  let component: MetadataQualityInfoComponent
  let fixture: ComponentFixture<MetadataQualityInfoComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), UtilSharedModule],
      declarations: [MetadataQualityInfoComponent, ContentGhostComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataQualityInfoComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
