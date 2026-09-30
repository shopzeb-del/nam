var currentProduct=null,currentUser=null;
function gd(link){var m=link.match(/\/d\/([^\/]+)/);if(m)return 'https://drive.google.com/uc?export=download&id='+m[1];return link}

var DELIVER={
'Aimlock V1':{ios:'https://drive.google.com/file/d/1PmAEDCWPl3FOwesF1Q788MUU6i8TpPJy/view',adr:'https://drive.google.com/file/d/1b2JFRojjmMrvj4TAuBwyqPIklqrpbUUd/view'},
'Aimlock V2':{ios:'https://drive.google.com/file/d/1Bv05ffTVqxm3xsjnB3xMBkv1us7lYdIW/view',adr:'https://drive.google.com/file/d/1V3ISkx2AlD8pWS3nOfHYysKyIsjxSM9B/view'},
'Aimlock V3':{ios:'https://drive.google.com/file/d/1WrdSAghk359nqlQd6f_nT1d1z0hDDeqO/view',adr:'https://drive.google.com/file/d/1KeNT3FENmHrMw1EdO22HUyFrMYq5P0bt/view'},
'Aimlock V4':{ios:'https://drive.google.com/file/d/1bzuZlWQVMxli3If5xJpLD7N-KVUtKutR/view',adr:'https://drive.google.com/file/d/13ii39vZERuB4Wt9k48EFqxUP3tAwBf6P/view'},
'Aimlock V5':{ios:'https://drive.google.com/file/d/1K6HXDHh0GprkNNKtVPHTXzV-NpO-9Hau/view',adr:'https://drive.google.com/file/d/1f7hF-skRcQklxCLS2LTd7-MUvrTuc6NV/view'},
'Aimlock V6':{ios:'https://drive.google.com/file/d/1GTdc5OdGc6PDhAAeWztcTs1dBnF1__8c/view',adr:'https://drive.google.com/file/d/1HUrRMrvBsCZe1EZex87mL7SgPSrnMM9F/view'},
'Nhẹ Tâm':{ios:'https://drive.google.com/file/d/1NlfI9oFI0-4_Kel-iakIN2Eqllfje3BN/view',adr:'https://drive.google.com/file/d/17NYqLFyer8YC6drXDMNJE6ASh1uvWBVE/view'},
'Bám Đầu':{ios:'https://drive.google.com/file/d/1fH6sFt9M_IfOUGoM9b6eSq27la3GRXvZ/view',adr:'https://drive.google.com/file/d/1z3uV5IZo-tpzkeSewntQJQ-hnHmgkSr3/view'},
'Fix Rung Tâm':{ios:'https://drive.google.com/file/d/1CDH20znYYM_d99EYHnsljPZV9A2vlKFE/view',adr:'https://drive.google.com/file/d/1HRe9kyQZ6jZjyVDGUn8gielFG1P2GquT/view'},
'Combo Nhẹ Tâm + Bám Đầu V1':{ios:'https://drive.google.com/file/d/1NlfI9oFI0-4_Kel-iakIN2Eqllfje3BN/view',adr:'https://drive.google.com/file/d/17NYqLFyer8YC6drXDMNJE6ASh1uvWBVE/view'},
'Combo Nhẹ Tâm + Bám Đầu V2':{ios:'https://drive.google.com/file/d/1NlfI9oFI0-4_Kel-iakIN2Eqllfje3BN/view',adr:'https://drive.google.com/file/d/17NYqLFyer8YC6drXDMNJE6ASh1uvWBVE/view'},
'Combo Nhẹ Tâm + Bám Đầu V3':{ios:'https://drive.google.com/file/d/1v6Z4vivt9Z-x1e-_cvb8jEAzirICqwKV/view',adr:'https://drive.google.com/file/d/1MXTaO1tl4cshWkB18JyYTgkB1hW4nNhz/view'},
'Aimlock AVT-Cache':{ios:'https://drive.google.com/file/d/1v6Z4vivt9Z-x1e-_cvb8jEAzirICqwKV/view',adr:'https://drive.google.com/file/d/1MXTaO1tl4cshWkB18JyYTgkB1hW4nNhz/view'}
};

