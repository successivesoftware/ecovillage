/**
 * Created by Successive on 16-06-2015.
 */
var eventsList = [
    {
        title: 'Meeting',
        start: new Date(2015, 5, 20 , 8, 0, 0 ),
        end: new Date(2015, 5, 20 , 9 , 0, 0),
        tip: 'Personal tip 1',
        user: 'Anil'},
    {
        title: 'Chat',
        start: new Date(2015, 5, 20 , 9, 0, 0 ),
        end: new Date(2015, 5, 20 , 10 , 0, 0),
        tip: 'Personal tip 2',
        user:'Nikhil',}
];

MonthList = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];


Template.calendar.onRendered(function () {
    /*OverWrite the pridefined CSS*/
    $('.calendar .fc td, .fc th').css('border-style', 'none');
    //$('.calendar table').css('background-color', '#65D2C2');
    //$('#calendar tr.fc-minor').attr('style','background:initial');
    $('.calendar table thead tr td').css('height', '4em');
    $('.calendar table thead tr td').css('vertical-align', 'middle');
    $('.calendar table thead tr td').css('text-align', 'center');
    $('.calendar table tbody tr td div').css('height', 'auto');
    //$('.calendar table thead tr td').css('max-height', '100px');
    Session.set('date' , null );
    Session.set('dayEvents' , null );
    $('.ui.selection.dropdown')
        .dropdown('restore default text')
        .dropdown({
            onChange: function (val) {
                var monthAndYear = val.split(" ");
                console.log(monthAndYear[0]);
                var today = new Date();
                Session.set('date' , monthAndYear[1]+'-'+MonthList.indexOf(monthAndYear[0]));
                $('#calendar').fullCalendar({
                    defaultDate: moment(Session.get('date')),
                });
               // alert(Session.get('month'));
            }
        });
});

Template.calendar.helpers({
    calendarOptions: {
        // Standard fullcalendar options
        //hiddenDays: [ 0 ],
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        setDefault : false,
        defaultDate: moment(Session.get('date')),
        //month : 1,//Session.get('month'),
        lang: 'En',
        eventClick:false,
        //aspectRatio: 0.75,
        color: '#777777',
        //allDay : false,
        editable: true,
        selectable: true,// optional
        //year:null,
        background: '#eeeeff', // optional
        // Function providing events reactive computation for fullcalendar plugin
        events: function(start, end, timezone, callback) {
            var events = eventsList;
            callback(events);
        },
        dayClick: function(date, jsEvent, view) {
            dayEvents =new Array();
            D1 = new Date(date);
            eventsList.forEach(function (event){
                var D2 = new Date( event.start);
                if(D1.getDate() == D2.getDate() && D1.getMonth() == D2.getMonth() && D1.getYear() == D2.getYear() ){
                    D3 = new Date(event.end);
                    event['stHr'] = D2.getHours();
                    event['enHr'] = D3.getHours()
                    dayEvents.push(event);
                }
            });
            Session.set('dayEvents' ,dayEvents);
        },
        // Optional: id of the calendar
        id: "calendar1",
        // Optional: Additional classes to apply to the calendar
        addedClasses: "col-md-8",
        // Optional: Additional functions to apply after each reactive events computation

    },
    dayEvents : function(){
        return Session.get('dayEvents');
    }
});

Template.calendar.events({
    'click .calendar' : function(){
        $('.calendar .fc td, .fc th').css('border-style', 'none');
        $('.calendar table thead tr td').css('height', '4em');
        $('.calendar table thead tr td').css('vertical-align', 'middle');
        $('.calendar table thead tr td').css('text-align', 'center');
        $('.calendar table tbody tr td div').css('height', 'auto');
    },
});