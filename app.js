var FIREBASE_URL='https://zebxvex-default-rtdb.asia-southeast1.firebasedatabase.app';
var WORKER_URL='https://shopzeb-api.baonam310112.workers.dev';
var currentUser=null,currentProduct=null,autoTimer=null,napCode=null,napAmount=0,isAdmin=false,isAdmin2=false;
function giaBan(p){if(currentUser&&currentUser.isSeller)return Math.round(p*0.5);return p}
function gd(l){var m=l.match(/\/d\/([^\/]+)/);return m?'https://drive.google.com/uc?export=download&id='+m[1]:l}

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

function fbGet(path,cb){fetch(FIREBASE_URL+'/'+path+'.json').then(function(r){return r.json()}).then(function(d){cb(d)}).catch(function(){cb(null)})}
function fbSet(path,data,cb){fetch(FIREBASE_URL+'/'+path+'.json',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}).then(function(r){return r.json()}).then(function(d){if(cb)cb(d)}).catch(function(){if(cb)cb(null)})}
function fbPush(path,data,cb){fetch(FIREBASE_URL+'/'+path+'.json',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}).then(function(r){return r.json()}).then(function(d){if(cb)cb(d)}).catch(function(){if(cb)cb(null)})}

function saveUser(user,cb){fbSet('users/'+user.phone.replace(/[^0-9]/g,''),user,function(){if(cb)cb()})}
function loadUser(phone,cb){fbGet('users/'+phone.replace(/[^0-9]/g,''),function(d){cb(d)})}
function loadAllUsers(cb){fbGet('users',function(d){var arr=[];if(d){Object.keys(d).forEach(function(k){var u=d[k];u._key=k;arr.push(u)})}cb(arr)})}
function saveOrder(order,cb){fbPush('orders',order,function(){if(cb)cb()})}
function loadAllOrders(cb){fbGet('orders',function(d){var arr=[];if(d){Object.keys(d).forEach(function(k){var o=d[k];o._key=k;arr.push(o)})}cb(arr)})}
function genCode(){return 'ZEBXVEX'+Math.floor(1000+Math.random()*9000)}

function showTab(t){
['shop','napPage','historyPage','accountPage','login','register','adminLogin','admin'].forEach(function(id){var e=document.getElementById(id);if(e)e.classList.add('hide')});
if(t==='shop')document.getElementById('shop').classList.remove('hide');
if(t==='nap'){if(!currentUser){alert('Vui lòng đăng nhập!');showUserLogin();return}document.getElementById('napPage').classList.remove('hide');if(!napCode){napCode=genCode()}document.getElementById('napCodeShow').textContent=napCode;document.getElementById('napStatus').innerHTML='<span style="color:#94a3b8">Nhập số tiền và chuyển khoản đúng nội dung: <b style="color:#ffd166">'+napCode+'</b></span>'}
if(t==='don'){if(!currentUser){alert('Vui lòng đăng nhập!');return}document.getElementById('historyPage').classList.remove('hide');renderHistory()}
if(t==='box'){alert('📦 BOX đang phát triển!');return}
if(t==='account'){if(!currentUser){showUserLogin();return}showAccountPage()}
document.querySelectorAll('.bottom-nav .nav-item').forEach(function(n){n.classList.remove('active')});
var a=document.querySelector('.bottom-nav .nav-item[data-tab="'+t+'"]');if(a)a.classList.add('active');
window.scrollTo({top:0,behavior:'smooth'});
}

