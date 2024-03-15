const fname = document.getElementById('firstName');
const lname = document.getElementById('lastName');
const age = document.getElementById('age');
const city = document.getElementById('city');
const dob = document.getElementById('dob');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const submit = document.getElementById('submit');
const studcardDisplay = document.getElementById('studcard');



let userArray = [];
let isEdit = false;
let index;




// Local storage me aaya hua data .. firse form me jayega and baad me vapas niche card me Display hoga.
let objStr = localStorage.getItem('users'); // -> yeh vala Data(Object) String me aayega.

// Upar vala 'objStr' - ka data string me aa raha tha .. usko vapas niche object me laayenge. .... and 'userArray' name ke main function me store kar denge.
if (objStr != null) {

    userArray = JSON.parse(objStr);

}

DisplayInfo();

// Submit button ke upar Click event kari hai.
submit.onclick = () => {

    // Isse page refresh nahi hota.
    event.preventDefault();



    const studfname = fname.value;
    const studlname = lname.value;
    const studage = age.value;
    const studcity = city.value;
    const studdob = dob.value;
    const studemail = email.value;
    const studphone = phone.value;

    if (isEdit) {

        // edit
        userArray[index].fname = studfname;
        userArray[index].lname = studlname;
        userArray[index].age = studage;
        userArray[index].city = studcity;
        userArray[index].dob = studdob;
        userArray[index].email = studemail;
        userArray[index].phone = studphone;

    } else {

        // PUSH method se - 1 array data ke saath piche se dusra array (Means data) ADD ho jayega.
        userArray.push(
            {
                fname: studfname,
                lname: studlname,
                age: studage,
                city: studcity,
                dob: studdob,
                email: studemail,
                phone: studphone,

            }
        );
        SaveInfo(userArray);

    }




    fname.value = '';
    lname.value = '';
    age.value = '';
    city.value = '';
    dob.value = '';
    email.value = '';
    phone.value = '';

    DisplayInfo();
}




// Data save karne ke liye.
function SaveInfo(userArray) {

    // Array(Object) Format ko String format me change karta hai.
    let str = JSON.stringify(userArray);
    localStorage.setItem('users', str);
}



// Data display karne ke liye.
function DisplayInfo() {
    let statement = '';

    userArray.forEach((user, i) => {

        statement += `<div class="card-body">
        
        <b>First Name :</b>
        <span>${user.fname}</span>
    </div>
    <div class="card-body">
        <b>Last Name :</b> 
        <span>${user.lname}</span>
    </div>
    <div class="card-body">
        <b>Age :</b> 
        <span>${user.age}</span>
    </div> 
    <div class="card-body">
        <b>City :</b> 
        <span>${user.city}</span>
    </div>
    <div class="card-body">
        <b>DOB :</b> 
        <span>${user.dob}</span>
    </div> 
    <div class="card-body">
        <b>Email :</b> 
        <span>${user.email}</span>
    </div>
    <div class="card-body">
        <b>Phone :</b> 
        <span>${user.phone}</span>
    </div>
    
    <div class="card-body">
        <button type="submit" class="btn-primary" onclick='EditInfo(${i})'>Edit</button>
        <button class="btn-danger" onclick='DeleteInfo(${i})'>Delete</button>
    </div>`
    });
    studcardDisplay.innerHTML = statement;
}


// Data edit karne ke liye.
function EditInfo(id) {

    let user = userArray[id];

    console.log(userArray[id]);
    fname.value = user.fname;
    lname.value = user.lname;
    age.value = user.age;
    city.value = user.city;
    dob.value = user.dob;
    email.value = user.email;
    phone.value = user.phone;


    isEdit = true;
    index = id;
}


// Data delete karne ke liye.
function DeleteInfo(id) {
    // 1 card delete karne ke liye.
    userArray.splice(id, 1);
    SaveInfo(userArray);
    DisplayInfo();
    // alert(id);
}