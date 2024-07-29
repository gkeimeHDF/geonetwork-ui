import { NgModule } from '@angular/core'
import { UtilSharedModule } from '@geonetwork-ui/util/shared'
import { TranslateModule } from '@ngx-translate/core'
import { NgxDropzoneModule } from 'ngx-dropzone'
import { ColorScaleComponent } from './color-scale/color-scale.component'
import { ProgressBarComponent } from './progress-bar/progress-bar.component'
import { StepBarComponent } from './step-bar/step-bar.component'
import { TagInputModule } from 'ngx-chips'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { LoadingMaskComponent } from './loading-mask/loading-mask.component'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatIconModule } from '@angular/material/icon'
import { SpinningLoaderComponent } from './spinning-loader/spinning-loader.component'
import { CommonModule } from '@angular/common'
import { PopoverComponent } from './popover/popover.component'

@NgModule({
  declarations: [
    ColorScaleComponent,
    ProgressBarComponent,
    PopoverComponent,
    StepBarComponent,
    LoadingMaskComponent,
    SpinningLoaderComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    NgxDropzoneModule,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule,
    UtilSharedModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  exports: [
    ProgressBarComponent,
    StepBarComponent,
    LoadingMaskComponent,
    SpinningLoaderComponent,
  ],
})
export class UiWidgetsModule {}
