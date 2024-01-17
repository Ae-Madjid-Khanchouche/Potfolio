        
        import {annotate} from 'https://unpkg.com/rough-notation?module';
        setTimeout(() => {
            const toggleList = document.querySelectorAll('.svgContainer');
            toggleList.forEach(function (item) {
                // Create an annotation for each item
                const annotation = RoughNotation.annotate(item.previousSibling.previousSibling, {
                    type: 'strike-through',
                    color: '#36124d',
                    top: "12"
                });
                item.addEventListener('click', function() {
                    if (!item.classList.contains("strike")) {
                        annotation.show();
                        item.classList.add('strike');
                    } else {
                        annotation.hide()
                        item.classList.remove('strike');
                    }
                })
                // Show the annotation
            });
        }, 2000);