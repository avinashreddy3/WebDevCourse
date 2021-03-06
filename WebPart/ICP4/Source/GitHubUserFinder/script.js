    function getGithubInfo(user) {
    // created two variables to get user_info
    var username = user;
    var requri = 'https://api.github.com/users/' + username;
    var repouri = 'https://api.github.com/users/' + username + '/repos';
    $.ajax({
        type: "GET",
        url: requri,
        dataType: "html",
        success: function (data) {
            // Run the code here that needs to access the data returned
            console.log(data);
            showUser(JSON.parse(data), repouri);
        },
        error: function () {
            noSuchUser(username);
        }
    });
}

// dispalying user info
function showUser(user, repouri) {
    // debugger;
    var fullname = user.name;
    var id = user.id;
    var username = user.login;
    var aviurl = user.avatar_url;
    var profileurl = user.html_url;
    var followersnum = user.followers;
    var followingnum = user.following;
    var reposnum = user.public_repos;

    if (fullname == undefined) { fullname = username; }
// displaying user's profile details
    var outhtml = '<h2>' + fullname + ' <span class="smallname">(@<a href="' + profileurl + '" target="_blank">' + username + '</a>)</span></h2>';
    outhtml = outhtml + '<p class="idname"> ID: ' + id +'</p>';
    outhtml = outhtml + '<div class="ghcontent"><div class="avi"><a href="' + profileurl + '" target="_blank"><img src="' + aviurl + '" width="80" height="80" alt="' + username + '"></a></div>';
    outhtml = outhtml + '<p>Followers: ' + followersnum + ' <br>Following: ' + followingnum + '<br>Repos: ' + reposnum + '<br></p></div>';
    outhtml = outhtml + '<div class="repolist clearfix">';
    outhtml = outhtml + '<p class="idname"> <strong>GithubUrl: </strong>' + profileurl + '</p>';

    // using json file to get output page content
    var repositories;
    $.getJSON(repouri, function (json) {
        repositories = json;
        outputPageContent();
    });
    function outputPageContent() {
        if (repositories.length == 0) { outhtml = outhtml + '<p>No repos!</p></div>'; }
        else {
            outhtml = outhtml + '<p><strong>Repos List:</strong></p> <ul>';
            $.each(repositories, function (index) {
                outhtml = outhtml + '<li><a href="' + repositories[index].html_url + '" target="_blank">' + repositories[index].name + '</a></li>';
            });
            outhtml = outhtml + '</ul></div>';
        }

        $('#profile').html(outhtml);
    }
    //set the contents of the h2 and the two div elements in the div '#profile' with the user content
}

function noSuchUser(username) {
    alert('No Username Found');
    //set the elements such that a suitable message is displayed
}

$(document).ready(function () {
    $(document).on('keypress', '#username', function (e) {
        //check if the enter(i.e return) key is pressed
        if (e.which == 13) {
            //get what the user enters
            username = $(this).val();
            //reset the text typed in the input
            $(this).val("");
            //get the user's information and store the respsonse
            getGithubInfo(username);
        }
    })
});
