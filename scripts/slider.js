document.addEventListener('DOMContentLoaded', function () {
    var sliders = document.querySelectorAll('.slider-range');

    for (var i = 0; i < sliders.length; i++) {
        var slider = sliders[i];
        slider.style.display = 'none';
        var range = document.createElement("div");
        slider.parentNode.insertBefore(range, slider.nextSibling);

        var customMin = 10
        var customMax = 1000000
        var customStep = 10
        var customStartMin = 20
        var customStartMax = 200
        var startValue = [customStartMin, customStartMax];

        var sliderRange = {
            'min': customMin,
            'max': customMax
        };

        var tooltipFormat;
        if (i === 5) { // Custom format for the 6th slider
            tooltipFormat = {
                to: function (value) {
                    let hours = Math.floor(value / 3600);
                    let minutes = Math.floor((value % 3600) / 60);
                    hours = String(hours).padStart(2, '0');
                    minutes = String(minutes).padStart(2, '0');
                    return `${hours}:${minutes}`;
                }
            };
        } else { // Default format for other sliders
            tooltipFormat = {
                to: function (value) {
                    return formatNumber(value);
                }
            };
        }

        noUiSlider.create(range, {
            connect: true,
            start: startValue,
            tooltips: [tooltipFormat, tooltipFormat],
            step: customStep,
            range: sliderRange
            // ,
            // pips: {
            //     mode: 'steps',
            //     density: 3,
                
            // }
        });

        range.noUiSlider.on('update', function (values, handle) {
            var formattedValues = values.map(val => formatNumber(parseFloat(val), i));
            this.target.previousElementSibling.value = formattedValues.join(' ~ ');
        });
    }
});

function formatNumber(num, i) {
       // Apply specific logic for the 6th slider
       if (i === 3) { // Adjusting for zero-based index
        return num.toFixed(0); // or any other specific formatting
    } else {
        // Apply general formatting for other sliders
        if (num >= 1000000000) {
            //return Math.round(num / 1000000000) + 'b';
            return (num / 1000000000).toFixed(2) + 'b';
        } else if (num >= 1000000) {
            return (num / 1000000).toFixed(2) + 'm';
        } else if (num >= 1000) {
            return Math.round(num / 1000) + 'k';
        } else {
            return num.toFixed(0);
        }
    }

}
