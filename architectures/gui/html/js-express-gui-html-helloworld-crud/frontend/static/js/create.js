$( document ).ready(function() {
    
    $('#create-link').click(function(){
        
        let id = $('#id').val();
        let text = $('#text').val();
        let json = JSON.parse(`{"id": ${id}, "text": "${text}"}`);

        $.post( 
            "api/v1/messages", 
            JSON.stringify(json),
            function (data) {
                window.location.replace("/");
            }
        );
        
    });
    
});