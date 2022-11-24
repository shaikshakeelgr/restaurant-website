let sdrag;
let map={};
let map1={}
let map2={};
let map3={}

const xmlhttp = new XMLHttpRequest();
window.onload = xmlhttp.onload = function() {
  const food = JSON.parse(this.responseText);
  let foodlist=document.getElementById('foodlist');
food.forEach((item) => {
    
    let div= document.createElement('div')
    div.classList.add('Food');
    
	const foodname=document.createElement('li');
	foodname.classList.add('fooditems')
	foodname.innerHTML+=item.name
	foodname.setAttribute('id', item.name)
    
    const price=document.createElement('li');
	price.classList.add('foodprice');
	price.innerHTML+='price(Rs): '+item.price;
	div.append(foodname,price)
	
	div.setAttribute('draggable','true');
	div.setAttribute('cursor','pointer');

    div.addEventListener('drag',()=>{
        console.log('drag initiated')
    })

    div.addEventListener('dragstart',(event)=>{
        sdrag=foodname.id
        console.log(sdrag)
    })

    
    div.addEventListener('dragend',()=>{
    //    dragended(ids[foodname.id],foodname.id)
    console.log('drag ended')
    })

	foodlist.append(div);
	})
};
xmlhttp.open("GET", "resto.json");
xmlhttp.send();

function searchfood() {
	let input = document.getElementById('searchbar').value
	input=input.toLowerCase();
	let x = document.getElementsByClassName('Food');
	let i;
	for (i = 0; i < x.length; i++) {
		if (!x[i].innerHTML.toLowerCase().includes(input)) {
			x[i].style.display="none";
		}
		else {
			x[i].style.display="list-item";				
		}
	}
}

let previousValue={}
let categories={
    "Chicken Biryani" : 'main',
        "French Fries": 'starters',
        "Chicken Mandi": 'main',  
        "Veg Noodels": 'main',
        "Egg Noodels": 'main',
        "Ice Cream" : 'deserts',
        "Tea": 'snacks'
}

let ids={
    "Chicken Biryani" : 'cb',
        "French Fries": 'ff',
        "Chicken Mandi": 'cm',  
        "Veg Noodels": 'vn',
        "Egg Noodels": 'en',
        "Ice Cream" : 'ic',
        "Tea": 't'
}

let counts={
    "Chicken Biryani" : 0,
        "French Fries": 0,
        "Chicken Mandi": 0,  
        "Veg Noodels": 0,
        "Egg Noodels": 0,
        "Ice Cream" : 0,
        "Tea": 0
}

let prices={
        "Chicken Biryani" : 125.00,
        "French Fries": 105.00,
        "Chicken Mandi": 420.00,  
        "Veg Noodels": 75.00,
        "Egg Noodels": 80.00,
        "Ice Cream" : 60.00,
        "Tea": 30.00 
}

let table = [
    {
        'TableNumber': "Table-1",
        'Rs': 0.00,
        'Totalitems': 0,
        'no' : 't1'
    },
    {
        'TableNumber': "Table-2",
        'Rs': 0.00,
        'Totalitems': 0,
        'no' : 't2'
    },
    {
        'TableNumber': "Table-3",
        'Rs': 0.00,
        'Totalitems': 0,
        'no' : 't3'

    },
    {
        'TableNumber': "Table-4",
        'Rs': 0.00,
        'Totalitems': 0,
        'no' : 't4'
    }

]

let count={

}

let i=0;

let cont=null;
let cont1=null;


