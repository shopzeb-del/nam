var WORKER_URL='https://shopzeb-api.baonam310112.workers.dev';
var currentProduct=null,currentUser=null,autoCheckTimer=null,currentNapCode=null,currentNapAmount=0;
function gd(link){var m=link.match(/\/d\/([^\/]+)/);if(m)return 'https://drive.google.com/file/d/'+m[1]+'/view';return link}

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
{name:'Aimlock V1',price:100000,desc:'Menu Aimlock V1 — kéo tâm.',img:'logo.jpg.PNG'},
{name:'Aimlock V2',price:200000,desc:'Menu Aimlock V2 — nâng cấp.',img:'logo.jpg.PNG'},
{name:'Aimlock V3',price:300000,desc:'Menu Aimlock V3 — fix lố.',img:'logo.jpg.PNG'},
{name:'Aimlock V4',price:400000,desc:'Menu Aimlock V4 — full.',img:'logo.jpg.PNG'},
{name:'Aimlock V5',price:500000,desc:'Menu Aimlock V5 — nhiều máy.',img:'logo.jpg.PNG'},
{name:'Aimlock V6',price:600000,desc:'Menu Aimlock V6 — cao cấp.',img:'logo.jpg.PNG'},
{name:'Nhẹ Tâm',price:100000,desc:'Giảm nặng tâm.',img:'logo.jpg.PNG'},
{name:'Bám Đầu',price:100000,desc:'Hỗ trợ kéo tâm.',img:'logo.jpg.PNG'},
{name:'Fix Rung Tâm',price:100000,desc:'Giảm rung.',img:'logo.jpg.PNG'},
{name:'Combo Nhẹ Tâm + Bám Đầu V1',price:150000,desc:'Combo V1.',img:'logo.jpg.PNG'},
{name:'Combo Nhẹ Tâm + Bám Đầu V2',price:200000,desc:'Combo V2.',img:'logo.jpg.PNG'},
{name:'Combo Nhẹ Tâm + Bám Đầu V3',price:250000,desc:'Combo V3.',img:'logo.jpg.PNG'},
{name:'Aimlock AVT-Cache',price:150000,desc:'Tối ưu cache.',img:'logo.jpg.PNG'}
];

var html='';
PRODUCTS.forEach(function(p,i){
html+='<div class="card" onclick="openBuy('+i+')"><div class="tag">KEY</div><img src="'+p.img+'" onerror="this.src=\'logo.jpg.PNG\'"><h3>'+p.name+'</h3><div class="desc">'+p.desc+'</div><div class="price">'+p.price.toLocaleString()+'đ</div><button>Mua Ngay</button></div>';
});
document.getElementById('productList').innerHTML=html;

var songs=[{name:'Nhạc 1',src:'nhac1.mp3'},{name:'Nhạc 2',src:'nhac2.mp3'}];
var currentSong=0,player=document.getElementById('musicPlayer');
function loadSong(i){currentSong=(i+songs.length)%songs.length;document.getElementById('musicSource').src=songs[currentSong].src;player.load();document.getElementById('songTitle').textContent='🎵 '+(currentSong+1)+': '+songs[currentSong].name}
function toggleMusic(){if(player.paused){player.play();document.getElementById('playBtn').textContent='⏸ TẮT NHẠC'}else{player.pause();document.getElementById('playBtn').textContent='▶ BẬT NHẠC'}}
function nextSong(){loadSong(currentSong+1);player.play()}
function prevSong(){loadSong(currentSong-1);player.play()}
function setVolume(){player.volume=document.getElementById('volume').value/100}
player.volume=0.5;

function getUsers(){try{return JSON.parse(localStorage.getItem('zebxvex_users')||'[]')}catch(e){return[]}}
function saveUsers(u){localStorage.setItem('zebxvex_users',JSON.stringify(u))}
function getOrders(){try{return JSON.parse(localStorage.getItem('zebxvex')||'[]')}catch(e){return[]}}
function saveOrders(o){localStorage.setItem('zebxvex',JSON.stringify(o))}
function genCode(){return 'ZEBXVEX'+Math.floor(1000+Math.random()*9000)}

