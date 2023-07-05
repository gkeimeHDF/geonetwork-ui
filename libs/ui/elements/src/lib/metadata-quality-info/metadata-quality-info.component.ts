import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core'
import { MetadataQualityConfig, getMetadataQualityConfig } from '@geonetwork-ui/util/app-config';

@Component({
  selector: 'gn-ui-metadata-quality-info',
  templateUrl: './metadata-quality-info.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataQualityInfoComponent {

  metadataQualityConfig: MetadataQualityConfig = getMetadataQualityConfig();
  @Input() name: string
  @Input() value: boolean

  get display() {
    const name_snake_upper = this.name.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`).toUpperCase();
    return this.metadataQualityConfig['DISPLAY_' + name_snake_upper] !== false;
  }

  get icon() {
    return this.value ? 'check' : 'warning_amber' 
  }

  get labelKey() {
    return 'record.metadata.quality.' + this.name + '.' + (this.value ? 'success' : 'failed')
  }
}
