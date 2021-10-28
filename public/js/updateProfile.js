const updateProfileButton = $("#updateBtn");
const zipcodeInput = $("#zipField");
const uidInput = $("#steamUIDField");

// Check if zipcode is valid
function isZipCodeValid(zipcode) {
  // Validate Canadian zipcodes
  if (zipcode.length === 7 && zipcode.charAt(3) === " ") {
    // Check characters at index 0, 2 and 5 are letters
    if (
      !isNaN(zipcode.charAt(0)) ||
      !isNaN(zipcode.charAt(2)) ||
      !isNaN(zipcode.charAt(5))
    )
      return false;
    // Return false if the other characters are not numbers
    return (
      !isNaN(zipcode.charAt(1)) &&
      !isNaN(zipcode.charAt(4)) &&
      !isNaN(zipcode.charAt(6))
    );
  }
  // Validate US zipcodes
  else if (zipcode.length === 5) {
    return /^\d{5}(-\d{4})?$/.test(zipcode);
  }

  // Invalid zipcode
  return false;
}

// Add onchange listener to zipField id
zipcodeInput.change(() => {
  updateButton();
});

uidInput.change(() => {
  updateButton();
});

const updateButton = () => {
  const newZip = zipcodeInput.val();
  const newUID = uidInput.val();

  // Only enable update button if all inputs are valid
  updateProfileButton.addClass("disabled");
  if (isZipCodeValid(newZip) && !isNaN(newUID) && newUID.length === 17)
    updateProfileButton.removeClass("disabled");
};

updateProfileButton.click(updateProfile);

const updateProfile = () => {
    const newZip = zipcodeInput.val();
    const newUID = uidInput.val();

    // Only enable update button if all inputs are valid
    if(isZipCodeValid(newZip) && !isNaN(newUID) && newUID.length === 17) {
        $.ajax({
            url: "/updateProfile",
            type: "PUT",
            data: {
                zipcode: newZip,
                steamId: newUID
            },
        }).done(function(data) {
            if(data.success) {
                window.location.href = "/profile";
            }
        }).fail(
            function(data) {
                console.error(data);
            }
        )
}

// Just some inline test-driven development. Nothing to see here.
console.assert(isZipCodeValid("H0H 0H0") === true);
console.assert(isZipCodeValid("40H 0H0") === false);
console.assert(isZipCodeValid("80222") === true);
console.assert(isZipCodeValid("832$1") === false);
