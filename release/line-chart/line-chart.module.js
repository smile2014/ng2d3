"use strict";
var core_1 = require("@angular/core");
var common_module_1 = require("../common/common.module");
var line_component_1 = require("./line.component");
var line_chart_component_1 = require("./line-chart.component");
var line_series_component_1 = require("./line-series.component");
var LineChartModule = (function () {
    function LineChartModule() {
    }
    LineChartModule = __decorate([
        core_1.NgModule({
            imports: [common_module_1.CommonModule],
            declarations: [
                line_component_1.Line,
                line_chart_component_1.LineChart,
                line_series_component_1.LineSeries
            ],
            exports: [
                line_component_1.Line,
                line_chart_component_1.LineChart,
                line_series_component_1.LineSeries
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], LineChartModule);
    return LineChartModule;
}());
exports.LineChartModule = LineChartModule;
//# sourceMappingURL=line-chart.module.js.map