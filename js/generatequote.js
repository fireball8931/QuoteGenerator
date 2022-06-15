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

const quoteperiod = 30


Date.prototype.format = function () {
    let date = new Date(this.valueOf());
    return date.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    
       });
   }



function buildDollarCol(howmuch){
    let dollars = howmuch.Math.
    let col = `<td class="dollars"></td>`
    
    return col
}
    
function convert(){
    let t = new Array()
    t[0] = parseFloat(document.getElementById("tuitioninput").value).toLocaleString('en-US',{ style: 'currency', currency: 'USD'})
    t[1] = parseFloat(document.getElementById("booksinput").value).toLocaleString('en-US',{ style: 'currency', currency: 'USD'})
    t[2] = parseFloat(document.getElementById("feesinput").value).toLocaleString('en-US',{ style: 'currency', currency: 'USD'})
    
    console.log(t[0]);
    console.log(t[1]);
    console.log(t[2]);
    document.getElementById("tuition").innerText = t[0].toLocaleString('en-US',{ style: 'currency', currency: 'USD'})
    document.getElementById("books").innerText = t[1].toLocaleString('en-US',{ style: 'currency', currency: 'USD'})
    document.getElementById("fees").innerText = t[2].toLocaleString('en-US',{ style: 'currency', currency: 'USD'})
}


function updateFooter(selectedCampus){

    let campus = campusinfo[selectedCampus]
    
    let campusemail = `admin.${campus.city.toLocaleLowerCase()}@aolccbc.com`

    let quotenumber = 1
    document.getElementById("locationID").innerText = selectedCampus
    document.getElementById("locationname").innerText = campus.city
    document.getElementById("locationaddress-city").innerText = campus.city
    document.getElementById("locationaddress-line1").innerText = campus.addressline1
    document.getElementById("locationaddress-postalcode").innerText = campus.addresspostalcode
    document.getElementById("location-phone").innerText = campus.phone
    document.getElementById("location-fax").innerText = campus.fax
    document.getElementById("location-email").innerHTML = `<a href="mailto:${campusemail}?subject=RE%3A%20Quote%20${quotenumber}">${campusemail}</a>`




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


function setEffectiveDate(){
    let currentDate = new Date()
    document.getElementById("issue-date").innerText = currentDate.format()


   let expirydate = new Date()
   expirydate.setDate(currentDate.getDate() + quoteperiod)
    document.getElementById("expirydate").innerText = expirydate.format()
   
}