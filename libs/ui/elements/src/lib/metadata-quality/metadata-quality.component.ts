import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { MetadataLink, MetadataRecord } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'gn-ui-metadata-quality',
  templateUrl: './metadata-quality.component.html',
  styleUrls: ['./metadata-quality.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataQualityComponent {
  @Input() metadata: MetadataRecord
  @Input() landingPages: MetadataLink[]
  @Output() keyword = new EventEmitter<string>()
  isMenuShown = false

  showMenu() {
    this.isMenuShown = true
  }

  hideMenu() {
    this.isMenuShown = false
  }
}
