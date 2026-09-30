var WORKER_URL='https://shopzeb-api.baonam310112.workers.dev';
var currentUser=null,currentProduct=null,autoTimer=null,napCode=null,napAmount=0,isAdmin=false;
function gd(l){var m=l.match(/\/d\/([^\/]+)/);return m?'https://drive.google.com/file/d/'+m[1]+'/view':l}

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

var h='';
PRODUCTS.forEach(function(p,i){h+='<div class="card" onclick="openBuy('+i+')"><div class="tag">KEY</div><img src="'+p.img+'"><h3>'+p.name+'</h3><div class="desc">'+p.desc+'</div><div class="price">'+p.price.toLocaleString()+'đ</div><button>Mua Ngay</button></div>'});
document.getElementById('productList').innerHTML=h;

var songs=[{name:'Nhạc 1',src:'nhac1.mp3'},{name:'Nhạc 2',src:'nhac2.mp3'}];
var cs=0,player=document.getElementById('musicPlayer');
function loadSong(i){cs=(i+songs.length)%songs.length;document.getElementById('musicSource').src=songs[cs].src;player.load();document.getElementById('songTitle').textContent='🎵 '+(cs+1)+': '+songs[cs].name}
function toggleMusic(){if(player.paused){player.play();document.getElementById('playBtn').textContent='⏸ TẮT NHẠC'}else{player.pause();document.getElementById('playBtn').textContent='▶ BẬT NHẠC'}}
function nextSong(){loadSong(cs+1);player.play()}
function prevSong(){loadSong(cs-1);player.play()}
function setVolume(){player.volume=document.getElementById('volume').value/100}
player.volume=0.5;

function getUsers(){try{return JSON.parse(localStorage.getItem('zxu')||'[]')}catch(e){return[]}}
function saveUsers(u){localStorage.setItem('zxu',JSON.stringify(u))}
function getOrders(){try{return JSON.parse(localStorage.getItem('zxo')||'[]')}catch(e){return[]}}
function saveOrders(o){localStorage.setItem('zxo',JSON.stringify(o))}
function genCode(){return 'ZEBXVEX'+Math.floor(1000+Math.random()*9000)}

function showTab(t){
['shop','napPage','historyPage','accountPage','login','register','adminLogin','admin'].forEach(function(id){var e=document.getElementById(id);if(e)e.classList.add('hide')});
if(t==='shop')document.getElementById('shop').classList.remove('hide');
if(t==='nap'){
if(!currentUser){alert('Vui lòng đăng nhập!');showUserLogin();return}
document.getElementById('napPage').classList.remove('hide');
document.getElementById('napPage').innerHTML='<h2>💳 NẠP TIỀN</h2><div class="box"><h3>📌 NỘI DUNG CHUYỂN KHOẢN</h3><div style="background:#0a0a0f;border:2px dashed #14b8a6;border-radius:10px;padding:15px;text-align:center;margin:10px 0"><div style="color:#6b7280;font-size:11px;margin-bottom:5px">MÃ NẠP TIỀN</div><div id="napCodeShow" style="color:#ffd166;font-size:20px;font-weight:bold;letter-spacing:2px">-------</div></div><p><b style="color:#14b8a6">MB Bank:</b> VI THANH HUY</p><p><b style="color:#14b8a6">STK:</b> 0375374529</p><img src="qr.JPG"><input id="nName" placeholder="Tên của bạn"><input id="nAmount" type="number" placeholder="Số tiền nạp (VD: 50000)"><button class="btn-main" onclick="submitNap()">✅ TẠO MÃ NẠP TIỀN</button><p id="napStatus" style="text-align:center;color:#94a3b8;font-size:13px;margin-top:10px"></p></div>';
}
if(t==='don'){if(!currentUser){alert('Vui lòng đăng nhập!');return}document.getElementById('historyPage').classList.remove('hide');renderHistory()}
if(t==='box'){alert('📦 BOX đang phát triển!');return}
if(t==='account'){if(!currentUser){showUserLogin();return}showAccountPage()}
document.querySelectorAll('.bottom-nav .nav-item').forEach(function(n){n.classList.remove('active')});
var a=document.querySelector('.bottom-nav .nav-item[data-tab="'+t+'"]');
if(a)a.classList.add('active');
window.scrollTo({top:0,behavior:'smooth'});
}

