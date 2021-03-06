'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.isImage = isImage;
exports.isDoc = isDoc;
exports.filterImageFiles = filterImageFiles;
exports.filterDocFiles = filterDocFiles;
exports.filterAllowedFiles = filterAllowedFiles;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FileAPI = require('fileapi');
var IMAGE_TYPES = /^image\/(jpe?g|png|gif|jf?if|tiff?)$/i;

function isImage(file) {
  return IMAGE_TYPES.test(file.type);
}

function isDoc(file) {
  return !isImage(file);
}

function filterImageFiles(payload) {
  return new _promise2.default(function (resolve) {
    if (payload instanceof Event) FileAPI.getFiles(payload, isImage, resolve);else FileAPI.filterFiles(payload, isImage, resolve);
  });
}

function filterDocFiles(payload) {
  return new _promise2.default(function (resolve) {
    if (payload instanceof Event) FileAPI.getFiles(payload, isDoc, resolve);else FileAPI.filterFiles(payload, isDoc, resolve);
  });
}

function filterAllowedFiles(payload, allowedFileTypes) {
  var allowedFilter = new RegExp(allowedFileTypes.join('|') + '$', 'i');

  return new _promise2.default(function (resolve) {
    if (payload instanceof Event) FileAPI.getFiles(payload, function (file) {
      return allowedFilter.test(file.type);
    }, resolve);else FileAPI.filterFiles(payload, function (file) {
      return allowedFilter.test(file.type);
    }, resolve);
  });
}