var PRODUCTS=[
{name:'Aimlock V1',price:1000,desc:'Menu Aimlock V1 — kéo tâm, bám đầu.',img:'https://via.placeholder.com/300/14b8a6/000?text=V1'},
{name:'Aimlock V2',price:200000,desc:'Menu Aimlock V2 — nâng cấp.',img:'https://via.placeholder.com/300/14b8a6/000?text=V2'},
{name:'Aimlock V3',price:300000,desc:'Menu Aimlock V3 — fix lố.',img:'https://via.placeholder.com/300/14b8a6/000?text=V3'},
{name:'Aimlock V4',price:400000,desc:'Menu Aimlock V4 — full.',img:'https://via.placeholder.com/300/14b8a6/000?text=V4'},
{name:'Aimlock V5',price:500000,desc:'Menu Aimlock V5 — nhiều máy.',img:'https://via.placeholder.com/300/14b8a6/000?text=V5'},
{name:'Aimlock V6',price:600000,desc:'Menu Aimlock V6 — cao cấp.',img:'https://via.placeholder.com/300/14b8a6/000?text=V6'},
{name:'Nhẹ Tâm',price:100000,desc:'Giảm nặng tâm.',img:'https://via.placeholder.com/300/7c3aed/fff?text=NHE+TAM'},
{name:'Bám Đầu',price:100000,desc:'Hỗ trợ kéo tâm.',img:'https://via.placeholder.com/300/7c3aed/fff?text=BAM+DAU'},
{name:'Fix Rung Tâm',price:100000,desc:'Giảm rung.',img:'https://via.placeholder.com/300/7c3aed/fff?text=FIX'},
{name:'Combo Nhẹ Tâm + Bám Đầu V1',price:150000,desc:'Combo V1.',img:'https://via.placeholder.com/300/14b8a6/000?text=CB1'},
{name:'Combo Nhẹ Tâm + Bám Đầu V2',price:200000,desc:'Combo V2.',img:'https://via.placeholder.com/300/14b8a6/000?text=CB2'},
{name:'Combo Nhẹ Tâm + Bám Đầu V3',price:250000,desc:'Combo V3.',img:'https://via.placeholder.com/300/14b8a6/000?text=CB3'},
{name:'Aimlock AVT-Cache',price:150000,desc:'Tối ưu cache.',img:'https://via.placeholder.com/300/7c3aed/fff?text=AVT'}
];

var html='';
PRODUCTS.forEach(function(p,i){
html+='<div class="card" onclick="openBuy('+i+')"><img src="'+p.img+'"><h3>'+p.name+'</h3><div class="desc">'+p.desc+'</div><div class="price">'+p.price.toLocaleString()+'đ</div><button>Mua Ngay</button></div>';
});
document.getElementById('productList').innerHTML=html;

function openMenu(){document.getElementById('sidebar').classList.add('open');document.getElementById('overlay').classList.add('show')}
function closeMenu(){document.getElementById('sidebar').classList.remove('open');document.getElementById('overlay').classList.remove('show')}

var songs=[{name:'Nhạc 1',src:'nhac1.mp3'},{name:'Nhạc 2',src:'nhac2.mp3'}];
var currentSong=0,player=document.getElementById('musicPlayer');
function loadSong(i){currentSong=(i+songs.length)%songs.length;document.getElementById('musicSource').src=songs[currentSong].src;player.load();document.getElementById('songTitle').textContent='🎵 '+(currentSong+1)+': '+songs[currentSong].name}
function toggleMusic(){if(player.paused){player.play();document.getElementById('playBtn').textContent='⏸ TẮT NHẠC'}else{player.pause();document.getElementById('playBtn').textContent='▶ BẬT NHẠC'}}
function nextSong(){loadSong(currentSong+1);player.play();document.getElementById('playBtn').textContent='⏸ TẮT NHẠC'}
function prevSong(){loadSong(currentSong-1);player.play();document.getElementById('playBtn').textContent='⏸ TẮT NHẠC'}
function setVolume(){player.volume=document.getElementById('volume').value/100}
player.volume=0.5;

function getUsers(){try{return JSON.parse(localStorage.getItem('zebxvex_users')||'[]')}catch(e){return[]}}
function saveUsers(u){localStorage.setItem('zebxvex_users',JSON.stringify(u))}
function getOrders(){try{return JSON.parse(localStorage.getItem('zebxvex')||'[]')}catch(e){return[]}}
function saveOrders(o){localStorage.setItem('zebxvex',JSON.stringify(o))}
function genCode(){return 'ZEBXVEX'+Math.floor(1000+Math.random()*9000)}

