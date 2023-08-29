import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core'
import { MetadataQualityInfo } from '../metadata-quality-info/metadata-quality-info.component'
import { CatalogRecord } from '@geonetwork-ui/common/domain/record'

export interface MetadataQualityDisplay {
  widget: boolean
  title: boolean
  description: boolean
  topic: boolean
  keywords: boolean
  legalConstraints: boolean
  organisation: boolean
  contact: boolean
  updateFrequency: boolean
}

@Component({
  selector: 'gn-ui-metadata-quality',
  templateUrl: './metadata-quality.component.html',
  styleUrls: ['./metadata-quality.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataQualityComponent implements OnChanges, OnInit {
  @Input() metadata: Partial<CatalogRecord>
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

  ngOnInit() {
    const contact = this.metadata?.contacts?.[0]
    this.info = []
    this.add('title', !!this.metadata?.title)
    this.add('description', !!this.metadata?.abstract)
    this.add('topic', this.metadata?.topic?.length > 0)
    this.add('keywords', this.metadata?.keywords?.length > 0)
    this.add('legalConstraints', this.metadata?.legalConstraints?.length > 0)
    this.add('organisation', !!contact?.organization)
    this.add('contact', !!contact?.email)
    this.add('updateFrequency', !!this.metadata?.updateFrequency)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['metadata'] || changes['metadataQualityDisplay'])
      this.ngOnInit()
  }
}
