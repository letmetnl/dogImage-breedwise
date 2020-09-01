var breedImage = $("#breed-image");
var dropdownlist=$('#dog-breeds');
var breed;
var allowsubmit=true;

// get the dropdown list of breeds using api
$.get('https://dog.ceo/api/breeds/list/all', function(data){
    let breedslist=data.message;
    for (let breed in breedslist) {
        dropdownlist.append('<option value="' + breed + '">' +breed+ '</option>');
    }
})
// setting allowsubmit true on changing the breed
dropdownlist.change(function(){
    allowsubmit=true;
});

// handling the click event on form submit button i.e get-image
$("form button").click(function (e) {
    e.preventDefault();

    // if submission allowed store the breed value in var and set allowsubmit false and call displayImage function
    if (allowsubmit) {
        breed = dropdownlist.val();
        displayImage(breed);
        allowSubmit = false;
    }

});
// handling click on next
$("#next a").click(function (e) {
    e.preventDefault();
    if (breed !== undefined) {
        displayImage(breed);
    }
});

// function to display image randomly from selected breed
function displayImage(breed){
    let apiUrl="https://dog.ceo/api/breed/"+ breed +"/images/random";
    $('#breed-image img').remove();
    $.get(apiUrl, function(data){
        let imgUrl=data.message;
        breedImage.append('<img src="'+ imgUrl +'" alt="'+ breed +'">');
    })
}