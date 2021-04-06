import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import { isVNode as _isVNode, createVNode as _createVNode } from "vue";
import classnames from 'classnames';
import { computed, defineComponent, ref } from 'vue';
import Flex from '../../flex';
import TouchFeedback from '../../vmc-feedback';
import HtmlComponent from './html.vue';

function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !_isVNode(s);
}

var word = "<svg class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\"><defs><style type=\"text/css\"></style></defs><path d=\"M64 439.3h520v520H64v-520z m50 470h420v-420H114v420z m843-538.1V940H624.1v-50H907V391.9l-20.7-20.7H649.8V134.7L629.1 114H297v287.6h-50V64h402.8L957 371.2z m-120.7-50L699.8 184.7v136.5h136.5zM377.8 842.9h-53.6l-5.8-188.4-93.9 188.4h-54.7l-9.7-257.7H212l2.3 180.4 88.4-180.4h57.5l6 178.4 84.9-178.4h51.3L377.8 842.9z\" fill=\"#8a8a8a\" ></path></svg>";
var pdf = "<svg class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\"><defs><style type=\"text/css\"></style></defs><path d=\"M977 371.2V940h-82.9v-50H927V391.9l-20.7-20.7H669.8V134.7L649.1 114H317v271.6h-50V64h402.8L977 371.2z m-120.7-50L719.8 184.7v136.5h136.5z m-76.8 161.6v422.3H117.2V482.8h662.3m48.9-48.8h-760v520h760V434z m-670 380V574h80c30.3 0 50.1 1.2 59.3 3.6 14.2 3.6 26 11.4 35.6 23.5 9.5 12.1 14.3 27.6 14.3 46.7 0 14.7-2.8 27.1-8.3 37.2-5.5 10-12.5 17.9-21 23.7-8.5 5.7-17.1 9.5-25.9 11.4-11.9 2.3-29.1 3.4-51.7 3.4h-32.5V814h-49.8z m49.9-199.4v68.1h27.3c19.7 0 32.8-1.3 39.4-3.8 6.6-2.5 11.8-6.4 15.6-11.8 3.8-5.3 5.6-11.6 5.6-18.7 0-8.7-2.6-15.9-7.9-21.6-5.3-5.7-12-9.2-20-10.6-6-1.1-17.9-1.6-35.9-1.6h-24.1zM353.9 574H445c20.6 0 36.2 1.5 47 4.6 14.5 4.1 26.9 11.5 37.2 22.1 10.3 10.6 18.2 23.5 23.6 38.9 5.4 15.3 8.1 34.2 8.1 56.7 0 19.8-2.5 36.8-7.6 51.1-6.2 17.5-15 31.6-26.5 42.4-8.6 8.2-20.3 14.6-35 19.2-11 3.4-25.7 5.1-44.1 5.1h-93.8V574z m49.8 40.6v159H441c13.9 0 24-0.8 30.2-2.3 8.1-2 14.8-5.3 20.1-10 5.3-4.7 9.7-12.4 13.1-23.2 3.4-10.7 5.1-25.4 5.1-44s-1.7-32.8-5.1-42.7c-3.4-9.9-8.1-17.7-14.2-23.2-6.1-5.6-13.8-9.3-23.1-11.3-7-1.5-20.6-2.3-40.9-2.3h-22.5zM569.1 814V574h169.3v40.6H618.9v56.8H722V712H618.9v102h-49.8z\" fill=\"#8a8a8a\"></path></svg>";
var txt = "<svg class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\"><defs><style type=\"text/css\"></style></defs><path d=\"M724.5 298.8H841L724.5 182.3v116.5z m159.4-13.6c17.3 17.3 26.9 40.7 26.9 65.1v507.5c0 29.3-24 53.2-53.2 53.2H325.2c-29.3 0-53.2-24-53.2-53.2v-39.9h39.9v39.9c0 7.2 6.1 13.3 13.3 13.3h532.3c7.2 0 13.3-6.1 13.3-13.3V350.3c0-3.9-0.5-7.8-1.4-11.5H684.6v-185c-3.8-0.9-7.6-1.3-11.5-1.4H325.2c-7.2 0-13.3 6.1-13.3 13.3v119.8H272V165.7c0-29.3 24-53.2 53.2-53.2H673c24.4 0 47.8 9.7 65.1 27l145.8 145.7zM631.3 478.5v-39.9h186.3v39.9H631.3z m0 119.8v-39.9h186.3v39.9H631.3z m0 119.8v-39.9h186.3v39.9H631.3z m-519 59.8V325.4h452.5v452.5H112.3z m343-328.8v-39.9H221.8v39.9h93.4v245.1h46.7V449.1h93.4z m0 0\" fill=\"#8a8a8a\" ></path></svg>";
var excel = "<svg class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\"><defs><style type=\"text/css\"></style></defs><path d=\"M476.7 550.4v368h-368v-368h368m40-40h-448v448h448v-448zM161.4 877.6l110.7-149.2-97.7-137.1h45.1l52 73.4c10.8 15.2 18.5 27 23 35.2 6.4-10.4 13.9-21.3 22.7-32.6l57.6-76H416l-100.6 135 108.4 151.4H377l-72-102.3c-4-5.9-8.2-12.2-12.5-19.1-6.4 10.4-10.9 17.6-13.7 21.5l-71.9 99.8h-45.5z m633.9-349.4H580.6v40h214.8v-40z m0 144.4H580.6v40h214.8v-40zM683.1 64H215.3v397h40V104h411.2l16.6 16.6v215.6h215.6l16.6 16.6V920H580.6v40h374.8V336.2L683.1 64z m40 232.2V160.6l135.6 135.6H723.1z m72.2 87.6h-420v40h420v-40z\" fill=\"#8a8a8a\" ></path></svg>";
var file = "<svg class=\"icon\"viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\"><defs><style type=\"text/css\"></style></defs><path d=\"M859.428571 146.285714v512a18.285714 18.285714 0 0 1-5.339428 12.946286l-219.428572 219.428571A18.285714 18.285714 0 0 1 621.714286 896H182.857143a18.285714 18.285714 0 0 1-18.285714-18.285714V146.285714a18.285714 18.285714 0 0 1 18.285714-18.285714h658.285714a18.285714 18.285714 0 0 1 18.285714 18.285714z m-36.571428 18.285715h-621.714286v694.857142h413.001143l208.713143-208.713142V164.571429zM365.714286 347.428571a18.285714 18.285714 0 0 1 0-36.571428h292.571428a18.285714 18.285714 0 1 1 0 36.571428h-292.571428z m0 146.285715a18.285714 18.285714 0 1 1 0-36.571429h292.571428a18.285714 18.285714 0 1 1 0 36.571429h-292.571428z m274.285714 182.857143V768a18.285714 18.285714 0 1 1-36.571429 0v-109.714286a18.285714 18.285714 0 0 1 18.285715-18.285714h109.714285a18.285714 18.285714 0 1 1 0 36.571429h-91.428571z\" fill=\"#8a8a8a\"></path></svg>";

