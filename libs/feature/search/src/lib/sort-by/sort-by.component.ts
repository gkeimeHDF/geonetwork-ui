import { Component } from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { SortByEnum } from '@geonetwork-ui/util/shared'
import { SearchFacade } from '../state/search.facade'
import { SearchService } from '../utils/service/search.service'
import { getMetadataQualityConfig } from '@geonetwork-ui/util/app-config'

marker('results.sortBy.relevancy')
marker('results.sortBy.dateStamp')
marker('results.sortBy.popularity')
marker('results.sortBy.qualityScore')

@Component({
  selector: 'gn-ui-sort-by',
  templateUrl: './sort-by.component.html',
})
export class SortByComponent {
  choices = [
    {
      label: 'results.sortBy.relevancy',
      value: SortByEnum.RELEVANCY,
    },
    {
      label: 'results.sortBy.dateStamp',
      value: SortByEnum.CREATE_DATE,
    },
    {
      label: 'results.sortBy.popularity',
      value: SortByEnum.POPULARITY,
    },
  ]
  metadataQualityConfig = getMetadataQualityConfig();
  currentSortBy$ = this.facade.sortBy$

  constructor(
    private facade: SearchFacade,
    private searchService: SearchService
  ) {
    if (this.metadataQualityConfig.ENABLED && this.metadataQualityConfig.SORTABLE) {
      this.choices.push({
        label: 'results.sortBy.qualityScore',
        value: SortByEnum.QUALITY_SCORE,
      });
    }
  }

  changeSortBy(criteria: any) {
    if (typeof criteria === 'string') {
      this.searchService.setSortBy(criteria)
    } else {
      throw new Error(
        `Unexpected SortBy value received: ${JSON.stringify(criteria)}`
      )
    }
  }
}
