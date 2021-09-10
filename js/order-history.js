(function() {
    const dropzone = document.getElementById("dropzone");
    const uploads = document.getElementById("uploads");
    var fileInput = document.getElementById("drag-drop");
    var text, i, dropped = false;

    var generateNames = function(files) {
        for (i = 0; i < files.length; i++) {
            if (
                files[i].type === "image/jpeg" ||
                files[i].type === "image/png" ||
                files[i].type === "image/jpg"
            ) {
                const fsize = files[i].size;
                const file = Math.round((fsize / 1024));
                if (file >= 8192) {
                    text = document.createTextNode("File too Big, please select a file less than 8mb.");
                } else {
                    if (files.length != i + 1) {
                        text = document.createTextNode(files[i].name + " | ");
                    } else {
                        text = document.createTextNode(files[i].name);
                    }
                }
                
                uploads.appendChild(text);
            } else {
                text = document.createTextNode("Error! One or more files is not an image.");
                uploads.appendChild(text);
            }
        }
    };
    dropzone.ondragover = function() {
        this.className = "dropzone dragover";
        return false;
    };
    dropzone.ondragleave = function() {
        this.className = "dropzone";
        return false;
    };
    dropzone.ondrop = function(e) {
        e.preventDefault();
        dropped = true;
        uploads.innerHTML = "";
        fileInput.files = e.dataTransfer.files;
        generateNames(e.dataTransfer.files);
        this.className = "dropzone";
    };
    dropzone.onclick = function(e) {
        e.preventDefault();
        fileInput.click();
    };
    fileInput.onchange = function() {
        uploads.innerHTML = "";
        if(!dropped)
            generateNames(this.files);
        dropped = false;
    };
})();

$(function() {
    $('.order-dropdown-toggle').click(function() {
        // $('.order-dropdown:not(this)').slideUp();
        $(this).toggleClass('active');
        $(this).next('.order-dropdown').slideToggle();
    });

    if(!window.matchMedia("(max-width: 768px)").matches) {
        function alignModal() {
            var modalDialog = $(this).find(".modal-dialog");
            // Applying the top margin on modal to align it vertically center
            modalDialog.css("margin-top", Math.max(0, ($(window).height() - modalDialog.height()) / 2));
        }
        // Align modal when it is displayed
        $(".modal").on("shown.bs.modal", alignModal);
        // Align modal when user resize the window
        $(window).on("resize", function(){
            $(".modal:visible").each(alignModal);
        });
    }
});