window.jsPDF = window.jspdf.jsPDF;
const campusinfo =     [
        { "city": "Langley",
        "addressline1": "201-20621 Logan Ave",
        "addresspostalcode": "V3A 7R3",
        "phone" : "604-532-4040",
        "fax": "604-532-4001"
        },
        { "city": "Abbotsford",
        "addressline1": "204-2692 Clearbrook Road",
        "addresspostalcode": "V2T 2Y8",
        "phone" : "604-855-3315",
        "fax": "604-855-3365"
        }
    ]
const inputs = [
    "print-button",
    "tuitioninput",
    "booksinput",
    "feesinput",
    "custom-issue-date",
    "student-ref",
    "sandhinput"

]

function changeInputs(action){
    
    inputs.forEach((input,i) => {
        console.log(`${action} ${input}`);
        document.getElementById(input).style.display = action
        
    }
    )    
    
}




function printPDF () {
    var pdf = new jsPDF('p', 'pt', 'letter');
    var width = 600;
    document.body.style.width = width + "px";
    changeInputs("none")

    pdf.html(document.body, {
        callback: function (pdf) {
            var iframe = document.createElement('iframe');
            iframe.setAttribute('style', 'position:absolute;top:0;right:0;height:776px; width:600px');
            document.body.appendChild(iframe);
            iframe.src = pdf.output('datauristring');
            pdf.deletePage("2")
            pdf.save('quote.pdf')
        }
    });
    
    
    //changeInputs("unset")
    }

const quoteperiod = 30



Date.prototype.format = function () {
    let date = new Date(this.valueOf());
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    
       });
   }

let currentDate = new Date()
console.log(currentDate);


function buildDollarCol(howmuch,span){
    
    let dollars = Math.floor(howmuch)
    let cents = howmuch - dollars
    let padding =''
    cents = cents * 100
    if (cents < 10 ) {padding = 0}
    Lcents = cents.toLocaleString('en-US')
    // let col = 
    // console.log(col);
    let dollarsID = `${span}-dollars`       
    let centsID = `${span}-cents`       
    document.getElementById(dollarsID).innerText = dollars
    document.getElementById(centsID).innerText = `${padding}${Lcents}`
    
    
       
}
    
function convert(){
    let t = new Array()
    let b = new Array()
    let s = new Array()
    s[0] = "tuition"
    s[1] = "books"
    s[2] = "fees"
    s[3] = "sandh"


    b[0] = parseFloat(document.getElementById("tuitioninput").value)
    b[1] = parseFloat(document.getElementById("booksinput").value)
    b[2] = parseFloat(document.getElementById("feesinput").value)
    b[3] = parseFloat(document.getElementById("sandhinput").value)
    t[0] = parseFloat(b[0]).toLocaleString('en-US',{ style: 'currency', currency: 'USD'})
    t[1] = parseFloat(b[1]).toLocaleString('en-US',{ style: 'currency', currency: 'USD'})
    t[2] = parseFloat(b[2]).toLocaleString('en-US',{ style: 'currency', currency: 'USD'})
    t[2] = parseFloat(b[3]).toLocaleString('en-US',{ style: 'currency', currency: 'USD'})
    
    // console.log(t[0]);
    // console.log(t[1]);
    // console.log(t[2]);
    // document.getElementById("tuition").innerText = t[0].toLocaleString('en-US',{ style: 'currency', currency: 'USD'})

    b.forEach((a,i) =>
    buildDollarCol(a,s[i])
    )

    // buildDollarCol(b[0])
    // document.getElementById("books").innerHTML = buildDollarCol(b[1])
    // document.getElementById("fees").innerHTML = buildDollarCol(b[2])
    // document.getElementById("books").innerText = t[1].toLocaleString('en-US',{ style: 'currency', currency: 'USD'})
    // document.getElementById("fees").innerText = t[2].toLocaleString('en-US',{ style: 'currency', currency: 'USD'})
}

function updateStudentRef(){
    
    
    let city = document.getElementById("locationaddress-city").innerText.toLowerCase()
    let campusemail = `admin.${city}@aolccbc.com`
    let ref = document.getElementById("student-ref").value
    document.getElementById("location-email").innerHTML = `<a href="mailto:${campusemail}?subject=RE%3A%20Quote%20${ref}">${campusemail}</a>`
    document.getElementById("student-ref-print").innerText = ref

}

function updateFooter(selectedCampus){

    let campus = campusinfo[selectedCampus]
    
    // let campusemail = 

    let quotenumber = 1
    document.getElementById("locationID").innerText = selectedCampus
    document.getElementById("locationname").innerText = campus.city
    document.getElementById("locationaddress-city").innerText = campus.city
    document.getElementById("locationaddress-line1").innerText = campus.addressline1
    document.getElementById("locationaddress-postalcode").innerText = campus.addresspostalcode
    document.getElementById("location-phone").innerText = campus.phone
    document.getElementById("location-fax").innerText = campus.fax
    updateStudentRef(campus.city)
    




    console.log()
}

function changeCampus(){
    let activecampus = document.getElementById("locationID").innerText
    let newcampus = 0
    console.log(activecampus);
    if (activecampus == 0){
        newcampus = 1
    } else {
        newcampus = 0
    }
    updateFooter(newcampus)
}


function setEffectiveDate(init){
    if (init) {
        currentDate = new Date()
    } else {
        currentDate = document.getElementById("custom-issue-date").value
        console.log(`the value from the form is ${currentDate}`);
    }
console.log(currentDate);
currentDate = new Date(currentDate)
let offset = currentDate.getDate() + quoteperiod
console.log(offset);
let expirydate = new Date()
expirydate.setDate(offset)
console.log(expirydate);
document.getElementById("expirydate").innerText = expirydate.format()
document.getElementById("issue-date").innerText = currentDate.format()
   
}