function showAccountPage(){var acc=document.getElementById('accountPage');acc.classList.remove('hide');var sellerTag=currentUser.isSeller?'<p style="color:#06d6a0;text-align:center;font-weight:bold;margin-bottom:10px">🏷️ TÀI KHOẢN SELLER — GIẢM 50%</p>':'';acc.innerHTML='<h2>👤 TÀI KHOẢN</h2><div class="box" style="text-align:center">'+sellerTag+'<div style="width:80px;height:80px;background:#7c3aed;border-radius:50%;display:flex;justify-content:center;align-items:center;font-size:32px;font-weight:bold;margin:0 auto 15px">'+currentUser.phone.charAt(0).toUpperCase()+'</div><h3 style="text-align:center;margin-bottom:5px">'+currentUser.phone+'</h3><div style="background:#0d0b1a;border:1px solid #3a2a5a;border-radius:10px;padding:15px;margin-bottom:15px"><div style="color:#6b7280;font-size:11px;margin-bottom:5px">SỐ DƯ</div><div style="color:#c77dff;font-size:24px;font-weight:bold">'+(currentUser.balance||0).toLocaleString()+' VND</div></div><button class="btn-main" onclick="showTab(\'nap\')" style="max-width:200px;margin:0 auto">💳 NẠP TIỀN</button></div><button class="btn-main" style="background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);color:#ef4444;margin-top:15px" onclick="logoutUser();showTab(\'shop\')">ĐĂNG XUẤT</button>'}

function updateUserUI(){var b=document.getElementById('userBox');if(!b)return;if(currentUser){var tag='';if(isAdmin)tag=' <span style="color:#ffd166;font-weight:bold">[ADMIN]</span>';else if(isAdmin2)tag=' <span style="color:#3b82f6;font-weight:bold">[ADMIN2]</span>';else if(currentUser.isSeller)tag=' <span style="color:#06d6a0;font-weight:bold">[SELLER]</span>';b.innerHTML='👤 '+currentUser.phone+' | 💰 <b>'+(currentUser.balance||0).toLocaleString()+'đ</b>'+tag}else{b.innerHTML='<button style="background:#7b2cbf;color:#fff;border:none;padding:6px 12px;border-radius:8px;font-weight:bold;cursor:pointer;font-size:12px" onclick="showUserLogin()">ĐĂNG NHẬP</button>'}}
function showUserLogin(){document.getElementById('shop').classList.add('hide');document.getElementById('login').classList.remove('hide')}
function showRegister(){document.getElementById('login').classList.add('hide');document.getElementById('register').classList.remove('hide')}
function showLoginForm(){document.getElementById('register').classList.add('hide');document.getElementById('login').classList.remove('hide')}

function register(){var p=document.getElementById('regPhone').value.trim(),pw=document.getElementById('regPass').value.trim();if(!p||!pw){alert('Nhập đủ!');return}if(p.length<10){alert('SĐT không hợp lệ!');return}loadUser(p,function(existing){if(existing){alert('SĐT đã đăng ký!');return}saveUser({phone:p,pass:pw,balance:0,created:new Date().toLocaleString('vi-VN')},function(){alert('✅ Đăng ký thành công!');showLoginForm()})})}
function loginUser(){var p=document.getElementById('logPhone').value.trim(),pw=document.getElementById('logPass').value.trim();if(!p||!pw){alert('Nhập đủ!');return}loadUser(p,function(u){if(!u||u.pass!==pw){document.getElementById('logErr').classList.remove('hide');return}currentUser=u;localStorage.setItem('zxc',p);alert('✅ Đăng nhập thành công!');showTab('shop');updateUserUI()})}
function logoutUser(){currentUser=null;isAdmin=false;isAdmin2=false;localStorage.removeItem('zxc');updateUserUI();alert('Đã đăng xuất!');showTab('shop')}

function startCheckNap(){if(!currentUser){alert('Vui lòng đăng nhập!');return}var a=document.getElementById('nAmount').value.trim();if(!a){alert('Nhập số tiền!');return}napAmount=parseInt(a);if(!napCode)napCode=genCode();document.getElementById('napCodeShow').textContent=napCode;saveOrder({phone:currentUser.phone,name:currentUser.phone,amount:napAmount,time:new Date().toLocaleString('vi-VN'),status:'pending',code:napCode,product:'Nạp tiền',platform:''});document.getElementById('napStatus').innerHTML='<span style="color:#ffd166">⏳ Đang chờ chuyển khoản... Tự kiểm tra mỗi 5 giây.</span>';if(autoTimer)clearInterval(autoTimer);autoTimer=setInterval(checkNapAuto,5000)}

