/*
 * @description: Price range library, base on Bootstrap 3x and jQuery 2x
 * @author: Thanh Dao
 * @version: 0.1
 * @date: 2016-07-22;
 */
if ("undefined" == typeof jQuery)
	throw new Error("BsPriceRange requires jQuery");
!function ($) {

	var BsPriceRange = function (element, options) {

		this.appendData(options);

		return this;
	};

	$.fn.bsPriceRange = function (options) {
		var el = $(this);
		el.data('loading', new BsPriceRange(el, options));

		return el.data('loading');
	}
}(jQuery);