function showAccountPage(){
var acc=document.getElementById('accountPage');
acc.classList.remove('hide');
var o=getOrders().filter(function(x){return x.phone===currentUser.phone});
var d=o.filter(function(x){return x.status==='done'});
acc.innerHTML='<h2>👤 TÀI KHOẢN</h2><div class="box" style="text-align:center"><div style="width:80px;height:80px;background:#7c3aed;border-radius:50%;display:flex;justify-content:center;align-items:center;font-size:32px;font-weight:bold;margin:0 auto 15px">'+currentUser.phone.charAt(0).toUpperCase()+'</div><h3 style="text-align:center;margin-bottom:5px">'+currentUser.phone+'</h3><div style="background:#0a0a0f;border:1px solid #1f2937;border-radius:10px;padding:15px;margin-bottom:15px"><div style="color:#6b7280;font-size:11px;margin-bottom:5px">SỐ DƯ</div><div style="color:#14b8a6;font-size:24px;font-weight:bold">'+currentUser.balance.toLocaleString()+' VND</div></div><button class="btn-main" onclick="showTab(\'nap\')" style="max-width:200px;margin:0 auto">💳 NẠP TIỀN</button></div><button class="btn-main" style="background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);color:#ef4444;margin-top:15px" onclick="logoutUser();showTab(\'shop\')">ĐĂNG XUẤT</button>';
}

function updateUserUI(){
var b=document.getElementById('userBox');if(!b)return;
if(currentUser){b.innerHTML='👤 '+currentUser.phone+' | 💰 <b>'+currentUser.balance.toLocaleString()+'đ</b>'+(isAdmin?' <span style="color:#ffd166;font-weight:bold">[ADMIN]</span>':'')}
else{b.innerHTML='<button style="background:#14b8a6;color:#000;border:none;padding:6px 12px;border-radius:8px;font-weight:bold;cursor:pointer;font-size:12px" onclick="showUserLogin()">ĐĂNG NHẬP</button>'}
}
function showUserLogin(){document.getElementById('shop').classList.add('hide');document.getElementById('login').classList.remove('hide')}
function showRegister(){document.getElementById('login').classList.add('hide');document.getElementById('register').classList.remove('hide')}
function showLoginForm(){document.getElementById('register').classList.add('hide');document.getElementById('login').classList.remove('hide')}

function register(){var p=document.getElementById('regPhone').value.trim(),pw=document.getElementById('regPass').value.trim();if(!p||!pw){alert('Nhập đủ!');return}if(p.length<10){alert('SĐT không hợp lệ!');return}var u=getUsers();if(u.find(function(x){return x.phone===p})){alert('SĐT đã đăng ký!');return}u.push({phone:p,pass:pw,balance:0});saveUsers(u);alert('✅ Đăng ký thành công!');showLoginForm()}
function loginUser(){var p=document.getElementById('logPhone').value.trim(),pw=document.getElementById('logPass').value.trim();var u=getUsers();var x=u.find(function(y){return y.phone===p&&y.pass===pw});if(!x){document.getElementById('logErr').classList.remove('hide');return}currentUser=x;localStorage.setItem('zxc',p);alert('✅ Đăng nhập thành công!');showTab('shop');updateUserUI()}
function logoutUser(){currentUser=null;isAdmin=false;localStorage.removeItem('zxc');updateUserUI();alert('Đã đăng xuất!');showTab('shop')}

function submitNap(){
if(!currentUser){alert('Vui lòng đăng nhập!');return}
var n=document.getElementById('nName').value.trim(),a=document.getElementById('nAmount').value.trim();
if(!n||!a){alert('Nhập đủ!');return}
var code=genCode();
napCode=code;napAmount=parseInt(a);
var o=getOrders();
o.push({id:Date.now(),phone:currentUser.phone,name:n,amount:napAmount,time:new Date().toLocaleString('vi-VN'),status:'pending',code:code,product:'Nạp tiền',platform:''});
saveOrders(o);
document.getElementById('napCodeShow').textContent=code;
document.getElementById('napStatus').innerHTML='<span style="color:#ffd166">⏳ Đang chờ... Tự kiểm tra mỗi 5 giây.</span>';
if(autoTimer)clearInterval(autoTimer);
autoTimer=setInterval(checkNapAuto,5000);
alert('✅ Mã nạp: '+code+'\nChuyển khoản đúng nội dung này.');
}

