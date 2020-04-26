import { Observable } from 'rxjs';

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ClientUpdatesManagementApi, ISoftwareViewModel } from "../api/serviceapi";
import { environment } from 'src/environments/environment';

@Injectable()
export class SoftwareService implements ISoftwareService {

  protected api: ClientUpdatesManagementApi;

  constructor(http: HttpClient) {
    this.initialize.SoftwareApi(http);
  }

  initialize = {
    SoftwareApi: (http: HttpClient) => {
      this.api = new ClientUpdatesManagementApi(http, environment.baseUrl);
    }
  }

  getSoftwareWithPackages(): Observable<ISoftwareViewModel[]> {
    return this.api.packagesInfo();
  }
  
}

export interface ISoftwareService {
  getSoftwareWithPackages(): Observable<ISoftwareViewModel[]>;
}