function fetchGitHubInformation(event) {
    let username = $("#gh-username").val();

    if(!username) {
        $("#gh-user-data").html(`<h2>Please enter a Github Username</h2>`);
        //don't check api and leave function if no username
        return;
    }

    // animated loader
    $("#gh-user-data").html(
        `<div id="loader">
            <img src="assets/css/loader.gif" alt="animated loading indicator" />
        </div>`
    );

    $.when(
        $.getJSON(`https://api.github.com/users/${username}`)
    ).then(
        function(reponse){
            let userData = response;
            //send userData into userInformationHTML function
            $("gh-user-data").html(userInformationHTML(userData));
        }, function(errorResponse){
            if(errorResponse.status === 404){
                $("gh-user-data").html(
                    `<h2>No info found for user ${username}</h2>`
                );
            } else {
                console.log(errorResponse);
                $("gh-user-data").html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`
                );
            }
        }
    );
}