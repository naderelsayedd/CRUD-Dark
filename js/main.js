let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("tax");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mode = 'create';
let tmp ; 

// get total
function getTotal(){
    if(price.value != '')
    {
        let result =(+price.value + +taxes.value + +ads.value)- +discount.value
        total.innerHTML = result ;
        total.style.backgroundColor = '#040';
    }else
    {
        total.innerHTML = '';
    }
}
// create product 
let dataPro  ;

if(localStorage.product != null)
{
    dataPro = JSON.parse(localStorage.product)
}else
{
    dataPro = [];
}
submit.onclick = function(){
    let newPro = { //object
        title :title.value ,
        price :price.value ,
        taxes :taxes.value ,
        ads :ads.value ,
        discount :discount.value ,
        total :total.innerHTML ,
        count :count.value ,
        category :category.value
    }
    if(title.value  != ''){
        if(mode ==='create'){
            if(newPro.count >1)
        {
            for(let i = 0 ;i<newPro.count ;i++)
            {
                dataPro.push(newPro)
            }
        }else
        {
            dataPro.push(newPro)
        }
        }else
        {
            dataPro[tmp]=newPro ;
            mode = 'create';
            submit.innerHTML = 'Create'
            count.style.display = 'block';
        }
        clearDate()
    }else
    {
        alert("All main input fields are required")
    }
    
    // save data in local storage
    localStorage.setItem('product' ,JSON.stringify(dataPro))
    showData()
}
// clear data from inputs
function clearDate(){
    title.value = '' ;
    price.value = '' ;
    taxes.value = '' ;
    ads.value = '' ;
    discount.value = '' ;
    total.innerHTML = '' ;
    count.value = '' ;
    category.value = '' ;
}
// read data
function showData(){
    getTotal()
    let table = '' ;
    for(let  i = 0 ;i < dataPro.length ; i++)
    {
        table += `
        <tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td>
                            <button id="update" onclick="updateData(${i})">Update</button>
                        </td>

                        <td>
                            <button id="delete" onclick="deleteData(${i})">Delete</button>
                        </td>
                    </tr>
        `
    }

    document.getElementById("tBody").innerHTML = table ;
    let btnDelete = document.getElementById('deleteAll')
    if(dataPro.length > 0)
    {
        btnDelete.innerHTML = `
        <button onclick="deleteAll()">Delete All(${dataPro.length})</button>
        `
    }else
    {
        btnDelete.innerHTML = '';
    }
}showData()
// count
//delete
// delete only one row 
function deleteData(i)
{
    dataPro.splice(i ,1)
    localStorage.product =JSON.stringify(dataPro)
    showData();
}
//delete all 
function deleteAll(){
    localStorage.clear() ;
    dataPro.splice(0)
    showData()
}
// update
function updateData(i)
{
    scroll(
        {top : 0 ,
        behavior :"smooth"}
    )
    title.value =dataPro[i].title
    price.value =dataPro[i].price
    taxes.value =dataPro[i].taxes
    ads.value =dataPro[i].ads
    discount.value =dataPro[i].discount
    getTotal()
    count.style.display = 'none'
    category.value =dataPro[i].category
    submit.innerHTML = 'Update'
    mode = 'update'
    tmp = i
}
// search by name or category
let searchMode = 'title'
function getSearchMode(id)
{
    let search = document.getElementById("search")
    if(id === 'searchByTitle'){
        searchMode = 'title';
        search.placeholder = "Search by title"
    }else
    {
        searchMode = 'category'
        search.placeholder = "Search by category"
    }
    search.focus();
}
function searchData(value){
    if(searchMode == 'title')
    {
        let  table = '';
        for(let i =0 ; i<dataPro.length ; i++)
        {
            if(dataPro[i].title.includes(value))
            {
                table += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td>
                            <button id="update" onclick="updateData(${i})">Update</button>
                        </td>

                        <td>
                            <button id="delete" onclick="deleteData(${i})">Delete</button>
                        </td>
                    </tr>
                    `
            }    document.getElementById("tBody").innerHTML = table ;

        }
    }else{
        let  table = '';
        for(let i =0 ; i<dataPro.length ; i++)
        {
            if(dataPro[i].category.includes(value))
            {
                table += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td>
                            <button id="update" onclick="updateData(${i})">Update</button>
                        </td>

                        <td>
                            <button id="delete" onclick="deleteData(${i})">Delete</button>
                        </td>
                    </tr>
                    `
            }    document.getElementById("tBody").innerHTML = table ;

        }
    }
}
//clean data