function showTab(tab){
['shop','napPage','historyPage','accountPage','login','register','adminLogin','admin'].forEach(function(id){var e=document.getElementById(id);if(e)e.classList.add('hide')});
if(tab==='shop'){document.getElementById('shop').classList.remove('hide')}
if(tab==='nap'){
if(!currentUser){alert('Vui lòng đăng nhập!');showUserLogin();return}
document.getElementById('napPage').classList.remove('hide');
document.getElementById('napPage').innerHTML='<h2>💳 NẠP TIỀN</h2><div class="box"><h3>📌 NỘI DUNG CHUYỂN KHOẢN</h3><div style="background:#0a0a0f;border:2px dashed #14b8a6;border-radius:10px;padding:15px;text-align:center;margin:10px 0"><div style="color:#6b7280;font-size:11px;margin-bottom:5px">MÃ NẠP TIỀN</div><div id="napCodeShow" style="color:#ffd166;font-size:20px;font-weight:bold;letter-spacing:2px">-------</div></div><p><b style="color:#14b8a6">MB Bank:</b> VI THANH HUY</p><p><b style="color:#14b8a6">STK:</b> 0375374529</p><img src="qr.JPG" onerror="this.src=\'https://via.placeholder.com/200/fff/000?text=QR\'"><input id="nName" placeholder="Tên của bạn"><input id="nAmount" type="number" placeholder="Số tiền nạp (VD: 50000)"><button class="btn-main" onclick="submitNap()">✅ TẠO MÃ NẠP TIỀN</button><p id="napStatus" style="text-align:center;color:#94a3b8;font-size:13px;margin-top:10px"></p></div><div class="box" style="background:rgba(20,184,166,0.05);border:1px solid rgba(20,184,166,0.2)"><h3>📌 LƯU Ý</h3><ul style="list-style:none;color:#94a3b8;font-size:13px;line-height:2"><li>• Nhập số tiền → bấm TẠO MÃ.</li><li>• Chuyển khoản đúng nội dung mã đó.</li><li>• Hệ thống tự động cộng tiền sau 5-10 giây.</li><li>• Liên hệ Zalo 0355417385 nếu chưa được cộng.</li></ul></div>';
}
if(tab==='don'){if(!currentUser){alert('Vui lòng đăng nhập!');showUserLogin();return}document.getElementById('historyPage').classList.remove('hide');renderHistory()}
if(tab==='box'){alert('📦 BOX: Tính năng đang phát triển!');return}
if(tab==='account'){if(!currentUser){showUserLogin();return}showAccountPage()}
document.querySelectorAll('.bottom-nav .nav-item').forEach(function(n){n.classList.remove('active')});
var a=document.querySelector('.bottom-nav .nav-item[data-tab="'+tab+'"]');
if(a)a.classList.add('active');
window.scrollTo({top:0,behavior:'smooth'});
}

function showAccountPage(){
var acc=document.getElementById('accountPage');
acc.classList.remove('hide');
var orders=getOrders().filter(function(o){return o.phone===currentUser.phone});
var done=orders.filter(function(o){return o.status==='done'});
acc.innerHTML='<h2>👤 TÀI KHOẢN</h2><div class="box" style="text-align:center"><div style="width:80px;height:80px;background:#7c3aed;border-radius:50%;display:flex;justify-content:center;align-items:center;font-size:32px;font-weight:bold;margin:0 auto 15px">'+currentUser.phone.charAt(0).toUpperCase()+'</div><h3 style="text-align:center;margin-bottom:5px">'+currentUser.phone+'</h3><div style="background:#0a0a0f;border:1px solid #1f2937;border-radius:10px;padding:15px;margin-bottom:15px"><div style="color:#6b7280;font-size:11px;margin-bottom:5px">SỐ DƯ</div><div style="color:#14b8a6;font-size:24px;font-weight:bold">'+currentUser.balance.toLocaleString()+' VND</div></div><button class="btn-main" onclick="showTab(\'nap\')" style="max-width:200px;margin:0 auto">💳 NẠP TIỀN</button></div><button class="btn-main" style="background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);color:#ef4444;margin-top:15px" onclick="logoutUser();showTab(\'shop\')">ĐĂNG XUẤT</button>';
}

function updateUserUI(){
var b=document.getElementById('userBox');
if(!b)return;
if(currentUser){b.innerHTML='👤 '+currentUser.phone+' | 💰 <b>'+currentUser.balance.toLocaleString()+'đ</b>'}
else{b.innerHTML='<button style="background:#14b8a6;color:#000;border:none;padding:6px 12px;border-radius:8px;font-weight:bold;cursor:pointer;font-size:12px" onclick="showUserLogin()">ĐĂNG NHẬP</button>'}
}

function showUserLogin(){document.getElementById('shop').classList.add('hide');document.getElementById('login').classList.remove('hide')}
function showRegister(){document.getElementById('login').classList.add('hide');document.getElementById('register').classList.remove('hide')}
function showLoginForm(){document.getElementById('register').classList.add('hide');document.getElementById('login').classList.remove('hide')}
function register(){var p=document.getElementById('regPhone').value.trim();var pw=document.getElementById('regPass').value.trim();if(!p||!pw){alert('Nhập đủ!');return}if(p.length<10){alert('SĐT không hợp lệ!');return}var users=getUsers();if(users.find(function(u){return u.phone===p})){alert('SĐT đã đăng ký!');return}users.push({phone:p,pass:pw,balance:0});saveUsers(users);alert('✅ Đăng ký thành công!');document.getElementById('regPhone').value='';document.getElementById('regPass').value='';showLoginForm()}
function loginUser(){var p=document.getElementById('logPhone').value.trim();var pw=document.getElementById('logPass').value.trim();if(!p||!pw){alert('Nhập đủ!');return}var users=getUsers();var u=users.find(function(x){return x.phone===p&&x.pass===pw});if(!u){document.getElementById('logErr').classList.remove('hide');return}currentUser=u;localStorage.setItem('zebxvex_current',p);alert('✅ Đăng nhập thành công!');showTab('shop');updateUserUI()}
function logoutUser(){currentUser=null;localStorage.removeItem('zebxvex_current');updateUserUI();alert('Đã đăng xuất!');showTab('shop')}

