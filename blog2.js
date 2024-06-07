function blog2(e) {
    var ul = document.createElement("ul");
    ul.className = "recent-by-tag";

    for (var t = 0; t < numposts; t++) {
        var n = e.feed.entry[t];
        if (!n) break;

        var li = document.createElement("li");
        li.className = "clear";

        var title = n.title.$t;
        var link;
        for (var o = 0; o < n.link.length; o++) {
            if (n.link[o].rel == "alternate") {
                link = n.link[o].href;
                break;
            }
        }

        var imgSrc;
        try {
            imgSrc = n.media$thumbnail.url;
        } catch (h) {
            var s = n.content.$t;
            var a = s.indexOf("<img class='rct-thumb'");
            var b = s.indexOf('src="', a);
            var c = s.indexOf('"', b + 5);
            var d = s.substr(b + 5, c - b - 5);
            if (a != -1 && b != -1 && c != -1 && d != "") {
                imgSrc = d;
            } else {
                imgSrc =
                    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhv1yfllppDhv4x59JBpf0zgExwFju9SwshnI4nwp3rbRIFvCd7f4UZ99yq1jNbHuepSrqvA0jDk58nCQsBHsqM61xN7-kOCvGIVlSXOi5lGlxuSrvp-EHELXSEH6WGpFqGMcE8YKpL_os/s100/Batamusik-noimage.png";
            }
        }

        if (showpostthumbnails) {
            var img = document.createElement("img");
            img.className = "rct-thumb";
            img.alt = title;
            img.src = imgSrc;

            var a = document.createElement("a");
            a.href = link;
            a.title = title;
            a.appendChild(img);

            li.appendChild(a);
        }

        var strong = document.createElement("strong");
        var aTitle = document.createElement("a");
        aTitle.href = link;
        aTitle.title = title;
        aTitle.rel = "nofollow";
        aTitle.textContent = title;

        strong.appendChild(aTitle);
        li.appendChild(strong);

        if (showpostdate) {
            var p = n.published.$t;
            var v = p.substring(0, 4);
            var m = p.substring(5, 7);
            var g = p.substring(8, 10);
            var y = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "Mei",
                "Jun",
                "Jul",
                "Agt",
                "Sep",
                "Okt",
                "Nov",
                "Des"
            ];

            var span = document.createElement("span");
            span.className = "showdates";
            span.textContent = g + " " + y[parseInt(m, 10)] + " " + v;

            li.appendChild(document.createElement("br"));
            li.appendChild(span);
        }

        ul.appendChild(li);
    }

    document.getElementById("blog2").appendChild(ul);
}

var numposts = 5;
var showpostthumbnails = true;
var showpostdate = false;

window.onload = function () {
    var script = document.createElement("script");
    script.src =
        "https://music.abengkris.com/feeds/posts/default?orderby=updated&alt=json-in-script&callback=blog2";
    document.body.appendChild(script);
};