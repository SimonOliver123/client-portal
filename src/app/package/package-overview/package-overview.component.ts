import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SoftwareViewModel, PackageViewModel } from '../../api/serviceapi';
import { SoftwareService } from '../../services/software.service';

@Component({
  selector: 'app-package-overview',
  templateUrl: './package-overview.component.html',
  styleUrls: ['./package-overview.component.scss']
})
export class PackageOverviewComponent implements OnInit, OnDestroy {

  software: Array<SoftwareViewModel>;

  /** Subject that emits when the component has been destroyed. */
  private _onDestroy = new Subject<void>();

  constructor(private softwareService: SoftwareService) { }

  ngOnInit() {
    this.softwareService
      .getSoftwareWithPackages()
      .pipe(takeUntil(this._onDestroy))
      .subscribe((results: Array<SoftwareViewModel>) => {
        this.software = results;

        console.log(this.software);
      });
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  getVersion(item: SoftwareViewModel | PackageViewModel) {
    return `${ item.major }.${ item.minor }.${ item.patch }`;
  }

  trackByFn(index, item) {
    return item;
  }
}
