/// <reference types="angular" />
/// <reference types="utilities" />
/// <reference types="jquery" />
/// <reference types="core" />
/// <reference types="forms" />
/// <reference types="angular-route" />
declare namespace Diagnostics {
    interface JvmFlag {
        name: string;
        value: any;
        writeable: boolean;
        origin: string;
        deregisterWatch: any;
        dataType: string;
    }
    interface JvmFlagsScope extends ng.IScope {
        flags: Array<JvmFlag>;
        tableDef: any;
    }
    function DiagnosticsFlagsController($scope: JvmFlagsScope, jolokia: Jolokia.IJolokia): void;
}
declare namespace JVM {
    function ConnectController($scope: any, $location: ng.ILocationService, localStorage: Storage, workspace: Jmx.Workspace, $uibModal: any, connectService: ConnectService): void;
}
declare namespace JVM {
    const rootPath = "plugins/jvm";
    const templatePath: string;
    const pluginName = "hawtio-jvm";
    const log: Logging.Logger;
    const connectControllerKey = "jvmConnectSettings";
    const connectionSettingsKey: string;
    const logoPath = "img/icons/jvm/";
    const logoRegistry: {
        'jetty': string;
        'tomcat': string;
        'generic': string;
    };
}
declare namespace JVM {
    /**
     * Adds common properties and functions to the scope
     * @method configureScope
     * @for Jvm
     * @param {*} $scope
     * @param {ng.ILocationService} $location
     * @param {Core.Workspace} workspace
     */
    function configureScope($scope: any, $location: any, workspace: any): void;
    function hasLocalMBean(workspace: any): any;
    function hasDiscoveryMBean(workspace: any): any;
    /**
     * Creates a jolokia object for connecting to the container with the given remote jolokia URL,
     * username and password
     * @method createJolokia
     * @for Core
     * @static
     * @param {String} url
     * @param {String} username
     * @param {String} password
     * @return {Object}
     */
    function createJolokia(url: string, username: string, password: string): Jolokia.IJolokia;
    function getRecentConnections(localStorage: any): any;
    function addRecentConnection(localStorage: any, name: any): void;
    function removeRecentConnection(localStorage: any, name: any): void;
    function clearConnections(): void;
    function isRemoteConnection(): boolean;
    function connectToServer(localStorage: any, options: Core.ConnectToServerOptions): void;
    function saveConnection(options: Core.ConnectOptions): void;
    /**
     * Loads all of the available connections from local storage
     * @returns {Core.ConnectionMap}
     */
    function loadConnections(): Core.ConnectOptions[];
    /**
     * Saves the connection map to local storage
     * @param connections array of all connections to be stored
     */
    function saveConnections(connections: Core.ConnectOptions[]): void;
    function getConnectionNameParameter(): any;
    /**
     * Returns the connection options for the given connection name from localStorage
     */
    function getConnectOptions(name: string, localStorage?: WindowLocalStorage): Core.ConnectOptions;
    /**
     * Creates the Jolokia URL string for the given connection options
     */
    function createServerConnectionUrl(options: Core.ConnectOptions): string;
}
declare namespace JVM {
    class ConnectService {
        private $q;
        private $window;
        constructor($q: ng.IQService, $window: ng.IWindowService);
        testConnection(connection: Core.ConnectOptions): ng.IPromise<string>;
        connect(connection: Core.ConnectToServerOptions): void;
    }
}
declare namespace JVM {
    function ConnectionUrlFilter(): (connection: Core.ConnectOptions) => string;
}
declare namespace JVM {
    const ConnectModule: string;
}
declare namespace JVM {
    var windowJolokia: Jolokia.IJolokia;
    var _module: angular.IModule;
}
declare namespace JVM {
    enum JolokiaListMethod {
        LIST_GENERAL = "list",
        LIST_WITH_RBAC = "list_rbac",
        LIST_CANT_DETERMINE = "cant_determine",
    }
    const DEFAULT_MAX_DEPTH = 7;
    const DEFAULT_MAX_COLLECTION_SIZE = 50000;
    let ConnectionName: string;
    function getConnectionName(reset?: boolean): string;
    function getConnectionOptions(): Core.ConnectOptions;
    function getJolokiaUrl(): string | boolean;
    interface JolokiaStatus {
        xhr: JQueryXHR;
        listMethod: JolokiaListMethod;
        listMBean: string;
    }
    interface DummyJolokia extends Jolokia.IJolokia {
        isDummy: boolean;
        running: boolean;
    }
}
declare namespace Jmx {
    /**
     * a NodeSelection interface so we can expose things like the objectName and the MBean's entries
     *
     * @class NodeSelection
     */
    interface NodeSelection {
        /**
         * @property text
         * @type string
         */
        text: string;
        /**
         * @property class
         * @type string
         */
        class?: string;
        /**
         * @property key
         * @type string
         * @optional
         */
        key?: string;
        /**
         * @property typeName
         * @type string
         * @optional
         */
        typeName?: string;
        /**
         * @property objectName
         * @type string
         * @optional
         */
        objectName?: string;
        /**
         * @property domain
         * @type string
         * @optional
         */
        domain?: string;
        /**
         * @property entries
         * @type any
         * @optional
         */
        entries?: any;
        /**
         * @property folderNames
         * @type array
         * @optional
         */
        folderNames?: string[];
        /**
         * @property children
         * @type NodeSelection
         * @optional
         */
        children?: Array<NodeSelection>;
        /**
         * @property parent
         * @type NodeSelection
         * @optional
         */
        parent?: NodeSelection;
        /**
         * @property icon
         * @type string
         * @optional
         */
        icon?: string;
        /**
         * @property image
         * @type string
         * @optional
         */
        image?: string;
        /**
         * @property version
         * @type string
         * @optional
         */
        version?: string;
        /**
         * @method get
         * @param {String} key
         * @return {NodeSelection}
         */
        get(key: string): NodeSelection;
        /**
         * @method isFolder
         * @return {boolean}
         */
        isFolder(): boolean;
        /**
         * @method ancestorHasType
         * @param {String} typeName
         * @return {Boolean}
         */
        ancestorHasType(typeName: string): boolean;
        /**
         * @method ancestorHasEntry
         * @param key
         * @param value
         * @return {Boolean}
         */
        ancestorHasEntry(key: string, value: any): boolean;
        /**
         * @method findDescendant
         * @param {Function} filter
         * @return {NodeSelection}
         */
        findDescendant(filter: (node: NodeSelection) => boolean): NodeSelection | null;
        /**
         * @method findAncestor
         * @param {Function} filter
         * @return {NodeSelection}
         */
        findAncestor(filter: (node: NodeSelection) => boolean): NodeSelection | null;
        /**
         * @method detach
         */
        detach(): any;
    }
    /**
     * @class Folder
     * @uses NodeSelection
     */
    class Folder implements NodeSelection {
        text: string;
        constructor(text: string);
        id: string;
        key: string;
        title: string;
        typeName: string;
        nodes: NodeSelection[];
        children: Array<NodeSelection>;
        folderNames: string[];
        domain: string;
        objectName: string;
        entries: {};
        class: string;
        parent: Folder;
        isLazy: boolean;
        lazyLoad: boolean;
        icon: string;
        image: string;
        tooltip: string;
        entity: any;
        version: string;
        mbean: Core.JMXMBean & {
            opByString?: {
                [name: string]: any;
            };
        };
        get(key: string): NodeSelection;
        isFolder(): boolean;
        /**
         * Navigates the given paths and returns the value there or null if no value could be found
         * @method navigate
         * @for Folder
         * @param {Array} paths
         * @return {NodeSelection}
         */
        navigate(...paths: string[]): NodeSelection;
        hasEntry(key: string, value: any): boolean;
        parentHasEntry(key: string, value: any): boolean;
        ancestorHasEntry(key: string, value: any): boolean;
        ancestorHasType(typeName: string): boolean;
        getOrElse(key: string, defaultValue?: Folder): Folder;
        sortChildren(recursive: boolean): void;
        moveChild(child: NodeSelection): void;
        insertBefore(child: Folder, referenceFolder: Folder): void;
        insertAfter(child: Folder, referenceFolder: Folder): void;
        /**
         * Removes this node from my parent if I have one
         * @method detach
         * @for Folder
         */
        detach(): void;
        /**
         * Searches this folder and all its descendants for the first folder to match the filter
         * @method findDescendant
         * @for Folder
         * @param {Function} filter
         * @return {Folder}
         */
        findDescendant(filter: (node: NodeSelection) => boolean): NodeSelection | null;
        /**
         * Searches this folder and all its ancestors for the first folder to match the filter
         * @method findDescendant
         * @for Folder
         * @param {Function} filter
         * @return {Folder}
         */
        findAncestor(filter: (node: NodeSelection) => boolean): NodeSelection | null;
    }
}
declare namespace Jmx {
    const pluginName = "hawtio-jmx";
    const log: Logging.Logger;
    let currentProcessId: string;
    const templatePath = "plugins/jmx/html";
    /**
     * Returns the Folder object for the given domain name and type name or null if it can not be found
     * @method getMBeanTypeFolder
     * @for Core
     * @static
     * @param {Workspace} workspace
     * @param {String} domain
     * @param {String} typeName}
     * @return {Folder}
     */
    function getMBeanTypeFolder(workspace: Workspace, domain: string, typeName: string): Folder;
    /**
     * Returns the JMX objectName for the given jmx domain and type name
     * @method getMBeanTypeObjectName
     * @for Core
     * @static
     * @param {Workspace} workspace
     * @param {String} domain
     * @param {String} typeName
     * @return {String}
     */
    function getMBeanTypeObjectName(workspace: Workspace, domain: string, typeName: string): string;
    /**
     * Creates a remote workspace given a remote jolokia for querying the JMX MBeans inside the jolokia
     * @param remoteJolokia
     * @param remoteJolokiaStatus
     * @param $location
     * @param localStorage
     * @return {Workspace}
     */
    function createRemoteWorkspace(remoteJolokia: Jolokia.IJolokia, remoteJolokiaStatus: JVM.JolokiaStatus, $location: ng.ILocationService, localStorage: Storage, $rootScope?: ng.IRootScopeService, $compile?: ng.ICompileService, $templateCache?: ng.ITemplateCacheService, HawtioNav?: HawtioMainNav.Registry): Workspace;
}
declare namespace Jmx {
    /**
     * @class NavMenuItem
     */
    interface NavMenuItem {
        id: string;
        content: string;
        title?: string;
        isValid?(workspace: Workspace, perspectiveId?: string): any;
        isActive?(worksace: Workspace): boolean;
        href(): any;
    }
    /**
     * @class Workspace
     */
    class Workspace {
        jolokia: Jolokia.IJolokia;
        jolokiaStatus: JVM.JolokiaStatus;
        jmxTreeLazyLoadRegistry: any;
        $location: ng.ILocationService;
        $compile: ng.ICompileService;
        $templateCache: ng.ITemplateCacheService;
        localStorage: Storage;
        $rootScope: ng.IRootScopeService;
        HawtioNav: HawtioMainNav.Registry;
        operationCounter: number;
        selection: NodeSelection;
        tree: Folder;
        mbeanTypesToDomain: {};
        mbeanServicesToDomain: {};
        attributeColumnDefs: {};
        onClickRowHandlers: {};
        treePostProcessors: {
            [name: string]: (tree: Folder) => void;
        };
        topLevelTabs: any;
        subLevelTabs: any[];
        keyToNodeMap: {};
        pluginRegisterHandle: any;
        pluginUpdateCounter: any;
        treeWatchRegisterHandle: any;
        treeWatcherCounter: any;
        treeFetched: boolean;
        mapData: {};
        private rootId;
        private separator;
        constructor(jolokia: Jolokia.IJolokia, jolokiaStatus: JVM.JolokiaStatus, jmxTreeLazyLoadRegistry: any, $location: ng.ILocationService, $compile: ng.ICompileService, $templateCache: ng.ITemplateCacheService, localStorage: Storage, $rootScope: ng.IRootScopeService, HawtioNav: HawtioMainNav.Registry);
        /**
         * Creates a shallow copy child workspace with its own selection and location
         * @method createChildWorkspace
         * @param {ng.ILocationService} location
         * @return {Workspace}
         */
        createChildWorkspace(location: any): Workspace;
        getLocalStorage(key: string): any;
        setLocalStorage(key: string, value: any): void;
        private jolokiaList(callback, flags);
        loadTree(): void;
        /**
         * Adds a post processor of the tree to swizzle the tree metadata after loading
         * such as correcting any typeName values or CSS styles by hand
         * @method addTreePostProcessor
         * @param {Function} processor
         */
        addTreePostProcessor(processor: (tree: Folder) => void): string;
        addNamedTreePostProcessor(name: string, processor: (tree: Folder) => void): string;
        removeNamedTreePostProcessor(name: string): void;
        maybeMonitorPlugins(): void;
        maybeUpdatePlugins(response: Jolokia.IResponse): void;
        maybeReloadTree(response: Jolokia.IResponse): void;
        /**
         * Processes response from jolokia list - if it contains "domains" and "cache" properties
         * @param response
         */
        unwindResponseWithRBACCache(response: any): Core.JMXDomains;
        populateTree(response: {
            value: Core.JMXDomains;
        }): void;
        jmxTreeUpdated(): void;
        private initFolder(folder, domain, folderNames);
        private populateDomainFolder(tree, domainName, domain);
        /**
         * Escape only '<' and '>' as opposed to Core.escapeHtml() and _.escape()
         *
         * @param {string} str string to be escaped
        */
        private escapeTagOnly(str);
        private populateMBeanFolder(domainFolder, domainClass, mbeanName, mbean);
        private folderGetOrElse(folder, name);
        private splitMBeanProperty(property);
        configureFolder(folder: Folder, domainName: string, domainClass: string, folderNames: string[], path: string): Folder;
        private addFolderByDomain(folder, domainName, typeName, owner);
        private enableLazyLoading(folder);
        /**
         * Returns the hash query argument to append to URL links
         * @method hash
         * @return {String}
         */
        hash(): string;
        /**
         * Returns the currently active tab
         * @method getActiveTab
         * @return {Boolean}
         */
        getActiveTab(): any;
        private getStrippedPathName();
        linkContains(...words: String[]): boolean;
        /**
         * Returns true if the given link is active. The link can omit the leading # or / if necessary.
         * The query parameters of the URL are ignored in the comparison.
         * @method isLinkActive
         * @param {String} href
         * @return {Boolean} true if the given link is active
         */
        isLinkActive(href: string): boolean;
        /**
         * Returns true if the given link is active. The link can omit the leading # or / if necessary.
         * The query parameters of the URL are ignored in the comparison.
         * @method isLinkActive
         * @param {String} href
         * @return {Boolean} true if the given link is active
         */
        isLinkPrefixActive(href: string): boolean;
        /**
         * Returns true if the tab query parameter is active or the URL starts with the given path
         * @method isTopTabActive
         * @param {String} path
         * @return {Boolean}
         */
        isTopTabActive(path: string): boolean;
        isMainTabActive(path: string): boolean;
        /**
         * Returns the selected mbean name if there is one
         * @method getSelectedMBeanName
         * @return {String}
         */
        getSelectedMBeanName(): string;
        getSelectedMBean(): NodeSelection;
        /**
         * Returns true if the path is valid for the current selection
         * @method validSelection
         * @param {String} uri
         * @return {Boolean}
         */
        validSelection(uri: string): boolean;
        /**
         * In cases where we have just deleted something we typically want to change
         * the selection to the parent node
         * @method removeAndSelectParentNode
         */
        removeAndSelectParentNode(): void;
        selectParentNode(): void;
        /**
         * Returns the view configuration key for the kind of selection
         * for example based on the domain and the node type
         * @method selectionViewConfigKey
         * @return {String}
         */
        selectionViewConfigKey(): string;
        /**
         * Returns a configuration key for a node which is usually of the form
         * domain/typeName or for folders with no type, domain/name/folder
         * @method selectionConfigKey
         * @param {String} prefix
         * @return {String}
         */
        selectionConfigKey(prefix?: string): string;
        moveIfViewInvalid(): boolean;
        updateSelectionNode(node: NodeSelection): void;
        broadcastSelectionNode(): void;
        private matchesProperties(entries, properties);
        hasInvokeRightsForName(objectName: string, ...methods: string[]): boolean;
        hasInvokeRights(selection: NodeSelection, ...methods: string[]): boolean;
        private resolveCanInvoke(op);
        treeContainsDomainAndProperties(domainName: string, properties?: any): boolean;
        private matches(folder, properties, propertiesCount);
        hasDomainAndProperties(domainName: string, properties?: any, propertiesCount?: any): boolean;
        findMBeanWithProperties(domainName: string, properties?: any, propertiesCount?: any): any;
        findChildMBeanWithProperties(folder: any, properties?: any, propertiesCount?: any): any;
        selectionHasDomainAndLastFolderName(objectName: string, lastName: string): boolean;
        selectionHasDomain(domainName: string): boolean;
        selectionHasDomainAndType(objectName: string, typeName: string): boolean;
        /**
         * Returns true if this workspace has any mbeans at all
         */
        hasMBeans(): boolean;
        hasFabricMBean(): boolean;
        isFabricFolder(): boolean;
        isCamelContext(): boolean;
        isCamelFolder(): boolean;
        isEndpointsFolder(): boolean;
        isEndpoint(): boolean;
        isRoutesFolder(): boolean;
        isRoute(): boolean;
        isComponentsFolder(): boolean;
        isComponent(): boolean;
        isDataformatsFolder(): boolean;
        isDataformat(): boolean;
        isOsgiFolder(): boolean;
        isKarafFolder(): boolean;
        isOsgiCompendiumFolder(): boolean;
    }
}
declare namespace Diagnostics {
    class DiagnosticsService {
        private workspace;
        private configManager;
        constructor(workspace: Jmx.Workspace, configManager: Core.ConfigManager);
        getTabs(): any[];
        private hasHotspotDiagnostic();
        private hasDiagnosticFunction(operation);
        findMyPid(title: any): string;
    }
}
declare namespace Diagnostics {
    interface ClassStats {
        num: string;
        count: string;
        bytes: string;
        name: string;
        deltaCount: string;
        deltaBytes: string;
    }
    interface HeapControllerScope extends ng.IScope {
        items: Array<ClassStats>;
        loading: boolean;
        lastLoaded: any;
        toolbarConfig: any;
        tableConfig: any;
        tableDtOptions: any;
        tableColumns: Array<any>;
        pageConfig: object;
        loadClassStats: () => void;
    }
    function DiagnosticsHeapController($scope: HeapControllerScope, jolokia: Jolokia.IJolokia, diagnosticsService: DiagnosticsService): void;
}
declare namespace Diagnostics {
    interface JfrSettings {
        limitType: string;
        limitValue: string;
        recordingNumber: string;
        dumpOnExit: boolean;
        name: string;
        filename: string;
    }
    interface Recording {
        number: string;
        size: string;
        file: string;
        time: number;
    }
    interface JfrControllerScope extends ng.IScope {
        forms: any;
        jfrEnabled: boolean;
        isRecording: boolean;
        isRunning: boolean;
        jfrSettings: JfrSettings;
        unlock: () => void;
        startRecording: () => void;
        stopRecording: () => void;
        dumpRecording: () => void;
        formConfig: Forms.FormConfiguration;
        recordings: Array<Recording>;
        pid: string;
        jfrStatus: string;
        pageTitle: string;
        settingsVisible: boolean;
        toggleSettingsVisible: () => void;
        jcmd: string;
        closeMessageForGood: (key: string) => void;
        isMessageVisible: (key: string) => boolean;
    }
    function DiagnosticsJfrController($scope: JfrControllerScope, $location: ng.ILocationService, workspace: Jmx.Workspace, jolokia: Jolokia.IJolokia, localStorage: Storage, diagnosticsService: DiagnosticsService): void;
}
declare namespace Diagnostics {
    function DiagnosticsLayoutController($location: any, diagnosticsService: any): void;
}
declare namespace Diagnostics {
    function DiagnosticsConfig(configManager: Core.ConfigManager): void;
}
declare namespace Diagnostics {
    function DiagnosticsInit($rootScope: ng.IScope, viewRegistry: any, helpRegistry: any, workspace: Jmx.Workspace, diagnosticsService: DiagnosticsService): void;
}
declare namespace Diagnostics {
    const log: Logging.Logger;
    const _module: angular.IModule;
}
declare namespace Jmx {
    function createDashboardLink(widgetType: any, widget: any): string;
    function getWidgetType(widget: any): {
        type: string;
        icon: string;
        route: string;
        size_x: number;
        size_y: number;
        title: string;
    };
    var jmxWidgetTypes: {
        type: string;
        icon: string;
        route: string;
        size_x: number;
        size_y: number;
        title: string;
    }[];
    var jmxWidgets: ({
        type: string;
        title: string;
        mbean: string;
        attribute: string;
        total: string;
        terms: string;
        remaining: string;
    } | {
        type: string;
        title: string;
        mbean: string;
        total: string;
        terms: string;
        remaining: string;
    } | {
        type: string;
        title: string;
        mbean: string;
        attribute: string;
    })[];
}
declare namespace Jmx {
    class HeaderController {
        title: string;
        objectName: string;
        constructor($scope: any);
    }
    const headerComponent: angular.IComponentOptions;
}
declare namespace Jmx {
    class TabController {
        private $scope;
        private $route;
        private $location;
        private layoutTree;
        private layoutFull;
        private viewRegistry;
        private workspace;
        constructor($scope: any, $route: angular.route.IRouteService, $location: ng.ILocationService, layoutTree: string, layoutFull: any, viewRegistry: any, workspace: Workspace);
        isTabActive(path: string): boolean;
        goto(path: string): ng.ILocationService;
        editChart(): ng.ILocationService | boolean;
    }
    const tabComponent: angular.IComponentOptions;
}
declare namespace Jmx {
    const commonModule: string;
}
declare namespace Jmx {
    function AttributesController($scope: any, $element: any, $location: ng.ILocationService, workspace: Workspace, jmxWidgets: any, jmxWidgetTypes: any, $templateCache: ng.ITemplateCacheService, localStorage: Storage, $browser: any, $timeout: ng.ITimeoutService, attributesService: AttributesService): void;
}
/**
 * @namespace RBAC
 */