function showRegister(){document.getElementById('login').classList.add('hide');document.getElementById('register').classList.remove('hide')}
function showLoginForm(){document.getElementById('register').classList.add('hide');document.getElementById('login').classList.remove('hide')}
function register(){var phone=document.getElementById('regPhone').value.trim();var pass=document.getElementById('regPass').value.trim();if(!phone||!pass){alert('Nhập đủ!');return}if(phone.length<10){alert('SĐT không hợp lệ!');return}var users=getUsers();if(users.find(function(u){return u.phone===phone})){alert('SĐT đã đăng ký!');return}users.push({phone:phone,pass:pass,balance:0});saveUsers(users);alert('✅ Đăng ký thành công!');document.getElementById('regPhone').value='';document.getElementById('regPass').value='';showLoginForm()}
function loginUser(){var phone=document.getElementById('logPhone').value.trim();var pass=document.getElementById('logPass').value.trim();if(!phone||!pass){alert('Nhập đủ!');return}var users=getUsers();var u=users.find(function(x){return x.phone===phone&&x.pass===pass});if(!u){document.getElementById('logErr').classList.remove('hide');return}currentUser=u;localStorage.setItem('zebxvex_current',phone);alert('✅ Đăng nhập thành công!');backHome();updateUserUI()}
function logoutUser(){currentUser=null;localStorage.removeItem('zebxvex_current');updateUserUI();alert('Đã đăng xuất!')}

function updateUserUI(){
var el=document.getElementById('userInfo');
if(!el)return;
if(currentUser){el.innerHTML='<p style="color:#14b8a6;font-size:14px">👤 <b>'+currentUser.phone+'</b> | 💰 <b>'+currentUser.balance.toLocaleString()+'đ</b> <button style="background:#ef4444;color:#fff;border:none;padding:4px 10px;border-radius:6px;margin-left:8px;cursor:pointer;font-size:12px" onclick="logoutUser()">Đăng xuất</button></p>'}
else{el.innerHTML='<button class="btn-main" style="max-width:250px" onclick="showUserLogin()">👤 ĐĂNG NHẬP / ĐĂNG KÝ</button>'}
}

function showUserLogin(){document.getElementById('shop').classList.add('hide');document.getElementById('login').classList.remove('hide')}

function submitNap(){
if(!currentUser){alert('Vui lòng đăng nhập!');showUserLogin();return}
var n=document.getElementById('nName').value.trim();
var a=document.getElementById('nAmount').value.trim();
if(!n||!a){alert('Nhập đủ!');return}
var code=genCode();
var o=getOrders();
o.push({id:Date.now(),phone:currentUser.phone,name:n,amount:parseInt(a),time:new Date().toLocaleString('vi-VN'),status:'pending',code:code,product:'Nạp tiền',platform:''});
saveOrders(o);
alert('✅ Đã tạo đơn nạp!\nNội dung CK: '+code+'\nChuyển khoản xong, Admin sẽ cộng tiền.');
document.getElementById('nName').value='';
document.getElementById('nAmount').value='';
}

function openBuy(i){
if(!currentUser){alert('Vui lòng đăng nhập!');showUserLogin();return}
currentProduct=PRODUCTS[i];
document.getElementById('platformProduct').textContent='Sản phẩm: '+currentProduct.name+' — '+currentProduct.price.toLocaleString()+'đ';
document.getElementById('platformPopup').classList.remove('hide');
}
function closePlatform(){document.getElementById('platformPopup').classList.add('hide')}
function choosePlatform(p){
closePlatform();
if(!currentUser){alert('Vui lòng đăng nhập!');showUserLogin();return}
if(currentUser.balance<currentProduct.price){
alert('❌ Số dư không đủ!\n\nSố dư: '+currentUser.balance.toLocaleString()+'đ\nCần: '+currentProduct.price.toLocaleString()+'đ\n\nVui lòng nạp thêm tiền.');
document.getElementById('nap').scrollIntoView({behavior:'smooth'});
return;
}
if(!confirm('Xác nhận mua '+currentProduct.name+' ('+(p==='ios'?'iOS':'Android')+')?\nGiá: '+currentProduct.price.toLocaleString()+'đ'))return;
var users=getUsers();
var idx=users.findIndex(function(u){return u.phone===currentUser.phone});
users[idx].balance-=currentProduct.price;
saveUsers(users);
currentUser=users[idx];
localStorage.setItem('zebxvex_current',currentUser.phone);
var o=getOrders();
o.push({id:Date.now(),phone:currentUser.phone,name:currentUser.phone+' (Mua '+currentProduct.name+')',amount:currentProduct.price,time:new Date().toLocaleString('vi-VN'),status:'done',code:'',product:currentProduct.name,platform:p});
saveOrders(o);
updateUserUI();
var d=DELIVER[currentProduct.name];
var fileLink='';
if(d&&d[p]){fileLink=gd(d[p])}
if(fileLink){
alert('✅ Mua thành công!\nSố dư còn: '+currentUser.balance.toLocaleString()+'đ\n\nBấm OK để tải file.');
window.open(fileLink,'_blank');
}else{
alert('✅ Mua thành công!\nSố dư còn: '+currentUser.balance.toLocaleString()+'đ\n\nVui lòng liên hệ Zalo 0355417385 để nhận file.');
}
}

