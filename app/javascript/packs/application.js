// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

// import Rails from "@rails/ujs";
// import Turbolinks from "turbolinks";
// import * as ActiveStorage from "@rails/activestorage";
// import ProfileImage from "src/profile_image_upload";
// import Swipe from "src/swipe";

// import "channels";
import "bootstrap";
import "hammerjs";
import "../stylesheets/application";
import "@fortawesome/fontawesome-free/js/all";

// Rails.start();
// Turbolinks.start();
// ActiveStorage.start();
// ProfileImage.start();
// Swipe.start();

require("@rails/ujs").start();
require("turbolinks").start();
require("@rails/activestorage").start();
require("channels");
require("src/profile_image_upload");
require("src/swipe")
