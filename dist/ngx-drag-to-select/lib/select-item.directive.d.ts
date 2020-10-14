import { DoCheck, ElementRef, Renderer2, OnInit } from '@angular/core';
import { DragToSelectConfig, BoundingBox } from './models';
export declare const SELECT_ITEM_INSTANCE: unique symbol;
export declare class SelectItemDirective implements OnInit, DoCheck {
    private config;
    private platformId;
    private host;
    private renderer;
    private _boundingClientRect;
    selected: boolean;
    rangeStart: boolean;
    dtsSelectItem: any | undefined;
    readonly value: SelectItemDirective | any;
    constructor(config: DragToSelectConfig, platformId: Object, host: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
    ngDoCheck(): void;
    toggleRangeStart(): void;
    readonly nativeElememnt: any;
    getBoundingClientRect(): BoundingBox;
    calculateBoundingClientRect(): BoundingBox;
    _select(): void;
    _deselect(): void;
    private applySelectedClass;
}