function getIcon(image) {
  if (image.file) {
    var type = image.file.type;

    if (type) {
      if (type.endsWith('.document') || type.endsWith('msword')) {
        return word;
      } else if (type.endsWith('.sheet') || type.endsWith('excel')) {
        return excel;
      } else if (type === 'text/plain') {
        return txt;
      } else if (type.endsWith('pdf')) {
        return pdf;
      } else {
        return file;
      }
    }

    return file;
  } else {
    var u = new URL(image.url);

    if (u.pathname.endsWith('.pdf')) {
      return pdf;
    } else if (u.pathname.endsWith('.doc') || u.pathname.endsWith('.docs')) {
      return word;
    } else if (u.pathname.endsWith('.xls') || u.pathname.endsWith('.xlsx')) {
      return excel;
    } else if (u.pathname.endsWith('.txt')) {
      return txt;
    } else {
      return file;
    }
  }
}

function isImage(image) {
  if (image.file) {
    return image.file.type.startsWith('image/');
  } else {
    return ['.png', '.jpg', '.jpeg', '.bmp'].some(function (it) {
      return image.url.includes(it);
    });
  }
}

export default defineComponent({
  install: null,
  name: 'ImagePicker',
  props: {
    onChange: {},
    onImageClick: {},
    onFail: {},
    prefixCls: {
      type: String,
      default: 'am-image-picker'
    },
    value: {
      default: function _default() {
        return [];
      }
    },
    selectable: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    accept: {
      type: String,
      default: '*'
    },
    length: {
      type: Number,
      default: 4
    },
    maxLength: {
      type: Number,
      default: 8
    },

    /**
     * 允许上传的最大字节数
     */
    maxSize: {
      type: Number,
      default: 0
    }
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var fileSelectorInputRef = ref(null);
    var fileSelectorInput = computed(function () {
      return fileSelectorInputRef.value;
    });
    var showSelector = computed(function () {
      return props.selectable && (!props.value || props.value.length < props.length);
    });

    var getOrientation = function getOrientation(file, callback) {
      var reader = new FileReader();

      reader.onload = function (e) {
        var view = new DataView(e.target.result);

        if (view.getUint16(0, false) !== 0xffd8) {
          return callback(-2);
        }

        var length = view.byteLength;
        var offset = 2;

        while (offset < length) {
          var marker = view.getUint16(offset, false);
          offset += 2;

          if (marker === 0xffe1) {
            var tmp = view.getUint32(offset += 2, false);

            if (tmp !== 0x45786966) {
              return callback(-1);
            }

            var little = view.getUint16(offset += 6, false) === 0x4949;
            offset += view.getUint32(offset + 4, little);
            var tags = view.getUint16(offset, little);
            offset += 2;

            for (var i = 0; i < tags; i++) {
              if (view.getUint16(offset + i * 12, little) === 0x0112) {
                return callback(view.getUint16(offset + i * 12 + 8, little));
              }
            }
          } else if ((marker & 0xff00) !== 0xff00) {
            break;
          } else {
            offset += view.getUint16(offset, false);
          }
        }

        return callback(-1);
      };

      reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
    };

    var getRotation = function getRotation() {
      var orientation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var imgRotation = 0;

      switch (orientation) {
        case 3:
          imgRotation = 180;
          break;

        case 6:
          imgRotation = 90;
          break;

        case 8:
          imgRotation = 270;
          break;

        default:
      }

      return imgRotation;
    };

    var removeImage = function removeImage(index) {
      var newImages = [];
      var value = props.value || [];
      value.forEach(function (image, idx) {
        if (index !== idx) {
          newImages.push(image);
        }
      });
      emit('update:value', newImages, 'remove', index);
      emit('change', newImages, 'remove', index);
    };

    var addImage = function addImage(imgItem) {
      var newImages = props.value ? _toConsumableArray(props.value) : [];
      imgItem.forEach(function (img) {
        if (newImages.length < props.maxLength) {
          newImages.push(img);
        }
      });
      emit('update:value', newImages, 'add');
      emit('change', newImages, 'add');
    };

    var onImageClick = function onImageClick(image, index) {
      emit('click', image, index);
    };

    var onFileChange = function onFileChange(e) {
      if (e && e.target && e.target.files && e.target.files.length) {
        var files = e.target.files;
        var imageParsePromiseList = [];

        for (var i = 0; i < files.length; i++) {
          imageParsePromiseList.push(parseFile(files.item(i), i));
        }

        Promise.all(imageParsePromiseList).then(function (imageItems) {
          return addImage(imageItems);
        }).catch(function (error) {
          emit('fail', error);
        });
      }

      if (e && e.target) {
        e.target.value = '';
      }
    };

    var parseFile = function parseFile(file, index) {
      return new Promise(function (resolve, reject) {
        if (props.maxSize && file.size > props.maxSize) {
          reject('文件大小超出限制');
        } else {
          var reader = new FileReader();

          reader.onload = function (e) {
            var dataURL = e.target.result;

            if (!dataURL) {
              reject("Fail to get the ".concat(index, " image"));
              return;
            }

            var orientation = 1;
            getOrientation(file, function (res) {
              // -2: not jpeg , -1: not defined
              if (res > 0) {
                orientation = res;
              }

              resolve({
                url: dataURL,
                orientation: orientation,
                file: file
              });
            });
          };

          reader.readAsDataURL(file);
        }
      });
    };

    var localIsImage = function localIsImage(image) {
      return isImage(image) || props.accept && props.accept.includes('image/');
    };

    return {
      fileSelectorInput: fileSelectorInput,
      showSelector: showSelector,
      getOrientation: getOrientation,
      getRotation: getRotation,
      removeImage: removeImage,
      addImage: addImage,
      onImageClick: onImageClick,
      onFileChange: onFileChange,
      parseFile: parseFile,
      localIsImage: localIsImage
    };
  },
  render: function render() {
    var _this = this;

    var prefixCls = this.prefixCls,
        _this$value = this.value,
        value = _this$value === void 0 ? [] : _this$value,
        selectable = this.selectable,
        multiple = this.multiple,
        accept = this.accept;
    var imgItemList = [];
    var count = parseInt('' + this.length, 10);

    if (count <= 0) {
      count = 4;
    }

    var wrapCls = classnames("".concat(prefixCls));
    value.forEach(function (image, index) {
      if (index === _this.maxLength) {
        return;
      }

      var imgStyle = {
        backgroundImage: _this.localIsImage(image) ? "url(".concat(image.url, ")") : 'none',
        transform: "rotate(".concat(_this.getRotation(image.orientation), "deg)")
      };
      var itemStyle = {};
      imgItemList.push(_createVNode(Flex.Item, {
        "key": "item-".concat(index),
        "style": itemStyle
      }, {
        default: function _default() {
          return [_createVNode("div", {
            "key": index,
            "class": "".concat(prefixCls, "-item")
          }, [_createVNode("div", {
            "class": "".concat(prefixCls, "-item-remove"),
            "role": "button",
            "aria-label": "Click and Remove this image",
            "onClick": function onClick() {
              _this.removeImage(index);
            }
          }, null), // @ts-ignore
          _createVNode(HtmlComponent, {
            "class": "".concat(prefixCls, "-item-content"),
            "aria-label": "Image can be clicked",
            "onClick": function onClick() {
              _this.onImageClick(image, index);
            },
            "html": imgStyle.backgroundImage === 'none' ? getIcon(image) : null,
            "style": imgStyle
          }, null)])];
        }
      }));
    });

    var selectEl = _createVNode(Flex.Item, {
      "key": "select"
    }, {
      default: function _default() {
        return [_createVNode(TouchFeedback, {
          "activeClassName": "".concat(prefixCls, "-upload-btn-active")
        }, {
          default: function _default() {
            return [_createVNode("div", {
              "class": "".concat(prefixCls, "-item ").concat(prefixCls, "-upload-btn"),
              "role": "button",
              "aria-label": "选择并添加图片"
            }, [_createVNode("input", {
              "ref": "fileSelectorInput",
              "type": "file",
              "accept": accept,
              "onChange": function onChange(v) {
                _this.onFileChange(v);
              },
              "multiple": multiple
            }, null)])];
          }
        })];
      }
    });

    var allEl = selectable && imgItemList.length < this.maxLength ? imgItemList.concat([selectEl]) : imgItemList;
    var length = allEl.length;

    if (length !== 0 && length % count !== 0) {
      var blankCount = count - length % count;
      var fillBlankEl = [];

      for (var i = 0; i < blankCount; i++) {
        fillBlankEl.push(_createVNode(Flex.Item, {
          "key": "blank-".concat(i)
        }, null));
      }

      allEl = allEl.concat(fillBlankEl);
    }

    var flexEl = [];

    for (var _i = 0; _i < allEl.length / count; _i++) {
      var rowEl = allEl.slice(_i * count, _i * count + count);
      flexEl.push(rowEl);
    }

    var renderEl = flexEl.map(function (item, index) {
      return _createVNode(Flex, {
        "key": "flex-".concat(index)
      }, _isSlot(item) ? item : {
        default: function _default() {
          return [item];
        }
      });
    });
    return _createVNode("div", {
      "class": wrapCls
    }, [_createVNode("div", {
      "class": "".concat(prefixCls, "-list"),
      "role": "group"
    }, [renderEl])]);
  }
});