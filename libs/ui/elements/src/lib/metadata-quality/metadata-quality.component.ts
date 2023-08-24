import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core'
import { MetadataRecord } from '@geonetwork-ui/util/shared'
import { MetadataQualityInfo } from '../metadata-quality-info/metadata-quality-info.component'

export interface MetadataQualityDisplay {
  widget:boolean
  title:boolean
  description:boolean
  topic:boolean
  keywords:boolean
  legalConstraints:boolean
  organisation:boolean
  contact:boolean
  updateFrequency:boolean
}

@Component({
  selector: 'gn-ui-metadata-quality',
  templateUrl: './metadata-quality.component.html',
  styleUrls: ['./metadata-quality.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataQualityComponent implements OnChanges {
  @Input() metadata: MetadataRecord
  @Input() smaller = false
  @Input() metadataQualityDisplay: MetadataQualityDisplay

  info: MetadataQualityInfo[] = []

  isMenuShown = false

  get qualityScore() {
    return typeof this.metadata.qualityScore === 'number'
      ? this.metadata.qualityScore
      : this.calculatedQualityScore
  }

  get calculatedQualityScore(): number {
    return Math.round(
      (this.info.filter(({ value }) => value === true).length * 100) /
        this.info.length
    )
  }

  showMenu() {
    this.isMenuShown = true
  }

  hideMenu() {
    this.isMenuShown = false
  }

  private add(name: string, value: boolean) {
    if (this.metadataQualityDisplay?.[name] !== false) {
      this.info.push({ name, value })
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['metadata']) {
      this.info = []
      this.add('title', !!this.metadata?.title);
      this.add('description', !!this.metadata?.abstract);
      this.add('topic', this.metadata?.topic?.length > 0);
      this.add('keywords', this.metadata?.keywords?.length > 0)
      this.add('legalConstraints', this.metadata?.legalConstraints?.length > 0)
      this.add('organisation', !!this.metadata?.contact?.organisation)
      this.add('contact', !!this.metadata?.contact?.email)
      this.add('updateFrequency', !!this.metadata?.updateFrequency)
    }
  }
}
