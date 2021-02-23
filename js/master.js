
/*--------------------Start Nav Bar --------------------*/
let thenavbar1Links = document.querySelectorAll(".navbar1 .links li");
let thenavbar2Links = document.querySelectorAll(".navbar2 .links li");

//Scroll Into Views When I Click On their Button
thenavbar1Links.forEach(link => {
    link.addEventListener("click", (e) => {
        thenavbar2Links.forEach(element => {
            element.classList.remove("active");
        })
        document.querySelector(`${e.target.dataset.view}`).scrollIntoView({behavior: "smooth"});

        thenavbar2Links.forEach(element => {
            if (e.target.dataset.view === element.dataset.view) {
                element.classList.add("active");
            }
        })
    })
})
//When I hover on navbar2 bullets
thenavbar2Links.forEach(element => {
    element.onmouseenter = () => {
        document.querySelector(".navbar1 ul").classList.add("active");
    }
})
//When I hover on navbar1 bullets
document.querySelector(".navbar1 ul").onmouseleave = () => {
    document.querySelector(".navbar1 ul").classList.remove("active");
}
/*--------------------End Nav Bar --------------------*/

/*--------------------Start Clicked On Bullets --------------------*/
//Select The Span In The Bullets
let myBullets = document.querySelectorAll(".our-portfolio .bullets span");
let myPhotos = document.querySelectorAll(".our-portfolio .portfolio .photo");;

myBullets.forEach(span => {
    
    span.addEventListener("click", (e) => {
        //Remove Active Class From All Span
        myBullets.forEach(span => {
            span.classList.remove("active");
        })

        myPhotos.forEach(photo => {
            photo.style.transform = e.target.dataset.translate;
            photo.style.transition = "all 800ms ease 0s";
        });

        //Add Active Class To The Span I Clicked
        span.classList.add("active");

        //Stop Translate image If I clicked On any span
        clearInterval(myInterVal);
    });
    
})
/*--------------------End Clicked On Bullets---------------------*/

let myInterVal;

function rondamizeImg(x) {
        myBullets.forEach(span => {
            span.classList.remove("active");
            document.querySelector(".our-portfolio .bullets .span1").classList.add("active");
        });

    myInterVal = setInterval(() => {
        x = x + 400;

        if (x === 2400) {
            clearInterval(myInterVal);
            myPhotos.forEach(photo => {
                photo.style.transform = `translateX(0)`;
            })
            rondamizeImg(0);
        } else {
            myPhotos.forEach(photo => {
                photo.style.transform = `translateX(-${x}px)`;
                photo.style.transition = `all 800ms ease 0s`;
            })
        }
        if (x > 800 && x < 1600) {
            myBullets.forEach(span => {
                span.classList.remove("active");
            })
            document.querySelector(".our-portfolio .bullets .span2").classList.add("active");
        }
        if (x > 1600 && x < 2400) {
            myBullets.forEach(span => {
                span.classList.remove("active");
            })
            document.querySelector(".our-portfolio .bullets .span3").classList.add("active");
        }

    }, 5000);
}
rondamizeImg(0);



/*Create Popup and images when I click on img*/

let myImages = document.querySelectorAll(".portfolio .photo img");
let ourPortfolio = document.querySelector(".our-portfolio");
let myBigImages = Array.from(myImages);
let currentNumber = 1;
myImages.forEach(img => {

    img.addEventListener("click", (e) => {
        //Set the number of photo i clicked on the currentnumber
        currentNumber = parseInt(img.dataset.number);

        //Create Popup
        let myPopup = document.createElement("div");
        myPopup.className = "my-popup";
        document.body.appendChild(myPopup);

        //Create Image Load
        let loadDiv = document.createElement("div");
        loadDiv.className = "load-div";
        let loadImage = document.createElement("img");
        loadImage.className = "load";
        loadImage.src = myBigImages[0].dataset.load;
        loadDiv.appendChild(loadImage);
        ourPortfolio.appendChild(loadDiv);

        setTimeout(() => {
            document.querySelector(".load-div").remove();
        }, 500)

        //Create Big Image one
        let imageDiv = document.createElement("div");
        imageDiv.className = "img-div";
        let myImage = document.createElement("img");
        myImage.className = "imges";
        myImage.src = img.dataset.src;
        imageDiv.appendChild(myImage);

        //create prev button
        let prevButton = document.createElement("div");
        prevButton.className = "prev-button";
        imageDiv.appendChild(prevButton);

        //create next button
        let nextButton = document.createElement("div");
        nextButton.className = "next-button";
        imageDiv.appendChild(nextButton);
        
        //Create X Button
        let xBtn = document.createElement("div");
        xBtn.className = "x-button";
        imageDiv.appendChild(xBtn);

        //Create text on the bottom of image
        let imageHead = document.createElement("div");
        imageHead.className = "image-head";
        let imageHeadText = document.createTextNode(e.target.alt);
        imageHead.appendChild(imageHeadText);
        imageDiv.appendChild(imageHead);

        ourPortfolio.appendChild(imageDiv);

        //set 0 Opacity and no-clicking class on prev Button when i clicked on the first photo
        if (img.dataset.src === "imgs/1.jpg") {
            document.querySelector(".prev-button").style.opacity = "0";
            document.querySelector(".prev-button").classList.add("no-clicking");
        //set 0 Opacity and no-clicking class on next Button when i clicked on the last photo
        } else if (img.dataset.src === "imgs/8.jpg") {
            document.querySelector(".next-button").style.opacity = "0";
            document.querySelector(".next-button").classList.add("no-clicking");
        }
    })
})

