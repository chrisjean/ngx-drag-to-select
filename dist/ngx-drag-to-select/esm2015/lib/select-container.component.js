/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, Output, EventEmitter, Input, Renderer2, ViewChild, NgZone, ContentChildren, QueryList, HostBinding, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subject, combineLatest, merge, from, fromEvent, BehaviorSubject, asyncScheduler } from 'rxjs';
import { switchMap, takeUntil, map, tap, filter, auditTime, mapTo, share, withLatestFrom, distinctUntilChanged, observeOn, startWith, concatMapTo, first } from 'rxjs/operators';
import { SelectItemDirective, SELECT_ITEM_INSTANCE } from './select-item.directive';
import { ShortcutService } from './shortcut.service';
import { createSelectBox, whenSelectBoxVisible } from './operators';
import { Action, UpdateActions } from './models';
import { AUDIT_TIME, NO_SELECT_CLASS } from './constants';
import { inBoundingBox, cursorWithinElement, clearSelection, boxIntersects, calculateBoundingClientRect, getRelativeMousePosition, getMousePosition, hasMinimumSize } from './utils';
import { KeyboardEventsService } from './keyboard-events.service';
export class SelectContainerComponent {
    /**
     * @param {?} platformId
     * @param {?} shortcuts
     * @param {?} keyboardEvents
     * @param {?} hostElementRef
     * @param {?} renderer
     * @param {?} ngZone
     */
    constructor(platformId, shortcuts, keyboardEvents, hostElementRef, renderer, ngZone) {
        this.platformId = platformId;
        this.shortcuts = shortcuts;
        this.keyboardEvents = keyboardEvents;
        this.hostElementRef = hostElementRef;
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.selectOnDrag = true;
        this.disabled = false;
        this.disableDrag = false;
        this.disableRangeSelection = false;
        this.selectMode = false;
        this.selectWithShortcut = false;
        this.custom = false;
        this.selectedItemsChange = new EventEmitter();
        this.select = new EventEmitter();
        this.itemSelected = new EventEmitter();
        this.itemDeselected = new EventEmitter();
        this.selectionStarted = new EventEmitter();
        this.selectionEnded = new EventEmitter();
        this._tmpItems = new Map();
        this._selectedItems$ = new BehaviorSubject([]);
        this._selectableItems = [];
        this.updateItems$ = new Subject();
        this.destroy$ = new Subject();
        this._lastRange = [-1, -1];
        this._lastStartIndex = undefined;
        this._newRangeStart = false;
        this._lastRangeSelection = new Map();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.host = this.hostElementRef.nativeElement;
            this._initSelectedItemsChange();
            this._calculateBoundingClientRect();
            this._observeBoundingRectChanges();
            this._observeSelectableItems();
            /** @type {?} */
            const mouseup$ = this.keyboardEvents.mouseup$.pipe(filter((/**
             * @return {?}
             */
            () => !this.disabled)), tap((/**
             * @return {?}
             */
            () => this._onMouseUp())), share());
            /** @type {?} */
            const mousemove$ = this.keyboardEvents.mousemove$.pipe(filter((/**
             * @return {?}
             */
            () => !this.disabled)), share());
            /** @type {?} */
            const mousedown$ = fromEvent(this.host, 'mousedown').pipe(filter((/**
             * @param {?} event
             * @return {?}
             */
            event => event.button === 0)), // only emit left mouse
            filter((/**
             * @return {?}
             */
            () => !this.disabled)), tap((/**
             * @param {?} event
             * @return {?}
             */
            event => this._onMouseDown(event))), share());
            /** @type {?} */
            const dragging$ = mousedown$.pipe(filter((/**
             * @param {?} event
             * @return {?}
             */
            event => !this.shortcuts.disableSelection(event))), filter((/**
             * @return {?}
             */
            () => !this.selectMode)), filter((/**
             * @return {?}
             */
            () => !this.disableDrag)), switchMap((/**
             * @return {?}
             */
            () => mousemove$.pipe(takeUntil(mouseup$)))), share());
            /** @type {?} */
            const currentMousePosition$ = mousedown$.pipe(map((/**
             * @param {?} event
             * @return {?}
             */
            (event) => getRelativeMousePosition(event, this.host))));
            /** @type {?} */
            const show$ = dragging$.pipe(mapTo(1));
            /** @type {?} */
            const hide$ = mouseup$.pipe(mapTo(0));
            /** @type {?} */
            const opacity$ = merge(show$, hide$).pipe(distinctUntilChanged());
            /** @type {?} */
            const selectBox$ = combineLatest([dragging$, opacity$, currentMousePosition$]).pipe(createSelectBox(this.host), share());
            this.selectBoxClasses$ = merge(dragging$, mouseup$, this.keyboardEvents.distinctKeydown$, this.keyboardEvents.distinctKeyup$).pipe(auditTime(AUDIT_TIME), withLatestFrom(selectBox$), map((/**
             * @param {?} __0
             * @return {?}
             */
            ([event, selectBox]) => {
                return {
                    'dts-adding': hasMinimumSize(selectBox, 0, 0) && !this.shortcuts.removeFromSelection(event),
                    'dts-removing': this.shortcuts.removeFromSelection(event)
                };
            })), distinctUntilChanged((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            (a, b) => JSON.stringify(a) === JSON.stringify(b))));
            /** @type {?} */
            const selectOnMouseUp$ = dragging$.pipe(filter((/**
             * @return {?}
             */
            () => !this.selectOnDrag)), filter((/**
             * @return {?}
             */
            () => !this.selectMode)), filter((/**
             * @param {?} event
             * @return {?}
             */
            event => this._cursorWithinHost(event))), switchMap((/**
             * @param {?} _
             * @return {?}
             */
            _ => mouseup$.pipe(first()))), filter((/**
             * @param {?} event
             * @return {?}
             */
            event => (!this.shortcuts.disableSelection(event) && !this.shortcuts.toggleSingleItem(event)) ||
                this.shortcuts.removeFromSelection(event))));
            /** @type {?} */
            const selectOnDrag$ = selectBox$.pipe(auditTime(AUDIT_TIME), withLatestFrom(mousemove$, (/**
             * @param {?} selectBox
             * @param {?} event
             * @return {?}
             */
            (selectBox, event) => ({
                selectBox,
                event
            }))), filter((/**
             * @return {?}
             */
            () => this.selectOnDrag)), filter((/**
             * @param {?} __0
             * @return {?}
             */
            ({ selectBox }) => hasMinimumSize(selectBox))), map((/**
             * @param {?} __0
             * @return {?}
             */
            ({ event }) => event)));
            /** @type {?} */
            const selectOnKeyboardEvent$ = merge(this.keyboardEvents.distinctKeydown$, this.keyboardEvents.distinctKeyup$).pipe(auditTime(AUDIT_TIME), whenSelectBoxVisible(selectBox$), tap((/**
             * @param {?} event
             * @return {?}
             */
            event => {
                if (this._isExtendedSelection(event)) {
                    this._tmpItems.clear();
                }
                else {
                    this._flushItems();
                }
            })));
            merge(selectOnMouseUp$, selectOnDrag$, selectOnKeyboardEvent$)
                .pipe(takeUntil(this.destroy$))
                .subscribe((/**
             * @param {?} event
             * @return {?}
             */
            event => this._selectItems(event)));
            this.selectBoxStyles$ = selectBox$.pipe(map((/**
             * @param {?} selectBox
             * @return {?}
             */
            selectBox => ({
                top: `${selectBox.top}px`,
                left: `${selectBox.left}px`,
                width: `${selectBox.width}px`,
                height: `${selectBox.height}px`,
                opacity: selectBox.opacity
            }))));
            this._initSelectionOutputs(mousedown$, mouseup$);
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._selectableItems = this.$selectableItems.toArray();
    }
    /**
     * @return {?}
     */
    selectAll() {
        this.$selectableItems.forEach((/**
         * @param {?} item
         * @return {?}
         */
        item => {
            this._selectItem(item);
        }));
    }
    /**
     * @template T
     * @param {?} predicate
     * @return {?}
     */
    toggleItems(predicate) {
        this._filterSelectableItems(predicate).subscribe((/**
         * @param {?} item
         * @return {?}
         */
        (item) => this._toggleItem(item)));
    }
    /**
     * @template T
     * @param {?} predicate
     * @return {?}
     */
    selectItems(predicate) {
        this._filterSelectableItems(predicate).subscribe((/**
         * @param {?} item
         * @return {?}
         */
        (item) => this._selectItem(item)));
    }
    /**
     * @template T
     * @param {?} predicate
     * @return {?}
     */
    deselectItems(predicate) {
        this._filterSelectableItems(predicate).subscribe((/**
         * @param {?} item
         * @return {?}
         */
        (item) => this._deselectItem(item)));
    }
    /**
     * @return {?}
     */
    clearSelection() {
        this.$selectableItems.forEach((/**
         * @param {?} item
         * @return {?}
         */
        item => {
            this._deselectItem(item);
        }));
    }
    /**
     * @return {?}
     */
    update() {
        this._calculateBoundingClientRect();
        this.$selectableItems.forEach((/**
         * @param {?} item
         * @return {?}
         */
        item => item.calculateBoundingClientRect()));
    }
    /**
     * @param {?} startIndex
     * @param {?} endIndex
     * @return {?}
     */
    selectRange(startIndex, endIndex) {
        this.$selectableItems.forEach((/**
         * @param {?} item
         * @param {?} index
         * @return {?}
         */
        (item, index) => {
            if (index >= startIndex && index <= endIndex) {
                this._selectItem(item);
            }
            else {
                this._deselectItem(item);
            }
        }));
    }
    /**
     * @param {?} indexArray
     * @return {?}
     */
    selectArray(indexArray) {
        this.$selectableItems.forEach((/**
         * @param {?} item
         * @param {?} index
         * @return {?}
         */
        (item, index) => {
            if (indexArray.includes(index)) {
                this._selectItem(item);
            }
            else {
                this._deselectItem(item);
            }
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    /**
     * @private
     * @template T
     * @param {?} predicate
     * @return {?}
     */
    _filterSelectableItems(predicate) {
        // Wrap select items in an observable for better efficiency as
        // no intermediate arrays are created and we only need to process
        // every item once.
        return from(this._selectableItems).pipe(filter((/**
         * @param {?} item
         * @return {?}
         */
        item => predicate(item.value))));
    }
    /**
     * @private
     * @return {?}
     */
    _initSelectedItemsChange() {
        this._selectedItems$
            .pipe(auditTime(AUDIT_TIME), takeUntil(this.destroy$))
            .subscribe({
            next: (/**
             * @param {?} selectedItems
             * @return {?}
             */
            selectedItems => {
                this.selectedItemsChange.emit(selectedItems);
                this.select.emit(selectedItems);
            }),
            complete: (/**
             * @return {?}
             */
            () => {
                this.selectedItemsChange.emit([]);
            })
        });
    }
    /**
     * @private
     * @return {?}
     */
    _observeSelectableItems() {
        // Listen for updates and either select or deselect an item
        this.updateItems$
            .pipe(withLatestFrom(this._selectedItems$), takeUntil(this.destroy$))
            .subscribe((/**
         * @param {?} __0
         * @return {?}
         */
        ([update, selectedItems]) => {
            /** @type {?} */
            const item = update.item;
            console.log('Updating item: ' + item + ' Update type: ' + update.type);
            switch (update.type) {
                case UpdateActions.Add:
                    if (this._addItem(item, selectedItems)) {
                        item._select();
                    }
                    break;
                case UpdateActions.Remove:
                    if (this._removeItem(item, selectedItems)) {
                        item._deselect();
                    }
                    break;
            }
        }));
        // Update the container as well as all selectable items if the list has changed
        this.$selectableItems.changes
            .pipe(withLatestFrom(this._selectedItems$), observeOn(asyncScheduler), takeUntil(this.destroy$))
            .subscribe((/**
         * @param {?} __0
         * @return {?}
         */
        ([items, selectedItems]) => {
            /** @type {?} */
            const newList = items.toArray();
            this._selectableItems = newList;
            /** @type {?} */
            const removedItems = selectedItems.filter((/**
             * @param {?} item
             * @return {?}
             */
            item => !newList.includes(item.value)));
            if (removedItems.length) {
                removedItems.forEach((/**
                 * @param {?} item
                 * @return {?}
                 */
                item => this._removeItem(item, selectedItems)));
            }
            this.update();
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _observeBoundingRectChanges() {
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const resize$ = fromEvent(window, 'resize');
            /** @type {?} */
            const windowScroll$ = fromEvent(window, 'scroll');
            /** @type {?} */
            const containerScroll$ = fromEvent(this.host, 'scroll');
            merge(resize$, windowScroll$, containerScroll$)
                .pipe(startWith('INITIAL_UPDATE'), auditTime(AUDIT_TIME), takeUntil(this.destroy$))
                .subscribe((/**
             * @return {?}
             */
            () => {
                this.update();
            }));
        }));
    }
    /**
     * @private
     * @param {?} mousedown$
     * @param {?} mouseup$
     * @return {?}
     */
    _initSelectionOutputs(mousedown$, mouseup$) {
        mousedown$
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        event => this._cursorWithinHost(event))), tap((/**
         * @return {?}
         */
        () => this.selectionStarted.emit())), concatMapTo(mouseup$.pipe(first())), withLatestFrom(this._selectedItems$), map((/**
         * @param {?} __0
         * @return {?}
         */
        ([, items]) => items)), takeUntil(this.destroy$))
            .subscribe((/**
         * @param {?} items
         * @return {?}
         */
        items => {
            this.selectionEnded.emit(items);
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _calculateBoundingClientRect() {
        this.host.boundingClientRect = calculateBoundingClientRect(this.host);
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    _cursorWithinHost(event) {
        return cursorWithinElement(event, this.host);
    }
    /**
     * @private
     * @return {?}
     */
    _onMouseUp() {
        this._flushItems();
        this.renderer.removeClass(document.body, NO_SELECT_CLASS);
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    _onMouseDown(event) {
        if (this.shortcuts.disableSelection(event) || this.disabled) {
            return;
        }
        clearSelection(window);
        if (!this.disableDrag) {
            this.renderer.addClass(document.body, NO_SELECT_CLASS);
        }
        if (this.shortcuts.removeFromSelection(event)) {
            return;
        }
        /** @type {?} */
        const mousePoint = getMousePosition(event);
        const [currentIndex, clickedItem] = this._getClosestSelectItem(event);
        let [startIndex, endIndex] = this._lastRange;
        /** @type {?} */
        const isMoveRangeStart = this.shortcuts.moveRangeStart(event);
        /** @type {?} */
        const shouldResetRangeSelection = !this.shortcuts.extendedSelectionShortcut(event) || isMoveRangeStart || this.disableRangeSelection;
        if (shouldResetRangeSelection) {
            this._resetRangeStart();
        }
        // move range start
        if (shouldResetRangeSelection && !this.disableRangeSelection) {
            if (currentIndex > -1) {
                this._newRangeStart = true;
                this._lastStartIndex = currentIndex;
                clickedItem.toggleRangeStart();
                this._lastRangeSelection.clear();
            }
            else {
                this._lastStartIndex = -1;
            }
        }
        if (currentIndex > -1) {
            startIndex = Math.min(this._lastStartIndex, currentIndex);
            endIndex = Math.max(this._lastStartIndex, currentIndex);
            this._lastRange = [startIndex, endIndex];
        }
        if (isMoveRangeStart) {
            return;
        }
        this.$selectableItems.forEach((/**
         * @param {?} item
         * @param {?} index
         * @return {?}
         */
        (item, index) => {
            /** @type {?} */
            const itemRect = item.getBoundingClientRect();
            /** @type {?} */
            const withinBoundingBox = inBoundingBox(mousePoint, itemRect);
            if (this.shortcuts.extendedSelectionShortcut(event) && this.disableRangeSelection) {
                return;
            }
            /** @type {?} */
            const withinRange = this.shortcuts.extendedSelectionShortcut(event) &&
                startIndex > -1 &&
                endIndex > -1 &&
                index >= startIndex &&
                index <= endIndex &&
                startIndex !== endIndex;
            /** @type {?} */
            const shouldAdd = (withinBoundingBox &&
                !this.shortcuts.toggleSingleItem(event) &&
                !this.selectMode &&
                !this.selectWithShortcut) ||
                (this.shortcuts.extendedSelectionShortcut(event) && item.selected && !this._lastRangeSelection.get(item)) ||
                withinRange ||
                (withinBoundingBox && this.shortcuts.toggleSingleItem(event) && !item.selected) ||
                (!withinBoundingBox && this.shortcuts.toggleSingleItem(event) && item.selected) ||
                (withinBoundingBox && !item.selected && this.selectMode) ||
                (!withinBoundingBox && item.selected && this.selectMode);
            /** @type {?} */
            const shouldRemove = (!withinBoundingBox &&
                !this.shortcuts.toggleSingleItem(event) &&
                !this.selectMode &&
                !this.shortcuts.extendedSelectionShortcut(event) &&
                !this.selectWithShortcut) ||
                (this.shortcuts.extendedSelectionShortcut(event) && currentIndex > -1) ||
                (!withinBoundingBox && this.shortcuts.toggleSingleItem(event) && !item.selected) ||
                (withinBoundingBox && this.shortcuts.toggleSingleItem(event) && item.selected) ||
                (!withinBoundingBox && !item.selected && this.selectMode) ||
                (withinBoundingBox && item.selected && this.selectMode);
            if (shouldAdd) {
                this._selectItem(item);
            }
            else if (shouldRemove) {
                this._deselectItem(item);
            }
            if (withinRange && !this._lastRangeSelection.get(item)) {
                this._lastRangeSelection.set(item, true);
            }
            else if (!withinRange && !this._newRangeStart && !item.selected) {
                this._lastRangeSelection.delete(item);
            }
        }));
        // if we don't toggle a single item, we set `newRangeStart` to `false`
        // meaning that we are building up a range
        if (!this.shortcuts.toggleSingleItem(event)) {
            this._newRangeStart = false;
        }
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    _selectItems(event) {
        /** @type {?} */
        const selectionBox = calculateBoundingClientRect(this.$selectBox.nativeElement);
        this.$selectableItems.forEach((/**
         * @param {?} item
         * @param {?} index
         * @return {?}
         */
        (item, index) => {
            if (this._isExtendedSelection(event)) {
                this._extendedSelectionMode(selectionBox, item, event);
            }
            else {
                this._normalSelectionMode(selectionBox, item, event);
                if (this._lastStartIndex < 0 && item.selected) {
                    item.toggleRangeStart();
                    this._lastStartIndex = index;
                }
            }
        }));
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    _isExtendedSelection(event) {
        return this.shortcuts.extendedSelectionShortcut(event) && this.selectOnDrag;
    }
    /**
     * @private
     * @param {?} selectBox
     * @param {?} item
     * @param {?} event
     * @return {?}
     */
    _normalSelectionMode(selectBox, item, event) {
        /** @type {?} */
        const inSelection = boxIntersects(selectBox, item.getBoundingClientRect());
        /** @type {?} */
        const shouldAdd = inSelection && !item.selected && !this.shortcuts.removeFromSelection(event);
        /** @type {?} */
        const shouldRemove = (!inSelection && item.selected && !this.shortcuts.addToSelection(event)) ||
            (inSelection && item.selected && this.shortcuts.removeFromSelection(event));
        if (shouldAdd) {
            this._selectItem(item);
        }
        else if (shouldRemove) {
            this._deselectItem(item);
        }
    }
    /**
     * @private
     * @param {?} selectBox
     * @param {?} item
     * @param {?} event
     * @return {?}
     */
    _extendedSelectionMode(selectBox, item, event) {
        /** @type {?} */
        const inSelection = boxIntersects(selectBox, item.getBoundingClientRect());
        /** @type {?} */
        const shoudlAdd = (inSelection && !item.selected && !this.shortcuts.removeFromSelection(event) && !this._tmpItems.has(item)) ||
            (inSelection && item.selected && this.shortcuts.removeFromSelection(event) && !this._tmpItems.has(item));
        /** @type {?} */
        const shouldRemove = (!inSelection && item.selected && this.shortcuts.addToSelection(event) && this._tmpItems.has(item)) ||
            (!inSelection && !item.selected && this.shortcuts.removeFromSelection(event) && this._tmpItems.has(item));
        if (shoudlAdd) {
            item.selected ? item._deselect() : item._select();
            /** @type {?} */
            const action = this.shortcuts.removeFromSelection(event)
                ? Action.Delete
                : this.shortcuts.addToSelection(event)
                    ? Action.Add
                    : Action.None;
            this._tmpItems.set(item, action);
        }
        else if (shouldRemove) {
            this.shortcuts.removeFromSelection(event) ? item._select() : item._deselect();
            this._tmpItems.delete(item);
        }
    }
    /**
     * @private
     * @return {?}
     */
    _flushItems() {
        this._tmpItems.forEach((/**
         * @param {?} action
         * @param {?} item
         * @return {?}
         */
        (action, item) => {
            if (action === Action.Add) {
                this._selectItem(item);
            }
            if (action === Action.Delete) {
                this._deselectItem(item);
            }
        }));
        this._tmpItems.clear();
    }
    /**
     * @private
     * @param {?} item
     * @param {?} selectedItems
     * @return {?}
     */
    _addItem(item, selectedItems) {
        /** @type {?} */
        let success = false;
        if (!this._hasItem(item, selectedItems)) {
            success = true;
            selectedItems.push(item.value);
            this._selectedItems$.next(selectedItems);
            this.itemSelected.emit(item.value);
        }
        return success;
    }
    /**
     * @private
     * @param {?} item
     * @param {?} selectedItems
     * @return {?}
     */
    _removeItem(item, selectedItems) {
        /** @type {?} */
        let success = false;
        /** @type {?} */
        const value = item instanceof SelectItemDirective ? item.value : item;
        /** @type {?} */
        const index = selectedItems.indexOf(value);
        if (index > -1) {
            success = true;
            selectedItems.splice(index, 1);
            this._selectedItems$.next(selectedItems);
            this.itemDeselected.emit(item.value);
        }
        return success;
    }
    /**
     * @private
     * @param {?} item
     * @return {?}
     */
    _toggleItem(item) {
        if (item.selected) {
            this._deselectItem(item);
        }
        else {
            this._selectItem(item);
        }
    }
    /**
     * @private
     * @param {?} item
     * @return {?}
     */
    _selectItem(item) {
        this.updateItems$.next({ type: UpdateActions.Add, item });
    }
    /**
     * @private
     * @param {?} item
     * @return {?}
     */
    _deselectItem(item) {
        this.updateItems$.next({ type: UpdateActions.Remove, item });
    }
    /**
     * @private
     * @param {?} item
     * @param {?} selectedItems
     * @return {?}
     */
    _hasItem(item, selectedItems) {
        return selectedItems.includes(item.value);
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    _getClosestSelectItem(event) {
        /** @type {?} */
        const target = ((/** @type {?} */ (event.target))).closest('.dts-select-item');
        /** @type {?} */
        let index = -1;
        /** @type {?} */
        let targetItem = null;
        if (target) {
            targetItem = target[SELECT_ITEM_INSTANCE];
            index = this._selectableItems.indexOf(targetItem);
        }
        return [index, targetItem];
    }
    /**
     * @private
     * @return {?}
     */
    _resetRangeStart() {
        this._lastRange = [-1, -1];
        /** @type {?} */
        const lastRangeStart = this._getLastRangeSelection();
        if (lastRangeStart && lastRangeStart.rangeStart) {
            lastRangeStart.toggleRangeStart();
        }
    }
    /**
     * @private
     * @return {?}
     */
    _getLastRangeSelection() {
        if (this._lastStartIndex >= 0) {
            return this._selectableItems[this._lastStartIndex];
        }
        return null;
    }
}
SelectContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'dts-select-container',
                exportAs: 'dts-select-container',
                host: {
                    class: 'dts-select-container'
                },
                template: `
    <ng-content></ng-content>
    <div
      class="dts-select-box"
      #selectBox
      [ngClass]="selectBoxClasses$ | async"
      [ngStyle]="selectBoxStyles$ | async"
    ></div>
  `,
                styles: [":host{display:block;position:relative}"]
            }] }
];
/** @nocollapse */
SelectContainerComponent.ctorParameters = () => [
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: ShortcutService },
    { type: KeyboardEventsService },
    { type: ElementRef },
    { type: Renderer2 },
    { type: NgZone }
];
SelectContainerComponent.propDecorators = {
    $selectBox: [{ type: ViewChild, args: ['selectBox', { static: true },] }],
    $selectableItems: [{ type: ContentChildren, args: [SelectItemDirective, { descendants: true },] }],
    selectedItems: [{ type: Input }],
    selectOnDrag: [{ type: Input }],
    disabled: [{ type: Input }],
    disableDrag: [{ type: Input }],
    disableRangeSelection: [{ type: Input }],
    selectMode: [{ type: Input }],
    selectWithShortcut: [{ type: Input }],
    custom: [{ type: Input }, { type: HostBinding, args: ['class.dts-custom',] }],
    selectedItemsChange: [{ type: Output }],
    select: [{ type: Output }],
    itemSelected: [{ type: Output }],
    itemDeselected: [{ type: Output }],
    selectionStarted: [{ type: Output }],
    selectionEnded: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    SelectContainerComponent.prototype.host;
    /** @type {?} */
    SelectContainerComponent.prototype.selectBoxStyles$;
    /** @type {?} */
    SelectContainerComponent.prototype.selectBoxClasses$;
    /**
     * @type {?}
     * @private
     */
    SelectContainerComponent.prototype.$selectBox;
    /**
     * @type {?}
     * @private
     */
    SelectContainerComponent.prototype.$selectableItems;
    /** @type {?} */
    SelectContainerComponent.prototype.selectedItems;
    /** @type {?} */
    SelectContainerComponent.prototype.selectOnDrag;
    /** @type {?} */
    SelectContainerComponent.prototype.disabled;
    /** @type {?} */
    SelectContainerComponent.prototype.disableDrag;
    /** @type {?} */
    SelectContainerComponent.prototype.disableRangeSelection;
    /** @type {?} */
    SelectContainerComponent.prototype.selectMode;
    /** @type {?} */
    SelectContainerComponent.prototype.selectWithShortcut;
    /** @type {?} */
    SelectContainerComponent.prototype.custom;
    /** @type {?} */
    SelectContainerComponent.prototype.selectedItemsChange;
    /** @type {?} */
    SelectContainerComponent.prototype.select;
    /** @type {?} */
    SelectContainerComponent.prototype.itemSelected;
    /** @type {?} */
    SelectContainerComponent.prototype.itemDeselected;
    /** @type {?} */
    SelectContainerComponent.prototype.selectionStarted;
    /** @type {?} */
    SelectContainerComponent.prototype.selectionEnded;
    /**
     * @type {?}
     * @private
     */
    SelectContainerComponent.prototype._tmpItems;
    /**
     * @type {?}
     * @private
     */
    SelectContainerComponent.prototype._selectedItems$;
    /**
     * @type {?}
     * @private
     */
    SelectContainerComponent.prototype._selectableItems;
    /**
     * @type {?}
     * @private
     */
    SelectContainerComponent.prototype.updateItems$;
    /**
     * @type {?}
     * @private
     */
    SelectContainerComponent.prototype.destroy$;
    /**
     * @type {?}
     * @private
     */
    SelectContainerComponent.prototype._lastRange;
    /**
     * @type {?}
     * @private
     */
    SelectContainerComponent.prototype._lastStartIndex;
    /**
     * @type {?}
     * @private
     */
    SelectContainerComponent.prototype._newRangeStart;
    /**
     * @type {?}
     * @private
     */
    SelectContainerComponent.prototype._lastRangeSelection;
    /**
     * @type {?}
     * @private
     */
    SelectContainerComponent.prototype.platformId;
    /**
     * @type {?}
     * @private
     */
    SelectContainerComponent.prototype.shortcuts;
    /**
     * @type {?}
     * @private
     */
    SelectContainerComponent.prototype.keyboardEvents;
    /**
     * @type {?}
     * @private
     */
    SelectContainerComponent.prototype.hostElementRef;
    /**
     * @type {?}
     * @private
     */
    SelectContainerComponent.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    SelectContainerComponent.prototype.ngZone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZHJhZy10by1zZWxlY3QvIiwic291cmNlcyI6WyJsaWIvc2VsZWN0LWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLE1BQU0sRUFDTixZQUFZLEVBQ1osS0FBSyxFQUVMLFNBQVMsRUFDVCxTQUFTLEVBQ1QsTUFBTSxFQUNOLGVBQWUsRUFDZixTQUFTLEVBQ1QsV0FBVyxFQUVYLFdBQVcsRUFDWCxNQUFNLEVBRVAsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFcEQsT0FBTyxFQUFjLE9BQU8sRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUVuSCxPQUFPLEVBQ0wsU0FBUyxFQUNULFNBQVMsRUFDVCxHQUFHLEVBQ0gsR0FBRyxFQUNILE1BQU0sRUFDTixTQUFTLEVBQ1QsS0FBSyxFQUNMLEtBQUssRUFDTCxjQUFjLEVBQ2Qsb0JBQW9CLEVBQ3BCLFNBQVMsRUFDVCxTQUFTLEVBQ1QsV0FBVyxFQUNYLEtBQUssRUFDTixNQUFNLGdCQUFnQixDQUFDO0FBRXhCLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3BGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVyRCxPQUFPLEVBQUUsZUFBZSxFQUFFLG9CQUFvQixFQUFxQixNQUFNLGFBQWEsQ0FBQztBQUV2RixPQUFPLEVBQ0wsTUFBTSxFQUtOLGFBQWEsRUFHZCxNQUFNLFVBQVUsQ0FBQztBQUVsQixPQUFPLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxNQUFNLGFBQWEs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S0FBSzt1QkFDTCxLQUFLOzBCQUNMLEtBQUs7b0NBQ0wsS0FBSzt5QkFDTCxLQUFLO2lDQUNMLEtBQUs7cUJBRUwsS0FBSyxZQUNMLFdBQVcsU0FBQyxrQkFBa0I7a0NBRzlCLE1BQU07cUJBQ04sTUFBTTsyQkFDTixNQUFNOzZCQUNOLE1BQU07K0JBQ04sTUFBTTs2QkFDTixNQUFNOzs7O0lBM0JQLHdDQUEwQjs7SUFDMUIsb0RBQWdEOztJQUNoRCxxREFBMEQ7Ozs7O0lBRTFELDhDQUMrQjs7Ozs7SUFFL0Isb0RBQ3lEOztJQUV6RCxpREFBNEI7O0lBQzVCLGdEQUE2Qjs7SUFDN0IsNENBQTBCOztJQUMxQiwrQ0FBNkI7O0lBQzdCLHlEQUF1Qzs7SUFDdkMsOENBQTRCOztJQUM1QixzREFBb0M7O0lBRXBDLDBDQUVlOztJQUVmLHVEQUF3RDs7SUFDeEQsMENBQTJDOztJQUMzQyxnREFBaUQ7O0lBQ2pELGtEQUFtRDs7SUFDbkQsb0RBQXNEOztJQUN0RCxrREFBMEQ7Ozs7O0lBRTFELDZDQUEyRDs7Ozs7SUFFM0QsbURBQThEOzs7OztJQUM5RCxvREFBMEQ7Ozs7O0lBQzFELGdEQUFtRDs7Ozs7SUFDbkQsNENBQXVDOzs7OztJQUV2Qyw4Q0FBZ0Q7Ozs7O0lBQ2hELG1EQUF3RDs7Ozs7SUFDeEQsa0RBQStCOzs7OztJQUMvQix1REFBMkU7Ozs7O0lBR3pFLDhDQUErQzs7Ozs7SUFDL0MsNkNBQWtDOzs7OztJQUNsQyxrREFBNkM7Ozs7O0lBQzdDLGtEQUFrQzs7Ozs7SUFDbEMsNENBQTJCOzs7OztJQUMzQiwwQ0FBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBSZW5kZXJlcjIsXG4gIFZpZXdDaGlsZCxcbiAgTmdab25lLFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIFF1ZXJ5TGlzdCxcbiAgSG9zdEJpbmRpbmcsXG4gIEFmdGVyVmlld0luaXQsXG4gIFBMQVRGT1JNX0lELFxuICBJbmplY3QsXG4gIEFmdGVyQ29udGVudEluaXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCwgY29tYmluZUxhdGVzdCwgbWVyZ2UsIGZyb20sIGZyb21FdmVudCwgQmVoYXZpb3JTdWJqZWN0LCBhc3luY1NjaGVkdWxlciB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge1xuICBzd2l0Y2hNYXAsXG4gIHRha2VVbnRpbCxcbiAgbWFwLFxuICB0YXAsXG4gIGZpbHRlcixcbiAgYXVkaXRUaW1lLFxuICBtYXBUbyxcbiAgc2hhcmUsXG4gIHdpdGhMYXRlc3RGcm9tLFxuICBkaXN0aW5jdFVudGlsQ2hhbmdlZCxcbiAgb2JzZXJ2ZU9uLFxuICBzdGFydFdpdGgsXG4gIGNvbmNhdE1hcFRvLFxuICBmaXJzdFxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IFNlbGVjdEl0ZW1EaXJlY3RpdmUsIFNFTEVDVF9JVEVNX0lOU1RBTkNFIH0gZnJvbSAnLi9zZWxlY3QtaXRlbS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgU2hvcnRjdXRTZXJ2aWNlIH0gZnJvbSAnLi9zaG9ydGN1dC5zZXJ2aWNlJztcblxuaW1wb3J0IHsgY3JlYXRlU2VsZWN0Qm94LCB3aGVuU2VsZWN0Qm94VmlzaWJsZSwgZGlzdGluY3RLZXlFdmVudHMgfSBmcm9tICcuL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7XG4gIEFjdGlvbixcbiAgU2VsZWN0Qm94LFxuICBNb3VzZVBvc2l0aW9uLFxuICBTZWxlY3RDb250YWluZXJIb3N0LFxuICBVcGRhdGVBY3Rpb24sXG4gIFVwZGF0ZUFjdGlvbnMsXG4gIFByZWRpY2F0ZUZuLFxuICBCb3VuZGluZ0JveFxufSBmcm9tICcuL21vZGVscyc7XG5cbmltcG9ydCB7IEFVRElUX1RJTUUsIE5PX1NFTEVDVF9DTEFTUyB9IGZyb20gJy4vY29uc3RhbnRzJztcblxuaW1wb3J0IHtcbiAgaW5Cb3VuZGluZ0JveCxcbiAgY3Vyc29yV2l0aGluRWxlbWVudCxcbiAgY2xlYXJTZWxlY3Rpb24sXG4gIGJveEludGVyc2VjdHMsXG4gIGNhbGN1bGF0ZUJvdW5kaW5nQ2xpZW50UmVjdCxcbiAgZ2V0UmVsYXRpdmVNb3VzZVBvc2l0aW9uLFxuICBnZXRNb3VzZVBvc2l0aW9uLFxuICBoYXNNaW5pbXVtU2l6ZVxufSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IEtleWJvYXJkRXZlbnRzU2VydmljZSB9IGZyb20gJy4va2V5Ym9hcmQtZXZlbnRzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkdHMtc2VsZWN0LWNvbnRhaW5lcicsXG4gIGV4cG9ydEFzOiAnZHRzLXNlbGVjdC1jb250YWluZXInLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdkdHMtc2VsZWN0LWNvbnRhaW5lcidcbiAgfSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPGRpdlxuICAgICAgY2xhc3M9XCJkdHMtc2VsZWN0LWJveFwiXG4gICAgICAjc2VsZWN0Qm94XG4gICAgICBbbmdDbGFzc109XCJzZWxlY3RCb3hDbGFzc2VzJCB8IGFzeW5jXCJcbiAgICAgIFtuZ1N0eWxlXT1cInNlbGVjdEJveFN0eWxlcyQgfCBhc3luY1wiXG4gICAgPjwvZGl2PlxuICBgLFxuICBzdHlsZVVybHM6IFsnLi9zZWxlY3QtY29udGFpbmVyLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0Q29udGFpbmVyQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBBZnRlckNvbnRlbnRJbml0IHtcbiAgaG9zdDogU2VsZWN0Q29udGFpbmVySG9zdDtcbiAgc2VsZWN0Qm94U3R5bGVzJDogT2JzZXJ2YWJsZTxTZWxlY3RCb3g8c3RyaW5nPj47XG4gIHNlbGVjdEJveENsYXNzZXMkOiBPYnNlcnZhYmxlPHsgW2tleTogc3RyaW5nXTogYm9vbGVhbiB9PjtcblxuICBAVmlld0NoaWxkKCdzZWxlY3RCb3gnLCB7IHN0YXRpYzogdHJ1ZSB9KVxuICBwcml2YXRlICRzZWxlY3RCb3g6IEVsZW1lbnRSZWY7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihTZWxlY3RJdGVtRGlyZWN0aXZlLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pXG4gIHByaXZhdGUgJHNlbGVjdGFibGVJdGVtczogUXVlcnlMaXN0PFNlbGVjdEl0ZW1EaXJlY3RpdmU+O1xuXG4gIEBJbnB1dCgpIHNlbGVjdGVkSXRlbXM6IGFueTtcbiAgQElucHV0KCkgc2VsZWN0T25EcmFnID0gdHJ1ZTtcbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgZGlzYWJsZURyYWcgPSBmYWxzZTtcbiAgQElucHV0KCkgZGlzYWJsZVJhbmdlU2VsZWN0aW9uID0gZmFsc2U7XG4gIEBJbnB1dCgpIHNlbGVjdE1vZGUgPSBmYWxzZTtcbiAgQElucHV0KCkgc2VsZWN0V2l0aFNob3J0Y3V0ID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5kdHMtY3VzdG9tJylcbiAgY3VzdG9tID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpIHNlbGVjdGVkSXRlbXNDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgaXRlbVNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBpdGVtRGVzZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgc2VsZWN0aW9uU3RhcnRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIHNlbGVjdGlvbkVuZGVkID0gbmV3IEV2ZW50RW1pdHRlcjxBcnJheTxhbnk+PigpO1xuXG4gIHByaXZhdGUgX3RtcEl0ZW1zID0gbmV3IE1hcDxTZWxlY3RJdGVtRGlyZWN0aXZlLCBBY3Rpb24+KCk7XG5cbiAgcHJpdmF0ZSBfc2VsZWN0ZWRJdGVtcyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEFycmF5PGFueT4+KFtdKTtcbiAgcHJpdmF0ZSBfc2VsZWN0YWJsZUl0ZW1zOiBBcnJheTxTZWxlY3RJdGVtRGlyZWN0aXZlPiA9IFtdO1xuICBwcml2YXRlIHVwZGF0ZUl0ZW1zJCA9IG5ldyBTdWJqZWN0PFVwZGF0ZUFjdGlvbj4oKTtcbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgcHJpdmF0ZSBfbGFzdFJhbmdlOiBbbnVtYmVyLCBudW1iZXJdID0gWy0xLCAtMV07XG4gIHByaXZhdGUgX2xhc3RTdGFydEluZGV4OiBudW1iZXIgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gIHByaXZhdGUgX25ld1JhbmdlU3RhcnQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfbGFzdFJhbmdlU2VsZWN0aW9uOiBNYXA8U2VsZWN0SXRlbURpcmVjdGl2ZSwgYm9vbGVhbj4gPSBuZXcgTWFwKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgcHJpdmF0ZSBzaG9ydGN1dHM6IFNob3J0Y3V0U2VydmljZSxcbiAgICBwcml2YXRlIGtleWJvYXJkRXZlbnRzOiBLZXlib2FyZEV2ZW50c1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBob3N0RWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZVxuICApIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICB0aGlzLmhvc3QgPSB0aGlzLmhvc3RFbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgIHRoaXMuX2luaXRTZWxlY3RlZEl0ZW1zQ2hhbmdlKCk7XG5cbiAgICAgIHRoaXMuX2NhbGN1bGF0ZUJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgdGhpcy5fb2JzZXJ2ZUJvdW5kaW5nUmVjdENoYW5nZXMoKTtcbiAgICAgIHRoaXMuX29ic2VydmVTZWxlY3RhYmxlSXRlbXMoKTtcblxuICAgICAgY29uc3QgbW91c2V1cCQgPSB0aGlzLmtleWJvYXJkRXZlbnRzLm1vdXNldXAkLnBpcGUoXG4gICAgICAgIGZpbHRlcigoKSA9PiAhdGhpcy5kaXNhYmxlZCksXG4gICAgICAgIHRhcCgoKSA9PiB0aGlzLl9vbk1vdXNlVXAoKSksXG4gICAgICAgIHNoYXJlKClcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IG1vdXNlbW92ZSQgPSB0aGlzLmtleWJvYXJkRXZlbnRzLm1vdXNlbW92ZSQucGlwZShcbiAgICAgICAgZmlsdGVyKCgpID0+ICF0aGlzLmRpc2FibGVkKSxcbiAgICAgICAgc2hhcmUoKVxuICAgICAgKTtcblxuICAgICAgY29uc3QgbW91c2Vkb3duJCA9IGZyb21FdmVudDxNb3VzZUV2ZW50Pih0aGlzLmhvc3QsICdtb3VzZWRvd24nKS5waXBlKFxuICAgICAgICBmaWx0ZXIoZXZlbnQgPT4gZXZlbnQuYnV0dG9uID09PSAwKSwgLy8gb25seSBlbWl0IGxlZnQgbW91c2VcbiAgICAgICAgZmlsdGVyKCgpID0+ICF0aGlzLmRpc2FibGVkKSxcbiAgICAgICAgdGFwKGV2ZW50ID0+IHRoaXMuX29uTW91c2VEb3duKGV2ZW50KSksXG4gICAgICAgIHNoYXJlKClcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGRyYWdnaW5nJCA9IG1vdXNlZG93biQucGlwZShcbiAgICAgICAgZmlsdGVyKGV2ZW50ID0+ICF0aGlzLnNob3J0Y3V0cy5kaXNhYmxlU2VsZWN0aW9uKGV2ZW50KSksXG4gICAgICAgIGZpbHRlcigoKSA9PiAhdGhpcy5zZWxlY3RNb2RlKSxcbiAgICAgICAgZmlsdGVyKCgpID0+ICF0aGlzLmRpc2FibGVEcmFnKSxcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+IG1vdXNlbW92ZSQucGlwZSh0YWtlVW50aWwobW91c2V1cCQpKSksXG4gICAgICAgIHNoYXJlKClcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGN1cnJlbnRNb3VzZVBvc2l0aW9uJDogT2JzZXJ2YWJsZTxNb3VzZVBvc2l0aW9uPiA9IG1vdXNlZG93biQucGlwZShcbiAgICAgICAgbWFwKChldmVudDogTW91c2VFdmVudCkgPT4gZ2V0UmVsYXRpdmVNb3VzZVBvc2l0aW9uKGV2ZW50LCB0aGlzLmhvc3QpKVxuICAgICAgKTtcblxuICAgICAgY29uc3Qgc2hvdyQgPSBkcmFnZ2luZyQucGlwZShtYXBUbygxKSk7XG4gICAgICBjb25zdCBoaWRlJCA9IG1vdXNldXAkLnBpcGUobWFwVG8oMCkpO1xuICAgICAgY29uc3Qgb3BhY2l0eSQgPSBtZXJnZShzaG93JCwgaGlkZSQpLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSk7XG5cbiAgICAgIGNvbnN0IHNlbGVjdEJveCQgPSBjb21iaW5lTGF0ZXN0KFtkcmFnZ2luZyQsIG9wYWNpdHkkLCBjdXJyZW50TW91c2VQb3NpdGlvbiRdKS5waXBlKFxuICAgICAgICBjcmVhdGVTZWxlY3RCb3godGhpcy5ob3N0KSxcbiAgICAgICAgc2hhcmUoKVxuICAgICAgKTtcblxuICAgICAgdGhpcy5zZWxlY3RCb3hDbGFzc2VzJCA9IG1lcmdlKFxuICAgICAgICBkcmFnZ2luZyQsXG4gICAgICAgIG1vdXNldXAkLFxuICAgICAgICB0aGlzLmtleWJvYXJkRXZlbnRzLmRpc3RpbmN0S2V5ZG93biQsXG4gICAgICAgIHRoaXMua2V5Ym9hcmRFdmVudHMuZGlzdGluY3RLZXl1cCRcbiAgICAgICkucGlwZShcbiAgICAgICAgYXVkaXRUaW1lKEFVRElUX1RJTUUpLFxuICAgICAgICB3aXRoTGF0ZXN0RnJvbShzZWxlY3RCb3gkKSxcbiAgICAgICAgbWFwKChbZXZlbnQsIHNlbGVjdEJveF0pID0+IHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ2R0cy1hZGRpbmcnOiBoYXNNaW5pbXVtU2l6ZShzZWxlY3RCb3gsIDAsIDApICYmICF0aGlzLnNob3J0Y3V0cy5yZW1vdmVGcm9tU2VsZWN0aW9uKGV2ZW50KSxcbiAgICAgICAgICAgICdkdHMtcmVtb3ZpbmcnOiB0aGlzLnNob3J0Y3V0cy5yZW1vdmVGcm9tU2VsZWN0aW9uKGV2ZW50KVxuICAgICAgICAgIH07XG4gICAgICAgIH0pLFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgoYSwgYikgPT4gSlNPTi5zdHJpbmdpZnkoYSkgPT09IEpTT04uc3RyaW5naWZ5KGIpKVxuICAgICAgKTtcblxuICAgICAgY29uc3Qgc2VsZWN0T25Nb3VzZVVwJCA9IGRyYWdnaW5nJC5waXBlKFxuICAgICAgICBmaWx0ZXIoKCkgPT4gIXRoaXMuc2VsZWN0T25EcmFnKSxcbiAgICAgICAgZmlsdGVyKCgpID0+ICF0aGlzLnNlbGVjdE1vZGUpLFxuICAgICAgICBmaWx0ZXIoZXZlbnQgPT4gdGhpcy5fY3Vyc29yV2l0aGluSG9zdChldmVudCkpLFxuICAgICAgICBzd2l0Y2hNYXAoXyA9PiBtb3VzZXVwJC5waXBlKGZpcnN0KCkpKSxcbiAgICAgICAgZmlsdGVyKFxuICAgICAgICAgIGV2ZW50ID0+XG4gICAgICAgICAgICAoIXRoaXMuc2hvcnRjdXRzLmRpc2FibGVTZWxlY3Rpb24oZXZlbnQpICYmICF0aGlzLnNob3J0Y3V0cy50b2dnbGVTaW5nbGVJdGVtKGV2ZW50KSkgfHxcbiAgICAgICAgICAgIHRoaXMuc2hvcnRjdXRzLnJlbW92ZUZyb21TZWxlY3Rpb24oZXZlbnQpXG4gICAgICAgIClcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IHNlbGVjdE9uRHJhZyQgPSBzZWxlY3RCb3gkLnBpcGUoXG4gICAgICAgIGF1ZGl0VGltZShBVURJVF9USU1FKSxcbiAgICAgICAgd2l0aExhdGVzdEZyb20obW91c2Vtb3ZlJCwgKHNlbGVjdEJveCwgZXZlbnQ6IE1vdXNlRXZlbnQpID0+ICh7XG4gICAgICAgICAgc2VsZWN0Qm94LFxuICAgICAgICAgIGV2ZW50XG4gICAgICAgIH0pKSxcbiAgICAgICAgZmlsdGVyKCgpID0+IHRoaXMuc2VsZWN0T25EcmFnKSxcbiAgICAgICAgZmlsdGVyKCh7IHNlbGVjdEJveCB9KSA9PiBoYXNNaW5pbXVtU2l6ZShzZWxlY3RCb3gpKSxcbiAgICAgICAgbWFwKCh7IGV2ZW50IH0pID0+IGV2ZW50KVxuICAgICAgKTtcblxuICAgICAgY29uc3Qgc2VsZWN0T25LZXlib2FyZEV2ZW50JCA9IG1lcmdlKFxuICAgICAgICB0aGlzLmtleWJvYXJkRXZlbnRzLmRpc3RpbmN0S2V5ZG93biQsXG4gICAgICAgIHRoaXMua2V5Ym9hcmRFdmVudHMuZGlzdGluY3RLZXl1cCRcbiAgICAgICkucGlwZShcbiAgICAgICAgYXVkaXRUaW1lKEFVRElUX1RJTUUpLFxuICAgICAgICB3aGVuU2VsZWN0Qm94VmlzaWJsZShzZWxlY3RCb3gkKSxcbiAgICAgICAgdGFwKGV2ZW50ID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5faXNFeHRlbmRlZFNlbGVjdGlvbihldmVudCkpIHtcbiAgICAgICAgICAgIHRoaXMuX3RtcEl0ZW1zLmNsZWFyKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2ZsdXNoSXRlbXMoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgICBtZXJnZShzZWxlY3RPbk1vdXNlVXAkLCBzZWxlY3RPbkRyYWckLCBzZWxlY3RPbktleWJvYXJkRXZlbnQkKVxuICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAgIC5zdWJzY3JpYmUoZXZlbnQgPT4gdGhpcy5fc2VsZWN0SXRlbXMoZXZlbnQpKTtcblxuICAgICAgdGhpcy5zZWxlY3RCb3hTdHlsZXMkID0gc2VsZWN0Qm94JC5waXBlKFxuICAgICAgICBtYXAoc2VsZWN0Qm94ID0+ICh7XG4gICAgICAgICAgdG9wOiBgJHtzZWxlY3RCb3gudG9wfXB4YCxcbiAgICAgICAgICBsZWZ0OiBgJHtzZWxlY3RCb3gubGVmdH1weGAsXG4gICAgICAgICAgd2lkdGg6IGAke3NlbGVjdEJveC53aWR0aH1weGAsXG4gICAgICAgICAgaGVpZ2h0OiBgJHtzZWxlY3RCb3guaGVpZ2h0fXB4YCxcbiAgICAgICAgICBvcGFjaXR5OiBzZWxlY3RCb3gub3BhY2l0eVxuICAgICAgICB9KSlcbiAgICAgICk7XG5cbiAgICAgIHRoaXMuX2luaXRTZWxlY3Rpb25PdXRwdXRzKG1vdXNlZG93biQsIG1vdXNldXAkKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5fc2VsZWN0YWJsZUl0ZW1zID0gdGhpcy4kc2VsZWN0YWJsZUl0ZW1zLnRvQXJyYXkoKTtcbiAgfVxuXG4gIHNlbGVjdEFsbCgpIHtcbiAgICB0aGlzLiRzZWxlY3RhYmxlSXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHRoaXMuX3NlbGVjdEl0ZW0oaXRlbSk7XG4gICAgfSk7XG4gIH1cblxuICB0b2dnbGVJdGVtczxUPihwcmVkaWNhdGU6IFByZWRpY2F0ZUZuPFQ+KSB7XG4gICAgdGhpcy5fZmlsdGVyU2VsZWN0YWJsZUl0ZW1zKHByZWRpY2F0ZSkuc3Vic2NyaWJlKChpdGVtOiBTZWxlY3RJdGVtRGlyZWN0aXZlKSA9PiB0aGlzLl90b2dnbGVJdGVtKGl0ZW0pKTtcbiAgfVxuXG4gIHNlbGVjdEl0ZW1zPFQ+KHByZWRpY2F0ZTogUHJlZGljYXRlRm48VD4pIHtcbiAgICB0aGlzLl9maWx0ZXJTZWxlY3RhYmxlSXRlbXMocHJlZGljYXRlKS5zdWJzY3JpYmUoKGl0ZW06IFNlbGVjdEl0ZW1EaXJlY3RpdmUpID0+IHRoaXMuX3NlbGVjdEl0ZW0oaXRlbSkpO1xuICB9XG5cbiAgZGVzZWxlY3RJdGVtczxUPihwcmVkaWNhdGU6IFByZWRpY2F0ZUZuPFQ+KSB7XG4gICAgdGhpcy5fZmlsdGVyU2VsZWN0YWJsZUl0ZW1zKHByZWRpY2F0ZSkuc3Vic2NyaWJlKChpdGVtOiBTZWxlY3RJdGVtRGlyZWN0aXZlKSA9PiB0aGlzLl9kZXNlbGVjdEl0ZW0oaXRlbSkpO1xuICB9XG5cbiAgY2xlYXJTZWxlY3Rpb24oKSB7XG4gICAgdGhpcy4kc2VsZWN0YWJsZUl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICB0aGlzLl9kZXNlbGVjdEl0ZW0oaXRlbSk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgdGhpcy5fY2FsY3VsYXRlQm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgdGhpcy4kc2VsZWN0YWJsZUl0ZW1zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNhbGN1bGF0ZUJvdW5kaW5nQ2xpZW50UmVjdCgpKTtcbiAgfVxuXG4gIHNlbGVjdFJhbmdlKHN0YXJ0SW5kZXg6IG51bWJlciwgZW5kSW5kZXg6IG51bWJlcil7XG4gICAgdGhpcy4kc2VsZWN0YWJsZUl0ZW1zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICBcbiAgICAgIGlmKGluZGV4ID49IHN0YXJ0SW5kZXggJiYgaW5kZXggPD0gZW5kSW5kZXgpIHtcbiAgICAgICAgICB0aGlzLl9zZWxlY3RJdGVtKGl0ZW0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9kZXNlbGVjdEl0ZW0oaXRlbSk7XG4gICAgICB9IFxuICAgIH0pO1xuICB9XG5cbiAgc2VsZWN0QXJyYXkoaW5kZXhBcnJheTogQXJyYXk8bnVtYmVyPikge1xuICAgIHRoaXMuJHNlbGVjdGFibGVJdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICBcbiAgICAgIGlmKGluZGV4QXJyYXkuaW5jbHVkZXMoaW5kZXgpKXtcbiAgICAgICAgICB0aGlzLl9zZWxlY3RJdGVtKGl0ZW0pO1xuICAgICAgfSBcbiAgICAgIGVsc2Uge1xuICAgICAgICB0aGlzLl9kZXNlbGVjdEl0ZW0oaXRlbSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cblxuICBwcml2YXRlIF9maWx0ZXJTZWxlY3RhYmxlSXRlbXM8VD4ocHJlZGljYXRlOiBQcmVkaWNhdGVGbjxUPikge1xuICAgIC8vIFdyYXAgc2VsZWN0IGl0ZW1zIGluIGFuIG9ic2VydmFibGUgZm9yIGJldHRlciBlZmZpY2llbmN5IGFzXG4gICAgLy8gbm8gaW50ZXJtZWRpYXRlIGFycmF5cyBhcmUgY3JlYXRlZCBhbmQgd2Ugb25seSBuZWVkIHRvIHByb2Nlc3NcbiAgICAvLyBldmVyeSBpdGVtIG9uY2UuXG4gICAgcmV0dXJuIGZyb20odGhpcy5fc2VsZWN0YWJsZUl0ZW1zKS5waXBlKGZpbHRlcihpdGVtID0+IHByZWRpY2F0ZShpdGVtLnZhbHVlKSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFNlbGVjdGVkSXRlbXNDaGFuZ2UoKSB7XG4gICAgdGhpcy5fc2VsZWN0ZWRJdGVtcyRcbiAgICAgIC5waXBlKFxuICAgICAgICBhdWRpdFRpbWUoQVVESVRfVElNRSksXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSh7XG4gICAgICAgIG5leHQ6IHNlbGVjdGVkSXRlbXMgPT4ge1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtc0NoYW5nZS5lbWl0KHNlbGVjdGVkSXRlbXMpO1xuICAgICAgICAgIHRoaXMuc2VsZWN0LmVtaXQoc2VsZWN0ZWRJdGVtcyk7XG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zQ2hhbmdlLmVtaXQoW10pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX29ic2VydmVTZWxlY3RhYmxlSXRlbXMoKSB7XG4gICAgLy8gTGlzdGVuIGZvciB1cGRhdGVzIGFuZCBlaXRoZXIgc2VsZWN0IG9yIGRlc2VsZWN0IGFuIGl0ZW1cbiAgICB0aGlzLnVwZGF0ZUl0ZW1zJFxuICAgICAgLnBpcGUoXG4gICAgICAgIHdpdGhMYXRlc3RGcm9tKHRoaXMuX3NlbGVjdGVkSXRlbXMkKSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKChbdXBkYXRlLCBzZWxlY3RlZEl0ZW1zXTogW1VwZGF0ZUFjdGlvbiwgYW55W11dKSA9PiB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSB1cGRhdGUuaXRlbTtcbiAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKCdVcGRhdGluZyBpdGVtOiAnICsgaXRlbSArICcgVXBkYXRlIHR5cGU6ICcgKyB1cGRhdGUudHlwZSk7XG5cbiAgICAgICAgc3dpdGNoICh1cGRhdGUudHlwZSkge1xuICAgICAgICAgIGNhc2UgVXBkYXRlQWN0aW9ucy5BZGQ6XG4gICAgICAgICAgICBpZiAodGhpcy5fYWRkSXRlbShpdGVtLCBzZWxlY3RlZEl0ZW1zKSkge1xuICAgICAgICAgICAgICBpdGVtLl9zZWxlY3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgVXBkYXRlQWN0aW9ucy5SZW1vdmU6XG4gICAgICAgICAgICBpZiAodGhpcy5fcmVtb3ZlSXRlbShpdGVtLCBzZWxlY3RlZEl0ZW1zKSkge1xuICAgICAgICAgICAgICBpdGVtLl9kZXNlbGVjdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgLy8gVXBkYXRlIHRoZSBjb250YWluZXIgYXMgd2VsbCBhcyBhbGwgc2VsZWN0YWJsZSBpdGVtcyBpZiB0aGUgbGlzdCBoYXMgY2hhbmdlZFxuICAgIHRoaXMuJHNlbGVjdGFibGVJdGVtcy5jaGFuZ2VzXG4gICAgICAucGlwZShcbiAgICAgICAgd2l0aExhdGVzdEZyb20odGhpcy5fc2VsZWN0ZWRJdGVtcyQpLFxuICAgICAgICBvYnNlcnZlT24oYXN5bmNTY2hlZHVsZXIpLFxuICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95JClcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKFtpdGVtcywgc2VsZWN0ZWRJdGVtc106IFtRdWVyeUxpc3Q8U2VsZWN0SXRlbURpcmVjdGl2ZT4sIGFueVtdXSkgPT4ge1xuICAgICAgICBjb25zdCBuZXdMaXN0ID0gaXRlbXMudG9BcnJheSgpO1xuICAgICAgICB0aGlzLl9zZWxlY3RhYmxlSXRlbXMgPSBuZXdMaXN0O1xuICAgICAgICBjb25zdCByZW1vdmVkSXRlbXMgPSBzZWxlY3RlZEl0ZW1zLmZpbHRlcihpdGVtID0+ICFuZXdMaXN0LmluY2x1ZGVzKGl0ZW0udmFsdWUpKTtcblxuICAgICAgICBpZiAocmVtb3ZlZEl0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgIHJlbW92ZWRJdGVtcy5mb3JFYWNoKGl0ZW0gPT4gdGhpcy5fcmVtb3ZlSXRlbShpdGVtLCBzZWxlY3RlZEl0ZW1zKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9vYnNlcnZlQm91bmRpbmdSZWN0Q2hhbmdlcygpIHtcbiAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBjb25zdCByZXNpemUkID0gZnJvbUV2ZW50KHdpbmRvdywgJ3Jlc2l6ZScpO1xuICAgICAgY29uc3Qgd2luZG93U2Nyb2xsJCA9IGZyb21FdmVudCh3aW5kb3csICdzY3JvbGwnKTtcbiAgICAgIGNvbnN0IGNvbnRhaW5lclNjcm9sbCQgPSBmcm9tRXZlbnQodGhpcy5ob3N0LCAnc2Nyb2xsJyk7XG5cbiAgICAgIG1lcmdlKHJlc2l6ZSQsIHdpbmRvd1Njcm9sbCQsIGNvbnRhaW5lclNjcm9sbCQpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHN0YXJ0V2l0aCgnSU5JVElBTF9VUERBVEUnKSxcbiAgICAgICAgICBhdWRpdFRpbWUoQVVESVRfVElNRSksXG4gICAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0U2VsZWN0aW9uT3V0cHV0cyhtb3VzZWRvd24kOiBPYnNlcnZhYmxlPE1vdXNlRXZlbnQ+LCBtb3VzZXVwJDogT2JzZXJ2YWJsZTxNb3VzZUV2ZW50Pikge1xuICAgIG1vdXNlZG93biRcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoZXZlbnQgPT4gdGhpcy5fY3Vyc29yV2l0aGluSG9zdChldmVudCkpLFxuICAgICAgICB0YXAoKCkgPT4gdGhpcy5zZWxlY3Rpb25TdGFydGVkLmVtaXQoKSksXG4gICAgICAgIGNvbmNhdE1hcFRvKG1vdXNldXAkLnBpcGUoZmlyc3QoKSkpLFxuICAgICAgICB3aXRoTGF0ZXN0RnJvbSh0aGlzLl9zZWxlY3RlZEl0ZW1zJCksXG4gICAgICAgIG1hcCgoWywgaXRlbXNdKSA9PiBpdGVtcyksXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZShpdGVtcyA9PiB7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uRW5kZWQuZW1pdChpdGVtcyk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2NhbGN1bGF0ZUJvdW5kaW5nQ2xpZW50UmVjdCgpIHtcbiAgICB0aGlzLmhvc3QuYm91bmRpbmdDbGllbnRSZWN0ID0gY2FsY3VsYXRlQm91bmRpbmdDbGllbnRSZWN0KHRoaXMuaG9zdCk7XG4gIH1cblxuICBwcml2YXRlIF9jdXJzb3JXaXRoaW5Ib3N0KGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgcmV0dXJuIGN1cnNvcldpdGhpbkVsZW1lbnQoZXZlbnQsIHRoaXMuaG9zdCk7XG4gIH1cblxuICBwcml2YXRlIF9vbk1vdXNlVXAoKSB7XG4gICAgdGhpcy5fZmx1c2hJdGVtcygpO1xuICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MoZG9jdW1lbnQuYm9keSwgTk9fU0VMRUNUX0NMQVNTKTtcbiAgfVxuXG4gIHByaXZhdGUgX29uTW91c2VEb3duKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKHRoaXMuc2hvcnRjdXRzLmRpc2FibGVTZWxlY3Rpb24oZXZlbnQpIHx8IHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjbGVhclNlbGVjdGlvbih3aW5kb3cpO1xuXG4gICAgaWYgKCF0aGlzLmRpc2FibGVEcmFnKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGRvY3VtZW50LmJvZHksIE5PX1NFTEVDVF9DTEFTUyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2hvcnRjdXRzLnJlbW92ZUZyb21TZWxlY3Rpb24oZXZlbnQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbW91c2VQb2ludCA9IGdldE1vdXNlUG9zaXRpb24oZXZlbnQpO1xuICAgIGNvbnN0IFtjdXJyZW50SW5kZXgsIGNsaWNrZWRJdGVtXSA9IHRoaXMuX2dldENsb3Nlc3RTZWxlY3RJdGVtKGV2ZW50KTtcblxuICAgIGxldCBbc3RhcnRJbmRleCwgZW5kSW5kZXhdID0gdGhpcy5fbGFzdFJhbmdlO1xuXG4gICAgY29uc3QgaXNNb3ZlUmFuZ2VTdGFydCA9IHRoaXMuc2hvcnRjdXRzLm1vdmVSYW5nZVN0YXJ0KGV2ZW50KTtcblxuICAgIGNvbnN0IHNob3VsZFJlc2V0UmFuZ2VTZWxlY3Rpb24gPVxuICAgICAgIXRoaXMuc2hvcnRjdXRzLmV4dGVuZGVkU2VsZWN0aW9uU2hvcnRjdXQoZXZlbnQpIHx8IGlzTW92ZVJhbmdlU3RhcnQgfHwgdGhpcy5kaXNhYmxlUmFuZ2VTZWxlY3Rpb247XG5cbiAgICBpZiAoc2hvdWxkUmVzZXRSYW5nZVNlbGVjdGlvbikge1xuICAgICAgdGhpcy5fcmVzZXRSYW5nZVN0YXJ0KCk7XG4gICAgfVxuXG4gICAgLy8gbW92ZSByYW5nZSBzdGFydFxuICAgIGlmIChzaG91bGRSZXNldFJhbmdlU2VsZWN0aW9uICYmICF0aGlzLmRpc2FibGVSYW5nZVNlbGVjdGlvbikge1xuICAgICAgaWYgKGN1cnJlbnRJbmRleCA+IC0xKSB7XG4gICAgICAgIHRoaXMuX25ld1JhbmdlU3RhcnQgPSB0cnVlO1xuICAgICAgICB0aGlzLl9sYXN0U3RhcnRJbmRleCA9IGN1cnJlbnRJbmRleDtcbiAgICAgICAgY2xpY2tlZEl0ZW0udG9nZ2xlUmFuZ2VTdGFydCgpO1xuXG4gICAgICAgIHRoaXMuX2xhc3RSYW5nZVNlbGVjdGlvbi5jbGVhcigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fbGFzdFN0YXJ0SW5kZXggPSAtMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY3VycmVudEluZGV4ID4gLTEpIHtcbiAgICAgIHN0YXJ0SW5kZXggPSBNYXRoLm1pbih0aGlzLl9sYXN0U3RhcnRJbmRleCwgY3VycmVudEluZGV4KTtcbiAgICAgIGVuZEluZGV4ID0gTWF0aC5tYXgodGhpcy5fbGFzdFN0YXJ0SW5kZXgsIGN1cnJlbnRJbmRleCk7XG4gICAgICB0aGlzLl9sYXN0UmFuZ2UgPSBbc3RhcnRJbmRleCwgZW5kSW5kZXhdO1xuICAgIH1cblxuICAgIGlmIChpc01vdmVSYW5nZVN0YXJ0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy4kc2VsZWN0YWJsZUl0ZW1zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBpdGVtUmVjdCA9IGl0ZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBjb25zdCB3aXRoaW5Cb3VuZGluZ0JveCA9IGluQm91bmRpbmdCb3gobW91c2VQb2ludCwgaXRlbVJlY3QpO1xuXG4gICAgICBpZiAodGhpcy5zaG9ydGN1dHMuZXh0ZW5kZWRTZWxlY3Rpb25TaG9ydGN1dChldmVudCkgJiYgdGhpcy5kaXNhYmxlUmFuZ2VTZWxlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB3aXRoaW5SYW5nZSA9XG4gICAgICAgIHRoaXMuc2hvcnRjdXRzLmV4dGVuZGVkU2VsZWN0aW9uU2hvcnRjdXQoZXZlbnQpICYmXG4gICAgICAgIHN0YXJ0SW5kZXggPiAtMSAmJlxuICAgICAgICBlbmRJbmRleCA+IC0xICYmXG4gICAgICAgIGluZGV4ID49IHN0YXJ0SW5kZXggJiZcbiAgICAgICAgaW5kZXggPD0gZW5kSW5kZXggJiZcbiAgICAgICAgc3RhcnRJbmRleCAhPT0gZW5kSW5kZXg7XG5cbiAgICAgIGNvbnN0IHNob3VsZEFkZCA9XG4gICAgICAgICh3aXRoaW5Cb3VuZGluZ0JveCAmJlxuICAgICAgICAgICF0aGlzLnNob3J0Y3V0cy50b2dnbGVTaW5nbGVJdGVtKGV2ZW50KSAmJlxuICAgICAgICAgICF0aGlzLnNlbGVjdE1vZGUgJiZcbiAgICAgICAgICAhdGhpcy5zZWxlY3RXaXRoU2hvcnRjdXQpIHx8XG4gICAgICAgICh0aGlzLnNob3J0Y3V0cy5leHRlbmRlZFNlbGVjdGlvblNob3J0Y3V0KGV2ZW50KSAmJiBpdGVtLnNlbGVjdGVkICYmICF0aGlzLl9sYXN0UmFuZ2VTZWxlY3Rpb24uZ2V0KGl0ZW0pKSB8fFxuICAgICAgICB3aXRoaW5SYW5nZSB8fFxuICAgICAgICAod2l0aGluQm91bmRpbmdCb3ggJiYgdGhpcy5zaG9ydGN1dHMudG9nZ2xlU2luZ2xlSXRlbShldmVudCkgJiYgIWl0ZW0uc2VsZWN0ZWQpIHx8XG4gICAgICAgICghd2l0aGluQm91bmRpbmdCb3ggJiYgdGhpcy5zaG9ydGN1dHMudG9nZ2xlU2luZ2xlSXRlbShldmVudCkgJiYgaXRlbS5zZWxlY3RlZCkgfHxcbiAgICAgICAgKHdpdGhpbkJvdW5kaW5nQm94ICYmICFpdGVtLnNlbGVjdGVkICYmIHRoaXMuc2VsZWN0TW9kZSkgfHxcbiAgICAgICAgKCF3aXRoaW5Cb3VuZGluZ0JveCAmJiBpdGVtLnNlbGVjdGVkICYmIHRoaXMuc2VsZWN0TW9kZSk7XG5cbiAgICAgIGNvbnN0IHNob3VsZFJlbW92ZSA9XG4gICAgICAgICghd2l0aGluQm91bmRpbmdCb3ggJiZcbiAgICAgICAgICAhdGhpcy5zaG9ydGN1dHMudG9nZ2xlU2luZ2xlSXRlbShldmVudCkgJiZcbiAgICAgICAgICAhdGhpcy5zZWxlY3RNb2RlICYmXG4gICAgICAgICAgIXRoaXMuc2hvcnRjdXRzLmV4dGVuZGVkU2VsZWN0aW9uU2hvcnRjdXQoZXZlbnQpICYmXG4gICAgICAgICAgIXRoaXMuc2VsZWN0V2l0aFNob3J0Y3V0KSB8fFxuICAgICAgICAodGhpcy5zaG9ydGN1dHMuZXh0ZW5kZWRTZWxlY3Rpb25TaG9ydGN1dChldmVudCkgJiYgY3VycmVudEluZGV4ID4gLTEpIHx8XG4gICAgICAgICghd2l0aGluQm91bmRpbmdCb3ggJiYgdGhpcy5zaG9ydGN1dHMudG9nZ2xlU2luZ2xlSXRlbShldmVudCkgJiYgIWl0ZW0uc2VsZWN0ZWQpIHx8XG4gICAgICAgICh3aXRoaW5Cb3VuZGluZ0JveCAmJiB0aGlzLnNob3J0Y3V0cy50b2dnbGVTaW5nbGVJdGVtKGV2ZW50KSAmJiBpdGVtLnNlbGVjdGVkKSB8fFxuICAgICAgICAoIXdpdGhpbkJvdW5kaW5nQm94ICYmICFpdGVtLnNlbGVjdGVkICYmIHRoaXMuc2VsZWN0TW9kZSkgfHxcbiAgICAgICAgKHdpdGhpbkJvdW5kaW5nQm94ICYmIGl0ZW0uc2VsZWN0ZWQgJiYgdGhpcy5zZWxlY3RNb2RlKTtcblxuICAgICAgaWYgKHNob3VsZEFkZCkge1xuICAgICAgICB0aGlzLl9zZWxlY3RJdGVtKGl0ZW0pO1xuICAgICAgfSBlbHNlIGlmIChzaG91bGRSZW1vdmUpIHtcbiAgICAgICAgdGhpcy5fZGVzZWxlY3RJdGVtKGl0ZW0pO1xuICAgICAgfVxuXG4gICAgICBpZiAod2l0aGluUmFuZ2UgJiYgIXRoaXMuX2xhc3RSYW5nZVNlbGVjdGlvbi5nZXQoaXRlbSkpIHtcbiAgICAgICAgdGhpcy5fbGFzdFJhbmdlU2VsZWN0aW9uLnNldChpdGVtLCB0cnVlKTtcbiAgICAgIH0gZWxzZSBpZiAoIXdpdGhpblJhbmdlICYmICF0aGlzLl9uZXdSYW5nZVN0YXJ0ICYmICFpdGVtLnNlbGVjdGVkKSB7XG4gICAgICAgIHRoaXMuX2xhc3RSYW5nZVNlbGVjdGlvbi5kZWxldGUoaXRlbSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBpZiB3ZSBkb24ndCB0b2dnbGUgYSBzaW5nbGUgaXRlbSwgd2Ugc2V0IGBuZXdSYW5nZVN0YXJ0YCB0byBgZmFsc2VgXG4gICAgLy8gbWVhbmluZyB0aGF0IHdlIGFyZSBidWlsZGluZyB1cCBhIHJhbmdlXG4gICAgaWYgKCF0aGlzLnNob3J0Y3V0cy50b2dnbGVTaW5nbGVJdGVtKGV2ZW50KSkge1xuICAgICAgdGhpcy5fbmV3UmFuZ2VTdGFydCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3NlbGVjdEl0ZW1zKGV2ZW50OiBFdmVudCkge1xuICAgIGNvbnN0IHNlbGVjdGlvbkJveCA9IGNhbGN1bGF0ZUJvdW5kaW5nQ2xpZW50UmVjdCh0aGlzLiRzZWxlY3RCb3gubmF0aXZlRWxlbWVudCk7XG5cbiAgICB0aGlzLiRzZWxlY3RhYmxlSXRlbXMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgIGlmICh0aGlzLl9pc0V4dGVuZGVkU2VsZWN0aW9uKGV2ZW50KSkge1xuICAgICAgICB0aGlzLl9leHRlbmRlZFNlbGVjdGlvbk1vZGUoc2VsZWN0aW9uQm94LCBpdGVtLCBldmVudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9ub3JtYWxTZWxlY3Rpb25Nb2RlKHNlbGVjdGlvbkJveCwgaXRlbSwgZXZlbnQpO1xuXG4gICAgICAgIGlmICh0aGlzLl9sYXN0U3RhcnRJbmRleCA8IDAgJiYgaXRlbS5zZWxlY3RlZCkge1xuICAgICAgICAgIGl0ZW0udG9nZ2xlUmFuZ2VTdGFydCgpO1xuICAgICAgICAgIHRoaXMuX2xhc3RTdGFydEluZGV4ID0gaW5kZXg7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2lzRXh0ZW5kZWRTZWxlY3Rpb24oZXZlbnQ6IEV2ZW50KSB7XG4gICAgcmV0dXJuIHRoaXMuc2hvcnRjdXRzLmV4dGVuZGVkU2VsZWN0aW9uU2hvcnRjdXQoZXZlbnQpICYmIHRoaXMuc2VsZWN0T25EcmFnO1xuICB9XG5cbiAgcHJpdmF0ZSBfbm9ybWFsU2VsZWN0aW9uTW9kZShzZWxlY3RCb3g6IEJvdW5kaW5nQm94LCBpdGVtOiBTZWxlY3RJdGVtRGlyZWN0aXZlLCBldmVudDogRXZlbnQpIHtcbiAgICBjb25zdCBpblNlbGVjdGlvbiA9IGJveEludGVyc2VjdHMoc2VsZWN0Qm94LCBpdGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKTtcblxuICAgIGNvbnN0IHNob3VsZEFkZCA9IGluU2VsZWN0aW9uICYmICFpdGVtLnNlbGVjdGVkICYmICF0aGlzLnNob3J0Y3V0cy5yZW1vdmVGcm9tU2VsZWN0aW9uKGV2ZW50KTtcblxuICAgIGNvbnN0IHNob3VsZFJlbW92ZSA9XG4gICAgICAoIWluU2VsZWN0aW9uICYmIGl0ZW0uc2VsZWN0ZWQgJiYgIXRoaXMuc2hvcnRjdXRzLmFkZFRvU2VsZWN0aW9uKGV2ZW50KSkgfHxcbiAgICAgIChpblNlbGVjdGlvbiAmJiBpdGVtLnNlbGVjdGVkICYmIHRoaXMuc2hvcnRjdXRzLnJlbW92ZUZyb21TZWxlY3Rpb24oZXZlbnQpKTtcblxuICAgIGlmIChzaG91bGRBZGQpIHtcbiAgICAgIHRoaXMuX3NlbGVjdEl0ZW0oaXRlbSk7XG4gICAgfSBlbHNlIGlmIChzaG91bGRSZW1vdmUpIHtcbiAgICAgIHRoaXMuX2Rlc2VsZWN0SXRlbShpdGVtKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9leHRlbmRlZFNlbGVjdGlvbk1vZGUoc2VsZWN0Qm94LCBpdGVtOiBTZWxlY3RJdGVtRGlyZWN0aXZlLCBldmVudDogRXZlbnQpIHtcbiAgICBjb25zdCBpblNlbGVjdGlvbiA9IGJveEludGVyc2VjdHMoc2VsZWN0Qm94LCBpdGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKTtcblxuICAgIGNvbnN0IHNob3VkbEFkZCA9XG4gICAgICAoaW5TZWxlY3Rpb24gJiYgIWl0ZW0uc2VsZWN0ZWQgJiYgIXRoaXMuc2hvcnRjdXRzLnJlbW92ZUZyb21TZWxlY3Rpb24oZXZlbnQpICYmICF0aGlzLl90bXBJdGVtcy5oYXMoaXRlbSkpIHx8XG4gICAgICAoaW5TZWxlY3Rpb24gJiYgaXRlbS5zZWxlY3RlZCAmJiB0aGlzLnNob3J0Y3V0cy5yZW1vdmVGcm9tU2VsZWN0aW9uKGV2ZW50KSAmJiAhdGhpcy5fdG1wSXRlbXMuaGFzKGl0ZW0pKTtcblxuICAgIGNvbnN0IHNob3VsZFJlbW92ZSA9XG4gICAgICAoIWluU2VsZWN0aW9uICYmIGl0ZW0uc2VsZWN0ZWQgJiYgdGhpcy5zaG9ydGN1dHMuYWRkVG9TZWxlY3Rpb24oZXZlbnQpICYmIHRoaXMuX3RtcEl0ZW1zLmhhcyhpdGVtKSkgfHxcbiAgICAgICghaW5TZWxlY3Rpb24gJiYgIWl0ZW0uc2VsZWN0ZWQgJiYgdGhpcy5zaG9ydGN1dHMucmVtb3ZlRnJvbVNlbGVjdGlvbihldmVudCkgJiYgdGhpcy5fdG1wSXRlbXMuaGFzKGl0ZW0pKTtcblxuICAgIGlmIChzaG91ZGxBZGQpIHtcbiAgICAgIGl0ZW0uc2VsZWN0ZWQgPyBpdGVtLl9kZXNlbGVjdCgpIDogaXRlbS5fc2VsZWN0KCk7XG5cbiAgICAgIGNvbnN0IGFjdGlvbiA9IHRoaXMuc2hvcnRjdXRzLnJlbW92ZUZyb21TZWxlY3Rpb24oZXZlbnQpXG4gICAgICAgID8gQWN0aW9uLkRlbGV0ZVxuICAgICAgICA6IHRoaXMuc2hvcnRjdXRzLmFkZFRvU2VsZWN0aW9uKGV2ZW50KVxuICAgICAgICA/IEFjdGlvbi5BZGRcbiAgICAgICAgOiBBY3Rpb24uTm9uZTtcblxuICAgICAgdGhpcy5fdG1wSXRlbXMuc2V0KGl0ZW0sIGFjdGlvbik7XG4gICAgfSBlbHNlIGlmIChzaG91bGRSZW1vdmUpIHtcbiAgICAgIHRoaXMuc2hvcnRjdXRzLnJlbW92ZUZyb21TZWxlY3Rpb24oZXZlbnQpID8gaXRlbS5fc2VsZWN0KCkgOiBpdGVtLl9kZXNlbGVjdCgpO1xuICAgICAgdGhpcy5fdG1wSXRlbXMuZGVsZXRlKGl0ZW0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2ZsdXNoSXRlbXMoKSB7XG4gICAgdGhpcy5fdG1wSXRlbXMuZm9yRWFjaCgoYWN0aW9uLCBpdGVtKSA9PiB7XG4gICAgICBpZiAoYWN0aW9uID09PSBBY3Rpb24uQWRkKSB7XG4gICAgICAgIHRoaXMuX3NlbGVjdEl0ZW0oaXRlbSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChhY3Rpb24gPT09IEFjdGlvbi5EZWxldGUpIHtcbiAgICAgICAgdGhpcy5fZGVzZWxlY3RJdGVtKGl0ZW0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5fdG1wSXRlbXMuY2xlYXIoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZEl0ZW0oaXRlbTogU2VsZWN0SXRlbURpcmVjdGl2ZSwgc2VsZWN0ZWRJdGVtczogQXJyYXk8YW55Pikge1xuICAgIGxldCBzdWNjZXNzID0gZmFsc2U7XG5cbiAgICBpZiAoIXRoaXMuX2hhc0l0ZW0oaXRlbSwgc2VsZWN0ZWRJdGVtcykpIHtcbiAgICAgIHN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgc2VsZWN0ZWRJdGVtcy5wdXNoKGl0ZW0udmFsdWUpO1xuICAgICAgdGhpcy5fc2VsZWN0ZWRJdGVtcyQubmV4dChzZWxlY3RlZEl0ZW1zKTtcbiAgICAgIHRoaXMuaXRlbVNlbGVjdGVkLmVtaXQoaXRlbS52YWx1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1Y2Nlc3M7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVJdGVtKGl0ZW06IFNlbGVjdEl0ZW1EaXJlY3RpdmUsIHNlbGVjdGVkSXRlbXM6IEFycmF5PGFueT4pIHtcbiAgICBsZXQgc3VjY2VzcyA9IGZhbHNlO1xuICAgIGNvbnN0IHZhbHVlID0gaXRlbSBpbnN0YW5jZW9mIFNlbGVjdEl0ZW1EaXJlY3RpdmUgPyBpdGVtLnZhbHVlIDogaXRlbTtcbiAgICBjb25zdCBpbmRleCA9IHNlbGVjdGVkSXRlbXMuaW5kZXhPZih2YWx1ZSk7XG5cbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgc3VjY2VzcyA9IHRydWU7XG4gICAgICBzZWxlY3RlZEl0ZW1zLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB0aGlzLl9zZWxlY3RlZEl0ZW1zJC5uZXh0KHNlbGVjdGVkSXRlbXMpO1xuICAgICAgdGhpcy5pdGVtRGVzZWxlY3RlZC5lbWl0KGl0ZW0udmFsdWUpO1xuICAgIH1cblxuICAgIHJldHVybiBzdWNjZXNzO1xuICB9XG5cbiAgcHJpdmF0ZSBfdG9nZ2xlSXRlbShpdGVtOiBTZWxlY3RJdGVtRGlyZWN0aXZlKSB7XG4gICAgaWYgKGl0ZW0uc2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMuX2Rlc2VsZWN0SXRlbShpdGVtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc2VsZWN0SXRlbShpdGVtKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9zZWxlY3RJdGVtKGl0ZW06IFNlbGVjdEl0ZW1EaXJlY3RpdmUpIHtcbiAgICB0aGlzLnVwZGF0ZUl0ZW1zJC5uZXh0KHsgdHlwZTogVXBkYXRlQWN0aW9ucy5BZGQsIGl0ZW0gfSk7XG4gIH1cblxuICBwcml2YXRlIF9kZXNlbGVjdEl0ZW0oaXRlbTogU2VsZWN0SXRlbURpcmVjdGl2ZSkge1xuICAgIHRoaXMudXBkYXRlSXRlbXMkLm5leHQoeyB0eXBlOiBVcGRhdGVBY3Rpb25zLlJlbW92ZSwgaXRlbSB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhc0l0ZW0oaXRlbTogU2VsZWN0SXRlbURpcmVjdGl2ZSwgc2VsZWN0ZWRJdGVtczogQXJyYXk8YW55Pikge1xuICAgIHJldHVybiBzZWxlY3RlZEl0ZW1zLmluY2x1ZGVzKGl0ZW0udmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0Q2xvc2VzdFNlbGVjdEl0ZW0oZXZlbnQ6IEV2ZW50KTogW251bWJlciwgU2VsZWN0SXRlbURpcmVjdGl2ZV0ge1xuICAgIGNvbnN0IHRhcmdldCA9IChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmNsb3Nlc3QoJy5kdHMtc2VsZWN0LWl0ZW0nKTtcbiAgICBsZXQgaW5kZXggPSAtMTtcbiAgICBsZXQgdGFyZ2V0SXRlbSA9IG51bGw7XG5cbiAgICBpZiAodGFyZ2V0KSB7XG4gICAgICB0YXJnZXRJdGVtID0gdGFyZ2V0W1NFTEVDVF9JVEVNX0lOU1RBTkNFXTtcbiAgICAgIGluZGV4ID0gdGhpcy5fc2VsZWN0YWJsZUl0ZW1zLmluZGV4T2YodGFyZ2V0SXRlbSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtpbmRleCwgdGFyZ2V0SXRlbV07XG4gIH1cblxuICBwcml2YXRlIF9yZXNldFJhbmdlU3RhcnQoKSB7XG4gICAgdGhpcy5fbGFzdFJhbmdlID0gWy0xLCAtMV07XG4gICAgY29uc3QgbGFzdFJhbmdlU3RhcnQgPSB0aGlzLl9nZXRMYXN0UmFuZ2VTZWxlY3Rpb24oKTtcblxuICAgIGlmIChsYXN0UmFuZ2VTdGFydCAmJiBsYXN0UmFuZ2VTdGFydC5yYW5nZVN0YXJ0KSB7XG4gICAgICBsYXN0UmFuZ2VTdGFydC50b2dnbGVSYW5nZVN0YXJ0KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0TGFzdFJhbmdlU2VsZWN0aW9uKCk6IFNlbGVjdEl0ZW1EaXJlY3RpdmUgfCBudWxsIHtcbiAgICBpZiAodGhpcy5fbGFzdFN0YXJ0SW5kZXggPj0gMCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGFibGVJdGVtc1t0aGlzLl9sYXN0U3RhcnRJbmRleF07XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiJdfQ==