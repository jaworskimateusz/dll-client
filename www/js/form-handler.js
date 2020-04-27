(function() {

    function init() {
        $('#submitButton').click(submitButtonHandler);
        $('#contentSubmitButton').click(contentSubmitButtonHandler);
        $('#openCameraSubmitButton').click(cameraSubmitButtonHandler);
        $('#mathematicSubmitButton').click(mathematicSubmitButtonHandler);
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

    function contentSubmitButtonHandler(evt) {
        var fileForm = document.getElementById('fileForm');
        evt.preventDefault();
        evt.stopPropagation();
        $.ajax({
            url: '/text-content',
            type: 'POST',
            data: {
                fileName: fileForm.fileName.value,
                content: fileForm.content.value
            },
            success: createFileSuccessHandler
        });
    }

    function cameraSubmitButtonHandler(evt) {
        var fileForm = document.getElementById('fileForm');
        evt.preventDefault();
        evt.stopPropagation();

        $.ajax({
            url: '/open-camera',
            type: 'GET',
            data: {},
            success: openCameraSuccessHandler
        });
    }

    function mathematicSubmitButtonHandler(evt) {
        var mathematicForm = document.getElementById('mathematicForm');
        evt.preventDefault();
        evt.stopPropagation();
        $.ajax({
            url: '/mathematic-result',
            type: 'POST',
            data: {
                firstNumber: mathematicForm.firstNumber.value,
                secondNumber: mathematicForm.secondNumber.value
            },
            success: mathematicOperationsSuccessHandler
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

    function createFileSuccessHandler(jsonData) {
        var $data = $('#post-results-container .text-file-content');
        $data.html('');
        $.each(jsonData, function(key, val) {
            if (val === 1)
                $data.append('<li> Possitive method execution: Result: ' + val + '</li>');
            else
                $data.append('<li> Negative method execution: Result: ' + val + '</li>');
        });
    };

    function openCameraSuccessHandler(jsonData) {
        var $data = $('#post-results-container .camera-state');
        $data.html('');
        $.each(jsonData, function(key, val) {
            if (val === null)
                $data.append('<li> Possitive method execution: Camera is closed. </li>');
        });
    };

    function mathematicOperationsSuccessHandler(jsonData) {
        var $data = $('#post-results-container .mathematic-result');
        $data.html('');
        $.each(jsonData, function(key, val) {
            $data.append('<li>' + key + ': ' + val + '</li>');
        });
    };

    //init on document ready
    $(document).ready(init);

    //integer value validation
    $('input.floatNumber').on('input', function() {
        this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    });
})();