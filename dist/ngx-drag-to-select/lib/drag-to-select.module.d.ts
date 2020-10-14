import { ModuleWithProviders } from '@angular/core';
import { DragToSelectConfig } from './models';
export declare function CONFIG_FACTORY(config: Partial<DragToSelectConfig>): Object;
export declare class DragToSelectModule {
    static forRoot(config?: Partial<DragToSelectConfig>): ModuleWithProviders<DragToSelectModule>;
}
