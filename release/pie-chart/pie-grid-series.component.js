"use strict";
var core_1 = require('@angular/core');
var d3_1 = require('../d3');
var PieGridSeries = (function () {
    function PieGridSeries(element) {
        this.innerRadius = 60;
        this.outerRadius = 80;
        this.clickHandler = new core_1.EventEmitter();
        this.element = element.nativeElement;
    }
    PieGridSeries.prototype.ngOnInit = function () {
        this.update();
    };
    PieGridSeries.prototype.ngOnChanges = function () {
        this.update();
    };
    PieGridSeries.prototype.update = function () {
        this.layout = d3_1.default.pie()
            .value(function (d) { return d.data.value; }).sort(null);
        this.arcs = this.getArcs();
        this.loadAnimation();
    };
    PieGridSeries.prototype.getArcs = function () {
        var _this = this;
        return this.layout(this.data).map(function (arc, index) {
            var label = arc.data.data.name;
            var other = arc.data.data.other;
            if (index === 0) {
                arc.startAngle = 0;
            }
            var genArcPath = d3_1.default.arc()
                .innerRadius(_this.innerRadius).outerRadius(_this.outerRadius)
                .startAngle(arc.startAngle).endAngle(arc.endAngle);
            return {
                class: 'arc ' + 'arc' + index,
                d: genArcPath(),
                cursor: other ? 'auto' : 'pointer',
                fill: _this.colors(label),
                opacity: other ? 0.4 : 1
            };
        });
    };
    PieGridSeries.prototype.loadAnimation = function () {
        var layout = d3_1.default.pie()
            .value(function (d) { return d.data.value; }).sort(null);
        var data = layout(this.data);
        var node = d3_1.default.select(this.element).selectAll('.arc1').data([{
                startAngle: data[0].startAngle,
                endAngle: data[0].endAngle
            }]);
        var arc = this.calculateArc(this.innerRadius, this.outerRadius);
        node
            .transition()
            .attrTween("d", function (d) {
            this._current = this._current || d;
            var copyOfD = Object.assign({}, d);
            copyOfD.endAngle = copyOfD.startAngle;
            var interpolate = d3_1.default.interpolate(copyOfD, copyOfD);
            this._current = interpolate(0);
            return function (t) {
                return arc(interpolate(t));
            };
        })
            .transition().duration(750)
            .attrTween("d", function (d) {
            this._current = this._current || d;
            var interpolate = d3_1.default.interpolate(this._current, d);
            this._current = interpolate(0);
            return function (t) {
                return arc(interpolate(t));
            };
        });
    };
    PieGridSeries.prototype.calculateArc = function (innerRadius, outerRadius) {
        return d3_1.default.arc()
            .innerRadius(innerRadius).outerRadius(outerRadius);
    };
    PieGridSeries.prototype.click = function (data) {
        this.clickHandler.emit({
            name: this.data[0].data.name,
            value: this.data[0].data.value
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieGridSeries.prototype, "colors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieGridSeries.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieGridSeries.prototype, "innerRadius", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieGridSeries.prototype, "outerRadius", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PieGridSeries.prototype, "clickHandler", void 0);
    PieGridSeries = __decorate([
        core_1.Component({
            selector: 'g[pieGridSeries]',
            template: "\n    <svg:g class=\"pie-grid-arcs\">\n      <svg:path *ngFor=\"let arc of arcs\"\n        [attr.class]=\"arc.class\"\n        [attr.d]=\"arc.d\"\n        [style.cursor]=\"arc.cursor\"\n        [style.opacity]=\"arc.opacity\"\n        [attr.fill]=\"arc.fill\"\n        (click)=\"click(arc.data)\"\n      />\n    </svg:g>\n  "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], PieGridSeries);
    return PieGridSeries;
}());
exports.PieGridSeries = PieGridSeries;
//# sourceMappingURL=pie-grid-series.component.js.map