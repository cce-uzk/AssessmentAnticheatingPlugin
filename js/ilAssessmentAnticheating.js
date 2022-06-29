<!-- ANTICHEAT -->
<div className="ilNoDisplay">
  <svg id="test-active-svg" xmlns="http://www.w3.org/2000/svg"
       xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%" spreadMethod="pad"
                      gradientTransform="rotate(45)">
        <stop offset="0%" stop-color="#fbfbfb" stop-opacity="0.1"/>
        <stop offset="100%" stop-color="#32475B" stop-opacity="1"/>
      </linearGradient>
      <pattern id="pattern" x="0" y="0" width="90" height="22" patternUnits="userSpaceOnUse"
               patternTransform="rotate(-35)">
        <text id="test-active-svg-content" x="0" y="20"
              style="font-family:Verdana; font-size:20px; font-weight:bold; stroke:none; fill:#32475B; fill-opacity:0.15">active_id
        </text>
      </pattern>
    </defs>
    <rect x="0" y="0" rx="10" ry="10" width="100%" height="100%"
          style=" fill: url( #gradient); fill-opacity:0.3;"/>
    <rect x="0" y="0" rx="10" ry="10" width="100%" height="100%"
          style=" fill: url( #pattern); fill-opacity:0.3;"/>
  </svg>
</div>

<script>
  if (document.getElementById("tst_output") && document.getElementById("tst_output").classList.contains("tst-with-watermark")) {
    var elem = document.getElementById("tst_output");
    var active_id = elem.getAttribute("data-active-id");
    document.getElementById("test-active-svg-content").innerHTML = active_id;
    var svgElement = document.querySelector("#test-active-svg");
    var svgText = (new XMLSerializer()).serializeToString(svgElement);
    var encodedData = window.btoa(svgText);
    elem.style.backgroundImage = 'url(data:image/svg+xml;base64,'+ encodedData + ')';
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

    function anticheat (e) {
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
      for (let i=0; i<iframes.length; i++) {
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
</script>