//When I Click On X Button
document.documentElement.addEventListener("click", (e) => {
    if (e.target.className === "x-button") {
        e.target.parentElement.remove();
        e.target.style.animation = "animation: opacity 0.5s ease 0.5s;";
        document.querySelector(".my-popup").remove();
        
    }
});

//When I click on next button and prev Button
document.documentElement.addEventListener("click", (e) => {

    if (e.target.className === "next-button") {
        currentNumber++;
        if (currentNumber > 1) {
            document.querySelector(".prev-button").style.opacity = "1";
            document.querySelector(".prev-button").classList.remove("no-clicking");
        }
        document.querySelector(".imges").src = myBigImages[currentNumber - 1].dataset.src;
        if (currentNumber === myBigImages.length) {
            document.querySelector(".next-button").style.opacity = "0";
            document.querySelector(".next-button").classList.add("no-clicking");
        }
    }

    if (e.target.className === "prev-button") {
        currentNumber--;
        if (currentNumber < myBigImages.length) {
            document.querySelector(".next-button").style.opacity = "1";
            document.querySelector(".next-button").classList.remove("no-clicking");
        }
        document.querySelector(".imges").src = myBigImages[currentNumber - 1].dataset.src;
        if (currentNumber === 1) {
            document.querySelector(".prev-button").style.opacity = "0";
            document.querySelector(".prev-button").classList.add("no-clicking");
        }
    }
});

/*-------------------Start Our Story---------------------*/
let mySlides = document.querySelectorAll(".our-story .all-story div");
let mySlidesArray = Array.from(mySlides);
let mySpans = document.querySelectorAll(".our-story .years span");
let i;

mySpans.forEach(span => {
    span.addEventListener("click", (e) => {
        //Remove Active class From All Spans
        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active");
        });
        //Remove Active class From All Slides
        mySlides.forEach(slide => {
            slide.classList.remove("active");
        })
        //Set Active Class On Side their Data-Index Assign I
        for (let i = 0; i < mySlidesArray.length; i++) {
            if (span.dataset.index === `${i}`) {
                mySlidesArray[i].classList.add("active");
            }
        }
        //Set Active Class On Span I Clicked on
        e.target.classList.add("active");
    })
})
/*-------------------End Our Story----------------------*/

/*-------------------Start Contact Us-------------------*/
let myInputs = document.querySelectorAll(".our-contact .form .field");
let myButton = document.getElementById("btn");
let myForm = document.querySelector(".our-contact .form");

myButton.onclick = () => {
    myInputs.forEach(input => {
        if (input.value === "") {
            myForm.classList.add("active");
            myButton.classList.add("active");
        } else {
            myForm.classList.remove("active");
            myButton.classList.remove("active");
        }
    })
}
/*-------------------End Contact Us---------------------*/

//Back To Top Button
document.querySelector(".our-footer .footer button").onclick = () => {
    document.querySelector(".our-intro").scrollIntoView({behavior: "smooth"});
    thenavbar2Links.forEach(element => {
        element.classList.remove("active");
    })
    document.querySelector(".navbar2 .links li:first-of-type").classList.add("active");
}

//Descover More Button
document.querySelector(".our-intro .intro button").onclick = () => {
    document.querySelector(".aboute-us").scrollIntoView({behavior: "smooth"});
    thenavbar2Links.forEach(element => {
        element.classList.remove("active");
    })
    document.querySelector(".navbar2 .links li:nth-child(2)").classList.add("active");
}

//Learn More Aboute Us Button
document.querySelector(".aboute-us .section1 button").onclick = () => {
    document.querySelector(".our-portfolio").scrollIntoView({behavior: "smooth"});
    thenavbar2Links.forEach(element => {
        element.classList.remove("active");
    })
    document.querySelector(".navbar2 .links li:nth-child(3)").classList.add("active");
}

//Handle Navbar When Window is Scrolling
window.onscroll = () => {
    thenavbar2Links.forEach(element => {
        let theElement = document.querySelector(`${element.dataset.view}`);
        if (window.pageYOffset + 500 > (theElement.offsetTop + theElement.offsetHeight - window.innerHeight)) {
            thenavbar2Links.forEach(element => {
                element.classList.remove("active");
            })
            element.classList.add("active");
        }
    })
}