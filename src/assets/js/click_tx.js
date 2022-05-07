type = "text/javascript"
jQuery(function() {
    $("html").click(function(e) {
        var a_idx = Math.floor((Math.random() * 26));
        var a = new Array(
            "乐观", "❤", "积极", "向上", "自由", "正能量", "(*^▽^*)", "元气满满", "开心", "快乐",
            "善良", "可爱", "暴富", "暴瘦", "❤", "富强", "民主", "文明", "和谐", "自由", "平等",
            "公正", "法治", "爱国", "敬业", "诚信", "友善"



        );
        var color1 = Math.floor((Math.random() * 255));
        var color2 = Math.floor((Math.random() * 255));
        var color3 = Math.floor((Math.random() * 255));

        var $i = $("<span />").text(a[a_idx]);
        a_idx = (a_idx + 1) % a.length;
        var x = e.pageX,
            y = e.pageY;
        $i.css({　　　　　　
            "z-index": 9999999999999,
            "top": y - 20,
            "left": x,
            "position": "absolute",
            "font-family": "mmm",
            "fontSize": Math.floor((Math.random() * 22) + 15),
            "font-weight": "bold",
            "color": "rgb(" + color1 + "," + color2 + "," + color3 + ")",
            "-webkit-user-select": "none",
            "-moz-user-select": "none",
            "-ms-user-select": "none",
            "user-select": "none",
        });
        $("body").append($i);
        $i.animate({
                "top": y - 200,
                "opacity": 0
            },
            1000,
            function() {
                $i.remove();
            });
    });
});