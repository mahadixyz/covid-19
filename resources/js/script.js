function getMonthName(d)
{
    switch(d)
    {
        case 0:
        return "Jan";
        break;
        case 1:
        return "Feb";
        break;
        case 2:
        return "Mar";
        break;
        case 3:
        return "Apr";
        break;
        case 4:
        return "May";
        break;
        case 5:
        return "Jun";
        break;
        case 6:
        return "Jul";
        break;
        case 7:
        return "Aug";
        break;
        case 8:
        return "Sep";
        break;
        case 9:
        return "Oct";
        break;
        case 10:
        return "Nov";
        break;
        case 11:
        return "Dec";
        break;
        default:
        return "Month";
        
    }
    
}

var numbers = {
    0:'০',
    1:'১',
    2:'২',
    3:'৩',
    4:'৪',
    5:'৫',
    6:'৬',
    7:'৭',
    8:'৮',
    9:'৯'
};

function convertNum(raw) {
    var bn = [];
    for (var i = 0; i < raw.length; ++i) {
        if (numbers.hasOwnProperty(raw[i])) {
            bn.push(numbers[raw[i]]);
        } else {
            bn.push(raw[i]);
        }
    }
    return bn.join('');
}


var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

fetch("https://api.covid19api.com/total/country/bangladesh", requestOptions)
.then(response => response.json())
.then((result) => {
    var length = Object.keys(result).length;
    var firstDay = result[46];
    
    // Found
    var pastWeek = result[length-8];    
    
    var sevenDaysAgo = result[length-7];
    var sevenDaysAgoConfirmed = sevenDaysAgo.Confirmed;
    var sevenDaysAgoDeath = sevenDaysAgo.Deaths-pastWeek.Deaths;
    var sevenDaysAgoFound = sevenDaysAgoConfirmed-pastWeek.Confirmed;
    var sevenDaysAgoDateRaw = sevenDaysAgo.Date;
    var sevenDaysAgoDate = new Date(sevenDaysAgoDateRaw);
    var sevenDaysAgoMD = getMonthName(sevenDaysAgoDate.getMonth())+", "+sevenDaysAgoDate.getDate();
    
    var sixDaysAgo = result[length-6];
    var sixDaysAgoConfirmed = sixDaysAgo.Confirmed;
    var sixDaysAgoDeath =  sixDaysAgo.Deaths-sevenDaysAgo.Deaths;
    var sixDaysAgoFound = sixDaysAgoConfirmed-sevenDaysAgoConfirmed;
    var sixDaysAgoDateRaw = sixDaysAgo.Date;
    var sixDaysAgoDate = new Date(sixDaysAgoDateRaw);
    var sixDaysAgoMD = getMonthName(sixDaysAgoDate.getMonth())+", "+sixDaysAgoDate.getDate();
    
    var fiveDaysAgo = result[length-5];
    var fiveDaysAgoConfirmed = fiveDaysAgo.Confirmed;
    var fiveDaysAgoDeath = fiveDaysAgo.Deaths-sixDaysAgo.Deaths;
    var fiveDaysAgoFound = fiveDaysAgoConfirmed-sixDaysAgoConfirmed;
    var fiveDaysAgoDateRaw = fiveDaysAgo.Date;
    var fiveDaysAgoDate = new Date(fiveDaysAgoDateRaw);
    var fiveDaysAgoMD = getMonthName(fiveDaysAgoDate.getMonth())+", "+fiveDaysAgoDate.getDate();
    
    var fourDaysAgo = result[length-4];
    var fourDaysAgoConfirmed = fourDaysAgo.Confirmed;
    var fourDaysAgoDeath = fourDaysAgo.Deaths-fiveDaysAgo.Deaths;
    var fourDaysAgoFound = fourDaysAgoConfirmed-fiveDaysAgoConfirmed;
    var fourDaysAgoDateRaw = fourDaysAgo.Date;
    var fourDaysAgoDate = new Date(fourDaysAgoDateRaw);
    var fourDaysAgoMD = getMonthName(fourDaysAgoDate.getMonth())+", "+fourDaysAgoDate.getDate();
    
    var threeDaysAgo = result[length-3];
    var threeDaysAgoConfirmed = threeDaysAgo.Confirmed;
    var threeDaysAgoDeath = threeDaysAgo.Deaths-fourDaysAgo.Deaths;
    var threeDaysAgoFound = threeDaysAgoConfirmed-fourDaysAgoConfirmed;
    var threeDaysAgoDateRaw = threeDaysAgo.Date;
    var threeDaysAgoDate = new Date(threeDaysAgoDateRaw);
    var threeDaysAgoMD = getMonthName(threeDaysAgoDate.getMonth())+", "+threeDaysAgoDate.getDate();
    
    var twoDaysAgo = result[length-2];
    var twoDaysAgoConfirmed = twoDaysAgo.Confirmed;
    var twoDaysAgoDeath = twoDaysAgo.Deaths-threeDaysAgo.Deaths;
    var twoDaysAgoFound = twoDaysAgoConfirmed-threeDaysAgoConfirmed;
    var twoDaysAgoDateRaw = twoDaysAgo.Date;
    var twoDaysAgoDate = new Date(twoDaysAgoDateRaw);
    var twoDaysAgoMD = getMonthName(twoDaysAgoDate.getMonth())+", "+twoDaysAgoDate.getDate();
    
    var yday = result[length-1];
    var ydayConfirmed = yday.Confirmed;
    var ydayDeath = yday.Deaths-twoDaysAgo.Deaths;
    var ydayFound = ydayConfirmed-twoDaysAgoConfirmed;
    var ydayDateRaw = yday.Date;
    var ydayDate = new Date(ydayDateRaw);
    var ydayMD = getMonthName(ydayDate.getMonth())+", "+ydayDate.getDate();
    
    // HighCharts
    document.getElementById("cvFound").innerHTML = convertNum(yday.Confirmed.toString());
    document.getElementById("cvDeath").innerHTML = convertNum(yday.Deaths.toString()); 
    document.getElementById("cvActive").innerHTML = convertNum(yday.Active.toString()); 
    document.getElementById("cvRec").innerHTML = convertNum(yday.Recovered.toString()); 
     
    
    //Line chart for total Death
    var found = [sevenDaysAgoFound, sixDaysAgoFound, fiveDaysAgoFound, fourDaysAgoFound, threeDaysAgoFound, twoDaysAgoFound, ydayFound];    
    var days = [sevenDaysAgoMD, sixDaysAgoMD, fiveDaysAgoMD, fourDaysAgoMD, threeDaysAgoMD, twoDaysAgoMD, ydayMD];
    var Death = [sevenDaysAgoDeath, sixDaysAgoDeath, fiveDaysAgoDeath, fourDaysAgoDeath, threeDaysAgoDeath, twoDaysAgoDeath, ydayDeath];
    Highcharts.chart('line-chart', {
        
        title: {
            text: '<span class="bn heading">গত এক সপ্তাহে মৃত্যুবরনকারী ব্যক্তি</span>'
        },        
        
        yAxis: {
            title: {
                text: 'Number of Death'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
            }
        },

        xAxis: {
            categories: days
        },
        
        series: [ {
            name: 'Death',
            data: Death
        }],
        
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
        
    });
    
    // Cylinder for weekly status      
    Highcharts.chart('cyl-chart', {
        chart: {
            type: 'cylinder',
            options3d: {
                enabled: true,
                alpha: 0,
                beta: 0,
                depth: 50,
                viewDistance: 20
            }
        },
        title: {
            text: '<span class="bn heading">গত এক সপ্তাহে সনাক্ত রোগী</span>'
        },
        yAxis: {
            title: {
                text: 'সনাক্ত রোগি সংখ্যা'
            }
        },
        plotOptions: {
            series: {
                depth: 25,
                colorByPoint: true
            }
        },
        xAxis: {
            categories: days
        },
        series: [{
            data: found,
            name: 'সনাক্ত',
            showInLegend: false
        }]
    });
    
    
    console.log(result);
})

.catch(error => console.log('error', error));