window.onload= function(){


    let list1=document.getElementById('tablelist');
    table.forEach((item) => {
        
        let tables=document.createElement('div')
        tables.classList.add('tables')
        tables.setAttribute('id',item.TableNumber+'s')
        tables.innerHTML=item.TableNumber;
        
       
        let TableNumber=document.createElement('li')
        TableNumber.innerHTML='Rs. '

        let span=document.createElement('span') 
        span.innerText=0       
        span.setAttribute('id',item.TableNumber)        
        TableNumber.append(span)

        let span1=document.createElement('span')
        span1.innerText+=' | Total items : '
        TableNumber.append(span1)

        let span2=document.createElement('span')
        span2.setAttribute('id','c'+item.no)
        span2.innerText+='0'
        TableNumber.append(span2)

        tables.appendChild(TableNumber)

        tables.addEventListener('dragover',(event)=>{
            event.preventDefault();
        },false);

        tables.addEventListener('dragenter',()=>{
           
                console.log('entered')
                p1=item.TableNumber
                p2=item.no
        })

        tables.addEventListener('dragleave',()=>{
            console.log('left')
        })

        tables.addEventListener('drop',(event)=>{
            event.preventDefault();
          dropof(item)
        })

        
        tables.addEventListener('click',()=>{
            popup(item)

        })
        
        list1.appendChild(tables)
        

    })

    let list2=document.getElementById('drag')
    table.forEach((item)=>{

        let tabdiv=document.createElement('div')
        tabdiv.setAttribute('id',item.no)
        tabdiv.classList.add('tabdiv')
        
        let odiv=document.createElement('div')
        odiv.classList.add('odiv')
        odiv.innerHTML=item.TableNumber+' | OrderDetails'
        

        let tabbtn=document.createElement('button')
        tabbtn.innerHTML+='X';  
        tabbtn.classList.add('tabbtn')
        odiv.append(tabbtn)

        tabdiv.appendChild(odiv)


        let tabele=document.createElement('table')
        tabele.classList.add('t')
        tabele.setAttribute('id','tb'+item.no)

        let th=document.createElement('th')
        let td1=document.createElement('td')
        td1.innerHTML+='S.NO'
        td1.classList.add('td1')
        th.append(td1)
        let td2=document.createElement('td')
        td2.innerHTML+='Item'
        td2.classList.add('td2')
        th.append(td2)
        let td3=document.createElement('td')
        td3.innerHTML+='Quantity'
        td3.classList.add('td3')
        th.append(td3)
        let td4=document.createElement('td')
        td4.innerHTML+='Price'
        td4.classList.add('td4')

        th.append(td4)


        tabele.append(th)

        let divtb=document.createElement('div')
        divtb.setAttribute('id','div'+item.no)
        tabele.append(divtb)


        tabdiv.append(tabele)


        let total=document.createElement('div')
        total.classList.add('tot')
        total.innerHTML='Total:'
        tabele.append(total)

        let totamt=document.createElement('div')
        totamt.classList.add('totamt')
        totamt.setAttribute('id','s'+item.TableNumber)
        totamt.innerHTML='0.00'
        tabele.append(totamt)

        

      tabbtn.addEventListener('click',()=>{
        popclose(item.no,item.TableNumber+'s')
    })

        
        list2.append(tabdiv )

    })

    

};



function searchtable() {
	let input1 = document.getElementById('tablesearch').value
	input1=input1.toLowerCase();
	
    let x1 = document.getElementsByClassName('tables');
	let i;
	for (i = 0; i < x1.length; i++) {
		
        if (!x1[i].innerHTML.toLowerCase().includes(input1)) {
			x1[i].style.display="none";
		}
		else {
			x1[i].style.display="list-item";				
		}
	}
    
}

let bool
function popup(item){
    let sid=item.no
   document.getElementById(sid).style.display='block'
   if(!bool){
   let genbill=document.createElement('button');
        genbill.classList.add('genbill')
        genbill.setAttribute('id','genbil'+sid)
        genbill.innerHTML='GENERATE BILL'
        document.getElementById(sid).append(genbill)
        //let genbill=document.getElementsByClassName('genbill')
        genbill.addEventListener('click',()=>{
            alert("Please Collect amount Rs."+document.getElementById(item.TableNumber).innerHTML)
            generateBill(item)

        })

   }
   bool=1
   
}

function popclose(sid,bgid){
    document.getElementById(sid).style.display='none'
}

