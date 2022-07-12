$(document).ready(function() {
    $(document).on("click", ".super-button", function() {
      $(".main, .half, .overlay, .button-line, .super-button, .content").addClass("active");
      setTimeout(function() {
        $(".main *").css("z-index", "1");
      }, 3000);
    });
  });