declare namespace RBAC {
    interface RBACTasks extends Core.Tasks {
        initialize(mbean: string): void;
        getACLMBean(): ng.IPromise<string>;
    }
    interface OperationCanInvoke {
        CanInvoke: boolean;
        Method: string;
        ObjectName: string;
    }
}
declare namespace Jmx {
    class AttributesService {
        private $q;
        private jolokia;
        private jolokiaUrl;
        private rbacACLMBean;
        constructor($q: ng.IQService, jolokia: Jolokia.IJolokia, jolokiaUrl: string, rbacACLMBean: ng.IPromise<string>);
        registerJolokia(scope: any, request: any, callback: any): void;
        unregisterJolokia(scope: any): void;
        listMBean(mbeanName: string, callback: any): void;
        canInvoke(mbeanName: string, attribute: string, type: string): ng.IPromise<boolean>;
        buildJolokiaUrl(mbeanName: string, attribute: string): string;
        update(mbeanName: string, attribute: string, value: any): void;
    }
}
declare namespace Jmx {
    const attributesModule: string;
}
declare namespace Jmx {
    class Operation {
        args: OperationArgument[];
        description: string;
        name: string;
        readableName: string;
        canInvoke: boolean;
        constructor(method: string, args: OperationArgument[], description: string);
        private static buildName(method, args);
        private static buildReadableName(method, args);
    }
    class OperationArgument {
        name: string;
        type: string;
        desc: string;
        constructor();
        readableType(): string;
    }
}
declare namespace Jmx {
    class OperationsService {
        private $q;
        private jolokia;
        private rbacACLMBean;
        constructor($q: ng.IQService, jolokia: Jolokia.IJolokia, rbacACLMBean: ng.IPromise<string>);
        getOperations(mbeanName: string): ng.IPromise<Operation[]>;
        private loadOperations(mbeanName);
        private addOperation(operations, operationMap, opName, op);
        private fetchPermissions(operationMap, mbeanName);
        getOperation(mbeanName: string, operationName: any): ng.IPromise<Operation>;
        executeOperation(mbeanName: string, operation: Operation, argValues?: any[]): ng.IPromise<string>;
    }
}
declare namespace Jmx {
    class OperationsController {
        private $scope;
        private $location;
        private workspace;
        private jolokiaUrl;
        private operationsService;
        config: any;
        menuActions: {
            name: string;
            actionFn: (any, Operation) => void;
        }[];
        operations: Operation[];
        constructor($scope: any, $location: any, workspace: Workspace, jolokiaUrl: string, operationsService: OperationsService);
        $onInit(): void;
        private configureListView();
        private buildJolokiaUrl(operation);
        private fetchOperations();
    }
}
declare namespace Jmx {
    const operationsComponent: angular.IComponentOptions;
}
declare namespace Jmx {
    class OperationFormController {
        private workspace;
        private operationsService;
        operation: Operation;
        formFields: {
            label: string;
            type: string;
            helpText: string;
            value: any;
        }[];
        editorMode: string;
        operationFailed: boolean;
        operationResult: string;
        isExecuting: boolean;
        constructor(workspace: Workspace, operationsService: OperationsService);
        $onInit(): void;
        private static buildHelpText(arg);
        private static convertToHtmlInputType(javaType);
        private static getDefaultValue(javaType);
        execute(): void;
    }
    const operationFormComponent: angular.IComponentOptions;
}
declare namespace Jmx {
    const operationsModule: string;
}
declare namespace Jmx {
    class TreeHeaderController {
        private $scope;
        private $element;
        filter: string;
        result: any[];
        constructor($scope: any, $element: JQuery);
        $onInit(): void;
        private search(filter);
        private tree();
        expandAll(): any;
        contractAll(): any;
    }
}
declare namespace Jmx {
    const treeHeaderComponent: angular.IComponentOptions;
}
declare namespace Jmx {
    class TreeController {
        private $scope;
        private $location;
        private workspace;
        private $element;
        private $timeout;
        constructor($scope: any, $location: ng.ILocationService, workspace: Workspace, $element: JQuery, $timeout: ng.ITimeoutService);
        $onInit(): void;
        treeFetched(): boolean;
        updateSelectionFromURL(): void;
        private populateTree();
        private removeTree();
    }
}
declare namespace Jmx {
    const treeComponent: angular.IComponentOptions;
}
declare namespace Jmx {
    const treeModule: string;
    const treeElementId = "#jmxtree";
}
declare namespace Jmx {
    var _module: angular.IModule;
}
declare namespace Jmx {
    var AreaChartController: angular.IModule;
}
declare namespace Jmx {
}
declare namespace Jmx {
}
declare namespace Jmx {
    var DonutChartController: angular.IModule;
}
declare namespace JVM {
}
declare namespace JVM {
    var HeaderController: angular.IModule;
}
declare namespace JVM {
    function JolokiaPreferences($scope: any, localStorage: any, jolokiaParams: any, $window: any): void;
}
declare namespace JVM {
    class JolokiaService {
        private $q;
        private jolokia;
        constructor($q: ng.IQService, jolokia: Jolokia.IJolokia);
        getAttribute(mbean: string, attribute: string): ng.IPromise<any>;
        executeOperation(mbean: string, operation: string, ...args: any[]): ng.IPromise<any>;
    }
}
/**
 * @module JVM
 */