let s=1;
function dropof(item)
{
    document.querySelector('#'+item.TableNumber).innerHTML=parseInt(document.querySelector('#'+item.TableNumber).innerHTML)+prices[sdrag]
    let tb=document.querySelector('#div'+item.no)
    
    if(!document.querySelector('#tr'+ids[sdrag]+item.no)){

        document.querySelector('#c'+item.no).innerHTML= parseInt(document.querySelector('#c'+item.no).innerHTML)+1


        let tr=document.createElement('tr')
        tr.setAttribute('id','tr'+ids[sdrag]+item.no)
        tr.classList.add('tr'+item.no)

        let d1=document.createElement('td')
        d1.classList.add('Sno')
        d1.innerHTML=(s)
        s++;
        tr.append(d1)

        let d2=document.createElement('td')
        d2.setAttribute('id','d2'+sdrag+item.no)
        d2.classList.add('item')
        d2.innerHTML=sdrag
        tr.append(d2)
        

        let d3=document.createElement('td')
        d3.classList.add('qty')
        let input=document.createElement('input')
        input.setAttribute('id','in'+item.no+ids[sdrag])
        input.name="in"+item.no
        input.type="number"
        input.value=1
        input.min="1"
        
        
        input.addEventListener('input',()=>{
            chooseStanding(input.id,item)
        })

        
        input.classList.add('input');
        d3.append(input)
        tr.append(d3)

        let d4=document.createElement('td')
        d4.classList.add('price')
        d4.setAttribute('id','d4'+ids[sdrag]+item.no)
        d4.innerHTML=prices[sdrag]
        tr.append(d4)

        let d5=document.createElement('td')
        d5.classList.add('delete')
        let img=document.createElement('img')
        img.setAttribute('id','d5'+ids[sdrag]+item.no)
        img.classList.add('del')
        img.src="images/del.png"
        img.alt="Delete"
        d5.append(img)
        
        img.addEventListener('click',()=>{
            removing(item,img.id)
        })

        tr.append(d5);

       map2[img.id]=tr.id

       map3[img.id]=d4.id

        map[input.id]=d4.id

        map1[input.id]=d2.id
        tb.append(tr)

        
    }
    else{
       
        counts[sdrag]+=1
        let x=document.querySelector('#in'+item.no+ids[sdrag]);
        x.value=counts[sdrag]+1

        

        document.querySelector('#d4'+ids[sdrag]+item.no).innerHTML=parseInt(document.querySelector('#d4'+ids[sdrag]+item.no).innerHTML)+prices[sdrag]

    }

    //drag drop , increasing input bar
    if(!previousValue['in'+item.no+ids[sdrag]]){
        previousValue['in'+item.no+ids[sdrag]]=1
    }
    else{
        previousValue['in'+item.no+ids[sdrag]]=parseInt(previousValue['in'+item.no+ids[sdrag]])+1
        document.getElementById('in'+item.no+ids[sdrag]).value=previousValue['in'+item.no+ids[sdrag]]
    }

    //updating total value in bill
    document.getElementById('s'+item.TableNumber).innerHTML=document.getElementById(item.TableNumber).innerHTML+'.00'
    
}


function chooseStanding(cur,item) {

    if(!previousValue[cur]) {
        previousValue[cur]=1;
    }   
    let current=document.getElementById(cur).value
    
   current=parseInt(current)
    console.log(previousValue)

    if (previousValue[cur] > current) {
        
        let p=document.getElementById(map1[cur]).innerHTML
        document.getElementById(map[cur]).innerHTML=prices[p]*current
        document.getElementById(item.TableNumber).innerHTML=parseInt(document.getElementById(item.TableNumber).innerHTML) - (prices[p]*(previousValue[cur]-current))
    
    }
    else if (previousValue[cur] < current) {
        
        let p=document.getElementById(map1[cur]).innerHTML
        document.getElementById(map[cur]).innerHTML=prices[p]*current
        document.getElementById(item.TableNumber).innerHTML=parseInt(document.getElementById(item.TableNumber).innerHTML) + (prices[p]*(current-previousValue[cur]))
    }
    document.getElementById('s'+item.TableNumber).innerHTML=document.getElementById(item.TableNumber).innerHTML+'.00'
    previousValue[cur]=current
}

function removing(item,imgid){
    let remid=map2[imgid]
    let rem=document.getElementById(remid)
    console.log(remid)

    let key=getKey(map3[imgid])
    
    previousValue[key]=0
    
    document.querySelector('#c'+item.no).innerHTML= parseInt(document.querySelector('#c'+item.no).innerHTML)-1

    let newTotal=parseInt(document.getElementById(item.TableNumber).innerHTML)-parseInt(document.getElementById(map3[imgid]).innerHTML)
        if(!newTotal){
           document.getElementById(item.TableNumber).innerHTML=0
           document.getElementById('s'+item.TableNumber).innerHTML=0.00
    }
    else{
           document.getElementById(item.TableNumber).innerHTML=newTotal
           document.getElementById('s'+item.TableNumber).innerHTML=document.getElementById(item.TableNumber).innerHTML+'.00'
    }

    rem.remove()
}

function generateBill(item){

    
    const elements = document.getElementsByClassName('tr'+item.no);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
    document.getElementById(item.TableNumber).innerHTML=0
    document.getElementById('c'+item.no).innerHTML=0
    document.getElementById('s'+item.TableNumber).innerHTML='0.00'

    //resetting the maps
    map={}
    map1={};
    map2={}
    map3={};
    previousValue={}

    popclose(item.no)
}

function getKey(val) {
    return Object.keys(map).find(key => map[key] === val);
  }


