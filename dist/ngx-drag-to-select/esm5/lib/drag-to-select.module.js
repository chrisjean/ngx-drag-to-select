/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DEFAULT_CONFIG } from './config';
import { KeyboardEventsService } from './keyboard-events.service';
import { SelectContainerComponent } from './select-container.component';
import { SelectItemDirective } from './select-item.directive';
import { ShortcutService } from './shortcut.service';
import { CONFIG, USER_CONFIG } from './tokens';
import { mergeDeep } from './utils';
/** @type {?} */
var COMPONENTS = [SelectContainerComponent, SelectItemDirective];
/**
 * @param {?} config
 * @return {?}
 */
export function CONFIG_FACTORY(config) {
    return mergeDeep(DEFAULT_CONFIG, config);
}
var DragToSelectModule = /** @class */ (function () {
    function DragToSelectModule() {
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    DragToSelectModule.forRoot = /**
     * @param {?=} config
     * @return {?}
     */
    function (config) {
        if (config === void 0) { config = {}; }
        return {
            ngModule: DragToSelectModule,
            providers: [
                ShortcutService,
                KeyboardEventsService,
                { provide: USER_CONFIG, useValue: config },
                {
                    provide: CONFIG,
                    useFactory: CONFIG_FACTORY,
                    deps: [USER_CONFIG]
                }
            ]
        };
    };
    DragToSelectModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    declarations: tslib_1.__spread(COMPONENTS),
                    exports: tslib_1.__spread(COMPONENTS)
                },] }
    ];
    return DragToSelectModule;
}());
export { DragToSelectModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy10by1zZWxlY3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRyYWctdG8tc2VsZWN0LyIsInNvdXJjZXMiOlsibGliL2RyYWctdG8tc2VsZWN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRWxFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUMvQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sU0FBUyxDQUFDOztJQUU5QixVQUFVLEdBQUcsQ0FBQyx3QkFBd0IsRUFBRSxtQkFBbUIsQ0FBQzs7Ozs7QUFFbEUsTUFBTSxVQUFVLGNBQWMsQ0FBQyxNQUFtQztJQUNoRSxPQUFPLFNBQVMsQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDM0MsQ0FBQztBQUVEO0lBQUE7SUFxQkEsQ0FBQzs7Ozs7SUFmUSwwQkFBTzs7OztJQUFkLFVBQWUsTUFBd0M7UUFBeEMsdUJBQUEsRUFBQSxXQUF3QztRQUNyRCxPQUFPO1lBQ0wsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixTQUFTLEVBQUU7Z0JBQ1QsZUFBZTtnQkFDZixxQkFBcUI7Z0JBQ3JCLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFO2dCQUMxQztvQkFDRSxPQUFPLEVBQUUsTUFBTTtvQkFDZixVQUFVLEVBQUUsY0FBYztvQkFDMUIsSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDO2lCQUNwQjthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7O2dCQXBCRixRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixZQUFZLG1CQUFNLFVBQVUsQ0FBQztvQkFDN0IsT0FBTyxtQkFBTSxVQUFVLENBQUM7aUJBQ3pCOztJQWlCRCx5QkFBQztDQUFBLEFBckJELElBcUJDO1NBaEJZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgREVGQVVMVF9DT05GSUcgfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgeyBLZXlib2FyZEV2ZW50c1NlcnZpY2UgfSBmcm9tICcuL2tleWJvYXJkLWV2ZW50cy5zZXJ2aWNlJztcbmltcG9ydCB7IERyYWdUb1NlbGVjdENvbmZpZyB9IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7IFNlbGVjdENvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vc2VsZWN0LWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VsZWN0SXRlbURpcmVjdGl2ZSB9IGZyb20gJy4vc2VsZWN0LWl0ZW0uZGlyZWN0aXZlJztcbmltcG9ydCB7IFNob3J0Y3V0U2VydmljZSB9IGZyb20gJy4vc2hvcnRjdXQuc2VydmljZSc7XG5pbXBvcnQgeyBDT05GSUcsIFVTRVJfQ09ORklHIH0gZnJvbSAnLi90b2tlbnMnO1xuaW1wb3J0IHsgbWVyZ2VEZWVwIH0gZnJvbSAnLi91dGlscyc7XG5cbmNvbnN0IENPTVBPTkVOVFMgPSBbU2VsZWN0Q29udGFpbmVyQ29tcG9uZW50LCBTZWxlY3RJdGVtRGlyZWN0aXZlXTtcblxuZXhwb3J0IGZ1bmN0aW9uIENPTkZJR19GQUNUT1JZKGNvbmZpZzogUGFydGlhbDxEcmFnVG9TZWxlY3RDb25maWc+KSB7XG4gIHJldHVybiBtZXJnZURlZXAoREVGQVVMVF9DT05GSUcsIGNvbmZpZyk7XG59XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFsuLi5DT01QT05FTlRTXSxcbiAgZXhwb3J0czogWy4uLkNPTVBPTkVOVFNdXG59KVxuZXhwb3J0IGNsYXNzIERyYWdUb1NlbGVjdE1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogUGFydGlhbDxEcmFnVG9TZWxlY3RDb25maWc+ID0ge30pOiBNb2R1bGVXaXRoUHJvdmlkZXJzPERyYWdUb1NlbGVjdE1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogRHJhZ1RvU2VsZWN0TW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIFNob3J0Y3V0U2VydmljZSxcbiAgICAgICAgS2V5Ym9hcmRFdmVudHNTZXJ2aWNlLFxuICAgICAgICB7IHByb3ZpZGU6IFVTRVJfQ09ORklHLCB1c2VWYWx1ZTogY29uZmlnIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBDT05GSUcsXG4gICAgICAgICAgdXNlRmFjdG9yeTogQ09ORklHX0ZBQ1RPUlksXG4gICAgICAgICAgZGVwczogW1VTRVJfQ09ORklHXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuIl19