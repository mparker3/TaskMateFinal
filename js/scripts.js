$(document).ready(function(){
    $('#fullpage').fullpage();
    
    $('#datepicker').datepicker({
        orientation: "top",
        dateFormat: 'mm-dd-yyyy',
        startDate: "09/10/2016",
        autoclose: true
        
    });
    
    $.getJSON("js/sample.json", function(data){
        top5 = ["#task1", "#task2", "#task3", "#task4", "#task5"];
        importance = ["style = 'color: gray; font-weight:thin;'>Low Importance", "style = 'color: black;'>Medium Importance", "style = 'color:red; font-weight:bold;'>High Importance"]
        i=0;
        $.each(data, function(key, val){
            var output = '';
            output += '<div><h2 style = "text-align: left; position: relative; top: -5px; padding-left: 5px;">' + val.priority + '</h2>';
            output += '<h3>' + val.task_desc + '</h3>';
            output += '<p>' + val.task_duration + ' minutes</p>';
            output += '<p ' + importance[val.task_importance - 1] + '</p>';
            output += '</div>';
            console.log(output);                
            $(top5[i]).html(output);
            i++;
        });
    });
    $("#submit").click(function() {
        selecteddate = $('#datepicker').datepicker('getDate');
        task = $("#task").val();
        hours = $("#duration_hours").val();
        minutes = $("#duration_minutes").val();
        if (task == null || task == "" || selecteddate == null || selecteddate == "" || hours == null || hours == "" || hours > 12 || minutes == null || minutes == "" || minutes > 59) {
            if (hours > 12 || minutes > 59){
                alert("Task cannot be over 12 hours or over 59 minutes");
                return false;
            }
            else {
                alert("Please fill out all fields");
                return false;
            }
        }
        duration = (hours*60) + parseInt(minutes);
        if ($("#importance").val() == "Medium Importance"){
            importance = 2
        }
        else if ($("#importance").val() == "Low Importance"){
            importance = 1
        }
        else {
            importance = 3
        }
        deadline = (selecteddate.getMonth()+1) + "/" + selecteddate.getDate() + "/" + selecteddate.getFullYear();
        
        var sendtask = {
            task_desc: task,
            task_duration: duration,
            task_importance: importance,
            task_deadline: deadline
        };
        var JSONtask = JSON.stringify(sendtask);
        
        $.ajax({
            url: '/tasks',
            data: JSONtask,
            type: 'POST',
            success: function(response) {
                console.log(response);
            },
            error: function(error) {
                console.log(error);
            }
        });
        
    });
});

