// Fungsi untuk feed pertama
function rcentbytag1(e) {
    var ul = document.createElement("ul");
    ul.className = "recent-by-tag";

    for (var t = 0; t < numposts1; t++) {
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

        if (showpostthumbnails1) {
            var img = document.createElement("img");
            img.className = "rct-thumb";
            img.alt = title;
            img.src = imgSrc;

            var a = document.createElement("a");
            a.href = link  + "?utm_source=link_bio&utm_medium=rss";
            a.title = title;
            a.appendChild(img);

            li.appendChild(a);
        }

        var strong = document.createElement("strong");
        var aTitle = document.createElement("a");
        aTitle.href = link + "?utm_source=link_bio&utm_medium=rss";
        aTitle.title = title;
        aTitle.rel = "opener";
        aTitle.textContent = title;

        strong.appendChild(aTitle);
        li.appendChild(strong);

        if (showpostdate1) {
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

    document.getElementById("rcentByTag1").appendChild(ul);
}

// Fungsi untuk feed kedua
function rcentbytag2(e) {
    var ul = document.createElement("ul");
    ul.className = "recent-by-tag";

    for (var t = 0; t < numposts2; t++) {
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

        if (showpostthumbnails2) {
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

        if (showpostdate2) {
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

    document.getElementById("rcentByTag2").appendChild(ul);
}

var numposts1 = 5;
var showpostthumbnails1 = true;
var showpostdate1 = false;

var numposts2 = 5;
var showpostthumbnails2 = true;
var showpostdate2 = false;

window.onload = function () {
    var blogTitle1 = document.getElementById("blog1");
    var title1 = document.createElement("h2");
    title1.className = "pTitle";
    var pTitle = "Blog";
    title1.textContent = pTitle;
    blogTitle1.appendChild(title1);
    
    var blogTitle2 = document.getElementById("blog2");
    var title2 = document.createElement("h2");
    title2.className = "pTitle";
    var pTitle = "Musik";
    title2.textContent = pTitle;
    blogTitle2.appendChild(title2);

    var feed1 = document.getElementById("feed1");
    var script1 = document.createElement("script");
    script1.src =
        "https://www.abengkris.com/feeds/posts/default?alt=json-in-script&callback=rcentbytag1";
    feed1.appendChild(script1);

    var feed2 = document.getElementById("feed2");
    var script2 = document.createElement("script");
    script2.src =
        "https://music.abengkris.com/feeds/posts/default?alt=json-in-script&callback=rcentbytag2";
    feed2.appendChild(script2);

    var linkAll1 = document.getElementById("linkAll1");
    var divLbio1 = document.createElement("div");
    divLbio1.className = "lBio";
    var a1 = document.createElement("a");
    a1.href = "https://www.abengkris.com";
    a1.textContent = "Lihat Semua Blog";
    divLbio1.appendChild(a1);
    linkAll1.appendChild(divLbio1);

    var linkAll2 = document.getElementById("linkAll2");
    var divLbio2 = document.createElement("div");
    divLbio2.className = "lBio";
    var a2 = document.createElement("a");
    a2.href = "https://music.abengkris.com";
    a2.textContent = "Lihat Semua Musik";
    divLbio2.appendChild(a2);
    linkAll2.appendChild(divLbio2);
};