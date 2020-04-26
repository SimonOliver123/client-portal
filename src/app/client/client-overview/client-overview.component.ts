import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ClientService } from '../../services/client.service';
import { UserClientViewModel, Software, ClientUpdateViewModel, Channel, PackageViewModel, PackageUpdateViewModel, ClientUpdate } from '../../api/serviceapi';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-client-overview',
  templateUrl: './client-overview.component.html',
  styleUrls: ['./client-overview.component.scss']
})
export class ClientOverviewComponent implements OnInit, OnDestroy {

  Channel = Channel;

  userClients: Array<UserClientViewModel>;

  /** Subject that emits when the component has been destroyed. */
  private _onDestroy = new Subject<void>();

  constructor(private clientService: ClientService) {
  
  }

  ngOnInit() {
    this.doGetClientsWithUpdates();
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  doGetClientsWithUpdates() {
    this.clientService
      .getClientsWithUpdates()
      .pipe(takeUntil(this._onDestroy))
      .subscribe((results: Array<UserClientViewModel>) => {
        this.userClients = results;

        console.log(this.userClients);
      });
  }

  doCheckClientForUpdate(userClient: UserClientViewModel) {
    this.clientService
      .checkClientForUpdate(userClient.clientId)
      .pipe(takeUntil(this._onDestroy))
      .subscribe((update: ClientUpdateViewModel) => {

        if (update) {
          userClient.clientUpdates.unshift(update);
        }

      });
  }

  doUpdatePackageUpdate(update: ClientUpdateViewModel, download: boolean, install: boolean) {
    let clientUpdate = new ClientUpdate({
      id: update.id,
      checkStatus: update.checkStatus,
      downloadStatus: download,
      installedStatus: install,
      date: update.date,
      clientId: update.clientId,
      packageId: update.package.id
    });

    this.clientService
      .updateClientUpdate(clientUpdate)
      .subscribe(() => {
        this.doGetClientsWithUpdates();
      });
  }

  getNameAndVersion(item: Software | PackageViewModel) {
    return `${ item.name }@${ item.major }.${ item.minor }.${ item.patch }`;
  }

  getUpdateInfo(update: ClientUpdateViewModel) {
    if (update.installedStatus) { return "Installed"; }
    else if (update.downloadStatus) { return "Downloaded"; }
    else if (update.checkStatus) { return "Checked"; }
    else { return "Notified"; }
  }

  trackByFn(index, item) {
    return item;
  }
}
