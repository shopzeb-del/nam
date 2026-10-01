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

function showAccountPage(){var acc=document.getElementById('accountPage');acc.classList.remove('hide');var sellerTag=currentUser.isSeller?'<p style="color:#06d6a0;text-align:center;font-weight:bold;margin-bottom:10px">🏷️ TÀI KHOẢN SELLER — GIẢM 50%</p>':'';acc.innerHTML='<h2>👤 TÀI KHOẢN</h2><div class="box" style="text-align:center">'+sellerTag+'<div style="width:80px;height:80px;background:#7c3aed;border-radius:50%;display:flex;justify-content:center;align-items:center;font-size:32px;font-weight:bold;margin:0 auto 15px">'+currentUser.phone.charAt(0).toUpperCase()+'</div><h3 style="text-align:center;margin-bottom:5px">'+currentUser.phone+'</h3><div style="background:#0d0b1a;border:1px solid #3a2a5a;border-radius:10px;padding:15px;margin-bottom:15px"><div style="color:#6b7280;font-size:11px;margin-bottom:5px">SỐ DƯ</div><div style="color:#c77dff;font-size:24px;font-weight:bold">'+(currentUser.balance||0).toLocale
