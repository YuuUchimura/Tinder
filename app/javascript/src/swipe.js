if (location.pathname == "/users") {
  $(function () {
    let allCards = document.querySelectorAll(".swipe--card");
    let swipeContainer = document.querySelector(".swipe");

    function initCards() {
      let newCards = document.querySelectorAll(".swipe--card:not(.removed)");

      newCards.forEach(function (card, index) {
        // length(6)からindex番号を引いた数を高い順に表示している
        card.style.zIndex = allCards.length - index;

        // card.style.transform =
        //  "scale(" + (20 - index) / 20 + ") translateY(-" + 30 * index + "px)";
        // card.style.opacity = (10 - index) / 10;
      });
      if (newCards.length == 0) {
        $(".no-user").addClass("is-active");
      }
    }
    initCards();

    allCards.forEach(function (el) {
      let hammertime = new Hammer(el);
      // クリックしながらスワイプした際の処理
      hammertime.on("pan", function (event) {
        // deltaXが初期値の場所だったら何もしない
        if (event.deltaX === 0) return;
        // centerが初期値の場所だったら何もしない
        if (event.center.x === 0 && event.center.y === 0) return;
        console.log(event.deltaX);
        // elにmovingクラスを追加する
        el.classList.add("moving");
        // カードの位置がプラスになったらswipe_likeを追加。マイナスになったらdislikeを追加。
        swipeContainer.classList.toggle("swipe_like", event.deltaX > 0);
        swipeContainer.classList.toggle("swipe_dislike", event.deltaX < 0);

        // deltaXに0.03かけている
        let xMulti = event.deltaX * 0.03;
        // deltaYから80割っている
        let yMulti = event.deltaY / 80;
        // xMultiにyMultiをかけたものをrotateに入れている
        let rotate = xMulti * yMulti;

        event.target.style.transform =
          "translate(" +
          event.deltaX +
          "px, " +
          event.deltaY +
          "px) rotate(" +
          rotate +
          "deg)";
      });

      hammertime.on("paned", function (event) {
        el.classList.remove("moving");
        swipeContainer.classList.remove("swipe_like");
        swipeContainer.classList.remove("swipe_dislike");
        let moveOutWidth = document.body.clientWidth;
        let keep = Math.abs(event.deltaX) < 200;
        event.target.classList.toggle("removed", !keep);
        let reaction = event.deltaX > 0 ? "like" : "dislike";

        if (keep) {
          event.target.style.transform = "";
        } else {
          let endX =
            Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth) +
            100;
          let toX = event.deltaX > 0 ? endX : -endX;
          let endY = Math.abs(event.velocityY) * moveOutWidth;
          let toY = event.deltaY > 0 ? endY : -endY;
          let xMulti = event.deltaX * 0.03;
          let yMulti = event.deltaY / 80;
          let rotate = xMulti * yMulti;

          postReaction(el.id, reaction);
          event.target.style.transform =
            "translate(" +
            toX +
            "px, " +
            (toY + event.deltaY) +
            "px) rotate (" +
            rotate +
            "deg)";

          initCards();
        }
      });
    });

    function postReaction(user_id, reaction) {
      $.ajax({
        url: "reactions.json",
        type: "POST",
        datatype: "json",
        data: {
          user_id: user_id,
          reaction: reaction,
        },
      }).done(function () {
        console.log("done!");
      });
    }

    function createButtonListener(reaction) {
      let cards = document.querySelectorAll(".swipe--card:not(.removed)");

      if (!cards.length) return false;

      let moveOutWidth = document.body.clientWidth * 2;

      let card = cards[0];
      let user_id = card.id;

      postReaction(user_id, reaction);

      card.classList.add("removed");
      
      if (reaction == "like") {
        card.style.transform = "translate(" + moveOutWidth + "px)";
      } else {
        card.style.transform = "translate(-" + moveOutWidth + "px)";
      }

      initCards();
    }
    $("#like").on("click", function () {
      createButtonListener("like");
    });

    $("#dislike").on("click", function () {
      createButtonListener("dislike");
    });
  });
}
