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

		this.options = {
			minValue: 0,
			maxValue: 100,
			step: 10
		};
		this.priceValue = 0;
		this.element = element;
		this.isMouseDown = false;
		this.isMouseDrag = false;

		this.appendData(options);

		return this.initialize();
	};

	BsPriceRange.prototype = {
		appendData: function (options) {
			if (typeof this.element.attr('data-min') != 'undefined') {
				this.options.minValue = parseInt(this.element.attr('data-min'));
			}

			if (typeof this.element.attr('data-max') != 'undefined') {
				this.options.maxValue = parseInt(this.element.attr('data-max'));
			}

			if (typeof this.element.attr('data-step') != 'undefined') {
				this.options.step = parseInt(this.element.attr('data-step'));
			}

			if (typeof options == 'object') {
				for (var k in options) {
					if (typeof this.options[k] != 'undefined') {
						this.options[k] = options[k];
					}
				}
			}
		},

		initialize: function () {
			var ele = this;
			this.element.addClass('bs-pricerange');
			this.element.append('<div class="bs-range-active"></div>');
			this.element.append('<div class="bs-dragable"></div>');

			this.element.find('.bs-dragable')
			.on('mousedown', function () {
				ele.isMouseDown = true;
			});
			
			$(document).on('mousemove', function (ev) {
				if (ele.isMouseDown) {
					ele.moveDragging(ev);
				}
			});

			$(document).on('mouseup', function() {
				ele.isMouseDown = false;
			});

		},

		moveDragging: function (ev) {
			var objectDrag = {
				parentLeft: this.element.position().left,
				parentRight: this.element.position().left + this.element.outerWidth(),
				width: this.element.find('.bs-dragable').outerWidth(),
			};
			var _left, _center;
			ev = ev || window.event;
			_left = ev.pageX - objectDrag.width - 1;
			_center = _left + objectDrag.width/2;

			if (_center >= 0 && _center <= objectDrag.parentRight - objectDrag.width/2) {
				this.element.find('.bs-dragable').css({
					'left': _left + 'px'
				});

				this.element.find('.bs-range-active').css({
					'width': _center + 'px'
				});

				_center = _center < objectDrag.parentLeft ? objectDrag.parentLeft : _center;
console.log(objectDrag.parentRight+'-'+_center+'-'+_left);
				var _percentage = (_center + (objectDrag.width / 2) - objectDrag.parentLeft) / (objectDrag.parentRight - objectDrag.parentLeft)
				var _rangeSize = this.options.maxValue - this.options.minValue;
				this.priceValue = this.options.minValue + _rangeSize * _percentage;
				this.priceValue = (this.priceValue < this.options.minValue) ? this.options.minValue : this.priceValue;
				this.priceValue = (this.priceValue > this.options.maxValue) ? this.options.maxValue : this.priceValue;
				console.log(_percentage);
			}
		},

		getPrice: function () {
			return this.priceValue;
		}
	};

	$.fn.bsPriceRange = function (options) {
		var el = $(this);
		el.data('loading', new BsPriceRange(el, options));

		return el.data('loading');
	}
}(jQuery);