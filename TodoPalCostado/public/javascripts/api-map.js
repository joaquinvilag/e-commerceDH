function iniciarMap(){
    var coord = { lat: -34.620969, lng: -58.382499};
    var map = new google.maps.Map(document.getElementById('map'),{
        zoom: 14,
        center: coord
    });
    var marker = new google.maps.Marker({
        position: coord,
        map: map
    })
}