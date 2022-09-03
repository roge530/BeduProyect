/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/style.css */ \"./css/style.css\");\n/* harmony import */ var _assets_IMG_3903_jpeg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assets/IMG_3903.jpeg */ \"./assets/IMG_3903.jpeg\");\n/* harmony import */ var _assets_github_2_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/github-2.svg */ \"./assets/github-2.svg\");\n\n\n //import filteredResults from '../js/filteredResults.js'\n\nvar areas = [];\nvar allOpened = false;\nvar categories = [];\n\nwindow.fnShowFilteredResults = function fnShowFilteredResults(area, method) {\n  window.localStorage.setItem('method', method);\n  window.localStorage.setItem('demo', area);\n  window.location = '/html/filteredResults.html';\n};\n\nfunction getDataFromApi(urlApi) {\n  return fetch(urlApi).then(function (response) {\n    return response.json();\n  });\n}\n\nfunction fnAllAreas() {\n  getDataFromApi('https://www.themealdb.com/api/json/v1/1/list.php?a=list').then(function (data) {\n    areas = data['meals'].map(function (datum) {\n      return datum['strArea'];\n    });\n  });\n}\n\nfnAllAreas();\n\nwindow.fnHideAreas = function fnHideAreas() {\n  document.getElementById('allAreas').removeAttribute('hidden');\n  areas.forEach(function (area) {\n    document.getElementById(area).setAttribute('hidden', true);\n  });\n  document.getElementById('buttonHidde').setAttribute('hidden', true);\n};\n\nwindow.fnPrintAllAreas = function fnPrintAllAreas() {\n  if (!allOpened) {\n    var fragment = new DocumentFragment();\n    areas = areas.filter(function (area) {\n      return area != 'Mexican';\n    });\n    areas = areas.filter(function (area) {\n      return area != 'Canadian';\n    });\n    document.getElementById('allAreas').setAttribute('hidden', true);\n    areas.forEach(function (area) {\n      var div = document.createElement('div');\n      div.setAttribute(\"id\", area);\n      div.setAttribute(\"onclick\", \"fnShowFilteredResults(\\'\" + area + \"\\', 'Area Filter')\");\n      div.innerHTML = '<p>' + area + '</p>';\n      fragment.appendChild(div);\n    });\n    allOpened = true;\n    var divArea = document.querySelector('#areas');\n    divArea.appendChild(fragment);\n    var button = document.createElement('button');\n    button.setAttribute(\"id\", \"buttonHidde\");\n    button.setAttribute(\"onclick\", \"fnHideAreas()\");\n    button.innerHTML = 'Ocultar';\n    var areasSection = document.querySelector('#areasSection');\n    areasSection.appendChild(button);\n  } else {\n    document.getElementById('allAreas').setAttribute('hidden', true);\n    areas.forEach(function (area) {\n      document.getElementById(area).removeAttribute('hidden');\n    });\n    document.getElementById('buttonHidde').removeAttribute('hidden');\n  }\n};\n\nfunction fnAllCategories() {\n  getDataFromApi('https://www.themealdb.com/api/json/v1/1/list.php?c=list').then(function (data) {\n    categories = data['meals'].map(function (datum) {\n      return datum['strCategory'];\n    });\n    fnPrintAllCategories();\n  });\n}\n\nfunction fnPrintAllCategories() {\n  var fragment = new DocumentFragment();\n  categories.forEach(function (category) {\n    var div = document.createElement('div');\n    var divBody = document.createElement('div');\n    div.setAttribute(\"id\", category);\n    div.setAttribute('class', 'card');\n    div.setAttribute(\"onclick\", \"fnShowFilteredResults(\\'\" + category + \"\\', 'Category Filter')\");\n    divBody.setAttribute('class', 'card-body');\n    divBody.innerHTML = '<p class=\"card-text\">' + category + '</p>';\n    div.appendChild(divBody);\n    fragment.appendChild(div);\n  });\n  var divCategories = document.querySelector('#categories');\n  divCategories.appendChild(fragment);\n}\n\nfnAllCategories();\n\nfunction fnAutocomplete(input) {\n  var currentFocus;\n  input.addEventListener(\"input\", function (e) {\n    var div,\n        divMatchingElement,\n        i,\n        val = input.value;\n    var url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=' + val;\n    getDataFromApi(url).then(function (data) {\n      closeAllLists();\n      if (!val) return false;\n      currentFocus = -1;\n      div = document.createElement('div');\n      div.setAttribute('id', input.id + 'autocompleteList');\n      div.setAttribute(\"class\", \"autocompleteItems\");\n      document.getElementById('divForm').appendChild(div);\n      data['meals'].forEach(function (datum) {\n        var mealName = datum['strMeal'];\n        var mealID = datum['idMeal'];\n\n        if (mealName.substr(0, val.length).toUpperCase() == val.toUpperCase()) {\n          divMatchingElement = document.createElement('div');\n          divMatchingElement.innerHTML = '<strong>' + mealName.substr(0, val.length) + '</strong>';\n          divMatchingElement.innerHTML += mealName.substr(val.length);\n          divMatchingElement.innerHTML += \"<input id=\" + mealName.replace(/\\s/g, \"\") + \" type='hidden' value='\" + mealName + \"' class=\" + mealID + \">\";\n          divMatchingElement.addEventListener('click', function (e) {\n            var selectedInput = document.getElementById(mealName.replace(/\\s/g, \"\"));\n            input.value = selectedInput.value;\n            window.localStorage.setItem('idMeal', selectedInput.className);\n            closeAllLists();\n          });\n          div.appendChild(divMatchingElement);\n        }\n      });\n      input.addEventListener('keydown', function (e) {\n        var autocompleteList = document.getElementById(input.id + 'autocompleteList');\n        if (autocompleteList) autocompleteList = autocompleteList.getElementsByTagName(\"div\");\n\n        switch (e.keyCode) {\n          case 40:\n            currentFocus++;\n            addActive(autocompleteList);\n            break;\n\n          case 38:\n            currentFocus--;\n            addActive(autocompleteList);\n            break;\n\n          case 13:\n            e.preventDefault();\n\n            if (currentFocus > -1) {\n              if (autocompleteList) autocompleteList[currentFocus].click();\n            }\n\n        }\n      });\n\n      function addActive(x) {\n        if (!x) return false;\n        removeActive(x);\n        if (currentFocus >= x.length) currentFocus = 0;\n        if (currentFocus < 0) currentFocus = x.length - 1;\n        x[currentFocus].classList.add(\"autocompleteActive\");\n      }\n\n      function removeActive(x) {\n        for (var i = 0; i < x.length; i++) {\n          x[i].classList.remove(\"autocompleteActive\");\n        }\n      }\n\n      function closeAllLists(elmnt) {\n        var x = document.getElementsByClassName(\"autocompleteItems\");\n\n        for (var i = 0; i < x.length; i++) {\n          if (elmnt != x[i] && elmnt != input) {\n            x[i].parentNode.removeChild(x[i]);\n          }\n        }\n      }\n\n      document.addEventListener(\"click\", function (e) {\n        closeAllLists(e.target);\n      });\n    });\n  });\n}\n\nfnAutocomplete(document.getElementById('myInput'));\n\nwindow.fnSearch = function fnSearch() {\n  var idMeal = window.localStorage.getItem('idMeal');\n  window.localStorage.setItem('demo', idMeal);\n  window.localStorage.setItem('method', 'Search Bar');\n  window.location = '/html/demo.html';\n};\n\nwindow.fnGetRandomRecipe = function fnGetRandomRecipe() {\n  getDataFromApi('https://www.themealdb.com/api/json/v1/1/random.php').then(function (data) {\n    window.localStorage.setItem('method', 'Random Recipe');\n    window.localStorage.setItem('demo', data['meals'][0]['idMeal']);\n    window.location = '/html/demo.html';\n  });\n};\n\ndocument.getElementById('cardRoge').setAttribute('src', _assets_IMG_3903_jpeg__WEBPACK_IMPORTED_MODULE_1__);\ndocument.getElementById('githubIcon').setAttribute('src', _assets_github_2_svg__WEBPACK_IMPORTED_MODULE_2__);\n\n//# sourceURL=webpack://proyecto/./js/main.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./css/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./css/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ \"./node_modules/css-loader/dist/runtime/getUrl.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);\n// Imports\n\n\n\nvar ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../../../../../assets/web_image_01.jpg */ \"./assets/web_image_01.jpg\"), __webpack_require__.b);\nvar ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ../../../../../assets/footer_03_04.jpg */ \"./assets/footer_03_04.jpg\"), __webpack_require__.b);\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\nvar ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);\nvar ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \":root{\\n    --theme-color:white; \\n    --primary-color:#124f88;\\n    --secondary-color:#f7c331;\\n    --text-color-inverse:white;\\n    --text-color:black;\\n    --navbar-shallow-color:#e5e5e5;\\n    --menu-mobile-background-color:#3a4460;\\n }\\n\\nbody {\\n    background-color: var(--theme-color);\\n    background: url('https://upload.wikimedia.org/wikipedia/commons/2/2e/Wood_background.jpg') no-repeat center center fixed;\\n    -webkit-background-size: cover;\\n    -moz-background-size: cover;\\n    -o-background-size: cover;\\n    background-size: cover;\\n    text-align: center;\\n}\\n\\n.navbar-expand-lg {\\n    justify-content: center;\\n    background-color: rgba(174, 39, 47, 0.6);\\n}\\n\\nbutton[type=button] {\\n    background-color: DodgerBlue;\\n    color: #fff;\\n    \\n}\\n\\nh1 {\\n    font-family: 'Montserrat', sans-serif;\\n    font-size: large;\\n    color: var(--text-color);\\n}\\n\\na{\\n    color:antiquewhite;\\n}\\n\\n.test{\\n    height: 35rem;\\n    background: url(\" + ___CSS_LOADER_URL_REPLACEMENT_0___ + \") no-repeat center center ;\\n    -webkit-background-size:contain;\\n    -moz-background-size:contain;\\n    -o-background-size:contain;\\n    background-size:contain;\\n    background-position: 0 0;  \\n}\\n\\n.test2{\\n    width: 80%;\\n}\\n\\nform div {\\n    display: flex;\\n    flex-direction: row;\\n    height: auto;\\n    width: 200%;\\n}\\n\\n.autocompleteItems {\\n    position: absolute;\\n    border: 1px solid #d4d4d4;\\n    border-bottom: none;\\n    border-top: none;\\n    z-index: 99;\\n    background-color: white;\\n    flex-direction: column;\\n\\n}\\n\\n.autocompleteItems div {\\n    padding: 10px;\\n    margin-left: 0%;\\n    cursor: pointer;\\n    background-color: #fff;\\n    border-bottom: 1px solid #d4d4d4;\\n}\\n\\n.autocompleteItems div:hover {\\n    background-color: #e9e9e9;\\n}\\n\\n.autocompleteActive {\\n    background-color: DodgerBlue !important;\\n    color: #ffffff;\\n}\\n\\n#areasSection, #allCategories {\\n    margin-right:auto;\\n    margin-left:auto;\\n    width: 63%;\\n}\\n\\n#areasSection button {\\n    margin-left: 2%;\\n}\\n\\n#areasSection h1, #allCategories h1 {\\n    margin-top: 5%;\\n    margin-bottom: 5%;\\n}\\n\\n #areas, #categories {\\n    display: flex;\\n    flex-flow: row wrap;\\n    flex-direction: row;\\n    justify-content:space-around;\\n}\\n\\n#areas div {\\n    width: 28%;\\n    background: rgb(217,203,203);\\n    background: linear-gradient(0deg, rgba(255,255,255,1) 36%, rgb(201, 246, 173) 100%);\\n}\\n\\n#areas div p {\\n    text-align: center;\\n}\\n\\n#areas div:hover, #categories div:hover {\\n    opacity: 0.4;\\n    cursor:pointer;\\n}\\n\\n#categories div {\\n    width: 40%;\\n    margin-top: 1%;\\n    background: rgb(255,255,255);\\n    background: linear-gradient(30deg, rgba(255,255,255,1) 36%, rgba(255,215,130,1) 100%);\\n}\\n\\n#categories div div {\\n    width: auto;\\n}\\n\\nfooter{\\n    margin-top: 10%;\\n    padding-bottom: 30%;\\n    width: 100%;\\n    height: 35rem;\\n    background: url(\" + ___CSS_LOADER_URL_REPLACEMENT_1___ + \") no-repeat center center;\\n    -webkit-background-size:contain;\\n    -moz-background-size:contain;\\n    -o-background-size:contain;\\n    background-size:contain;\\n    background-position: bottom;  \\n    background-color: #782e32;\\n    color: #e9e9e9;\\n}\\n\\nfooter div div {\\n    display: flex;\\n    flex-direction: row;\\n    justify-content: space-around;\\n    align-content: center;\\n}\\n\\n#cards .card {\\n    max-width: 30%;\\n}\\n\\n.onFooter {\\n    flex-direction: column;\\n}\\n\\nimg.icon\\n{\\n    width: 50px;\\n}\\n\\n@media (max-width: 575px) {\\n    .test {\\n        width: 100%;\\n        height: 15rem;\\n    }\\n    .test2 {\\n        flex-direction: row;\\n        width: 90%;\\n    }\\n    form {\\n        width: 60%;\\n    }\\n    form div {\\n        width: 100%;\\n    }\\n    #areasSection, #allCategories {\\n        width: 90%;\\n    }\\n    #categories div {\\n        width: 42%;\\n    }\\n    footer {\\n        height: 35rem;\\n    }\\n\\n    #cards {\\n        display: flex;\\n        flex-direction: column;\\n    }\\n    \\n    #cards .card{\\n        align-self: center;\\n        width: 55%;\\n        height: 55%;\\n        font-size: small;\\n    }\\n}\\n\\n@media (min-width: 576px) and (max-width: 767px) {\\n    .test {\\n        width: 60%;\\n        height: 15rem;\\n    }\\n    .test2 {\\n        flex-direction: row;\\n        width: 100%;\\n    }\\n    form {\\n        width: 70%;\\n    }\\n    form div {\\n        width: 100%;\\n    }\\n    #areasSection, #allCategories {\\n        width: 90%;\\n    }\\n    footer {\\n        height: 22rem;\\n    }\\n    #cards .card{\\n        align-self: center;\\n        width: 25%;\\n        height: 55%;\\n        font-size: small;\\n    }\\n}\\n\\n/** dispositivos medianos (tablets) */\\n@media (min-width: 768px) and (max-width: 991px) {\\n    .test {\\n        width: 50%;\\n        height: 15rem;\\n    }\\n    .test2 {\\n        flex-direction: row;\\n        width: 100%;\\n    }\\n    form {\\n        width: 70%;\\n    }\\n    form div {\\n        width: 100%;\\n    }\\n    #areasSection, #allCategories {\\n        width: 90%;\\n    }\\n}\\n\\n/** dispositivos grandes (desktops) */\\n@media (min-width: 992px) and (max-width: 1199px) {\\n    form div {\\n        width: 100%;\\n    }\\n}\\n\\n/** dispositivos extra grandes (monitores grandes, tvs) */\\n@media (min-width: 1200px) {\\n\\n}\\n\\n@media screen and (min-width: 2560px) {\\n\\n}\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://proyecto/./css/style.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n\n      content += cssWithMappingToString(item);\n\n      if (needLayer) {\n        content += \"}\";\n      }\n\n      if (item[2]) {\n        content += \"}\";\n      }\n\n      if (item[4]) {\n        content += \"}\";\n      }\n\n      return content;\n    }).join(\"\");\n  }; // import a list of modules into the list\n\n\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\n//# sourceURL=webpack://proyecto/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (url, options) {\n  if (!options) {\n    options = {};\n  }\n\n  if (!url) {\n    return url;\n  }\n\n  url = String(url.__esModule ? url.default : url); // If url is already wrapped in quotes, remove them\n\n  if (/^['\"].*['\"]$/.test(url)) {\n    url = url.slice(1, -1);\n  }\n\n  if (options.hash) {\n    url += options.hash;\n  } // Should url be wrapped?\n  // See https://drafts.csswg.org/css-values-3/#urls\n\n\n  if (/[\"'() \\t\\n]|(%20)/.test(url) || options.needQuotes) {\n    return \"\\\"\".concat(url.replace(/\"/g, '\\\\\"').replace(/\\n/g, \"\\\\n\"), \"\\\"\");\n  }\n\n  return url;\n};\n\n//# sourceURL=webpack://proyecto/./node_modules/css-loader/dist/runtime/getUrl.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://proyecto/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./css/style.css":
/*!***********************!*\
  !*** ./css/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ \"./node_modules/css-loader/dist/cjs.js!./css/style.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://proyecto/./css/style.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n\n  return updater;\n}\n\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://proyecto/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n/* istanbul ignore next  */\n\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n\n    memo[target] = styleTarget;\n  }\n\n  return memo[target];\n}\n/* istanbul ignore next  */\n\n\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n\n  target.appendChild(style);\n}\n\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://proyecto/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\n\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://proyecto/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\n\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://proyecto/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n\n  var needLayer = typeof obj.layer !== \"undefined\";\n\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n\n  css += obj.css;\n\n  if (needLayer) {\n    css += \"}\";\n  }\n\n  if (obj.media) {\n    css += \"}\";\n  }\n\n  if (obj.supports) {\n    css += \"}\";\n  }\n\n  var sourceMap = obj.sourceMap;\n\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  options.styleTagTransform(css, styleElement, options.options);\n}\n\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n\n  styleElement.parentNode.removeChild(styleElement);\n}\n/* istanbul ignore next  */\n\n\nfunction domAPI(options) {\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\n\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://proyecto/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\n\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://proyecto/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./assets/IMG_3903.jpeg":
/*!******************************!*\
  !*** ./assets/IMG_3903.jpeg ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"78e2666c9ec35a78eb6c.jpeg\";\n\n//# sourceURL=webpack://proyecto/./assets/IMG_3903.jpeg?");

/***/ }),

/***/ "./assets/footer_03_04.jpg":
/*!*********************************!*\
  !*** ./assets/footer_03_04.jpg ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"d69c99f0f5bc6fb0fd69.jpg\";\n\n//# sourceURL=webpack://proyecto/./assets/footer_03_04.jpg?");

/***/ }),

/***/ "./assets/github-2.svg":
/*!*****************************!*\
  !*** ./assets/github-2.svg ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"30b37a213a44c8bd6da7.svg\";\n\n//# sourceURL=webpack://proyecto/./assets/github-2.svg?");

/***/ }),

/***/ "./assets/web_image_01.jpg":
/*!*********************************!*\
  !*** ./assets/web_image_01.jpg ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"00318c7d6e2a2d6e5f1d.jpg\";\n\n//# sourceURL=webpack://proyecto/./assets/web_image_01.jpg?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./js/main.js");
/******/ 	
/******/ })()
;