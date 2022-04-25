function execAction(){
    $(document).ready(function(){
        console.log("here we go");
        $('[ng-Class="range.rowClass"][rowspan]:not(:contains("e"))').each(function( index ) {
            var totalSteps = $(this).attr('rowspan');
            var offset = $(this).parent().index();

            $(this).attr('rowspan', 1);
            $(this).text('0% - ??%');
            //$(this).parent().children('td:not([rowspan])')
            $(this).parents('table tbody').children('tr').children('td:not([rowspan]):nth-child(2)').after(function() {        
                var parentIndex = $(this).parent().index();
                var currentStep = parentIndex-offset;
            
                if (parentIndex > offset && currentStep < totalSteps){
                    var step = 100/totalSteps;
                    var stepStart = 0;
                    var stepEnd = 0;
                    stepStart = (currentStep)*step;
                    stepEnd = stepStart + step;
                    return "<td class='"+this.className+"' rowspan='1'>" + stepStart.toFixed(1) +  "% - " + stepEnd.toFixed(1) +  "%</td>";
                }else{return "";}
            });
        });
    });
}

setTimeout(execAction, 2000);

chrome.runtime.onMessage.addListener(
    function(message,sender,sendResponse){
        if(message.event == 'updateWage')
        {
            execAction();
        }
    }
);

/* <div class="row"><div class="col m12 s12 field"><input type="checkbox" id="check1" name="check1" class=""> <label for="check1">Show range details</label> </div></div> */