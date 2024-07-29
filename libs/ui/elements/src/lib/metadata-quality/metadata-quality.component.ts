import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core'
import { MetadataQualityItem } from '../metadata-quality-item/metadata-quality-item.component'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'

@Component({
  selector: 'gn-ui-metadata-quality',
  templateUrl: './metadata-quality.component.html',
  styleUrls: ['./metadata-quality.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataQualityComponent implements OnChanges {
  @Input() metadata: Partial<CatalogRecord>
  @Input() smaller = false
  @Input() metadataQualityDisplay: boolean

  items: MetadataQualityItem[] = []

  get qualityScore() {
    const qualityScore = this.metadata?.extras?.qualityScore
    return typeof qualityScore === 'number'
      ? qualityScore
      : this.calculatedQualityScore
  }

  get calculatedQualityScore(): number {
    return Math.round(
      (this.items.filter(({ value }) => value).length * 100) / this.items.length
    )
  }

  private add(name: string, value: boolean) {
    if (this.metadataQualityDisplay?.[name] !== false) {
      this.items.push({ name, value })
    }
  }

  initialize() {
    const contact = this.metadata?.contacts?.[0]
    this.items = []
    this.add('title', !!this.metadata?.title)
    this.add('description', !!this.metadata?.abstract)
    this.add('topic', this.metadata?.topics?.length > 0)
    this.add('keywords', this.metadata?.keywords?.length > 0)
    this.add('legalConstraints', this.metadata?.legalConstraints?.length > 0)
    this.add('organisation', !!contact?.organization)
    this.add('contact', !!contact?.email)
    this.add('updateFrequency', !!this.metadata?.updateFrequency)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['metadata'] || changes['metadataQualityDisplay']) {
      this.initialize()
    }
  }
}
