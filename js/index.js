/**
 * Created by 橙小white on 2017/6/25.
 */
var state="off";    //状态为关闭
var text=new Array();   //创建一个存储文本的数组
$("#send").click(Update);
$("input[type=text]").keypress(function (event) {
    console.log(event.keyCode);
    if(event.keyCode==13){
        Update();
    }
});
$("#hidden").click(Hidden);
$("#show").click(Show);
$("#empty").click(Empty);

/*清屏*/
function Empty() {
    $("#screen span").remove();
    text.splice(0,text.length);
    state="off";
}



/*隐藏弹幕同时弹幕继续运行*/
function Hidden() {
    $("#screen span").css("visibility","hidden");
    $("#hidden").toggle();
    $("#show").toggle();
    $("#txt").prop("readonly","readonly");
    $("#send").addClass("disabled");
    $("#empty").addClass("disabled");
}
function Show() {
    $("#screen span").css("visibility","visible");
    $("#show").toggle();
    $("#hidden").toggle();
    $("#txt").removeAttr("readonly");
    $("#send").removeClass("disabled");
    $("#empty").removeClass("disabled");
}


/*文本存储到数组中*/
function Update() {
    if($("#txt").val()==""){     //若用户发送空字符，则应无反应
        return
    }
    if(state=="off"){   //判断是否第一次发送文本
        state="on";
        text.push($("#txt").val());
        $("#txt").val("");
        Send(text);
    }
    else {
        text.push($("#txt").val());
        $("#txt").val("");
        Send(text);
    }
}

/*发送文本判断如何移动*/
function Send(arr) {
    if(arr.length<2){
        var txt=$("<span></span>").text(arr[0]);
        txt.prop("id",0);
        $("#screen").append(txt);
        SpanMove("#0",arr);
    } else {
        var id="#"+(arr.length-2);//获取倒数第二的元素id
//            console.log($(id).position().left);
//            $(id).animate({left:(0-$(id).width())+"px"},10000);
        if($(id).length>0){
            var differ=Math.round(Math.abs($(id).position().left-(0-$(id).width())));
            if(differ!=0){
                var txt=$("<span></span>").text(arr[arr.length-1]);
                txt.prop("id",arr.length-1);
                $("#screen").append(txt);
                var id="#"+(arr.length-1); //在建立一个局部id变量
                SpanMove(id,arr);
            }
        }else {
            arr.splice(0,arr.length-1);//因为之前文本弹幕已全部显示完全，所以把之前的元素清空
            var txt=$("<span></span>").text(arr[0]);
            txt.prop("id",0);
            var id="#"+(0);
            $("#screen").append(txt);
            SpanMove("#0",arr);
        }


    }
}

/*弹幕文本移动*/
function SpanMove(id,arr) {
    var top=getRandom(25);//获取随机高度
    $(id).css("top",top+"vw");
    $(id).css("color","rgb("+getRandom(255)+","+getRandom(255)+","+getRandom(255)+")");
    console.log(0-$(id).width());
    $(id).animate({left:(0-$(id).width())+"px"},10000);
//        console.log(id);
    Delete(id);
}

/*获取随机数*/
function getRandom(n){
    return Math.floor(Math.random()*n+1)
}

/*删除无用数组元素*/
function Delete(id) {
    /*for(var i=0;i<length;i++){
     var id="#"+i;
     /!*
     $(id).position().left   目标span的当前位置
     0-$(id).width()         目标span的目的位置
     经过两两相减，获取绝对值，在向下取整，若等于0时，代表目标已到达目的位置
     *!/
     console.log(id);

     }*/
    console.log(id);
    setTimeout(function () {
        if(state=="on"){
            var differ=Math.round(Math.abs($(id).position().left-(0-$(id).width())));
            console.log(differ);
            if(differ>=0&&differ<3){
                console.log("执行");
                $(id).remove();
            }
        }
    },10000);
}