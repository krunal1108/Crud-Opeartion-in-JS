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


let objStr = localStorage.getItem('users'); 

if (objStr != null) {

    userArray = JSON.parse(objStr);

}

DisplayInfo();

submit.onclick = () => {

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




function SaveInfo(userArray) {

    let str = JSON.stringify(userArray);
    localStorage.setItem('users', str);
}


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


function DeleteInfo(id) {
    userArray.splice(id, 1);
    SaveInfo(userArray);
    DisplayInfo();
    // alert(id);
}
