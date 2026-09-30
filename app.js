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
{name:'Aimlock V1',price:100000,desc:'Menu Aimlock V1 — kéo tâm, bám đầu.',sold:37,stock:9,img:'https://via.placeholder.com/200/7c3aed/fff?text=V1'},
{name:'Aimlock V2',price:200000,desc:'Menu Aimlock V2 — nâng cấp.',sold:25,stock:15,img:'https://via.placeholder.com/200/7c3aed/fff?text=V2'},
{name:'Aimlock V3',price:300000,desc:'Menu Aimlock V3 — fix lố.',sold:18,stock:20,img:'https://via.placeholder.com/200/7c3aed/fff?text=V3'},
{name:'Aimlock V4',price:400000,desc:'Menu Aimlock V4 — full.',sold:12,stock:10,img:'https://via.placeholder.com/200/7c3aed/fff?text=V4'},
{name:'Aimlock V5',price:500000,desc:'Menu Aimlock V5 — nhiều máy.',sold:8,stock:5,img:'https://via.placeholder.com/200/7c3aed/fff?text=V5'},
{name:'Aimlock V6',price:600000,desc:'Menu Aimlock V6 — cao cấp.',sold:5,stock:3,img:'https://via.placeholder.com/200/7c3aed/fff?text=V6'},
{name:'Nhẹ Tâm',price:100000,desc:'Giảm nặng tâm.',sold:164,stock:5,img:'https://via.placeholder.com/200/14b8a6/000?text=NHE+TAM'},
{name:'Bám Đầu',price:100000,desc:'Hỗ trợ kéo tâm.',sold:92,stock:31,img:'https://via.placeholder.com/200/14b8a6/000?text=BAM+DAU'},
{name:'Fix Rung Tâm',price:100000,desc:'Giảm rung.',sold:53,stock:7,img:'https://via.placeholder.com/200/14b8a6/000?text=FIX'},
{name:'Combo Nhẹ Tâm + Bám Đầu V1',price:150000,desc:'Combo V1.',sold:40,stock:12,img:'https://via.placeholder.com/200/7c3aed/fff?text=CB1'},
{name:'Combo Nhẹ Tâm + Bám Đầu V2',price:200000,desc:'Combo V2.',sold:22,stock:8,img:'https://via.placeholder.com/200/7c3aed/fff?text=CB2'},
{name:'Combo Nhẹ Tâm + Bám Đầu V3',price:250000,desc:'Combo V3.',sold:15,stock:6,img:'https://via.placeholder.com/200/7c3aed/fff?text=CB3'},
{name:'Aimlock AVT-Cache',price:150000,desc:'Tối ưu cache.',sold:19,stock:20,img:'https://via.placeholder.com/200/14b8a6/000?text=AVT'}
];

var html='';
PRODUCTS.forEach(function(p,i){
html+='<div class="card" onclick="openBuy('+i+')"><div class="img"><img src="'+p.img+'"></div><div class="info"><div class="cate">🔥 HỖ TRỢ KÉO TÂM IOS</div><div class="name">'+p.name+'</div><div class="stats"><span>📈 '+p.sold+' đã bán</span><span>📦 Còn '+p.stock+'</span></div><div class="price-row"><div class="price">'+p.price.toLocaleString()+'đ</div><div class="buy-tag">⚡ MUA</div></div></div></div>';
});
document.getElementById('productList').innerHTML=html;

function openBuy(i){if(!currentUser){alert('Vui lòng đăng nhập!');showTab('account');return}currentProduct=PRODUCTS[i];var d=document.getElementById('buyDetail');d.innerHTML='<div class="product-info"><img src="'+currentProduct.img+'"><div class="txt"><div class="cate">HỖ TRỢ KÉO TÂM IOS</div><div class="name">'+currentProduct.name+'</div></div></div><div class="row"><span>ĐƠN GIÁ</span><span class="val">'+currentProduct.price.toLocaleString()+'đ</span></div><div class="row"><span>SỐ DƯ VÍ</span><span class="val" style="color:'+(currentUser.balance>=currentProduct.price?'#14b8a6':'#ef4444')+'">'+currentUser.balance.toLocaleString()+'đ</span></div><div class="row total"><span>TỔNG THANH TOÁN</span><span class="val">'+currentProduct.price.toLocaleString()+'đ</span></div>'+(currentUser.balance<currentProduct.price?'<div class="warn">⚠️ SỐ DƯ KHÔNG ĐỦ<br>Cần nạp thêm <b>'+(currentProduct.price-currentUser.balance).toLocaleString()+'đ</b></div><button class="btn-buy" onclick="closeBuy();showTab(\'nap\')">→ NẠP TIỀN NGAY</button>':'<div class="success">⚡ GIAO HÀNG TỰ ĐỘNG NGAY SAU THANH TOÁN</div><button class="btn-buy" onclick="doBuy()">→ MUA NGAY</button>')+'<button class="btn-cancel" onclick="closeBuy()">✕ HUỶ</button>';document.getElementById('buyPopup').classList.remove('hide')}
function closeBuy(){document.getElementById('buyPopup').classList.add('hide')}
function doBuy(){var users=getUsers();var idx=users.findIndex(function(u){return u.phone===currentUser.phone});users[idx].balance-=currentProduct.price;saveUsers(users);currentUser=users[idx];localStorage.setItem('zebxvex_current',currentUser.phone);var o=getOrders();o.push({id:Date.now(),phone:currentUser.phone,name:currentUser.phone,amount:currentProduct.price,time:new Date().toLocaleString('vi-VN'),status:'done',code:Math.random().toString(36).substring(2,10).toUpperCase(),product:currentProduct.name,platform:'ios'});saveOrders(o);closeBuy();updateUserUI();var d=DELIVER[currentProduct.name];if(d&&d.ios){alert('✅ Mua thành công!\nSố dư còn: '+currentUser.balance.toLocaleString()+'đ\n\nBấm OK để tải file.');window.open(gd(d.ios),'_blank')}else{alert('✅ Mua thành công!\nLiên hệ Zalo 0355417385 để nhận file.')}renderOrders()}

