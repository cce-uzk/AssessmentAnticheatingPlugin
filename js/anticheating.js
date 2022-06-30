$(function() {
  if (document.getElementById("tst_output") && document.getElementById("tst_output").classList.contains("tst-with-watermark")) {
    var elem = document.getElementById("tst_output");
    var active_id = elem.getAttribute("data-active-id");
    document.getElementById("test-active-svg-content").innerHTML = active_id;
    var svgElement = document.querySelector("#test-active-svg");
    var svgText = (new XMLSerializer()).serializeToString(svgElement);
    var encodedData = window.btoa(svgText);
    elem.style.backgroundImage = 'url(data:image/svg+xml;base64,' + encodedData + ')';
    // ANTICHEAT print protect
    var printWatermark = " - " + active_id;
    $("#tst_output").attr('data-watermark', printWatermark.repeat(1000));
  }

  if (document.getElementById("tst_output") && document.getElementById("tst_output").classList.contains("tst-with-prevent-paste")) {
    //document.getElementById("tst_output").addEventListener('paste', e => e.preventDefault());
    //document.getElementById("tst_output").addEventListener('cut', e => e.preventDefault());
    //document.getElementById("tst_output").addEventListener('copy', e => e.preventDefault());

    document.getElementById("tst_output").addEventListener('paste', anticheat);
    document.getElementById("tst_output").addEventListener('cut', anticheat);
    document.getElementById("tst_output").addEventListener('copy', anticheat);
    document.body.addEventListener('contextmenu', e => e.preventDefault());

    function anticheat(e) {
      e.preventDefault();
      //scary favicon
      //var link = document.getElementById("custom_favicon");
      //link.parentNode. removeChild(link);
      //link.type = 'image/x-icon';
      //link.rel = 'shortcut icon';
      //link.href = './Customizing/global/skin/anticheat/images/favicons/anticheat/favicon.ico?v=' + Math.random().toString(36).substring(7);
      //document.getElementsByTagName('head')[0].insertBefore(link, document.getElementsByTagName('title')[0]);
    };

    //HIER TINYMCE berücksichtigen
    setTimeout(
      function() {
        var iframes = document.getElementsByTagName('iframe');
        var num = iframes.length;
        var style = document.createElement('style');
        style.textContent = 'body { ' +
          'background-color: rgba(255,255,255,0.5)!important; ' +
          '-webkit-touch-callout: none; ' +
          '-webkit-user-select: none; ' +
          '-moz-user-select: none; ' +
          '-ms-user-select: none; ' +
          'user-select: none; ' +
          '}';
        for (let i = 0; i < iframes.length; i++) {
          iframes[i].contentDocument.head.appendChild(style);
          iframes[i].contentDocument.documentElement.addEventListener('contextmenu', e => e.preventDefault());
          iframes[i].contentDocument.documentElement.addEventListener('paste', e => e.preventDefault());
          iframes[i].contentDocument.documentElement.addEventListener('cut', e => e.preventDefault());
          iframes[i].contentDocument.documentElement.addEventListener('copy', e => e.preventDefault());
        }
      }, 1500);
  }

  if ($("#tst_output.tst-with-prevent-txt-selection").length) {
    $(".ilc_page_title_PageTitle, " +
      ".ilc_qtitle_Title, " +
      ".answertext, " +
      ".ilc_qinput_TextInput, " +
      ".ilc_qanswer_Answer, " +
      ".ilAdditionalAssQuestionInstruction, " +
      ".ilc_question_Standard > .ilc_qtitle_Title" +
      "").attr('unselectable', 'on').css('user-select', 'none').on('selectstart dragstart', false);
  }
});