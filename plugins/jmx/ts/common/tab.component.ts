/// <reference path="../workspace.ts"/>

namespace Jmx {

  export class TabController {

    constructor(
      private $scope,
      private $route: angular.route.IRouteService,
      private $location: ng.ILocationService,
      private layoutTree: string,
      private layoutFull,
      private viewRegistry,
      private workspace: Workspace) {
      'ngInject';
    }

    isTabActive(path: string): boolean {
      return _.startsWith(this.$location.path(), path)
    };

    goto(path: string): ng.ILocationService {
      return this.$location.path(path);
    }

    editChart(): ng.ILocationService | boolean {
      if (this.isTabActive('jmx-chart') || this.isTabActive('jmx-edit-chart')) {
        return this.$scope.goto('/jmx/chartEdit');
      } else {
        return false;
      }
    }
  }

  export const tabComponent: angular.IComponentOptions = {
    templateUrl: 'plugins/jmx/html/common/tab.html',
    controller: TabController
  };

}
