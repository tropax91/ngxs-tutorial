import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Action, State, StateContext } from '@ngxs/store';
import {
  ShowErrorAlert,
  ShowInfoAlert,
  ShowSuccessAlert,
  ShowWarningAlert,
} from './alert.action';

export interface AlertStateModel {}

@State<AlertStateModel>({
  name: 'alertsState',
  defaults: {},
})
@Injectable()
export class AlertsState {
  constructor(private _snackBar: MatSnackBar) {}

  @Action(ShowSuccessAlert)
  showSuccessAlert(
    ctx: StateContext<AlertStateModel>,
    action: ShowSuccessAlert
  ) {
    this._snackBar.open(action.text, 'Ok', {
      duration: 6000,
      panelClass: 'snack-green',
    });
  }

  @Action(ShowErrorAlert)
  showErrorAlert(ctx: StateContext<AlertStateModel>, action: ShowErrorAlert) {
    this._snackBar.open(action.text, 'Ok', {
      duration: 6000,
      panelClass: 'snack-red',
    });
  }

  @Action(ShowWarningAlert)
  showWarningAlert(
    ctx: StateContext<AlertStateModel>,
    action: ShowWarningAlert
  ) {
    this._snackBar.open(action.text, 'Ok', {
      duration: 6000,
      panelClass: 'snack-yellow',
    });
  }

  @Action(ShowInfoAlert)
  showInfoAlert(ctx: StateContext<AlertStateModel>, action: ShowInfoAlert) {
    this._snackBar.open(action.text, 'Ok', {
      duration: 6000,
      panelClass: 'snack-blue',
    });
  }
}
