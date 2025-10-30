const studentform = document.getElementById("studentform");
const fnamecontrols = document.getElementById("fname");
const lnamecontrols = document.getElementById("lname");
const emailcontrols = document.getElementById("email");
const contactcontrols = document.getElementById("contact");
const studentcontainer = document.getElementById("studentcontainer");
const addsubmitbtn = document.getElementById("addsubmitbtn");
const updatebtn = document.getElementById("updatebtn");


const uuid = () => {
    return String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx').replace(/[xy]/g, c => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};


let stdarr = [
    {
        fname: "Suamti",
        lname: "Nalwade",
        email: "Sm@123gmail.com",
        contact: 123456,
        stdid: uuid(),
    },
    {
        fname: "jhon",
        lname: "Doe",
        email: "JhonD@123gmail.com",
        contact: 654321,
        stdid: uuid(),
    }
];


const createstdarr = (arr) => {
    let result = "";
    arr.forEach((std, i) => {
        result += `
      <tr id="${std.stdid}">
        <td>${i + 1}</td>
        <td>${std.fname} ${std.lname}</td>
        <td>${std.email}</td>
        <td>${std.contact}</td>
        <td><i onclick="editstudent(this)" class="fa-solid fa-pen-to-square fa-2x text-success"></i></td>
        <td><i onclick="deletestudent(this)" class="fa-solid fa-trash fa-2x text-danger"></i></td>
      </tr>`;
    });
    studentcontainer.innerHTML = result;
};
createstdarr(stdarr);

let Editid = null;


const editstudent = (ele) => {
    Editid = ele.closest("tr").id;
    let student = stdarr.find((std) => std.stdid === Editid);

    fnamecontrols.value = student.fname;
    lnamecontrols.value = student.lname;
    emailcontrols.value = student.email;
    contactcontrols.value = student.contact;

    addsubmitbtn.classList.add("d-none");
    updatebtn.classList.remove("d-none");
};


const deletestudent = (ele) => {
    if (confirm("Are you sure to delete this student?")) {
        let removeid = ele.closest("tr").id;

        let getindex = stdarr.findIndex((std) => std.stdid === removeid);
        stdarr.splice(getindex, 1);

        ele.closest("tr").remove();



        createstdarr(stdarr);
    }
};


const Toadd = (eve) => {
    eve.preventDefault();

    let stdobj = {
        fname: fnamecontrols.value,
        lname: lnamecontrols.value,
        email: emailcontrols.value,
        contact: contactcontrols.value,
        stdid: uuid()
    };



    stdarr.push(stdobj);
    studentform.reset();
    createstdarr(stdarr);
};


const onupdatestudent = (eve) => {
    eve.preventDefault();

    let updated_obj = {
        fname: fnamecontrols.value,
        lname: lnamecontrols.value,
        email: emailcontrols.value,
        contact: contactcontrols.value,
        stdid: Editid
    };

    let index = stdarr.findIndex(std => std.stdid === Editid);
    stdarr[index] = updated_obj;

    studentform.reset();
    addsubmitbtn.classList.remove("d-none");
    updatebtn.classList.add("d-none");
    createstdarr(stdarr);
};


studentform.addEventListener("submit", Toadd);
updatebtn.addEventListener("click", onupdatestudent);
