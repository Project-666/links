    $.each($(".post-view[data-id]"), function(a, e) {
        var l = $(e).parent().find("#postviews").addClass("view-load"),
            i = new Firebase("hhttps://abengkriscom-1716903358301-default-rtdb.asia-southeast1.firebasedatabase.app/pages/id/" + $(e).attr("data-id"));
        i.once("value", function(a) {
            var n = a.val(),
                t = !1;
            null == n && (n = {}, n.value = 0, n.url = window.location.href, n.id = $(e).attr("data-id"), t = !0), l.removeClass("view-load").text(n.value), n.value++, "/" != window.location.pathname && (t ? i.set(n) : i.child("value").set(n.value))
        })
    });