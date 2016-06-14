// Business Logic
function Contact(first, last){
  this.firstName = first;
  this.lastName = last;
  this.addresses = [];
}

function Address(street, city, state, addressType){
  this.street = street;
  this.city = city;
  this.state = state;
  this.addressType = addressType;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

Address.prototype.fullAddress = function(){
  return this.street + ", " + this.city + ", " + this.state;
}

// User Interface Logic

function resetField() {
  $("input#new-first-name").val("");
  $("input#new-last-name").val("");
  $("select.address-type").val("");
  $("input.new-street").val("");
  $("input.new-city").val("");
  $("input.new-state").val("");
}

function resetAddress(){
  $(".new-address").not(":first-child").remove();
}

$(document).ready(function(){
  $("#add-address").click(function() {
    $("#new-addresses").append('<div class="new-address">' +
                                '<div class="form-group">' +
                                  '<label for="address-type">Type of Address:</label>' +
                                  '<select class="form-control address-type">' +
                                    '<option value="Home">Home</option>' +
                                    '<option value="Work">Work</option>' +
                                  '</select>' +
                                '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-street">Street</label>' +
                                   '<input type="text" class="form-control new-street">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-city">City</label>' +
                                   '<input type="text" class="form-control new-city">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-state">State</label>' +
                                   '<input type="text" class="form-control new-state">' +
                                 '</div>' +
                               '</div>');
  });

  $("form#new-contact").submit(function(event){
    event.preventDefault();

    var inputFirstName = $("input#new-first-name").val();
    var inputLastName = $("input#new-last-name").val();

    var newContact = new Contact(inputFirstName, inputLastName);

    $(".new-address").each(function(){
      var inputType = $(this).find("select.address-type").val();
      var inputStreet = $(this).find("input.new-street").val();
      var inputCity = $(this).find("input.new-city").val();
      var inputState = $(this).find("input.new-state").val();
      var newAddress = new Address(inputStreet, inputCity, inputState, inputType);
      newContact.addresses.push(newAddress);
    });

    $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");

    $(".contact").last().click(function(){
      $("#show-contact").fadeIn();
      $("#show-contact h2").text(newContact.firstName);
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);
      $("p#addresses").text("");
      // $("ul#addresses").append("<li>" + address.addressType + " Address</li>");
      newContact.addresses.forEach(function(address) {
        $("p#addresses").append("<p><strong>" + address.addressType + " Address:</strong></p>");
        $("p#addresses").append("<p>" + address.fullAddress() + "</p>");
      });
    });

    resetField();
    resetAddress();

  });

});
