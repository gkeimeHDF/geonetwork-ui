import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { RouterFacade } from '@geonetwork-ui/feature/router'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { MetadataQualityDisplay } from '@geonetwork-ui/ui/elements'
import {
  MetadataQualityConfig,
  getMetadataQualityConfig,
} from '@geonetwork-ui/util/app-config'
import { MetadataRecord } from '@geonetwork-ui/util/shared'



@Component({
  selector: 'datahub-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPageComponent implements OnInit {

  metadataQualityDisplay = {} as MetadataQualityDisplay

  constructor(
    private searchRouter: RouterFacade,
    private searchFacade: SearchFacade
  ) {}

  ngOnInit() {
    this.searchFacade.setResultsLayout('ROW')

    const cfg:MetadataQualityConfig = getMetadataQualityConfig() || {} as MetadataQualityConfig;
    this.metadataQualityDisplay = {
      widget: cfg.ENABLED && cfg.DISPLAY_WIDGET_IN_SEARCH !== false,
      title: cfg.DISPLAY_TITLE,
      description: cfg.DISPLAY_DESCRIPTION,
      contact: cfg.DISPLAY_CONTACT,
      keywords: cfg.DISPLAY_KEYWORDS,
      legalConstraints: cfg.DISPLAY_LEGAL_CONSTRAINTS,
      topic: cfg.DISPLAY_TOPIC,
      updateFrequency: cfg.DISPLAY_UPDATE_FREQUENCY,
      organisation: cfg.DISPLAY_ORGANISATION
    }
  }

  onMetadataSelection(metadata: MetadataRecord): void {
    this.searchRouter.goToMetadata(metadata)
  }
}