declare namespace JVM {
}
declare namespace JVM {
}
declare namespace JVM {
}
declare namespace RBAC {
    class JmxTreeProcessor {
        private jolokia;
        private jolokiaStatus;
        private rbacTasks;
        private workspace;
        constructor(jolokia: Jolokia.IJolokia, jolokiaStatus: JVM.JolokiaStatus, rbacTasks: RBACTasks, workspace: Jmx.Workspace);
        process(tree: Jmx.Folder): void;
        private flattenMBeanTree(mbeans, tree);
        private processWithRBAC(mbeans);
        private processGeneral(aclMBean, mbeans);
        private addOperation(mbean, opList, opName, op);
        private addCanInvokeToClass(mbean, canInvoke);
        private stripClasses(css);
        private addClass(css, _class);
    }
}
declare namespace RBAC {
    /**
     * Directive that sets an element's visibility to hidden if the user cannot invoke the supplied operation
     */
    class HawtioShow implements ng.IDirective {
        private workspace;
        restrict: string;
        constructor(workspace: Jmx.Workspace);
        static factory(workspace: Jmx.Workspace): HawtioShow;
        link(scope: ng.IScope, element: ng.IAugmentedJQuery, attr: ng.IAttributes): void;
        private applyInvokeRights(element, objectName, attr);
        private getCanInvokeOperation(methodName, argumentTypes);
        private getArguments(canInvokeOp, objectName, methodName, argumentTypes);
        private changeDisplay(element, invokeRights, mode);
    }
}
declare namespace RBAC {
    class RBACTasksFactory {
        static create(postLoginTasks: Core.Tasks, jolokia: Jolokia.IJolokia, $q: ng.IQService): RBACTasks;
    }
    class RBACACLMBeanFactory {
        static create(rbacTasks: RBACTasks): ng.IPromise<string>;
    }
}
/**
 * @namespace RBAC
 * @main RBAC
 */
