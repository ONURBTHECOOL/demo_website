let q1, q2, rusult;
const gradeD = document.getElementById("grade");
const subBtn = document.getElementById("subbtn");
const closeBtn = document.getElementById("closeGrade");


function submit() {
    try {
        q1 = document.getElementById("q1").value;
        q2 = document.querySelector('input[name="radio"]:checked').value;
        rusult = q1 + q2;
        console.log(rusult);
    }
    catch {
        console.log('Please fill out the form.');
    }
}


subBtn.addEventListener("click", () => {
    submit()
});