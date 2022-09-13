let data = window.localStorage.getItem('data')
let listData = data ? JSON.parse(data) :[]



// let listData = [
//     // { task: 'tim hieu jquery', status:'todo', deadline: '2022-10-5' },
//     // { task: 'lam bai tap DOM', status:'doing', deadline: '2022-10-6' },
//     // { task: 'hoc JS', status: 'done', deadline: '2022-8-5' },
//     // { task: 'tim hieu React', status:'todo', deadline: '2022-10-10' },
// ]
listData = listData.map(function(value){
    let date = value.deadline.split('-')
    if(date[2] * 1 < 10 && date[2].split('')[0] !== 0){ date[2] = '0' + date[2] }
    if(date[1] * 1 < 10 && date[1].split('')[0] !== 0){  date[1] = '0' + date[1]}
    value.deadline = date.join('-')
    return value
})


let colors = [
    {name: 'todo', color: 'bg-danger'},
    {name: 'doing', color: 'bg-warning'},
    {name: 'done', color: 'bg-success'}
]
let dates = new Date()
let arrdate = [dates.getFullYear(), dates.getMonth() + 1, dates.getDate()]
if(arrdate[1]*1 < 10){
    arrdate[1] = '0' + arrdate[1]
}

function render(){
    $(`.todoList`).html('')
    $(`.doingList`).html('')
    $(`.doneList`).html('')
    
    listData = listData.sort(function(a, b){
        return b.deadline.split('-').join('') - a.deadline.split('-').join('')
    })
    for( let i = 0; i < listData.length; i++){
        var col = colors.find(function(value){
            return value.name == listData[i].status
        })
        if(listData[i].deadline.split('-').join('')*1 < arrdate.join('') * 1){
            var textcolor = 'textcolor'
        }else { textcolor = ''}


        $(`.${listData[i].status}List`).append(`
        <div class="card" style="margin: 10px;" data-bs-toggle="modal", data-bs-target="#exampleModal", onclick= "edits(${i})">
        <div class="card-header mediaheader ${col.color} ${listData[i].status} ${textcolor}" style = "color: #fff" >
          ${listData[i].deadline.split('-').reverse().join('/')}
        </div>
        <div class="card-body mediabody" >
          <blockquote class="blockquote mb-0 mediatext">
            <p>${listData[i].task}</p>
          </blockquote>
        </div>
      </div>
        `)
    }
}
render()

$('#btnadd').on('click', function(){
    $('#btndele').hide()
})

function edits(index){
    $('#inputmodaladd').val(`${listData[index].task}`)
    $('#selectmodaladd').val(`${listData[index].status}`)
    $('#inputdatemodaladd').val(`${listData[index].deadline}`)
    $('#btnsave').attr('onclick', `edit(${index})`)
    $('#btndele').attr('onclick', `dele(${index})`)
    $('#btndele').show()
}

function dele(index){
    listData.splice(index, 1)
    $('#inputmodaladd').val('')
    $('#selectmodaladd').val('')
    $('#inputdatemodaladd').val('')
    $('#close').trigger('click')
    $('#btnsave').attr('onclick', `add()`)
    window.localStorage.setItem('data', JSON.stringify(listData))
    render()
}


function edit(index){
    listData[index] =  { task: `${$('#inputmodaladd').val()}`, status: `${$('#selectmodaladd').val()}`, deadline: `${$('#inputdatemodaladd').val()}`}
    window.localStorage.setItem('data', JSON.stringify(listData))
    render()
    $('#btnsave').attr('onclick', `add()`)
    $('#inputmodaladd').val('')
    $('#selectmodaladd').val('')
    $('#inputdatemodaladd').val('')
    $('#close').trigger('click')
}



function add(){
    if($('#inputmodaladd').val() && $('#selectmodaladd').val() && $('#inputdatemodaladd').val()){
        listData.push( { task: `${$('#inputmodaladd').val()}`, status: `${$('#selectmodaladd').val()}`, deadline: `${$('#inputdatemodaladd').val()}` })
        $('#inputmodaladd').val('')
        $('#selectmodaladd').val('')
        $('#inputdatemodaladd').val('')
        $('#close').trigger('click')
        window.localStorage.setItem('data', JSON.stringify(listData))
        render()
    } else { 
        alert('vui long nhap du thong tin !!!')
    }
}






