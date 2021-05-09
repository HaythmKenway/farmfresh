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
    }
    else {
        let links = document.querySelectorAll(".nav-content1 a")
        for (i = 0; i < links.length; i++)
            links[i].style.display = "none"
        document.querySelector('.nav-bar1').style.height = "50px";
        document.getElementById('explore').style.display = "inline-block"
        document.querySelector('#nav-con1').style.flexDirection = "row";
        isopen = false
    }
}
