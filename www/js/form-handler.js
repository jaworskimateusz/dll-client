(function() {

    function init() {
        $('#submitButton').click(submitButtonHandler);
    }

    function submitButtonHandler(evt) {
        var nameForm = document.getElementById('nameForm');

        //prevent form submission
        evt.preventDefault();
        evt.stopPropagation();

        $('#post-results-container').fadeOut();
        $('.ajaxLoader').css('display', 'inline-block');

        //make the AJAX call
        $.ajax({
            url: '/form',
            type: 'POST',
            data: {
                name: nameForm.name.value
            },
            success: postSuccessHandler
        });
    }

    function postSuccessHandler(jsonData) {
        var $data = $('#post-results-container .data');

        //reset the UI
        $data.html('');
        $('.ajaxLoader').hide();

        //update the UI with the data returned from the AJAX call 
        $.each(jsonData, function(key, val) {
            $data.append('<li><b>' + 'Hello' + '</b>' + val + '</li>');
        });

        $('#post-results-container').fadeIn();
    };

    //init on document ready
    $(document).ready(init);

    //integer value validation
    $('input.floatNumber').on('input', function() {
        this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    });
})();