function checkNapAuto(){
if(!napCode)return;
fetch(WORKER_URL).then(function(r){return r.json()}).then(function(data){
var txs=data.transactions||data.data||[],found=null;
txs.forEach(function(t){
var c=(t.transaction_content||t.content||'').toUpperCase();
var am=t.amount_in||t.amountIn||t.amount||0;
if(c.indexOf(napCode)>-1 && parseInt(am)>=napAmount)found=t;
});
if(found){
if(autoTimer){clearInterval(autoTimer);autoTimer=null}
var u=getUsers(),idx=u.findIndex(function(x){return x.phone===currentUser.phone});
if(idx>=0){u[idx].balance+=napAmount;saveUsers(u);currentUser=u[idx];localStorage.setItem('zxc',currentUser.phone)}
var o=getOrders().map(function(x){if(x.code===napCode)x.status='done';return x});
saveOrders(o);updateUserUI();
document.getElementById('napStatus').innerHTML='<span style="color:#14b8a6;font-weight:bold">✅ ĐÃ CỘNG '+napAmount.toLocaleString()+'đ!</span>';
alert('🎉 Nạp thành công!\nSố dư: '+currentUser.balance.toLocaleString()+'đ');
napCode=null;
}
}).catch(function(){});
}

function openBuy(i){
if(!currentUser){alert('Vui lòng đăng nhập!');showUserLogin();return}
currentProduct=PRODUCTS[i];
var p=document.getElementById('platformPopup');
p.innerHTML='<div class="inner"><h3>📱 MUA '+currentProduct.name+(isAdmin?' <span style="color:#ffd166">[ADMIN FREE]</span>':'')+' <button class="close" onclick="closePlatform()">×</button></h3><img src="'+currentProduct.img+'" class="img-big"><p style="text-align:center;color:#14b8a6;font-size:20px;font-weight:bold;margin:10px 0">'+(isAdmin?'MIỄN PHÍ (ADMIN)':currentProduct.price.toLocaleString()+'đ')+'</p><p style="text-align:center;color:#94a3b8;font-size:13px;margin-bottom:15px">'+currentProduct.desc+'</p><button class="btn-main" onclick="choosePlatform(\'ios\')">🍎 iOS</button><button class="btn-main" style="background:#3b82f6;color:#fff;margin-top:8px" onclick="choosePlatform(\'adr\')">🤖 Android</button><button class="btn-main" style="background:transparent;border:1px solid #1f2937;color:#fff;margin-top:8px" onclick="closePlatform()">❌ Đóng</button></div>';
p.classList.remove('hide');
}
function closePlatform(){document.getElementById('platformPopup').classList.add('hide')}

function choosePlatform(p){
closePlatform();
if(!currentUser){alert('Vui lòng đăng nhập!');return}
if(!isAdmin && currentUser.balance<currentProduct.price){alert('❌ Số dư không đủ!\nSố dư: '+currentUser.balance.toLocaleString()+'đ\nCần: '+currentProduct.price.toLocaleString()+'đ');showTab('nap');return}
if(!isAdmin && !confirm('Xác nhận mua '+currentProduct.name+' ('+(p==='ios'?'iOS':'Android')+')?'))return;
if(isAdmin && !confirm('ADMIN MUA MIỄN PHÍ '+currentProduct.name+' ('+(p==='ios'?'iOS':'Android')+')?'))return;
if(!isAdmin){
var u=getUsers(),idx=u.findIndex(function(x){return x.phone===currentUser.phone});
u[idx].balance-=currentProduct.price;saveUsers(u);currentUser=u[idx];localStorage.setItem('zxc',currentUser.phone);
}
var o=getOrders();
o.push({id:Date.now(),phone:currentUser.phone,name:currentUser.phone+(isAdmin?' [ADMIN FREE]':'')+' (Mua '+currentProduct.name+')',amount:isAdmin?0:currentProduct.price,time:new Date().toLocaleString('vi-VN'),status:'done',code:'',product:currentProduct.name,platform:p});
saveOrders(o);updateUserUI();
var d=DELIVER[currentProduct.name],l='';
if(d&&d[p])l=gd(d[p]);
if(l){alert('✅ Mua thành công!'+(isAdmin?'\n[ADMIN - MIỄN PHÍ]':'')+'\n\nBấm OK để mở file.');window.open(l,'_blank')}
else{alert('✅ Mua thành công!\nLiên hệ Zalo 0355417385 để nhận file.')}
}

function renderHistory(){
var o=getOrders().filter(function(x){return x.phone===currentUser.phone}),tb=document.getElementById('historyList');
tb.innerHTML='';
if(o.length===0){document.getElementById('noHistory').style.display='block';return}
document.getElementById('noHistory').style.display='none';
o.sort(function(a,b){return b.id-a.id});
o.forEach(function(x){var tr=document.createElement('tr');tr.innerHTML='<td>'+(x.product||'—')+'</td><td>1</td><td>'+x.amount.toLocaleString()+'đ</td><td>'+x.time+'</td>';tb.appendChild(tr)});
}

