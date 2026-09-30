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
{name:'Aimlock V1',price:1000,desc:'Menu Aimlock V1 — kéo tâm.',img:'https://via.placeholder.com/300/14b8a6/000?text=V1'},
{name:'Aimlock V2',price:200000,desc:'Menu Aimlock V2 — nâng cấp.',img:'https://via.placeholder.com/300/14b8a6/000?text=V2'},
{name:'Aimlock V3',price:300000,desc:'Menu Aimlock V3 — fix lố.',img:'https://via.placeholder.com/300/14b8a6/000?text=V3'},
{name:'Aimlock V4',price:400000,desc:'Menu Aimlock V4 — full.',img:'https://via.placeholder.com/300/14b8a6/000?text=V4'},
{name:'Aimlock V5',price:500000,desc:'Menu Aimlock V5 — nhiều máy.',img:'https://via.placeholder.com/300/14b8a6/000?text=V5'},
{name:'Aimlock V6',price:600000,desc:'Menu Aimlock V6 — cao cấp.',img:'https://via.placeholder.com/300/14b8a6/000?text=V6'},
{name:'Nhẹ Tâm',price:100000,desc:'Giảm nặng tâm.',img:'https://via.placeholder.com/300/7c3aed/fff?text=NHE'},
{name:'Bám Đầu',price:100000,desc:'Hỗ trợ kéo tâm.',img:'https://via.placeholder.com/300/7c3aed/fff?text=BAM'},
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
['shop','historyPage','accountPage','login','register','adminLogin','admin'].forEach(function(id){var e=document.getElementById(id);if(e)e.classList.add('hide')});
if(tab==='shop'){document.getElementById('shop').classList.remove('hide')}
if(tab==='nap'){document.getElementById('shop').classList.remove('hide');setTimeout(function(){document.getElementById('nap').scrollIntoView({behavior:'smooth'})},100)}
if(tab==='don'){if(!currentUser){alert('Vui lòng đăng nhập!');showUserLogin();return}document.getElementById('historyPage').classList.remove('hide');renderHistory()}
if(tab==='box'){alert('📦 BOX: Tính năng đang phát triển!');return}
if(tab==='account'){if(!currentUser){showUserLogin();return}showAccountPage()}
document.querySelectorAll('.bottom-nav .nav-item').forEach(function(n){n.classList.remove('active')});
var a=document.querySelector('.bottom-nav .nav-item[data-tab="'+tab+'"]');
if(a)a.classList.add('active');
}

function showAccountPage(){
var acc=document.getElementById('accountPage');
acc.classList.remove('hide');
document.getElementById('shop').classList.add('hide');
var orders=getOrders().filter(function(o){return o.phone===currentUser.phone});
var done=orders.filter(function(o){return o.status==='done'});
acc.innerHTML='<h2>👤 TÀI KHOẢN</h2><div class="box" style="text-align:center"><div style="width:80px;height:80px;background:#7c3aed;border-radius:50%;display:flex;justify-content:center;align-items:center;font-size:32px;font-weight:bold;margin:0 auto 15px">'+currentUser.phone.charAt(0).toUpperCase()+'</div><h3 style="text-align:center;margin-bottom:5px">'+currentUser.phone+'</h3><p style="text-align:center;color:#6b7280;margin-bottom:15px">'+currentUser.phone+'@zebxvex.com</p><div style="background:#0a0a0f;border:1px solid #1f2937;border-radius:10px;padding:15px;margin-bottom:15px"><div style="color:#6b7280;font-size:11px;margin-bottom:5px">SỐ DƯ</div><div style="color:#14b8a6;font-size:24px;font-weight:bold">'+currentUser.balance.toLocaleString()+' VND</div></div><button class="btn-main" onclick="showTab(\'nap\')" style="max-width:200px;margin:0 auto">💳 NẠP TIỀN</button></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:15px"><div style="background:#111827;border:1px solid #1f2937;border-radius:12px;padding:15px;text-align:center"><div style="font-size:24px;font-weight:bold;color:#14b8a6">'+orders.length+'</div><div style="color:#6b7280;font-size:11px">TỔNG ĐƠN</div></div><div style="background:#111827;border:1px solid #1f2937;border-radius:12px;padding:15px;text-align:center"><div style="font-size:24px;font-weight:bold;color:#14b8a6">'+done.length+'</div><div style="color:#6b7280;font-size:11px">HOÀN TẤT</div></div></div><button class="btn-main" style="background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);color:#ef4444;margin-top:15px" onclick="logoutUser();showTab(\'shop\')">ĐĂNG XUẤT</button>';
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
function
