// Create a listener on the thumbs up button clicks
const thumbsUp = document.querySelectorAll(".like");
for (let i of thumbsUp) {
    i.addEventListener("click", (e) => {
        submitRating(e, "like")
    });
}

// Create a listener on the thumbs down button clicks
const thumbsDwn = document.querySelectorAll(".dislike");
for (let j of thumbsDwn) {
    j.addEventListener("click", (e) => {
        submitRating(e, "dislike")
    });
}

// Create a listener on the Feedback form button
const feedbackForm = document.querySelectorAll(".feedback");
for (let k of feedbackForm) {
    k.addEventListener("click", (e) => {
        formRedirect(e)
    });
}

// Function that allows me to get the closest header
function findInnerTextOfClosestSibling(element, target) {
    var previousElement = element.previousElementSibling;
    while (previousElement !== null) {

        if (previousElement.matches(target)) {
            return previousElement.innerHTML.replace(/(<([^>]+)>)/ig, '');
        }
        previousElement = previousElement.previousElementSibling;
    }
}

// Redirect to the google form
function formRedirect(e) {

    // Find the parent id for the button and then find the parent div. 
    // Once you know the parent div you can figure out the closest header above that div.
    var maindiv = e.target.parentNode.id;
    var el = document.getElementById(maindiv);
    var feedbackSection = findInnerTextOfClosestSibling(el.closest("div"), "h2");
    var feedbackReferralURL = window.location.href;
    var feedbackRating = "No";

    // Dynamically generate the form URL parameter
    formURL = "https://docs.google.com/forms/d/e/1FAIpQLSextcRu7yBtJ1PUm9951c3GeKC4O6qfyIw4tYmFVSbQ2F4hEw/viewform?usp=pp_url&entry.860870825=" + feedbackReferralURL + "&entry.626151355=" + feedbackRating + "&entry.1212053133=" + feedbackSection
    window.location.href = formURL
}

// Submit the thumbs rating to the google form
function submitRating(e, status) {

    // Find the parent id for the button and then find the parent div. 
    // Once you know the parent div you can figure out the closest header above that div.
    var maindiv = e.target.parentNode.id;
    var el = document.getElementById(maindiv);
    var feedbackSection = findInnerTextOfClosestSibling(el.closest("div"), "h2");
    var feedbackReferralURL = window.location.href;

    // Creating the XMLHttpRequest object
    var request = new XMLHttpRequest();
    var maindiv = e.target.parentNode.id;

    if (status === "like") {
        var feedbackRating = "Yes"
        e.target.classList.replace("like", "like-active");
        var dislikeParentNode = "#" + maindiv + " .dislike-active";
        var dislikeNode = document.querySelector(dislikeParentNode)
        if (dislikeNode) {
            dislikeNode.className = "dislike";
        }

    } else {
        var feedbackRating = "No"
        e.target.classList.replace("dislike", "dislike-active");
        var likeParentNode = "#" + maindiv + " .like-active";
        var likeNode = document.querySelector(likeParentNode);
        if (likeNode) {
            likeNode.className = "like";
        }

    }
    // Dynamically generate the form URL parameter
    var formURL = "https://docs.google.com/forms/d/e/1FAIpQLSextcRu7yBtJ1PUm9951c3GeKC4O6qfyIw4tYmFVSbQ2F4hEw/formResponse?usp=pp_url&entry.860870825=" + feedbackReferralURL + "&entry.626151355=" + feedbackRating + "&entry.1212053133=" + feedbackSection + "&submit=Submit"
        // Instantiating the request object
    request.open(
        "GET",
        formURL
    );

    // Defining event listener for readystatechange event
    request.onreadystatechange = function() {
        // Check if the request is compete and was successful
        if (this.readyState === 4 && this.status === 200) {}
    };
    // Sending the request to the server
    request.send();
}