function submitNap(){
if(!currentUser){alert('Vui lòng đăng nhập!');return}
var n=document.getElementById('nName').value.trim();
var a=document.getElementById('nAmount').value.trim();
if(!n||!a){alert('Nhập đủ tên và số tiền!');return}
var code=genCode();
currentNapCode=code;
currentNapAmount=parseInt(a);
var o=getOrders();
o.push({id:Date.now(),phone:currentUser.phone,name:n,amount:parseInt(a),time:new Date().toLocaleString('vi-VN'),status:'pending',code:code,product:'Nạp tiền',platform:''});
saveOrders(o);
document.getElementById('napCodeShow').textContent=code;
document.getElementById('napStatus').innerHTML='<span style="color:#ffd166">⏳ Đang chờ chuyển khoản... Hệ thống tự kiểm tra mỗi 5 giây.</span>';
if(autoCheckTimer)clearInterval(autoCheckTimer);
autoCheckTimer=setInterval(checkNapAuto,5000);
alert('✅ Đã tạo mã nạp: '+code+'\n\nChuyển khoản đúng nội dung này.\nHệ thống tự cộng tiền sau 5-10 giây.');
}

function checkNapAuto(){
if(!currentNapCode){return}
fetch(WORKER_URL).then(function(r){return r.json()}).then(function(data){
var txs=data.transactions||data.data||[];
var found=null;
txs.forEach(function(t){
var content=(t.transaction_content||t.content||'').toUpperCase();
var amountIn=t.amount_in||t.amountIn||t.amount||0;
if(content.indexOf(currentNapCode)>-1 && parseInt(amountIn)>=currentNapAmount){found=t}
});
if(found){
if(autoCheckTimer){clearInterval(autoCheckTimer);autoCheckTimer=null}
var users=getUsers();
var idx=users.findIndex(function(u){return u.phone===currentUser.phone});
if(idx>=0){
users[idx].balance+=currentNapAmount;
saveUsers(users);
currentUser=users[idx];
localStorage.setItem('zebxvex_current',currentUser.phone);
}
var o=getOrders().map(function(x){if(x.code===currentNapCode){x.status='done'}return x});
saveOrders(o);
updateUserUI();
document.getElementById('napStatus').innerHTML='<span style="color:#14b8a6;font-weight:bold">✅ ĐÃ CỘNG '+currentNapAmount.toLocaleString()+'đ VÀO TÀI KHOẢN!</span>';
alert('🎉 Nạp tiền thành công!\nSố dư mới: '+currentUser.balance.toLocaleString()+'đ');
currentNapCode=null;
}
}).catch(function(){});
}

function openBuy(i){
if(!currentUser){alert('Vui lòng đăng nhập!');showUserLogin();return}
currentProduct=PRODUCTS[i];
var p=document.getElementById('platformPopup');
p.innerHTML='<div class="inner"><h3>📱 MUA '+currentProduct.name+' <button class="close" onclick="closePlatform()">×</button></h3><img src="'+currentProduct.img+'" class="img-big"><p style="text-align:center;color:#14b8a6;font-size:20px;font-weight:bold;margin:10px 0">'+currentProduct.price.toLocaleString()+'đ</p><p style="text-align:center;color:#94a3b8;font-size:13px;margin-bottom:15px">'+currentProduct.desc+'</p><button class="btn-main" onclick="choosePlatform(\'ios\')">🍎 Mua cho iOS</button><button class="btn-main" style="background:#3b82f6;color:#fff;margin-top:8px" onclick="choosePlatform(\'adr\')">🤖 Mua cho Android</button><button class="btn-main" style="background:transparent;border:1px solid #1f2937;color:#fff;margin-top:8px" onclick="closePlatform()">❌ Đóng</button></div>';
p.classList.remove('hide');
}
function closePlatform(){document.getElementById('platformPopup').classList.add('hide')}
function choosePlatform(p){
closePlatform();
if(!currentUser){alert('Vui lòng đăng nhập!');showUserLogin();return}
if(currentUser.balance<currentProduct.price){
alert('❌ Số dư không đủ!\n\nSố dư: '+currentUser.balance.toLocaleString()+'đ\nCần: '+currentProduct.price.toLocaleString()+'đ');
showTab('nap');
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
alert('✅ Mua thành công!\nSố dư còn: '+currentUser.balance.toLocaleString()+'đ\n\nBấm OK để mở file.');
window.open(fileLink,'_blank');
}else{
alert('✅ Mua thành công!\nSố dư còn: '+currentUser.balance.toLocaleString()+'đ\n\nLiên hệ Zalo 0355417385 để nhận file.');
}
}

function renderHistory(){
var o=getOrders().filter(function(x){return x.phone===currentUser.phone});
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
