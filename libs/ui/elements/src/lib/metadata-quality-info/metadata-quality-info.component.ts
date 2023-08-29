import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'gn-ui-metadata-quality-info',
  templateUrl: './metadata-quality-info.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataQualityInfoComponent {
  @Input() name: string
  @Input() value: boolean

  get icon() {
    return this.value ? 'check' : 'warning_amber'
  }

  get labelKey() {
    return `record.metadata.quality.${this.name}.${
      this.value ? 'success' : 'failed'
    }`
  }
}
