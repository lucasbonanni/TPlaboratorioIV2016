'use strict';

angular
    .module('tplaboratorioIv2016App')
    .directive('chartDirective', function () {

        var functionLink = function (scope, element, attrs) {


            this.data = scope.data;
            this.chartType = scope.chartType;

            this.events = scope.events() || {};
            this.options = scope.chartOptions() || null;
            this.responsiveOptions = scope.responsiveOptions() || null;

            this.element = element[0];



            this.bindEvents = function () {
                Object.keys(this.events).forEach((eventName) => {
                    this.chart.on(eventName, this.events[eventName]);
                });
            }

            this.unbindEvents = function (events) {
                Object.keys(events).forEach((eventName) => {
                    this.chart.off(eventName, events[eventName]);
                });
            }


            this.renderChart = function () {
                // ensure that the chart does not get created without data
                if (this.data) {
                    this.chart = Chartist[this.chartType](this.element, this.data, this.options, this.responsiveOptions);

                    this.bindEvents();

                    return this.chart;
                }
            }


            this.renderChart();

            this.update = function (newConfig, oldConfig) {
                // Update controller with new configuration
                this.chartType = newConfig.chartType;
                this.data = newConfig.data;
                this.options = newConfig.chartOptions;
                this.responsiveOptions = newConfig.responsiveOptions;
                this.events = newConfig.events;

                // If chart type changed we need to recreate whole chart, otherwise we can update
                if (!this.chart || newConfig.chartType !== oldConfig.chartType) {
                    this.renderChart();
                } else {
                    if (!angular.equals(newConfig.events, oldConfig.events)) {
                        this.unbindEvents(oldConfig.events);
                        this.bindEvents();
                    }
                    this.chart.update(this.data, this.options);
                }
            }



            scope.$watch(() => {
                return {
                    data: scope.data,
                    chartType: scope.chartType,
                    chartOptions: scope.chartOptions(),
                    responsiveOptions: scope.responsiveOptions(),
                    events: scope.events()
                };
            }, this.update.bind(this), true);

            scope.$on('$destroy', () => {
                if (this.chart) {
                    this.chart.detach();
                }
            });


        }

        return {
            restrict: 'EA',
            link: functionLink,
            scope: {
                // mandatory
                data: '=chartistData',
                chartType: '@chartistChartType',
                // optional
                events: '&chartistEvents',
                chartOptions: '&chartistChartOptions',
                responsiveOptions: '&chartistResponsiveOptions'
            }
        };

    })
