let nxt_done = false, prev_done = false, running = false

//to let the execution pause for milli seconds passed as argument
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//Carousel
//to change the slide of the carousel
function changefocus() {
    var path = document.getElementById('s2').src
    document.getElementById('s2').src = document.getElementById('s3').src
    document.getElementById('s3').src = document.getElementById('s1').src
    document.getElementById('s1').src = path
}

//to co-ordinate the user press and slide change
async function time_it() {
    if (prev_done == false && nxt_done == false) {
        running = true
        changefocus()
    }
    await sleep(3500)
    running = false
}

setInterval(time_it, 3500)

//to move the carousel to previous slide
async function prevslide() {
    prev_done = true
    var path = document.getElementById('s2').src
    document.getElementById('s2').src = document.getElementById('s1').src
    document.getElementById('s1').src = document.getElementById('s3').src
    document.getElementById('s3').src = path
    await sleep(4000)
    prev_done = false
}

//to move the carousel to next slide
async function nextslide() {
    if (running == false) {
        nxt_done = true
        var path = document.getElementById('s2').src
        document.getElementById('s2').src = document.getElementById('s3').src
        document.getElementById('s3').src = document.getElementById('s1').src
        document.getElementById('s1').src = path
        await sleep(4000)
        nxt_done = false
    }
}

//Testimonial
let i = 1
let test_running = false, test_prev = false, test_next = false

//Testimonial auto slider
function testimonialslider() {
    if (test_prev == false && test_next == false) {
        test_running = true
        let prof1_src = document.querySelector('#prof1 img').src
        let feed_back = document.querySelector('#prof1 p').innerText
        let name = document.querySelector('#prof1 span').textContent
        for (i = 2; i < 7; i++) {
            document.querySelector(('#prof'.concat((i - 1).toString())).concat(' img')).src = document.querySelector(('#prof'.concat((i.toString())).concat(' img'))).src
            document.querySelector(('#prof'.concat((i - 1).toString())).concat(' p')).innerText = document.querySelector(('#prof'.concat(i.toString())).concat(' p')).innerText
            document.querySelector(('#prof'.concat((i - 1).toString())).concat(' span')).textContent = document.querySelector(('#prof'.concat(i.toString())).concat(' span')).textContent
        }
        document.querySelector('#prof6 img').src = prof1_src
        document.querySelector('#prof6 p').innerText = feed_back
        document.querySelector('#prof6 span').textContent = name
    }
    test_running = false
}

// Call the testimonialslider for every 3500 milli-seconds
setInterval(testimonialslider, 3500)

//To move to the previous testimonial
async function prevTestimonial() {
    // let img_src_prev, feed_back_prev, name_prev, img_src_next, feed_back_next, name_next
    test_prev = true
    let img_src_prev = document.querySelector('#prof6 img').src
    let feed_back_prev = document.querySelector('#prof6 p').innerText
    let name_prev = document.querySelector('#prof6 span').textContent
    for (let i = 1; i < 7; i++) {
        console.log(document.querySelector(('#prof'.concat(i.toString())).concat(' img')).src)
        let img_src_next = document.querySelector(('#prof'.concat((i.toString())).concat(' img'))).src
        let feed_back_next = document.querySelector(('#prof'.concat(i.toString())).concat(' p')).innerText
        let name_next = document.querySelector(('#prof'.concat(i.toString())).concat(' span')).textContent
        document.querySelector(('#prof'.concat(i.toString())).concat(' img')).src = img_src_prev
        document.querySelector(('#prof'.concat(i.toString())).concat(' p')).innerText = feed_back_prev
        document.querySelector(('#prof'.concat(i.toString())).concat(' span')).textContent = name_prev
        img_src_prev = img_src_next
        feed_back_prev = feed_back_next
        name_prev = name_next
    }
    await sleep(3500)
    test_prev = false
}

//To move to the next Testimonial
async function nextTestimonial() {
    testimonialslider()
    test_next = true
    await sleep(2000)
    test_next = false
}

let isopen = false

function hamOpen() {
    if (isopen == false) {
        isopen = true
        document.getElementById('prev').style.position.top = document.body.scrollHeight
        document.getElementById('next').style.top = document.body.scrollHeight
        document.querySelector('#nav-con1').style.flexDirection = "colomn";
        let links = document.querySelectorAll(".nav-content1 a")
        for (i = 0; i < links.length; i++) {
            links[i].style.display = "inline-block"
            links[i].style.fontSize = "16px"
        }
        let con = document.getElementById('nav-con1')
        con.style.flexDirection = "column"
        document.querySelector('.nav-bar1').style.height = "600px";
        document.getElementById('explore').style.display = "none"
    } else {
        let links = document.querySelectorAll(".nav-content1 a")
        for (i = 0; i < links.length; i++)
            links[i].style.display = "none"
        document.querySelector('.nav-bar1').style.height = "50px";
        document.getElementById('explore').style.display = "inline-block"
        document.querySelector('#nav-con1').style.flexDirection = "row";
        isopen = false
    }
}

function combobox(inp) {
    window.location = '/combobox/' + inp;
}

function search() {
    if (event.key == 'Enter')
        window.location = '/detail/' + document.getElementById('Search-box').value
}

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) {
            return false;
        }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    window.location = '/detail/' + inp.value
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
                let lf = document.querySelector('#Search-box').getBoundingClientRect().left;
                let w = document.getElementById('Search-box').offsetWidth
                document.getElementById('Search-boxautocomplete-list').style.position = 'absolute'
                document.getElementById('Search-boxautocomplete-list').style.width = (w - 20).toString() + 'px';
                document.getElementById('Search-boxautocomplete-list').style.left = (lf + 10).toString() + 'px';
                console.log(lf)
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

var products = ["orange", "carrot", "beetroot", "capsicum", "honey", "milk", "cauliflower"]
autocomplete(document.getElementById("Search-box"), products);