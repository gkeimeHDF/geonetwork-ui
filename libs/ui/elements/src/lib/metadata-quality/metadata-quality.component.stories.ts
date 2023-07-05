import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'
import { TranslateModule } from '@ngx-translate/core'
import { Meta, moduleMetadata, Story } from '@storybook/angular'
import { MetadataQualityComponent } from './metadata-quality.component'
import { UiElementsModule } from '../ui-elements.module'
import { RECORDS_FULL_FIXTURE } from '@geonetwork-ui/util/shared/fixtures'

export default {
  title: 'Elements/MetadataQualityComponent',
  component: MetadataQualityComponent,
  decorators: [
    moduleMetadata({
      imports: [
        UiElementsModule,
        UtilI18nModule,
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
      ],
    }),
  ],
} as Meta<MetadataQualityComponent>

const Template: Story<MetadataQualityComponent> = (
  args: MetadataQualityComponent
) => ({
  component: MetadataQualityComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  metadata: RECORDS_FULL_FIXTURE[1],
}
