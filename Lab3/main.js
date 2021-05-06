var paused = false
var tweetList = []
var filteredList = []
const tweetID = new Set()
var query = "weather"
var tweetContainer
var searchBar
var data

function getID(){
    tweetContainer = document.getElementById('tweets')
    searchBar = document.getElementById('searchBox')
}

async function start(){
    try{
        const response = await fetch("http://ec2-54-219-224-129.us-west-1.compute.amazonaws.com:2000/feed/random?q=" + query)
        data = await response.json()
        createTweets(data)
    } catch (e) {
        console.log("Error fetching tweets!")
    }
}

start()

window.setInterval(refreshTweets, 5000)

function createTweets(tweetData){
    let i = 0

    for(i = 0; i < tweetData.statuses.length; i++){
        if(!tweetID.has(tweetData.statuses[i].id)){
            tweetList.push(tweetData.statuses[i])
            tweetID.add(tweetData.statuses[i].id)
        }
    }
    tweetList.sort(function(a,b){
        return a.created_at.localeCompare(b.created_at);
    })
    if(searchBar.value != ""){
        filteredList = []
        for(i = 0; i < tweetList.length; i++){
            var text = tweetList[i].text.toLowerCase()
            if(text.includes(searchBar.value.toLowerCase())){
                filteredList.push(tweetList[i])
            }
        }
        updateTweets(filteredList)
    }
    else{
        updateTweets(tweetList);
    }
}

function updateTweets(tweets){
    while(tweetContainer.firstChild){
        tweetContainer.removeChild(tweetContainer.firstChild);
    }

    const uList = document.createElement("ul")
    tweetContainer.appendChild(uList)

    tweets.forEach(tweetObject => {
        const tweet = document.createElement("li")

        const tweetContentName = document.createElement("div")
        var tweetContentPicture = document.createElement("img")
        tweetContentPicture.src = tweetObject.user.profile_image_url_https
        const tweetContentDate = document.createElement("div")
        const tweetContentText = document.createElement("div")

        const tweetName = document.createTextNode("Name: " + tweetObject.user.name)
        date = new Date(tweetObject.created_at);
        const tweetDate = document.createTextNode(date)
        const tweetText = document.createTextNode(tweetObject.text)

        tweetContentName.appendChild(tweetName)
        tweetContentDate.appendChild(tweetDate)
        tweetContentText.appendChild(tweetText)

        tweet.appendChild(tweetContentName)
        tweet.appendChild(tweetContentPicture)
        tweet.appendChild(tweetContentDate)
        tweet.appendChild(tweetContentText)
        uList.appendChild(tweet)
    });
}

function togglePause(){
    if(paused){
        paused = false;
    }
    else{
        paused = true;
    }
}

function refreshTweets(){
    if(!paused){
        start()
    }
}