function showHistory(){
if(!currentUser){alert('Vui lòng đăng nhập!');showUserLogin();return}
document.getElementById('shop').classList.add('hide');
document.getElementById('historyPage').classList.remove('hide');
renderHistory();
}
function renderHistory(){
var o=getOrders().filter(function(x){return x.phone===currentUser.phone&&x.status==='done'});
var tbody=document.getElementById('historyList');
tbody.innerHTML='';
if(o.length===0){document.getElementById('noHistory').style.display='block';return}
document.getElementById('noHistory').style.display='none';
o.sort(function(a,b){return b.id-a.id});
o.forEach(function(x){
var tr=document.createElement('tr');
tr.innerHTML='<td>'+(x.product||'—')+'</td><td>1</td><td>'+x.amount.toLocaleString()+'đ</td><td>'+x.time+'</td>';
tbody.appendChild(tr);
});
}

function showLogin(){document.getElementById('shop').classList.add('hide');document.getElementById('adminLogin').classList.remove('hide')}
function adminLogin(){if(document.getElementById('adminPass').value==='Hoangbaonam@2012'){document.getElementById('adminLogin').classList.add('hide');document.getElementById('admin').classList.remove('hide');renderAdmin()}else{document.getElementById('adminErr').classList.remove('hide')}}
function backHome(){document.getElementById('login').classList.add('hide');document.getElementById('register').classList.add('hide');document.getElementById('adminLogin').classList.add('hide');document.getElementById('admin').classList.add('hide');document.getElementById('historyPage').classList.add('hide');document.getElementById('shop').classList.remove('hide')}

function renderAdmin(){
var o=getOrders();
var tbody=document.getElementById('orders');
tbody.innerHTML='';
if(o.length===0){document.getElementById('empty').style.display='block';return}
document.getElementById('empty').style.display='none';
o.sort(function(a,b){return b.id-a.id});
o.forEach(function(x){
var tr=document.createElement('tr');
var st=x.status==='pending'?'<span style="color:#ffd166">Chờ</span>':'<span style="color:#14b8a6">Đã duyệt</span>';
var btn=x.status==='pending'&&x.product==='Nạp tiền'
?'<button style="padding:4px 8px;background:#14b8a6;color:#000;border:none;border-radius:6px;cursor:pointer;font-size:11px" onclick="approveNap('+x.id+')">Cộng tiền</button> <button style="padding:4px 8px;background:#ef4444;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:11px" onclick="delOrder('+x.id+')">Xóa</button>'
:x.status==='pending'?'<button style="padding:4px 8px;background:#14b8a6;color:#000;border:none;border-radius:6px;cursor:pointer;font-size:11px" onclick="approveOrder('+x.id+')">Duyệt</button>'
:'<button style="padding:4px 8px;background:#ef4444;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:11px" onclick="delOrder('+x.id+')">Xóa</button>';
tr.innerHTML='<td>'+x.time+'</td><td>'+x.name+'</td><td>'+x.amount.toLocaleString()+'đ</td><td>'+(x.product||'—')+'</td><td>'+(x.platform||'—')+'</td><td>'+st+'</td><td>'+btn+'</td>';
tbody.appendChild(tr);
});
}

function approveNap(id){
if(!confirm('Xác nhận cộng tiền cho khách?'))return;
var o=getOrders();
var order=o.find(function(x){return x.id===id});
if(!order){alert('Không tìm thấy!');return}
var users=getUsers();
var idx=users.findIndex(function(u){return u.phone===order.phone});
if(idx<0){alert('Không tìm thấy khách!');return}
users[idx].balance+=order.amount;
saveUsers(users);
o=o.map(function(x){if(x.id===id){x.status='done'}return x});
saveOrders(o);
renderAdmin();
alert('✅ Đã cộng '+order.amount.toLocaleString()+'đ cho '+order.phone);
}
function approveOrder(id){var o=getOrders().map(function(x){if(x.id===id){x.status='done'}return x});saveOrders(o);renderAdmin()}
function delOrder(id){saveOrders(getOrders().filter(function(x){return x.id!==id}));renderAdmin()}

(function(){var phone=localStorage.getItem('zebxvex_current');if(phone){var users=getUsers();currentUser=users.find(function(u){return u.phone===phone})||null}updateUserUI()})();