function showLogin(){document.getElementById('shop').classList.add('hide');document.getElementById('adminLogin').classList.remove('hide')}
function adminLogin(){if(document.getElementById('adminPass').value==='Hoangbaonam@2012'){isAdmin=true;document.getElementById('adminLogin').classList.add('hide');document.getElementById('admin').classList.remove('hide');renderAdmin();updateUserUI()}else{document.getElementById('adminErr').classList.remove('hide')}}

function renderAdmin(){
var o=getOrders(),tb=document.getElementById('orders');
tb.innerHTML='';
var u=getUsers();
var add='<div class="box"><h3>💰 CỘNG TIỀN CHO KHÁCH</h3><input id="addPhone" placeholder="SĐT khách"><input id="addAmount" type="number" placeholder="Số tiền"><button class="btn-main" onclick="adminAddMoney()">✅ CỘNG TIỀN</button></div><div class="box"><h3>👥 DANH SÁCH TÀI KHOẢN</h3><table style="font-size:12px"><thead><tr><th>SĐT</th><th>Số dư</th></tr></thead><tbody>';
u.forEach(function(x){add+='<tr><td>'+x.phone+'</td><td style="color:#14b8a6">'+x.balance.toLocaleString()+'đ</td></tr>'});
add+='</tbody></table></div>';
if(o.length===0){document.getElementById('empty').style.display='block';document.getElementById('empty').innerHTML=add+'Chưa có đơn.';return}
document.getElementById('empty').style.display='none';
o.sort(function(a,b){return b.id-a.id});
var tbHtml='';
o.forEach(function(x){
var st=x.status==='pending'?'<span style="color:#ffd166">Chờ</span>':'<span style="color:#14b8a6">Đã duyệt</span>';
var btn=x.status==='pending'&&x.product==='Nạp tiền'
?'<button style="padding:4px 8px;background:#14b8a6;color:#000;border:none;border-radius:6px;cursor:pointer;font-size:11px" onclick="approveNap('+x.id+')">Cộng tiền</button>'
:x.status==='pending'?'<button style="padding:4px 8px;background:#14b8a6;color:#000;border:none;border-radius:6px;cursor:pointer;font-size:11px" onclick="approveOrder('+x.id+')">Duyệt</button>':'';
tbHtml+='<tr><td>'+x.time+'</td><td>'+x.name+'</td><td>'+x.amount.toLocaleString()+'đ</td><td>'+(x.product||'—')+'</td><td>'+st+'</td><td>'+btn+'</td></tr>';
});
tb.innerHTML='<tr><td colspan="6">'+add+'</td></tr>'+tbHtml;
}

function adminAddMoney(){
var p=document.getElementById('addPhone').value.trim(),a=document.getElementById('addAmount').value.trim();
if(!p||!a){alert('Nhập SĐT và số tiền!');return}
var u=getUsers(),idx=u.findIndex(function(x){return x.phone===p});
if(idx<0){alert('❌ Không tìm thấy tài khoản: '+p);return}
u[idx].balance+=parseInt(a);saveUsers(u);
var o=getOrders();
o.push({id:Date.now(),phone:p,name:p+' [ADMIN CỘNG TIỀN]',amount:parseInt(a),time:new Date().toLocaleString('vi-VN'),status:'done',code:'',product:'Admin cộng tiền',platform:''});
saveOrders(o);
alert('✅ Đã cộng '+parseInt(a).toLocaleString()+'đ cho '+p+'\nSố dư mới: '+u[idx].balance.toLocaleString()+'đ');
renderAdmin();
}

function approveNap(id){
if(!confirm('Cộng tiền cho khách?'))return;
var o=getOrders(),order=o.find(function(x){return x.id===id});
if(!order)return;
var u=getUsers(),idx=u.findIndex(function(x){return x.phone===order.phone});
if(idx<0){alert('Không tìm thấy khách!');return}
u[idx].balance+=order.amount;saveUsers(u);
o=o.map(function(x){if(x.id===id)x.status='done';return x});
saveOrders(o);renderAdmin();
alert('✅ Đã cộng '+order.amount.toLocaleString()+'đ');
}
function approveOrder(id){var o=getOrders().map(function(x){if(x.id===id)x.status='done';return x});saveOrders(o);renderAdmin()}

(function(){var p=localStorage.getItem('zxc');if(p){var u=getUsers();currentUser=u.find(function(x){return x.phone===p})||null}updateUserUI()})();