function checkNapAuto(){if(!napCode||!napAmount)return;fetch(WORKER_URL).then(function(r){return r.json()}).then(function(data){var txs=data.transactions||data.data||[],found=null;txs.forEach(function(t){var c=(t.transaction_content||t.content||'').toUpperCase();var am=t.amount_in||t.amountIn||t.amount||0;if(c.indexOf(napCode)>-1 && parseInt(am)>=napAmount)found=t});if(found){if(autoTimer){clearInterval(autoTimer);autoTimer=null}loadUser(currentUser.phone,function(u){if(!u)return;u.balance=(u.balance||0)+napAmount;saveUser(u,function(){currentUser=u;updateUserUI();document.getElementById('napStatus').innerHTML='<span style="color:#c77dff;font-weight:bold">✅ ĐÃ CỘNG '+napAmount.toLocaleString()+'đ!</span>';napCode=null;napAmount=0})})}}).catch(function(){})}

function openBuy(i){
if(!currentUser){alert('Vui lòng đăng nhập!');showUserLogin();return}
currentProduct=PRODUCTS[i];
var gia=giaBan(currentProduct.price);
var sellerTag=currentUser.isSeller?' <span style="color:#06d6a0">[SELLER -50%]</span>':'';
var adminTag=(isAdmin||isAdmin2)?' <span style="color:#ffd166">[ADMIN FREE]</span>':'';
var p=document.getElementById('platformPopup');
p.innerHTML='<div class="inner"><h3>📱 MUA '+currentProduct.name+sellerTag+adminTag+' <button class="close" onclick="closePlatform()">×</button></h3><img src="'+currentProduct.img+'" class="img-big"><p style="text-align:center;color:#c77dff;font-size:20px;font-weight:bold;margin:10px 0">'+((isAdmin||isAdmin2)?'MIỄN PHÍ (ADMIN)':gia.toLocaleString()+'đ')+'</p>'+(currentUser.isSeller&&!isAdmin&&!isAdmin2?'<p style="text-align:center;color:#06d6a0;font-size:12px">Giá gốc: '+currentProduct.price.toLocaleString()+'đ — Giảm 50% còn: '+gia.toLocaleString()+'đ</p>':'')+'<p style="text-align:center;color:#94a3b8;font-size:13px;margin-bottom:15px">'+currentProduct.desc+'</p><button class="btn-main" onclick="choosePlatform(\'ios\')">🍎 iOS</button><button class="btn-main" style="background:#3b82f6;color:#fff;margin-top:8px" onclick="choosePlatform(\'adr\')">🤖 Android</button><button class="btn-main" style="background:transparent;border:1px solid #3a2a5a;color:#fff;margin-top:8px" onclick="closePlatform()">❌ Đóng</button></div>';
p.classList.remove('hide');
}
function closePlatform(){document.getElementById('platformPopup').classList.add('hide')}

function choosePlatform(p){
closePlatform();
if(!currentUser){alert('Vui lòng đăng nhập!');return}
var free=(isAdmin||isAdmin2);
var gia=giaBan(currentProduct.price);
if(!free && (currentUser.balance||0)<gia){alert('❌ Số dư không đủ!\nSố dư: '+(currentUser.balance||0).toLocaleString()+'đ\nCần: '+gia.toLocaleString()+'đ');showTab('nap');return}
if(!free && !confirm('Xác nhận mua '+currentProduct.name+' ('+(p==='ios'?'iOS':'Android')+')?\nGiá: '+gia.toLocaleString()+'đ'))return;
if(free && !confirm('ADMIN MUA MIỄN PHÍ '+currentProduct.name+'?'))return;
var doBuy=function(){saveOrder({phone:currentUser.phone,name:currentUser.phone+(free?' [ADMIN FREE]':(currentUser.isSeller?' [SELLER]':''))+' (Mua '+currentProduct.name+')',amount:free?0:gia,time:new Date().toLocaleString('vi-VN'),status:'done',code:'',product:currentProduct.name,platform:p});var d=DELIVER[currentProduct.name],l='';if(d&&d[p])l=gd(d[p]);if(l){alert('✅ Mua thành công!'+(free?'\n[ADMIN - MIỄN PHÍ]':'')+'\n\nBấm OK để tải file.');window.open(l,'_blank')}else{alert('✅ Mua thành công!\nLiên hệ Zalo 0355417385 để nhận file.')}};
if(free){doBuy();return}
loadUser(currentUser.phone,function(u){if(!u){alert('Lỗi tài khoản!');return}u.balance=(u.balance||0)-gia;saveUser(u,function(){currentUser=u;updateUserUI();doBuy()})});
}

