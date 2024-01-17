// $(function () {
//     var sliders = $('.slider-range');

//     for (var i = 0; i < sliders.length; i++) {
//         //if (i === 1) continue; // Skip the second slider

//         var $this = sliders.eq(i);
//         $this.css('display', 'none');
//         $("<div></div>").insertAfter($this);

//         var range = $this.next()[0];
//         var customMin = 10
//         var customMax = 20
//         var customStep = 1
//         var customStartMin = 2
//         var customStartMax = 5

//         var startValue = [customStartMin, customStartMax];

//         var sliderRange = {
//             'min': customMin,
//             'max': customMax
//         };

//         // Tooltip format configuration
//         var tooltipFormat = {
//             to: function (value) {
//                 return formatNumber(value);
//             }
//         };

//         // Initialize the noUiSlider
//         noUiSlider.create(range, {
//             connect: true,
//             start: startValue,
//             tooltips: [tooltipFormat, tooltipFormat],
//             step: customStep,
//             range: sliderRange
//         });

//         // Update event handler
//         range.noUiSlider.on('update', function (values) {
//             $(this.target).prev().val(values.join(' ~ '));
//         });
//     }
// });

// function formatNumber(num, i) {
//     // Apply specific logic for the 6th slider
//     if (i === 5) { // Adjusting for zero-based index
//         return num.toFixed(0); // or any other specific formatting
//     } else {
//         // Apply general formatting for other sliders
//         if (num >= 1000000000) {
//             //return Math.round(num / 1000000000) + 'b';
//             return (num / 1000000000).toFixed(2) + 'b';
//         } else if (num >= 1000000) {
//             return (num / 1000000).toFixed(2) + 'm';
//         } else if (num >= 1000) {
//             return Math.round(num / 1000) + 'k';
//         } else {
//             return num.toFixed(0);
//         }
//     }
// }
var slider = document.getElementById('slider');

noUiSlider.create(slider, {
    start: [20, 80],
    connect: true,
    range: {
        'min': 0,
        'max': 100
    }
});