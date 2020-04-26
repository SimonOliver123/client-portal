import { Observable } from 'rxjs';

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ClientUpdatesManagementApi, IClientUpdate, ClientUpdate, IClientUpdateViewModel, IUserClientViewModel, ClientUpdateViewModel } from "../api/serviceapi";
import { environment } from 'src/environments/environment';

@Injectable()
export class ClientService implements IClientService {

  protected api: ClientUpdatesManagementApi;

  constructor(http: HttpClient) {
    this.initialize.clientApi(http);
  }

  initialize = {
    clientApi: (http: HttpClient) => {
      this.api = new ClientUpdatesManagementApi(http, environment.baseUrl);
    }
  }

  getClientUpdates(): Observable<IClientUpdate[]> {
    return this.api.clientUpdatesAll();
  }

  getClientsWithUpdates(): Observable<IUserClientViewModel[]> {
    return this.api.updatesInfo();
  }

  checkClientForUpdate(clientId: string): Observable<IClientUpdateViewModel> {
    return this.api.updateCheck(clientId);
  }

  createClientUpdate(clientUpdate: IClientUpdate): Observable<IClientUpdate> {
    return this.api.clientUpdates(new ClientUpdate(clientUpdate));
  }

  updateClientUpdate(clientUpdate: ClientUpdate): Observable<void> {
    return this.api.clientUpdates3(clientUpdate.id, clientUpdate);
  }

  deleteClientUpdate(clientUpdateId: string): Observable<IClientUpdate> {
    return this.api.clientUpdates4(clientUpdateId);
  }
}

export interface IClientService {
  getClientUpdates(): Observable<IClientUpdate[]>;
  getClientsWithUpdates(): Observable<IUserClientViewModel[]>;
  checkClientForUpdate(clientId: string): Observable<IClientUpdateViewModel>;
  createClientUpdate(clientUpdate: IClientUpdate): Observable<IClientUpdate>;
  updateClientUpdate(clientUpdate: ClientUpdate): Observable<void>;
  deleteClientUpdate(clientUpdateId: string): Observable<IClientUpdate>;
}