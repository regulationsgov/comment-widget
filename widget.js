var RegsgovCommentWidget = (function() {

var baseurl = "http://localhost/";
var apiurl = "https://api.data.gov/TEST/regulations/v3/";
var siteurl = "https://test.regulations.gov/";

// Localize jQuery variable
var jQuery;
var prefix = "regsgov-";
var formDiv; // Div hook for dynamically created form elements
var canProvinces = [];
var usStates = [];
var fedAgencies = [];
var allowedFileExtensions = ["bmp", "doc", "xls", "pdf", "gif", "htm",
"html", "jpg", "jpeg", "png", "ppt", "rtf", "sgml", "tiff", "tif", "txt",
"wpd", "xml", "docx", "xlsx", "pptx"];
var maxFileSizeBytes = 10485760;
var agencyAcronym;
var agencyName;
var docType;
var docTitle;

// Lookup JSONs for Select list values
var countryJson = {"list":[{"default":true,"label":"United States","value":"United States"},{"default":false,"label":"United Kingdom","value":"United Kingdom"},{"default":false,"label":"Canada","value":"Canada"},{"default":false,"label":"Australia","value":"Australia"},{"default":false,"label":"----------","value":"XX"},{"default":false,"label":"Afghanistan","value":"Afghanistan"},{"default":false,"label":"Albania","value":"Albania"},{"default":false,"label":"Algeria","value":"Algeria"},{"default":false,"label":"American Samoa","value":"American Samoa"},{"default":false,"label":"Andorra","value":"Andorra"},{"default":false,"label":"Angola","value":"Angola"},{"default":false,"label":"Anguilla","value":"Anguilla"},{"default":false,"label":"Antarctica","value":"Antarctica"},{"default":false,"label":"Antigua and Barbuda","value":"Antigua and Barbuda"},{"default":false,"label":"Argentina","value":"Argentina"},{"default":false,"label":"Armenia","value":"Armenia"},{"default":false,"label":"Aruba","value":"Aruba"},{"default":false,"label":"Austria","value":"Austria"},{"default":false,"label":"Azerbaijan","value":"Azerbaijan"},{"default":false,"label":"Bahamas","value":"Bahamas"},{"default":false,"label":"Bahrain","value":"Bahrain"},{"default":false,"label":"Bangladesh","value":"Bangladesh"},{"default":false,"label":"Barbados","value":"Barbados"},{"default":false,"label":"Belarus","value":"Belarus"},{"default":false,"label":"Belgium","value":"Belgium"},{"default":false,"label":"Belize","value":"Belize"},{"default":false,"label":"Benin","value":"Benin"},{"default":false,"label":"Bermuda","value":"Bermuda"},{"default":false,"label":"Bhutan","value":"Bhutan"},{"default":false,"label":"Bolivia","value":"Bolivia"},{"default":false,"label":"Bosnia and Herzegovina","value":"Bosnia and Herzegovina"},{"default":false,"label":"Botswana","value":"Botswana"},{"default":false,"label":"Brazil","value":"Brazil"},{"default":false,"label":"British Indian Ocean","value":"British Indian Ocean"},{"default":false,"label":"Brunei","value":"Brunei"},{"default":false,"label":"Bulgaria","value":"Bulgaria"},{"default":false,"label":"Burkina Faso","value":"Burkina Faso"},{"default":false,"label":"Burma (Myanmar)","value":"Burma (Myanmar)"},{"default":false,"label":"Burundi","value":"Burundi"},{"default":false,"label":"Cambodia","value":"Cambodia"},{"default":false,"label":"Cameroon","value":"Cameroon"},{"default":false,"label":"Cape Verde","value":"Cape Verde"},{"default":false,"label":"Cayman Islands","value":"Cayman Islands"},{"default":false,"label":"Central African Republic","value":"Central African Republic"},{"default":false,"label":"Chad","value":"Chad"},{"default":false,"label":"Chile","value":"Chile"},{"default":false,"label":"China","value":"China"},{"default":false,"label":"Christmas Island","value":"Christmas Island"},{"default":false,"label":"Cocos (Keeling) Islands","value":"Cocos (Keeling) Islands"},{"default":false,"label":"Colombia","value":"Colombia"},{"default":false,"label":"Comoros","value":"Comoros"},{"default":false,"label":"Congo, Democratic Republic of the","value":"Congo, Democratic Republic of the"},{"default":false,"label":"Congo, Republic of the","value":"Congo, Republic of the"},{"default":false,"label":"Cook Islands","value":"Cook Islands"},{"default":false,"label":"Costa Rica","value":"Costa Rica"},{"default":false,"label":"Croatia","value":"Croatia"},{"default":false,"label":"Cuba","value":"Cuba"},{"default":false,"label":"Cyprus","value":"Cyprus"},{"default":false,"label":"Czech Republic","value":"Czech Republic"},{"default":false,"label":"Denmark","value":"Denmark"},{"default":false,"label":"Djibouti","value":"Djibouti"},{"default":false,"label":"Dominica","value":"Dominica"},{"default":false,"label":"Dominican Republic","value":"Dominican Republic"},{"default":false,"label":"East Timor","value":"East Timor"},{"default":false,"label":"Ecuador","value":"Ecuador"},{"default":false,"label":"Egypt","value":"Egypt"},{"default":false,"label":"El Salvador","value":"El Salvador"},{"default":false,"label":"Equatorial Guinea","value":"Equatorial Guinea"},{"default":false,"label":"Eritrea","value":"Eritrea"},{"default":false,"label":"Estonia","value":"Estonia"},{"default":false,"label":"Ethiopia","value":"Ethiopia"},{"default":false,"label":"Falkland Islands (Malvinas)","value":"Falkland Islands (Malvinas)"},{"default":false,"label":"Faroe Islands","value":"Faroe Islands"},{"default":false,"label":"Fiji","value":"Fiji"},{"default":false,"label":"Finland","value":"Finland"},{"default":false,"label":"France","value":"France"},{"default":false,"label":"French Guiana","value":"French Guiana"},{"default":false,"label":"French Polynesia","value":"French Polynesia"},{"default":false,"label":"Gabon","value":"Gabon"},{"default":false,"label":"Gambia","value":"Gambia"},{"default":false,"label":"Georgia","value":"Georgia"},{"default":false,"label":"Germany","value":"Germany"},{"default":false,"label":"Ghana","value":"Ghana"},{"default":false,"label":"Gibraltar","value":"Gibraltar"},{"default":false,"label":"Greece","value":"Greece"},{"default":false,"label":"Greenland","value":"Greenland"},{"default":false,"label":"Grenada","value":"Grenada"},{"default":false,"label":"Guadeloupe","value":"Guadeloupe"},{"default":false,"label":"Guam","value":"Guam"},{"default":false,"label":"Guatemala","value":"Guatemala"},{"default":false,"label":"Guinea","value":"Guinea"},{"default":false,"label":"Guinea-Bissau","value":"Guinea-Bissau"},{"default":false,"label":"Guyana","value":"Guyana"},{"default":false,"label":"Haiti","value":"Haiti"},{"default":false,"label":"Honduras","value":"Honduras"},{"default":false,"label":"Hong Kong","value":"Hong Kong"},{"default":false,"label":"Hungary","value":"Hungary"},{"default":false,"label":"Iceland","value":"Iceland"},{"default":false,"label":"India","value":"India"},{"default":false,"label":"Indonesia","value":"Indonesia"},{"default":false,"label":"Iraq","value":"Iraq"},{"default":false,"label":"Ireland","value":"Ireland"},{"default":false,"label":"Israel","value":"Israel"},{"default":false,"label":"Italy","value":"Italy"},{"default":false,"label":"Ivory Coast","value":"Ivory Coast"},{"default":false,"label":"Jamaica","value":"Jamaica"},{"default":false,"label":"Japan","value":"Japan"},{"default":false,"label":"Jordan","value":"Jordan"},{"default":false,"label":"Kazakhstan","value":"Kazakhstan"},{"default":false,"label":"Kenya","value":"Kenya"},{"default":false,"label":"Kiribati","value":"Kiribati"},{"default":false,"label":"Korea, South","value":"Korea, South"},{"default":false,"label":"Kuwait","value":"Kuwait"},{"default":false,"label":"Kyrgyzstan","value":"Kyrgyzstan"},{"default":false,"label":"Laos","value":"Laos"},{"default":false,"label":"Latvia","value":"Latvia"},{"default":false,"label":"Lebanon","value":"Lebanon"},{"default":false,"label":"Lesotho","value":"Lesotho"},{"default":false,"label":"Liberia","value":"Liberia"},{"default":false,"label":"Liechtenstein","value":"Liechtenstein"},{"default":false,"label":"Lithuania","value":"Lithuania"},{"default":false,"label":"Luxembourg","value":"Luxembourg"},{"default":false,"label":"Macau","value":"Macau"},{"default":false,"label":"Macedonia, Republic of","value":"Macedonia, Republic of"},{"default":false,"label":"Madagascar","value":"Madagascar"},{"default":false,"label":"Malawi","value":"Malawi"},{"default":false,"label":"Malaysia","value":"Malaysia"},{"default":false,"label":"Maldives","value":"Maldives"},{"default":false,"label":"Mali","value":"Mali"},{"default":false,"label":"Malta","value":"Malta"},{"default":false,"label":"Marshall Islands","value":"Marshall Islands"},{"default":false,"label":"Martinique","value":"Martinique"},{"default":false,"label":"Mauritania","value":"Mauritania"},{"default":false,"label":"Mauritius","value":"Mauritius"},{"default":false,"label":"Mayotte","value":"Mayotte"},{"default":false,"label":"Mexico","value":"Mexico"},{"default":false,"label":"Micronesia","value":"Micronesia"},{"default":false,"label":"Moldova","value":"Moldova"},{"default":false,"label":"Mongolia","value":"Mongolia"},{"default":false,"label":"Montserrat","value":"Montserrat"},{"default":false,"label":"Morocco","value":"Morocco"},{"default":false,"label":"Mozambique","value":"Mozambique"},{"default":false,"label":"Namibia","value":"Namibia"},{"default":false,"label":"Nauru","value":"Nauru"},{"default":false,"label":"Nepal","value":"Nepal"},{"default":false,"label":"Netherlands","value":"Netherlands"},{"default":false,"label":"Netherlands Antilles","value":"Netherlands Antilles"},{"default":false,"label":"New Caledonia","value":"New Caledonia"},{"default":false,"label":"New Zealand","value":"New Zealand"},{"default":false,"label":"Nicaragua","value":"Nicaragua"},{"default":false,"label":"Niger","value":"Niger"},{"default":false,"label":"Nigeria","value":"Nigeria"},{"default":false,"label":"Niue","value":"Niue"},{"default":false,"label":"Norfolk Island","value":"Norfolk Island"},{"default":false,"label":"Northern Mariana Islands","value":"Northern Mariana Islands"},{"default":false,"label":"Norway","value":"Norway"},{"default":false,"label":"Oman","value":"Oman"},{"default":false,"label":"Pakistan","value":"Pakistan"},{"default":false,"label":"Palau","value":"Palau"},{"default":false,"label":"Palestinian Territory","value":"Palestinian Territory"},{"default":false,"label":"Panama","value":"Panama"},{"default":false,"label":"Papua New Guinea","value":"Papua New Guinea"},{"default":false,"label":"Paraguay","value":"Paraguay"},{"default":false,"label":"Peru","value":"Peru"},{"default":false,"label":"Philippines","value":"Philippines"},{"default":false,"label":"Pitcairn Island","value":"Pitcairn Island"},{"default":false,"label":"Poland","value":"Poland"},{"default":false,"label":"Portugal","value":"Portugal"},{"default":false,"label":"Puerto Rico","value":"Puerto Rico"},{"default":false,"label":"Qatar","value":"Qatar"},{"default":false,"label":"Romania","value":"Romania"},{"default":false,"label":"Russia","value":"Russia"},{"default":false,"label":"Rwanda","value":"Rwanda"},{"default":false,"label":"Saint Helena","value":"Saint Helena"},{"default":false,"label":"Saint Kitts and Nevis","value":"Saint Kitts and Nevis"},{"default":false,"label":"Saint Lucia","value":"Saint Lucia"},{"default":false,"label":"Saint Pierre and Miquelon","value":"Saint Pierre and Miquelon"},{"default":false,"label":"Saint Vincent and the Grenadines","value":"Saint Vincent and the Grenadines"},{"default":false,"label":"Samoa","value":"Samoa"},{"default":false,"label":"San Marino","value":"San Marino"},{"default":false,"label":"Saudi Arabia","value":"Saudi Arabia"},{"default":false,"label":"Senegal","value":"Senegal"},{"default":false,"label":"Serbia and Montenegro","value":"Serbia and Montenegro"},{"default":false,"label":"Seychelles","value":"Seychelles"},{"default":false,"label":"Sierra Leone","value":"Sierra Leone"},{"default":false,"label":"Singapore","value":"Singapore"},{"default":false,"label":"Slovakia","value":"Slovakia"},{"default":false,"label":"Slovenia","value":"Slovenia"},{"default":false,"label":"Solomon Islands","value":"Solomon Islands"},{"default":false,"label":"Somalia","value":"Somalia"},{"default":false,"label":"South Africa","value":"South Africa"},{"default":false,"label":"South Georgia and the South Sandwich Islands","value":"South Georgia and the South Sandwich Islands"},{"default":false,"label":"Spain","value":"Spain"},{"default":false,"label":"Sri Lanka","value":"Sri Lanka"},{"default":false,"label":"Suriname","value":"Suriname"},{"default":false,"label":"Svalbard and Jan Mayen","value":"Svalbard and Jan Mayen"},{"default":false,"label":"Swaziland","value":"Swaziland"},{"default":false,"label":"Sweden","value":"Sweden"},{"default":false,"label":"Switzerland","value":"Switzerland"},{"default":false,"label":"Taiwan","value":"Taiwan"},{"default":false,"label":"Tajikistan","value":"Tajikistan"},{"default":false,"label":"Tanzania","value":"Tanzania"},{"default":false,"label":"Thailand","value":"Thailand"},{"default":false,"label":"Togo","value":"Togo"},{"default":false,"label":"Tokelau","value":"Tokelau"},{"default":false,"label":"Tonga","value":"Tonga"},{"default":false,"label":"Trinidad and Tobago","value":"Trinidad and Tobago"},{"default":false,"label":"Tunisia","value":"Tunisia"},{"default":false,"label":"Turkey","value":"Turkey"},{"default":false,"label":"Turkmenistan","value":"Turkmenistan"},{"default":false,"label":"Turks and Caicos Islands","value":"Turks and Caicos Islands"},{"default":false,"label":"Tuvalu","value":"Tuvalu"},{"default":false,"label":"Uganda","value":"Uganda"},{"default":false,"label":"Ukraine","value":"Ukraine"},{"default":false,"label":"United Arab Emirates","value":"United Arab Emirates"},{"default":false,"label":"United States Minor Outlying Islands","value":"United States Minor Outlying Islands"},{"default":false,"label":"Uruguay","value":"Uruguay"},{"default":false,"label":"Uzbekistan","value":"Uzbekistan"},{"default":false,"label":"Vanuatu","value":"Vanuatu"},{"default":false,"label":"Vatican","value":"Vatican"},{"default":false,"label":"Venezuela","value":"Venezuela"},{"default":false,"label":"Vietnam","value":"Vietnam"},{"default":false,"label":"Virgin Islands, British","value":"Virgin Islands, British"},{"default":false,"label":"Virgin Islands, U. S.","value":"Virgin Islands, U. S."},{"default":false,"label":"Wallis and Futuna","value":"Wallis and Futuna"},{"default":false,"label":"Western Sahara","value":"Western Sahara"},{"default":false,"label":"Yemen","value":"Yemen"},{"default":false,"label":"Zambia","value":"Zambia"},{"default":false,"label":"Zimbabwe        ","value":"Zimbabwe"}]};
var agencyTypeJson = {"list":[{"default":false,"label":"Federal","value":"Federal"},{"default":false,"label":"State","value":"State"},{"default":false,"label":"Local","value":"Local"},{"default":false,"label":"Tribal","value":"Tribal"},{"default":false,"label":"Regional","value":"Regional"},{"default":false,"label":"Foreign","value":"Foreign"},{"default":false,"label":"U.S. House of Representatives","value":"U.S. House of Representatives"},{"default":false,"label":"U.S. Senate","value":"U.S. Senate"}]};
var usStatesJson = {"list":[{"default":false,"label":"Alabama","value":"AL"},{"default":false,"label":"Alaska","value":"AK"},{"default":false,"label":"American Samoa","value":"AS"},{"default":false,"label":"Arizona","value":"AZ"},{"default":false,"label":"Arkansas","value":"AR"},{"default":false,"label":"California","value":"CA"},{"default":false,"label":"Colorado","value":"CO"},{"default":false,"label":"Connecticut","value":"CT"},{"default":false,"label":"Delaware","value":"DE"},{"default":false,"label":"District of Columbia","value":"DC"},{"default":false,"label":"Florida","value":"FL"},{"default":false,"label":"Georgia","value":"GA"},{"default":false,"label":"Guam","value":"GU"},{"default":false,"label":"Hawaii","value":"HI"},{"default":false,"label":"Idaho","value":"ID"},{"default":false,"label":"Illinois","value":"IL"},{"default":false,"label":"Indiana","value":"IN"},{"default":false,"label":"Iowa","value":"IA"},{"default":false,"label":"Kansas","value":"KS"},{"default":false,"label":"Kentucky","value":"KY"},{"default":false,"label":"Louisiana","value":"LA"},{"default":false,"label":"Maine","value":"ME"},{"default":false,"label":"Maryland","value":"MD"},{"default":false,"label":"Massachusetts","value":"MA"},{"default":false,"label":"Michigan","value":"MI"},{"default":false,"label":"Minnesota","value":"MN"},{"default":false,"label":"Mississippi","value":"MS"},{"default":false,"label":"Missouri","value":"MO"},{"default":false,"label":"Montana","value":"MT"},{"default":false,"label":"Nebraska","value":"NE"},{"default":false,"label":"Nevada","value":"NV"},{"default":false,"label":"New Hampshire","value":"NH"},{"default":false,"label":"New Jersey","value":"NJ"},{"default":false,"label":"New Mexico","value":"NM"},{"default":false,"label":"New York","value":"NY"},{"default":false,"label":"North Carolina","value":"NC"},{"default":false,"label":"North Dakota","value":"ND"},{"default":false,"label":"Northern Mariana Islands","value":"MP"},{"default":false,"label":"Ohio","value":"OH"},{"default":false,"label":"Oklahoma","value":"OK"},{"default":false,"label":"Oregon","value":"OR"},{"default":false,"label":"Pennsylvania","value":"PA"},{"default":false,"label":"Puerto Rico","value":"PR"},{"default":false,"label":"Rhode Island","value":"RI"},{"default":false,"label":"South Carolina","value":"SC"},{"default":false,"label":"South Dakota","value":"SD"},{"default":false,"label":"Tennessee","value":"TN"},{"default":false,"label":"Texas","value":"TX"},{"default":false,"label":"US Virgin Islands","value":"VI"},{"default":false,"label":"Utah","value":"UT"},{"default":false,"label":"Vermont","value":"VT"},{"default":false,"label":"Virginia","value":"VA"},{"default":false,"label":"Washington","value":"WA"},{"default":false,"label":"West Virginia","value":"WV"},{"default":false,"label":"Wisconsin","value":"WI"},{"default":false,"label":"Wyoming","value":"WY"}]};
var caProvincesJson = {"list":[{"default":false,"label":"Alberta  ","value":"Alberta"},{"default":false,"label":"British Columbia  ","value":"British Columbia"},{"default":false,"label":"Manitoba  ","value":"Manitoba"},{"default":false,"label":"New Brunswick  ","value":"New Brunswick"},{"default":false,"label":"Newfoundland  ","value":"Newfoundland"},{"default":false,"label":"Northwest Territories  ","value":"Northwest Terrtories"},{"default":false,"label":"Nova Scotia  ","value":"Nova Scotia"},{"default":false,"label":"Nunavut  ","value":"Nunavut"},{"default":false,"label":"Ontario  ","value":"Ontario"},{"default":false,"label":"Prince Edward Island  ","value":"Prince Edward Island"},{"default":false,"label":"Quebec  ","value":"Quebec"},{"default":false,"label":"Saskatchewan  ","value":"Saskatchewan"},{"default":false,"label":"Yukon Territory","value":"Yukon Territory"}]};
// Note: "&api_key" is added in the ajax call to accomodate the dynamic dependentOnValue
var agencyUrl = apiurl + "lookup.json?field=gov_agency&dependentOnValue=Federal&api_key=";
var categoryUrl = apiurl + "lookup.json?field=comment_category&dependentOnValue=";
var postUrl = apiurl + "comment.json?api_key=";

// jQuery formatted selector to search for focusable items
var focusableElementsString = "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";

// store the item that has focus before opening the modal window
var focusedElementBeforeModal;

/******** Load jQuery if not present *********/
if (window.jQuery === undefined || window.jQuery.fn.jquery !== '3.0.0') {
    var scriptTag = document.createElement('script');
    scriptTag.setAttribute("type","text/javascript");
    scriptTag.setAttribute("src",
        "https://ajax.googleapis.com/ajax/libs/jquery/3.0.0/jquery.min.js");
    if (scriptTag.readyState) {
      scriptTag.onreadystatechange = function () { // For old versions of IE
          if (this.readyState === 'complete' || this.readyState === 'loaded') {
              scriptLoadHandler();
          }
      };
    } else { // Other browsers
      scriptTag.onload = scriptLoadHandler;
    }
  // Try to find the head, otherwise default to the documentElement
  (document.getElementsByTagName("head")[0] || document.documentElement)
    .appendChild(scriptTag);
} else {
    // The jQuery version on the window is the one we want to use
    init();
}

/******** Called once jQuery has loaded ******/
function scriptLoadHandler() {
    // Restore $ and window.jQuery to their previous values and store the
    // new jQuery in our local jQuery variable
    jQuery = window.jQuery.noConflict(true);
    // Call our main function
    init();
}

function initTrigger(triggerElement, apiKey, docId) {
    // Add trigger
    jQuery(triggerElement).click(function(e) {
      ModalUtils.showModal(jQuery('#regsgov-dialog'), apiKey, docId);
    });
}

var cssAdded = false;
function appendCss() {
  if (!cssAdded) {
    cssAdded = true;
    var $defaultcss = jQuery('<style>' + '@@defaultcss' + '</style>');
    $defaultcss.appendTo('head');
  }
}

  /******** Our main function ********/
function init(options) {
    appendCss();

    // Check that div containing attributes exists, gets apiKey & document ID
    if (jQuery("#regsgov-widget").attr("data-apikey") && jQuery("#regsgov-widget").attr("data-docid") ){
      var config = jQuery("#regsgov-widget").data();
      var apiKey = config.apikey;
      var documentId = config.docid;
      initTrigger("#regsgov-trigger", apiKey, documentId);
      return;
    }

    if (options) {
      var apiKey = options.apikey;
      var documentId = options.docid;
      initTrigger(options.triggerElement, apiKey, documentId);
      return;
    }

    // TODO - Reorganize this slightly to initTrigger only if passed as an option or if exists
    // pair the above change with moving modal specific html to ModalUtils, and we can support inline form
    // NOTE - Inline form would use a different code snippet with the regsgov-widget NOT hidden

} // end init()

var FormUtils = {
    /*
      Toggles combo menus that are dependent on Country and Government Agency Type
      dropdown menus. Combo can be toggled to be a dropdown menu or text input.
      i.e. "Government Agency" dropdown will populate with a list of all American
      federal agencies if "Federal" is selected in "Government Agency Type" dropdown
    */
    toggleCombo: function (selector) {
      var dropdown = document.getElementById(selector.id);
      var clickedOption = dropdown.options[dropdown.selectedIndex].value;

      if (selector.id === 'regsgov-country') {
        if (!(clickedOption === "United States" || clickedOption === "Canada")){
          var combo;
          var newCombo;

          combo = document.getElementById('regsgov-us_state');
          newCombo = document.createElement('input');
          newCombo.className = 'regsgov-form__input';
          newCombo.setAttribute("type", "text");
          newCombo.setAttribute('id', 'regsgov-us_state');
          newCombo.maxLength = 50;
          formDiv.replaceChild(newCombo, combo);
        } else {
          var combo = document.getElementById('regsgov-us_state');
          var newCombo = document.createElement('select');
          newCombo.className = 'regsgov-form__select';
          newCombo.setAttribute('id','regsgov-us_state');
          newCombo.setAttribute("name", 'us_state');
          formDiv.replaceChild(newCombo, combo);

          if(clickedOption == "United States"){
            this.fillCombo('regsgov-us_state', usStates, false);
          }else{
            this.fillCombo('regsgov-us_state', canProvinces, false);
          }
        }
      }

      if (selector.id === 'regsgov-gov_agency_type') {
        if(clickedOption !== "Federal"){
          var combo = document.getElementById('regsgov-gov_agency');
          var newCombo;

          newCombo = document.createElement("input");
          newCombo.setAttribute('name', 'gov_agency');
          newCombo.setAttribute("type", "text");
          newCombo.className = 'regsgov-form__input';
          newCombo.setAttribute('id','regsgov-gov_agency');
          newCombo.maxLength = 200;
          formDiv.replaceChild(newCombo, combo);
        }else{
          var combo = document.getElementById('regsgov-gov_agency');
          var newCombo = document.createElement("select");
          newCombo.className = 'regsgov-form__select';
          newCombo.setAttribute('id', 'regsgov-gov_agency');
          newCombo.setAttribute('name', 'gov_agency');
          formDiv.replaceChild(newCombo, combo);

          this.fillCombo('regsgov-gov_agency', fedAgencies, false);
        }
      }
    },

    /*
      Adds fields to form based on form configuration JSON
    */
    addFields: function(attLabel, attName, domName, maxLength, required, uiControl, pubViewable) {
      var fieldLabel = document.createElement('label');
      var control;

      if (required) {
        var $requiredImg = jQuery('<img alt="Required" class="regsgov-icon-left" aria-hidden="true">')
            .attr("src", baseurl + "images/icon_required.png");
        jQuery(fieldLabel).append($requiredImg);
      }

      jQuery(fieldLabel).append(attLabel);

      fieldLabel.setAttribute("for", domName);
      fieldLabel.className = "regsgov-form__label";
      fieldLabel.setAttribute("type", "text");
      formDiv.appendChild(fieldLabel);

      // Adds globe icon for publicly viewable fields
      if (pubViewable === true) {
        var $publicViewableImg = jQuery('<img alt="Viewable on Regulations.gov" class="regsgov-icon-right">')
            .attr("src", baseurl + "images/icon_info.png");
        jQuery(fieldLabel).append($publicViewableImg);
      }

      if (uiControl === "text") {
        control = document.createElement('input');
        control.className = 'regsgov-form__input';
        control.setAttribute("id", domName);
        control.setAttribute("name", attName);
        control.setAttribute("type", "text");
        control.maxLength = maxLength;
      }else if (uiControl === "picklist") {
        control = document.createElement('select');
        control.className = 'regsgov-form__select';
        control.setAttribute('id', domName);
        control.setAttribute("name", attName);
        control.setAttribute('style', 'margin-top: 10px;');
        jQuery(control).on('change', function(){
          FormUtils.toggleCombo(this);
        });
      }else if (uiControl === "combo") {
        control = document.createElement('select');
        control.className = 'regsgov-form__select';
        control.setAttribute('style', 'margin-top: 10px;');
        if(domName ===  'regsgov-gov_agency'){
          control.setAttribute("id", domName);
          control.setAttribute("name", attName);
        } else {
          control.setAttribute("id",  "regsgov-us_state");
          control.setAttribute("name", "us_state");
        }
      }

      if (required) {
        control.required = true;
      } else {
        control.required = false;
      }
      var div = document.createElement('div');
      div.className = "regsgov-space";
      formDiv.appendChild(control);
      formDiv.appendChild(div);
    },

    /*
      Fills "Select" dropdown menu based on attributeName
      i.e. the "Country" will populate with a list of all countries
    */
    fillSelect: function(attLabel, attName, list) {
        var group = document.createElement("optgroup");
        var control;
        control = document.getElementById(attName);

        // Create blank option (selected by default)
        var blank =  document.createElement("option");
        blank.disabled = false ;
        blank.selected = true;
        blank.value = '';
        blank.innerHTML = '';
        group.appendChild(blank);

        // Populate select boxes with respective options
        for (var i = 0; i < list.length; i++) {
          var option = document.createElement("option");
          option.setAttribute("id", list[i].label);
          option.setAttribute("value", list[i].value);
          if (list[i].label === "----------"){ //Disables line break option
            option.disabled = true;
          }
          option.innerHTML = list[i].label;
          group.appendChild(option);
        }
        control.appendChild(group);
      },

    /*
      Fills dependent "Combo" dropdown menu based on "Select" dropdown menu option selected
      i.e. "Government Agency" dropdown will populate with a list of all American
      federal agencies if "Federal" is selected in "Government Agency Type" dropdown
    */
    fillCombo: function (attName, list, initial){
        var localList;
        var control;
        var group = document.createElement("optgroup");
        control = document.getElementById(attName);

        if (attName == "regsgov-gov_agency"){
          localList = fedAgencies;
        } else if (attName === "regsgov-us_state" && list[0].label === "Alabama") {
          localList = usStates;
        } else {
          localList = canProvinces;
        }

        var blank =  document.createElement("option");
        blank.disabled = false ;
        blank.selected = true;
        blank.value = '';
        blank.innerHTML = '';
        group.appendChild(blank);

        for (var i = 0; i < list.length; i++) {
          var option = document.createElement("option");
          if (initial === true){
            localList[i] = list[i];
          }
          option.setAttribute("id", localList[i]);
          option.setAttribute("value", localList[i].value);
          option.innerHTML = localList[i].label;
          group.appendChild(option);
        }

        if (initial === true && (localList === canProvinces || usStates || fedAgencies)) {
          return true; // Sets combo drop down to blank value upon form creation
        } else {
          control.appendChild(group);
        }
    },

    // Updates the total length of text entered in the comment box
    charCounter: function(input, control) {
      var len = input.value.length;
       if (len >= 5000) {
        control.innerHTML = "character limit reached".fontcolor("#cc3333");
       } else {
        control.innerHTML = 5000 - len;
       }
    },

    // Wait for DOM to render
    onDomBuild: function(callback) {
     if (!jQuery("#regsgov-fields").length) {
       window.requestAnimationFrame(onDomBuild); // give everything some time to render
     }
     formDiv = jQuery("#regsgov-fields").get(0);
     if (typeof(callback) === "function") {
       callback();
     }
    },

    validateForm: function() {
      var checkbox = document.getElementById("regsgov-checkbox");
      var first_name = document.getElementById("regsgov-first_name");
      var last_name = document.getElementById("regsgov-last_name");

      if(checkbox.checked === false){
        return false;
      }

      var errorList = jQuery("#regsgov-info ul");
      errorList.empty();

      var elements = jQuery('form').find(":required");
      var empty_fields = 0;

      for(i = 0; i < elements.length; i++){
        if (elements[i].value === ""){
          empty_fields += 1;
        }
      }

      if (empty_fields != 0){ //Process error notification if empty fields exist
        elements.each(function(index, node){
            var element = document.getElementById(node.id);
            if (element.value === '') {
              var regsgov_info = document.getElementById("regsgov-info");
              regsgov_info.style.display = "inline";
              var label = jQuery("label[for=" + node.id + "] ");
              var message = document.createElement("span");
              message.id = node.id + "-error";
              message.style = "color: #cc3333; font-style: italic;";
              message.innerHTML = "Fill in this required field.";

              // Check to see if error message already exists otherwise append
              if (jQuery(this).next('span').length === 0){
                jQuery("#"+node.id).after(message);
              }

              node.style.borderColor = "#cc3333";
              var labelText = label.text();
              if(node.id === "regsgov-general_comment"){
                labelText = "Comment";
              }
              jQuery("#regsgov-info ul").append("<li>"+ labelText +"</li>");
            }else{ //reset border color and remove alert text
              node.style.borderColor = "#bfbfbf";
              jQuery(this).next('span').remove();
            }
        });
        return false;
      }else{
        var regsgov_info = document.getElementById("regsgov-info");
        regsgov_info.style.display = "none";
      }


      //Set first and last name values to Anonymous if not entered
      if(first_name && first_name.value === ''){
        first_name.setAttribute("value", "Anonymous");
      }

      if(last_name && last_name.value === ''){
        last_name.setAttribute("value", "Anonymous");
      }
      return true;
    },


    // Adds validation for selected files (file type and file size validation)
    validateFiles: function(fileInput) {
      for (var i = 0; i < fileInput.files.length; i++){
          var validFile = false;
          var validSize = false;
          var ext = fileInput.files[i].name.match(/\.(.+)$/)[1];
          var filename = fileInput.files[i].name.split('\\').pop();

          // Check for file size
          if (fileInput.files[i].size <= maxFileSizeBytes){
            validSize = true;
          }

          //Check for file type
          for (var j = 0; j < allowedFileExtensions.length; j++){
            if (ext === allowedFileExtensions[j]){
              validFile = true;
            }
          }

          if (!validFile){
            alert(filename + " has an invalid extension. Valid extension(s): bmp, doc, xls, pdf, gif, htm, html, jpg, jpeg, png, ppt, rtf, sgml, tiff, tif, txt, wpd, xml, docx, xlsx, pptx");
            jQuery("#regsgov-upload").val("");
            return true;
          } else if (!validSize){
            alert(filename + " has an invalid file size. File upload must be less than 10.5 MB.");
            jQuery("#regsgov-upload").val("");
            return true;
          }
        }


        jQuery(fileInput).next("span").html("");
        jQuery('label[for=regsgov-upload]').html(fileInput.files.length + " file(s) selected");
        if (jQuery("#regsgov-general_comment").val() === "") { // Adds "See attached file(s)" if no comment input
          jQuery("#regsgov-general_comment").val("See attached file(s)");
        }
        jQuery("#regsgov-remove").css("visibility", "visible");
    },

    // Removes uploaded file
    removeFile: function(){
      // $("#regsgov-upload").next("span").text("Choose file");
      jQuery("#regsgov-upload").replaceWith(jQuery("#regsgov-upload").val('').clone(true));
      if (jQuery("#regsgov-general_comment").val() === "See attached file(s)") {
        jQuery("#regsgov-general_comment").val("");
      }
      jQuery("label[for=regsgov-upload]").html("Choose File(s)");
      jQuery("#regsgov-remove").css("visibility", "hidden");
    },

    // Adds hide/show functionality for submit button for checkbox
    toggleCheck: function(checkbox) {
      var submit = document.getElementById("regsgov-submit");
      if(checkbox.checked){
        submit.style.visibility = "visible";
      }else{
        submit.style.visibility = "hidden";
      }
    },

    initFormBindings: function(apiKey) {
      // Clear any previous bindings
      // jQuery("#regsgov-widget").off("change", "#regsgov-upload");
      // jQuery("#regsgov-widget").off("change", "#regsgov-checkbox");
      // jQuery("#regsgov-widget").off("keyup", "#regsgov-general_comment");
      // jQuery("#regsgov-widget").off("click", "#regsgov-remove");
      // jQuery("#regsgov-widget").off("click", "#regsgov-submit");


      // Binds listener for file upload
      jQuery("#regsgov-widget").on("change", "#regsgov-upload", function() {
        if (this.value === "") { // Check for when user does not choose a file or clicks cancel
          return true;
        }
        FormUtils.validateFiles(this);
      });

      // Adds trigger for checkbox
      jQuery("#regsgov-widget").on("change", "#regsgov-checkbox", function() {
        FormUtils.toggleCheck(this);
      });

      // Adds trigger logic for counter
      jQuery("#regsgov-widget").on("keyup", "#regsgov-general_comment", function() {
        FormUtils.charCounter(this, jQuery("#regsgov-counter").get(0));
      });

      // Add trigger for "Remove file"
      jQuery("#regsgov-widget").on("click", "#regsgov-remove", function() {
        FormUtils.removeFile();
      });

      // Handler for form submission
      jQuery("#regsgov-widget").on("click", "#regsgov-submit", function(event) {
        event.preventDefault();
        if (FormUtils.validateForm() === false) {
          return false;
        }

        var formData = new FormData(jQuery('#regsgov-form')[0]);
        var fileInput = jQuery('input[type=file]')[0];
        for (var i = 0; i < fileInput.files.length; i++){
          formData.append('regsgov-upload', fileInput.files[i]);
        }

        jQuery.ajax({
          url: postUrl + apiKey,
          type: 'POST',
          data: formData,
          processData: false,
          contentType: false,
          success: function(response) {
            FormUtils.showConfirmation(agencyName, agencyAcronym, docType, docTitle, response.trackingNumber);
          },
          error: function (response){
            // TODO This handler needs a lot more work; The API could return relevant errors
            // TODO The user may want to retry submitting - we should allow that.
            jQuery(".regsgov-info").show();
            var responseJson = jQuery.parseJSON(response.responseText);
            jQuery(".regsgov-warning__ul").html("<li>" + responseJson.message + "</li>");
            }
          });
        }); // end of jQuery form submission method
    },
    buildForm: function(apiKey, docId) {
     var $defaulthtml = jQuery('@@defaulthtml');
     jQuery("#regsgov-widget").empty();
     $defaulthtml.appendTo("#regsgov-widget");

      this.initFormBindings(apiKey);
      // Check browser type - disable file upload feature for IE
      var isIE = /*@cc_on!@*/false || !!document.dMode;
      if (isIE) {
        jQuery("#regsgov-uploadlabel").display = "none";
        jQuery("#regsgov-uploaddiv").innerHTML = "File upload is not supported in this browser version.";
      }

       jQuery.ajax(
         {
         url: apiurl + "comment.json?api_key=" + apiKey + '&documentId=' + docId,
         type: 'GET',
         error: function(response) { // reporting for 400 and 404 status
           var json = JSON.parse(response.responseText);
           showDocumentError(json.message);
           return false;
         },
         success: function(data) {
           // Check to see if DOM elements are built - then hook into DOM div
           FormUtils.onDomBuild(function() {
             agencyAcronym = data.document.agencyAcronym;
             agencyName = data.agencyName;
             docType = data.document.documentType;
             docTitle = data.document.title;

             // Set dynamic document title
             jQuery(".regsgov-title__h1__a").html("The " + agencyName +
               " (" + agencyAcronym + ") " + docType + ":<br />" + docTitle)
               .attr("href", siteurl + "comment?D=" + docId);

             // API requires documentId passed as a form value
             jQuery('#regsgov-comment_on').attr("value", docId);

             jQuery.each(data.fieldList, function(index, field) {
              if (field.attributeName === "general_comment") { // skips over general comment field
                return true;
              }

            // Creates DOM field elements
            FormUtils.addFields(field.attributeLabel, field.attributeName, prefix + field.attributeName, field.maxLength,
              field.required, field.uiControl, field.publicViewable);

            //Populates select drop-down lists
            if (field.attributeName === "gov_agency_type" ||
           field.attributeName === "country") { // proceses field for picklist
              if (field.attributeName === "country"){
                FormUtils.fillSelect(field.attributeLabel, prefix + field.attributeName, countryJson.list);
              } else {
                FormUtils.fillSelect(field.attributeLabel, prefix + field.attributeName, agencyTypeJson.list);
              }
            }

            if (field.attributeName === "gov_agency" || field.attributeName === "us_state") {
              if (field.attributeName === "gov_agency") {
                  jQuery.ajax({url: agencyUrl + apiKey, type: 'GET', success: function(selectList) {
                  FormUtils.fillCombo(prefix + 'gov_agency', selectList.list, true);
                }});
              } else {
                FormUtils.fillCombo(prefix + 'us_state', usStatesJson.list, true);
                FormUtils.fillCombo(prefix + 'us_state', caProvincesJson.list, true);
              }
            }

            if (field.attributeName === "comment_category") {
                jQuery.ajax({url: categoryUrl + agencyAcronym + "&api_key=" + apiKey, type: 'GET', success: function(selectList) {
                FormUtils.fillSelect(field.attributeLabel, prefix + field.attributeName, selectList.list);
              }});
            }
           });
         }); //end of onDomBuild function
       }});
    }, // end buildForm function

    /**
     * [showConfirmation description]
     * @param  {[type]} agencyName     [description]
     * @param  {[type]} agencyAcronym  [description]
     * @param  {[type]} docType        [description]
     * @param  {[type]} title          [description]
     * @param  {[type]} trackingNumber [description]
     */
    showConfirmation: function(agencyName, agencyAcronym, docType, docTitle, trackingNumber) {
      var noTracking_message = "Note: You submitted your comment to an agency that does not publish comments on Regulations.gov. To check the status of your comment or obtain further information, please follow-up directly with the agency contact listed in the document soliciting your input.";
      jQuery(".regsgov-form").hide();
      jQuery(".regsgov-title-confirmation-image").css('display', 'block');
      jQuery(".regsgov-title-intro").text("Your comment has been created for the following:");
      if (trackingNumber){
        jQuery(".regsgov-footer").html("<p>Your tracking number is <strong>" + trackingNumber + "</strong></p>");
      } else {
        jQuery(".regsgov-footer").html("<i>" + noTracking_message + "</i>");
      }

      // For accessibility, set focus on the comment tracking number (if available)
      jQuery(".regsgov-title-intro").focus();
    },

    showDocumentError: function(message) {
      jQuery(".regsgov-form").hide();
      jQuery(".regsgov-footer").hide();
      jQuery(".regsgov-title").html('<h1 class="title__h1">' + message + '</h1>');
    }
};

var ModalUtils = {
  /**
   * [showModal description]
   * @param  {[type]} obj [description]
   */
  showModal: function(obj, apiKey, docId) {
    FormUtils.buildForm(apiKey, docId);

    this.initModalBindings();

    jQuery('#regsgov-widget').css('display', 'block');
    jQuery('.regsgov-overlay').css('display', 'block'); // insert an overlay to prevent clicking and make a visual change to indicate the main apge is not available
    jQuery('.regsgov-dialog').css('display', 'block'); // make the modal window visible
    jQuery('.regsgov-dialog').attr('aria-hidden', 'false'); // mark the modal window as visible

    // attach a listener to redirect the tab to the modal window if the user somehow gets out of the modal window
    jQuery('body').on('focusin', 'body:first', function() {
      this.setFocusToFirstItemInModal(jQuery('#regsgov-dialog'));
      console.log(jQuery('body:first').prop("tagName"));
    });

    // save current focus
    focusedElementBeforeModal = jQuery(':focus');

    this.setFocusToFirstItemInModal(obj);
  },

  hideModal: function() {
    // Remove bindings from widget div
    jQuery('#regsgov-widget').off();

    jQuery('#regsgov-widget').css('display', 'none');
    jQuery('.regsgov-overlay').css('display', 'none'); // remove the overlay in order to make the main screen available again
    jQuery('.regsgov-dialog').css('display', 'none'); // hide the modal window
    jQuery('.regsgov-dialog').attr('aria-hidden', 'true'); // mark the modal window as hidden

    // TODO - How would we mark main page as visible if we don't control it?
    // TODO - jQuery('#mainPage').attr('aria-hidden', 'false'); // mark the main page as visible

    // remove the listener which redirects tab keys in the main content area to the modal
    jQuery('body').off('focusin', 'body:first');

    // set focus back to element that had it before the modal was opened
    focusedElementBeforeModal.focus();
  },

    initModalBindings: function() {
      // Remove existing modal bindings
      // jQuery("#regsgov-widget").off("click", "#regsgov-close_button");
      // jQuery("#regsgov-widget").off("keyup", "#regsgov-close_button");

      console.log("initializing modal bindings.");

      // Bind hideModal() to close button. Note: use .on() because the object is not yet present in DOM
      jQuery("#regsgov-widget").on("click", "#regsgov-close_button", function(event) {
        console.log("close button was clicked\t" + event.timeStamp);
        ModalUtils.hideModal();
      });

      // Bind hideModal() to close button, for user when they hit Enter
      jQuery("#regsgov-widget").on("keyup", "#regsgov-close_button", function(event){
        if (event.keyCode == 13) {
          ModalUtils.hideModal();
        }
      });

      jQuery("#regsgov-widget").keydown(function(event) {
        ModalUtils.trapEscapeKey(jQuery(this), event);
      });

      jQuery('#regsgov-widget').keydown(function(event) {
        ModalUtils.trapTabKey(jQuery(this), event);
      });
    },

    trapEscapeKey: function(obj, evt) {
      // if escape pressed
      if (evt.which === 27) {

          // // get list of all children elements in given object
          // var o = obj.find('*');

          // // get list of focusable items
          // var cancelElement;
          // cancelElement = o.filter("#regsgov-_close-button")

          // // close the modal window
          // cancelElement.click();
          // evt.preventDefault();

          // TODO - Needs more thought and testing - not sure if we are correctly binding this.
          this.hideModal();
      }
    },

    trapTabKey: function (obj, evt) {
    // if tab or shift-tab pressed
      if (evt.which === 9) {
        // get list of all children elements in given object
        var o = obj.find('*');

        // get list of focusable items
        var focusableItems;
        focusableItems = o.filter(focusableElementsString).filter(':visible');

        // get currently focused item
        var focusedItem;
        focusedItem = jQuery(':focus');

        // get the number of focusable items
        var numberOfFocusableItems;
        numberOfFocusableItems = focusableItems.length;

        // get the index of the currently focused item
        var focusedItemIndex;
        focusedItemIndex = focusableItems.index(focusedItem);

        if (evt.shiftKey) {
          // back tab
          // if focused on first item and user preses back-tab, go to the last focusable item
          if (focusedItemIndex === 0) {
            focusableItems.get(numberOfFocusableItems - 1).focus();
            evt.preventDefault();
          }
        } else {
          // forward tab
          // if focused on the last item and user preses tab, go to the first focusable item
          if (focusedItemIndex === numberOfFocusableItems - 1) {
            focusableItems.get(0).focus();
            evt.preventDefault();
          }
        }
      }
    },

  setFocusToFirstItemInModal: function(obj) {
      // get list of all children elements in given object
      var o = obj.find('*');

      // set the focus to the first keyboard focusable item
      o.filter(focusableElementsString).filter(':visible').first().focus();
    }
  }; // End ModalUtils

  return {
    init: init
  };
})(); // We call our anonymous function immediately