function getUsers(){try{return JSON.parse(localStorage.getItem('zebxvex_users')||'[]')}catch(e){return[]}}
function saveUsers(u){localStorage.setItem('zebxvex_users',JSON.stringify(u))}
function getOrders(){try{return JSON.parse(localStorage.getItem('zebxvex')||'[]')}catch(e){return[]}}
function saveOrders(o){localStorage.setItem('zebxvex',JSON.stringify(o))}

function showTab(tab){
['shop','nap','don','box','account'].forEach(function(t){document.getElementById('page-'+t).classList.add('hide')});
document.getElementById('page-'+tab).classList.remove('hide');
document.querySelectorAll('.bottom-nav .nav-item').forEach(function(n){n.classList.remove('active')});
document.querySelector('.bottom-nav .nav-item[data-tab="'+tab+'"]').classList.add('active');
if(tab==='don')renderOrders();
if(tab==='account')updateUserUI();
}

function updateUserUI(){
var box=document.getElementById('userBox');
if(currentUser){
box.innerHTML='<div class="name">'+currentUser.phone+'</div><div class="balance">'+currentUser.balance.toLocaleString()+' VND</div><div class="avatar">'+currentUser.phone.charAt(0).toUpperCase()+'</div>';
}else{
box.innerHTML='<div class="name">Khách</div><div class="balance">0 VND</div><div class="avatar">?</div>';
}
var ac=document.getElementById('accountPage');
if(ac){
if(currentUser){
ac.innerHTML='<div class="avatar-big">'+currentUser.phone.charAt(0).toUpperCase()+'</div><div class="user-name">'+currentUser.phone+'</div><div class="user-email">'+currentUser.phone+'@zebxvex.com</div><div class="balance-box"><div class="label">SỐ DƯ</div><div class="value">'+currentUser.balance.toLocaleString()+' VND</div></div><button class="btn-main" onclick="showTab(\'nap\')" style="max-width:200px;margin:0 auto">💳 NẠP TIỀN</button><div class="stats-grid" style="margin-top:20px"><div class="stat-box"><div class="num" style="color:#14b8a6">'+getOrders().filter(function(o){return o.phone===currentUser.phone}).length+'</div><div class="lbl">TỔNG ĐƠN</div></div><div class="stat-box"><div class="num" style="color:#14b8a6">'+getOrders().filter(function(o){return o.phone===currentUser.phone&&o.status==="done"}).length+'</div><div class="lbl">HOÀN TẤT</div></div></div><button class="logout-btn" onclick="logoutUser()">→ ĐĂNG XUẤT</button>';
}else{
ac.innerHTML='<div class="form-box"><h3>ĐĂNG NHẬP</h3><input id="logPhone" placeholder="Số điện thoại"><input id="logPass" type="password" placeholder="Mật khẩu"><button class="btn-main" onclick="loginUser()">→ ĐĂNG NHẬP NGAY</button><p class="link">Chưa có tài khoản? <a onclick="showRegister()">Đăng ký ngay</a></p></div>';
}
}
}

function showRegister(){document.getElementById('accountPage').innerHTML='<div class="form-box"><h3>ĐĂNG KÝ</h3><input id="regPhone" placeholder="Số điện thoại"><input id="regPass" type="password" placeholder="Mật khẩu"><button class="btn-main" onclick="register()">→ ĐĂNG KÝ</button><p class="link">Đã có tài khoản? <a onclick="updateUserUI()">Đăng nhập</a></p></div>'}

function register(){var phone=document.getElementById('regPhone').value.trim();var pass=document.getElementById('regPass').value.trim();if(!phone||!pass){alert('Nhập đủ!');return}if(phone.length<10){alert('SĐT không hợp lệ!');return}var users=getUsers();if(users.find(function(u){return u.phone===phone})){alert('SĐT đã đăng ký!');return}users.push({phone:phone,pass:pass,balance:0});saveUsers(users);alert('✅ Đăng ký thành công!');updateUserUI()}
function loginUser(){var phone=document.getElementById('logPhone').value.trim();var pass=document.getElementById('logPass').value.trim();var users=getUsers();var u=users.find(function(x){return x.phone===phone&&x.pass===pass});if(!u){alert('SĐT hoặc mật khẩu sai!');return}currentUser=u;localStorage.setItem('zebxvex_current',phone);alert('✅ Đăng nhập thành công!');updateUserUI();renderOrders()}
function logoutUser(){currentUser=null;localStorage.removeItem('zebxvex_current');updateUserUI();alert('Đã đăng xuất!')}

function renderOrders(){
var o=getOrders().filter(function(x){return currentUser&&x.phone===currentUser.phone});
var el=document.getElementById('orderList');
if(!el)return;
if(o.length===0){el.innerHTML='<p style="text-align:center;color:#6b7280;padding:30px">Chưa có đơn nào.</p>';return}
o.sort(function(a,b){return b.id-a.id});
var h='';
o.forEach(function(x){h+='<div class="order-card"><div class="top"><div class="
