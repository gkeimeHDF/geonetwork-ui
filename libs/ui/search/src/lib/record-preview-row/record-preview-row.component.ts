import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RecordPreviewComponent } from '../record-preview/record-preview.component'
import { MetadataQualityConfig, getMetadataQualityConfig } from '@geonetwork-ui/util/app-config'

@Component({
  selector: 'gn-ui-record-preview-row',
  templateUrl: './record-preview-row.component.html',
  styleUrls: ['./record-preview-row.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordPreviewRowComponent extends RecordPreviewComponent {
  metadataQualityConfig: MetadataQualityConfig = getMetadataQualityConfig();

  get hasMetadataQualityWidget() {
    return this.metadataQualityConfig.ENABLED && this.metadataQualityConfig.DISPLAY_WIDGET_IN_PREVIEW_ROW !== false
  }
}
