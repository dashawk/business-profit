;(function () {
	'use strict';
	
	angular
		.module('business-profit', [])
		.service('profit', function () {
			var service = this;
			
			service.getSellPrice = getSellPrice;
			service.getGrossProfit = getGrossProfit;
			service.getInclusive = getInclusive;
			service.getPriceWithQuantity = getPriceWithQuantity;
			service.getPriceWithPercent = getPriceWithPercent;
			
			return service;
			
			function getGrossProfit(sellPrice, buyPrice) {
				return (1 - (_n(buyPrice) / _n(sellPrice))) * 100;
			}
			function getSellPrice(buyPrice, grossProfit) {
				return _n(buyPrice) / ((100 - _n(grossProfit)) / 100);
			}
			function getInclusive(price, percentage) {
				return _n(price) * _rate(percentage);
			}
			function getPriceWithQuantity(price, quantity) {
				return _n(price) * _n(quantity);
			}
			function getPriceWithPercent(buyPrice, percentage) {
				return _n(buyPrice) + (_n(buyPrice) * _n(percentage) / 100);
			}
			
			/**
			 * Converts string types to numeric types
			 * @param data
			 * @returns {number}
			 * @private
			 */
			function _n(data) {
				return +data;
			}
			
			/**
			 * Convert Percentage to Tax Rate
			 * @param percentage
			 * @returns {number}
			 * @private
			 */
			function _rate(percentage) {
				var rate = 1;
				if (angular.isString(percentage)) {
					if (/%/g.test(percentage)) {
						rate = _n(percentage.remove(/%/g, ''));
					}
				}
				
				return (1 + (rate / 100))
			}
		});
}());
