import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { MetadataRecord } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'gn-ui-metadata-info',
  templateUrl: './metadata-info.component.html',
  styleUrls: ['./metadata-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataInfoComponent {
  @Input() metadata: MetadataRecord
  @Input() incomplete: boolean

  get hasUsage() {
    return 'isOpenData' in this.metadata || this.metadata.constraints?.length
  }
}
