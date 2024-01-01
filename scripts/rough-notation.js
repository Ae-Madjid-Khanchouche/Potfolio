        //        import { annotate } from 'rough-notation';
        // Or using unpkg
        import { annotate } from 'https://unpkg.com/rough-notation?module';
        setTimeout(() => {
            const listItems = document.querySelectorAll('li');
            listItems.forEach(function (item) {
                // Create an annotation for each item
                const annotation = RoughNotation.annotate(item, { type: 'strike-through', color: '#222' , top: "12"});

                setInterval(() => {
                    if(!item.classList.contains("strike")){
                        annotation.show();
                    }else{
                        annotation.hide()
                    }
                }, 1000);
        // Show the annotation
    });
}, 2000);