declare namespace RBAC {
    const pluginName: string;
    const log: Logging.Logger;
    const _module: angular.IModule;
}
declare namespace Threads {
    var pluginName: string;
    var templatePath: string;
    var log: Logging.Logger;
    var jmxDomain: string;
    var mbeanType: string;
    var mbean: string;
    var _module: angular.IModule;
}
declare namespace Threads {
    class ThreadsService {
        private $q;
        private jolokia;
        private static STATE_LABELS;
        constructor($q: angular.IQService, jolokia: Jolokia.IJolokia);
        getThreads(): angular.IPromise<any[]>;
    }
}
declare namespace Threads {
}
/**
 * @module Threads
 */
declare namespace Threads {
}
declare namespace Jmx {
    function findLazyLoadingFunction(workspace: Workspace, folder: any): (workspace: Workspace, folder: Folder, onComplete: (children: NodeSelection[]) => void) => void;
    function registerLazyLoadHandler(domain: string, lazyLoaderFactory: (folder: Folder) => any): void;
    function unregisterLazyLoadHandler(domain: string, lazyLoaderFactory: (folder: Folder) => any): void;
    function updateTreeSelectionFromURL($location: any, treeElement: any, activateIfNoneSelected?: boolean): void;
    function updateTreeSelectionFromURLAndAutoSelect($location: any, treeElement: any, autoSelect: (Folder) => NodeSelection, activateIfNoneSelected?: boolean): void;
    function getUniqueTypeNames(children: NodeSelection[]): string[];
    function enableTree($scope: any, $location: ng.ILocationService, workspace: Workspace, treeElement: any, children: Array<NodeSelection>): void;
}
