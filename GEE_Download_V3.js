// ==UserScript==
// @name        gee downloadV3_eng
// @namespace   Violentmonkey Scripts
// @match       https://code.earthengine.google.com/
// @require     https://code.jquery.com/jquery-1.12.4.js
// @require     https://code.jquery.com/ui/1.12.1/jquery-ui.js
// @version     0.0.2
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// @author      Saibo Li, IGSNRR,email:lisb@lreis.ac.cn
// @updateURL   https://www.seibert.cn/
// @downloadURL https://www.seibert.cn/
// @description 2022/11/8 8:39
// ==/UserScript==
(function () {
  /***
   *
   * Note:
   * 1、make sure you has Tasks to download.
   * 2、ensure that data export parameters, such as the export file name and address, have been set.
   * 3、after steps 1 and 2 are satisfied, be sure to click the [Box] button first, and the [check box] will appear in front of each download task.
   * 4、you can choose your tasks, and then click [Do] button to download.
   * 5、if you want to choose all tasks,please click [All].
   * 6、you can click [Clc] button to cancel your choose.
   *
   * */

    GM_addStyle('#boxbtn,#btnOperate,#Allbtn,#Clearbtn,#Cancelbtn{color:black}');


    //var boxbtn_html = '<input class="" role="tab" aria-selected="false" style="user-select: none;" id="boxbtn" type="button" value="Checkbox">';
    var boxbtn_html = '<button class="goog-button" title="Checkbox" value="" id="boxbtn">Box</button>';
    var btn_html = '<button class="goog-button" title="Download" value="" id="btnOperate">Do</button>';
    var allbtn_html = '<button class="goog-button" title="All" value="" id="Allbtn">All</button>';
    var clearbtn_html = '<button class="goog-button" title="Clearbtn" value="" id="Clearbtn">Clc</button>';
    var cancelbtn_html = '<input class="goog-tab" role="tab" aria-selected="false" style="user-select: none;" id="Cancelbtn" type="button" value="Cancel" >';
    var ul_tag =$("div.panel.editor-panel>div.header");
    //ul_tag =$(ul_tag)
    //document.getElementsByClassName('goog-splitpane-second-container')[1].querySelector('ee-tab-panel').shadowRoot.querySelector('.header');
     //$("div.goog-splitpane-second-container>div.tab-panel>div.header>div")
    if (ul_tag) {
        ul_tag.append(boxbtn_html);
        ul_tag.append(allbtn_html);
        ul_tag.append(clearbtn_html);
        ul_tag.append(btn_html);
        //ul_tag.append(cancelbtn_html);
    }

    $(function () {
         var taskList = null
         var cancelList = document.getElementsByClassName('task legacy type-EXPORT_IMAGE running-on-backend')
         var cancelList2 = document.getElementsByClassName('task legacy type-EXPORT_IMAGE submitted-to-backend')
         var yes = document.getElementsByClassName("modal-dialog jfk-confirm")
         $("#boxbtn").click(function () {
            taskList = document.querySelector('#task-pane').shadowRoot.querySelectorAll(".content")
            for(var i =0;i<taskList.length;i++){
              var task = taskList[i]
              task.innerHTML ='<input type="checkbox" name="category" value="download" />'+task.innerText
            }
         })

        $("#btnOperate").click(function () {
          var arr = new Array();
          taskList = document.querySelector('#task-pane').shadowRoot.querySelectorAll(".content")
          var runs = document.querySelector('#task-pane').shadowRoot.querySelectorAll(".run-button")
          for (var i = 0; i < taskList.length; i++) {
              if (taskList[i].children[0].checked) {
                  arr.push(taskList[i].innerText);
                  runs[i].click();
              }
          }
          alert("选择数据为：" + arr);
          setTimeout(
              function(){
                  var taskDialog = document.querySelectorAll("ee-image-config-dialog")
                  taskDialog.forEach(function(e) {e.shadowRoot.querySelector("ee-dialog").shadowRoot.querySelector("paper-dialog").querySelector(".ok-button").click()})
              },2 * 1000 );
            setTimeout(
                function(){
                    var taskDialog = document.querySelectorAll("ee-table-config-dialog")
                    taskDialog.forEach(function(e) {e.shadowRoot.querySelector("ee-dialog").shadowRoot.querySelector("paper-dialog").querySelector(".ok-button").click()})
                },2 * 1000 );
        });

        $("#Allbtn").click(function () {
              taskList = document.querySelector('#task-pane').shadowRoot.querySelectorAll(".content")
              for(var i =0;i<taskList.length;i++){
                taskList[i].children[0].checked = true
              }
        });

        $("#Clearbtn").click(function () {
           taskList = document.querySelector('#task-pane').shadowRoot.querySelectorAll(".content")
           for(var i =0;i<taskList.length;i++){
              var task = taskList[i]
              task.innerHTML ='<input type="checkbox" name="category" value="download" />'+task.innerText
            }
        });
       $("#Cancelbtn").click(function () {
           var cancelList = document.querySelector('#task-pane').shadowRoot.querySelectorAll("ee-remote-task-list")[0].shadowRoot.querySelectorAll(".submitted-to-backend")
            for(var i =0;i<cancelList.length;i++){
              var cancel = cancelList[i].children[3].click()
              var yescancel = yes[i].children[2].children[0].click()
            }
          for(var i =0;i<cancelList2.length;i++){
              var cancel = cancelList2[i].children[3].click()
              var yescancel = yes[i].children[2].children[0].click()
            }
         })

    });
})();
