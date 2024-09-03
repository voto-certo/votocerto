import { Component, effect } from '@angular/core';
import { SharedModule } from '../../module/shared-module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UtilService } from '../../utils/services/util.service';
import { UseStatesService } from '../../../core/services/states/use-states.service';


@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [SharedModule, MatProgressSpinnerModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {

  isLoading: boolean = false;

  constructor(private useStatesService: UseStatesService) {
    this.signalBeacon()
  }

  private signalBeacon(): void {
    effect(() => {
      this.isLoading = this.useStatesService.loading();
    });
  }
}
