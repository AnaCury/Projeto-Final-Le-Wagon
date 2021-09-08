// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")
require("plugins")
// = require main


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)


// External imports
import "bootstrap";
import { initMapbox } from '../plugins/init_mapbox';
import { initReportsCable } from '../channels/reports_channel';
import { initReviewsCable } from '../channels/reviews_channel';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder';
import { initAutocomplete } from '../plugins/init_autocomplete';
import { loader } from '../plugins/loader'

// Internal imports, e.g:
// import { initSelect2 } from '../components/init_select2';

document.addEventListener('turbolinks:load', () => {
  // Call your functions here, e.g:
  // initSelect2();
  initMapbox();
  initAutocomplete();
  initReportsCable();
  initReviewsCable();
});
