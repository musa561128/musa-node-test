(function () {
    // 「+」ボタン押下時に呼び出されます。
    let btnPlus_onclick = function (event) {
        document.myform.plusminus.value = document.myform.btn-plus.value;
        let $form = $("#form");
        $form.submit();
    };
   
    // 「-」ボタン押下時に呼び出されます。
    let btnMinus_onclick = function (event) {
        document.myform.plusminus.value = document.myform.btn-minus.value;
        let $form = $("#form");
        $form.submit();
    };

    // ドキュメント読み込み完了時に呼び出されます。
    var document_onready = function (event) {
        $("#btn-plus").on("click", btnPlus_onclick);
        $("#btn-minus").on("click", btnMinus_onclick)
    };
    
    $(document).ready(document_onready);
  })();