function renderHistory(){if(!currentUser)return;loadAllOrders(function(orders){var o=orders.filter(function(x){return x.phone===currentUser.phone}),tb=document.getElementById('historyList');tb.innerHTML='';if(o.length===0){document.getElementById('noHistory').style.display='block';return}document.getElementById('noHistory').style.display='none';o.sort(function(a,b){return (b.time||'').localeCompare(a.time||'')});o.forEach(function(x){var tr=document.createElement('tr');tr.innerHTML='<td>'+(x.product||'—')+'</td><td>1</td><td>'+x.amount.toLocaleString()+'đ</td><td>'+x.time+'</td>';tb.appendChild(tr)})})}

function showLogin(){document.getElementById('shop').classList.add('hide');document.getElementById('adminLogin').classList.remove('hide')}

function adminLogin(){
var pass=document.getElementById('adminPass').value;
if(pass==='Hoangbaonam@2012'){isAdmin=true;isAdmin2=false;document.getElementById('adminLogin').classList.add('hide');document.getElementById('admin').classList.remove('hide');renderAdmin();updateUserUI()}
else if(pass==='admin2pass'){isAdmin=false;isAdmin2=true;document.getElementById('adminLogin').classList.add('hide');document.getElementById('admin').classList.remove('hide');renderAdmin2();updateUserUI()}
else{document.getElementById('adminErr').classList.remove('hide')}
}

function renderAdmin(){
document.getElementById('adminContent').innerHTML='<p style="text-align:center;color:#6b7280">⏳ Đang tải dữ liệu từ Firebase...</p>';
loadAllUsers(function(users){
loadAllOrders(function(orders){
var html='<div class="box"><h3>💰 CỘNG TIỀN CHO KHÁCH</h3><input id="addPhone" placeholder="SĐT khách"><input id="addAmount" type="number" placeholder="Số tiền"><button class="btn-main" onclick="adminAddMoney()">✅ CỘNG TIỀN</button></div>';
html+='<div class="box"><h3>🏷️ TẠO TÀI KHOẢN SELLER (GIẢM 50%)</h3><input id="sellerPhone" placeholder="SĐT Seller"><input id="sellerPass" type="password" placeholder="Mật khẩu Seller"><button class="btn-main" style="background:linear-gradient(45deg,#06d6a0,#00b894);color:#000" onclick="adminCreateSeller()">✅ TẠO SELLER</button></div>';
html+='<div class="box"><h3>👥 TÀI KHOẢN ĐÃ ĐĂNG KÝ ('+users.length+')</h3>';
if(users.length===0){html+='<p style="color:#6b7280;text-align:center">Chưa có tài khoản.</p>'}else{
html+='<table style="font-size:12px;width:100%;border-collapse:collapse"><thead><tr><th>SĐT</th><th>Loại</th><th>Số dư</th><th>Đã mua</th></tr></thead><tbody>';
users.forEach(function(x){
var cnt=orders.filter(function(o){return o.phone===x.phone && o.product!=='Nạp tiền' && o.product!=='Admin cộng tiền'}).length;
var loai=x.isSeller?'<span style="color:#06d6a0">SELLER</span>':'Khách';
html+='<tr><td>'+x.phone+'</td><td>'+loai+'</td><td style="color:#c77dff">'+(x.balance||0).toLocaleString()+'đ</td><td style="color:#ffd166">'+cnt+' đơn</td></tr>';
});
html+='</tbody></table>'}
html+='</div>';
html+='<div class="box"><h3>📋 TẤT CẢ ĐƠN HÀNG ('+orders.length+')</h3>';
if(orders.length===0){html+='<p style="color:#6b7280;text-align:center">Chưa có đơn.</p>'}else{
html+='<div style="overflow-x:auto"><table style="font-size:11px;width:100%;border-collapse:collapse"><thead><tr><th>Thời gian</th><th>Khách</th><th>Sản phẩm</th><th>Tiền</th><th>Nền tảng</th><th>Trạng thái</th><th>HĐ</th></tr></thead><tbody>';
orders.sort(function(a,b){return (b.time||'').localeCompare(a.time||'')});
orders.forEach(function(x){
var st=x.status==='pending'?'<span style="color:#ffd166">Chờ</span>':'<span style="color:#c77dff">OK</span>';
html+='<tr><td>'+x.time+'</td><td>'+x.name+'</td><td>'+(x.product||'—')+'</td><td>'+x.amount.toLocaleString()+'đ</td><td>'+(x.platform||'—')+'</td><td>'+st+'</td><td><button class="del-btn" data-key="'+x._key+'" style="padding:4px 8px;background:#ef4444;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:11px">Xóa</button></td></tr>';
});
html+='</tbody></table></div>'}
html+='</div>';
document.getElementById('adminContent').innerHTML=html;
document.querySelectorAll('.del-btn').forEach(function(btn){
btn.addEventListener('click',function(){
var key=this.getAttribute('data-key');
if(!confirm('Xóa đơn này?'))return;
fetch(FIREBASE_URL+'/orders/'+key+'.json',{method:'DELETE'}).then(function(){alert('✅ Đã xóa đơn!');renderAdmin()}).catch(function(){alert('❌ Lỗi xóa!')});
});
});
});
});
}

