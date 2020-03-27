// 依据Mui，独立出弹框部分,避免pc上浏览器报错

// 生成弹框
function createShowBox() {
    var showbox = document.createElement("span");
    showbox.setAttribute("id", "showBox")
    showbox.setAttribute("style", "display:none")
    showbox.innerHTML = '  <div class="mui-popup mui-popup-in deep-popupbox" style="display:block">' +
        '<div class="mui-popup-inner">' +
        '<span class="deep-sizebox"></span>'+
        '<div class="mui-popup-title"></div>' +
        '<div class="mui-popup-text"></div>' +
        ' </div>' +
        '<div class="mui-popup-buttons">' +
        ' <span class="mui-popup-button mui-popup-button-bold"></span>' +
        '  </div>' +
        '</div>' +
        '<div class="mui-popup-backdrop mui-active" style="display: block;"></div>'
    document.body.appendChild(showbox)
}
// 封装comfirm
function showComfirm(text, title, btnarr, action,config) {
    if (!(isArray(btnarr) && btnarr.length == 2)) {
        console.error("not support,arr length max 2")
        return
    }
    var showBox = document.getElementById("showBox")
    if (showBox) {
        showBox.parentNode.removeChild(showBox)
        // 处理点击监听移出
    }
    createShowBox()
    var showBox = document.getElementById("showBox")
    if (showBox) {
        var _title = showBox.getElementsByClassName("mui-popup-title")[0];
        var _text = showBox.getElementsByClassName("mui-popup-text")[0];
        var _buttons = showBox.getElementsByClassName("mui-popup-buttons")[0];
        if (_title && _text && _buttons) {
            _title.innerText = title;
            _text.innerText = text;
            var btnbox = ""
            for (var i = 0; i < btnarr.length; i++) {
                if (i == btnarr.length - 1) {
                    btnbox += '<span class="mui-popup-button mui-popup-button-bold">' + btnarr[i] + '</span>'
                } else {
                    btnbox += '<span class="mui-popup-button ">' + btnarr[i] + '</span>'
                }
            }
            _buttons.innerHTML = btnbox;
            // 按键监听
            var _button = _buttons.getElementsByClassName("mui-popup-button")
            for (var i = 0; i < _button.length; i++) {
                _button[i].addEventListener("click", function (event) {
                    var index = [].indexOf.call(this.parentNode.childNodes, this)
                    console.log(index)
                    action(index)
                    showBox.parentNode.removeChild(showBox)
                    event.preventDefault();
                })
            }

        }
        for (var key in config) {
            if (config.hasOwnProperty(key)) {
                var value = config[key];
                switch (key) {
                    case "isMin":
                        if(value){
                            setMinBox(showBox,text)
                        }
                        break;
                
                    default:
                        break;
                }
            }
        }
        showBox.style.display = "block"
    }
}

/**
 * @description: 设置最小化功能
 * @param {type} 
 * @return: 
 */
function setMinBox(dom,text){
    var deepSizebox=dom.getElementsByClassName("deep-sizebox")[0];
    var innerPopup=document.getElementsByClassName("mui-popup-inner")[0]
    deepSizebox.innerHTML="<span class='deep-minsize' onclick='besmall("+text+")'></span>"
    innerPopup.style.paddingTop="25px"
    deepSizebox.style.display="block"
    // deepSizebox.
}

/**
 * @description: 展示提示框变小
 * @param {type} 
 * @return: 
 */
function besmall(){

}


// 默认弹框
function showFunction(text, title, action) {
    var showBox = document.getElementById("showBox")
    if (showBox) {
        showBox.parentNode.removeChild(showBox)
        // 处理点击监听移出
    }
    createShowBox()

    var showBox = document.getElementById("showBox")
    if (showBox) {
        var _title = showBox.getElementsByClassName("mui-popup-title")[0];
        var _text = showBox.getElementsByClassName("mui-popup-text")[0];
        var _button = showBox.getElementsByClassName("mui-popup-button")[0];
        if (_title && _text && _button) {
            _title.innerText = title;
            _text.innerText = text;
            var typeAction = typeof (action)
            switch (typeAction) {
                case 'string' || 'number':
                    _button.innerText = action;
                    break;
                case 'function':
                    _button.innerText = "确定";
                    break;

                default:
                    break;
            }
            _button.addEventListener("click", function (e) {
                switch (typeof (action)) {
                    case 'string' || 'number':

                        console.log(1)
                        showBox.parentNode.removeChild(showBox)
                        // showBox.style.display = "none"
                        event.preventDefault();
                        break;
                    case 'function':
                        console.log(2)
                        showBox.parentNode.removeChild(showBox)
                        // showBox.style.display = "none"
                        e.preventDefault()
                        action()
                        break;
                    default:
                        console.error("error type action")
                        break;
                }
            })
        }
        showBox.style.display = "block"
    }
}
/**
 * @description: 判断是否是数组
 * @param {type} 
 * @return: 
 */
// 判断是否是数组
function isArray(o) {
    return Object.prototype.toString.call(o) == '[object Array]';
}
