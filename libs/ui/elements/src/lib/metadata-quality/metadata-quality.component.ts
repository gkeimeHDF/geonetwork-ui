import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { MetadataRecord } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'gn-ui-metadata-quality',
  templateUrl: './metadata-quality.component.html',
  styleUrls: ['./metadata-quality.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataQualityComponent {
  @Input() metadata: MetadataRecord
  @Input() smaller: boolean

  isMenuShown = false

  showMenu() {
    this.isMenuShown = true
  }

  hideMenu() {
    this.isMenuShown = false
  }
}