function renderAdmin2(){
document.getElementById('adminContent').innerHTML='<div class="box"><h3>🔵 ADMIN CẤP 2 — CHỈ LẤY FILE FREE</h3><p style="color:#94a3b8;text-align:center;font-size:13px">Bạn chỉ có quyền mua file FREE. Không xem được dữ liệu khách hàng.</p><p style="color:#94a3b8;text-align:center;font-size:13px;margin-top:10px">Về trang chủ → chọn sản phẩm → mua miễn phí.</p></div>';
}

function adminAddMoney(){var p=document.getElementById('addPhone').value.trim(),a=document.getElementById('addAmount').value.trim();if(!p||!a){alert('Nhập SĐT và số tiền!');return}loadUser(p,function(u){if(!u){alert('❌ Không tìm thấy tài khoản: '+p);return}u.balance=(u.balance||0)+parseInt(a);saveUser(u,function(){saveOrder({phone:p,name:p+' [ADMIN CỘNG TIỀN]',amount:parseInt(a),time:new Date().toLocaleString('vi-VN'),status:'done',code:'',product:'Admin cộng tiền',platform:''});alert('✅ Đã cộng '+parseInt(a).toLocaleString()+'đ cho '+p+'\nSố dư mới: '+u.balance.toLocaleString()+'đ');renderAdmin()})})}

function adminCreateSeller(){
var p=document.getElementById('sellerPhone').value.trim();
var pw=document.getElementById('sellerPass').value.trim();
if(!p||!pw){alert('Nhập đủ SĐT và mật khẩu!');return}
if(p.length<10){alert('SĐT không hợp lệ!');return}
loadUser(p,function(existing){
if(existing){alert('❌ SĐT đã tồn tại!');return}
saveUser({phone:p,pass:pw,balance:0,isSeller:true,created:new Date().toLocaleString('vi-VN')},function(){
alert('✅ Đã tạo Seller!\nSĐT: '+p+'\nMật khẩu: '+pw+'\n\nSeller sẽ mua hàng với giá giảm 50%.');
renderAdmin();
});
});
}

(function(){var p=localStorage.getItem('zxc');if(p){loadUser(p,function(u){if(u){currentUser=u;updateUserUI()}})}})();
