/**
 * background.js
 * Copyright (c) 2018 fumidzuki
 * Licensed under MIT (https://github.com/XXXXX/LICENSE)
 */
// https://developer.mozilla.org/ja/docs/Mozilla/Add-ons/WebExtensions/Intercept_HTTP_requests
async function rewriteHeaders(event) {
  const stores = await browser.storage.local.get(['options_enable', 'options'])
  if (!stores.options_enable) {
    return
  }
  stores.options.forEach(function (v) {
    if (v.disabled) {
      return
    }
    if ("add" === v.operation) {
      event.requestHeaders.push({
        name: v.key,
        value: v.value
      })
    } else if ("modify" === v.operation) {
      event.requestHeaders.forEach(function (element) {
        if (element.name !== v.key) {
          return
        }
        element.value = v.value
      })
    } else if ("remove" === v.operation) {
      event.requestHeaders.forEach(function (element, index, array) {
        if (element.name !== v.key) {
          return
        }
        array.splice(index, 1)
      })
    }
  })
  return {
    requestHeaders: event.requestHeaders
  }
}
async function showToolbarIcon() {
  const options = await browser.storage.local.get(['options_enable'])
  if (!options) {
    return
  }
  let icon = 'icons/icon-off-48.svg'
  if (options.options_enable) {
    icon = 'icons/icon-on-48.svg'
  }
  browser.browserAction.setIcon({
    path: icon
  })
}

function initizlize() {
  // HTTPリクエスト送信時のヘッダ情報についてのリスナー情報を登録する
  browser.webRequest.onBeforeSendHeaders.addListener(
    rewriteHeaders, {
      urls: ["<all_urls>"],
    }, ["blocking", "requestHeaders"]
  )
  // 
  showToolbarIcon()
}
// 初期化処理を実施する
initizlize()
