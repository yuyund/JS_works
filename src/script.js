let qa;
let choices = document.getElementsByClassName("choice");
let q = document.getElementsByClassName("question");
let q_tables = document.getElementsByClassName("question_t")
let all = document.querySelectorAll("body *");
let table_all = document.querySelectorAll("body * :not(table,table *)");
let body = document.querySelector("body");
let tds = document.querySelectorAll("tr>td");
let table = document.querySelector(".table");
let tables = document.querySelectorAll(".table *");

let ran;
let question;
let select;
let c_count = 0;
let member_ans = [];
let lie_ans = [];
let real_ans = [];
let q_array = [];
let temp_array = [];
let data
let q_count = 0;


function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
function arrayShuffle(array) {
    var new_array = array;
    for (var i = (array.length - 1); 0 < i; i--) {
        var r = random(0, i);
        var tmp = new_array[i];
        new_array[i] = new_array[r];
        new_array[r] = tmp;
    }
    return array;
}

function get_qa() {
    fetch("/src/QA.json")
        .then(response => response.json())
        .then(d => { data = d; set_randomQ(d); });
}

function set_randomQ(d) {
    temp_array = [];
    r = random(0, d.questions.length - 1);
    question = d.questions[r]
    data.questions = d.questions.filter(function (item) { return item.question != d.questions[r].question });
    q[0].textContent = question.question;
    q_array.push(question.question);
    select = arrayShuffle(question.answer.concat());
    lie_ans.push(select);
    real_ans.push(question.answer);
    for (var i = 0; i < choices.length; i++) {
        choices[i].disabled = false;
        choices[i].textContent = select[i];
    };
}

function set_button() {
    table.classList.add("result")
    table.style.opacity = 0;
    for (var i = 0; i < choices.length; i++) {
        choices[i].addEventListener("click", (e) => {
            e.target.disabled = true;
            c_count++;
            temp_array.push(e.target.textContent)
            if (c_count == choices.length) {
                question_finish(temp_array);
                c_count = 0;
            }
        });
    };
};

function question_finish(temp_array) {
    q_count++;
    member_ans.push(temp_array);
    if (q_count == 3) {
        end_process();
        return
    }
    setTimeout(function () {
        set_randomQ(data);
    }, 1000);
    setTimeout(function () {
        all.forEach(element => {
            element.classList.remove("fadeout");
        });
    }, 800)
    all.forEach(element => {
        element.classList.add("fadeout");
    });
}

function end_process() {
    setTimeout(function () {
        table_all.forEach(element => {
            element.style.display = "none";
        });
        console.log(table);
        table.classList.remove("fadeout");
        table.style.opacity = 1;
        table.classList.add("fadein");
        tables.forEach(element => {
            element.classList.remove("fadeout");
            element.classList.add("fadein");
            element.opacity = 1;
        });
    }, 800);

    table_all.forEach(element => {
        element.classList.add("fadeout");
    });
    var temp_lst = []
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 3; j++) {
            temp_lst.push(member_ans[j][i]);
            temp_lst.push(real_ans[j][i]);
            temp_lst.push(lie_ans[j][i]);
        }
    }
    var i = 0;
    while (i < tds.length) {
        tds[i].textContent = temp_lst[i];
        i++;
    }
    for (var i = 0; i < q_array.length; i++) {
        q_tables[i].textContent = q_array[i];
    }

}


set_button();
get_qa();
