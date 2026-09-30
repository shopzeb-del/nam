var WORKER_URL='https://shopzeb-api.baonam310112.workers.dev';
var autoCheckTimer=null,currentProduct=null,currentOrder=null;
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
{name:'Aimlock V1',price:100000,desc:'Menu Aimlock V1 — hỗ trợ kéo tâm, bám đầu cơ bản.'},
{name:'Aimlock V2',price:200000,desc:'Menu Aimlock V2 — nâng cấp độ bám, ổn định hơn V1.'},
{name:'Aimlock V3',price:300000,desc:'Menu Aimlock V3 — fix lố, giật, kéo tâm mượt.'},
{name:'Aimlock V4',price:400000,desc:'Menu Aimlock V4 — full chức năng, tối ưu máy khỏe.'},
{name:'Aimlock V5',price:500000,desc:'Menu Aimlock V5 — bản nâng cao, nhiều dòng máy.'},
{name:'Aimlock V6',price:600000,desc:'Menu Aimlock V6 — cao cấp nhất, full tính năng.'},
{name:'Nhẹ Tâm',price:100000,desc:'Giảm nặng tâm khi chơi.'},
{name:'Bám Đầu',price:100000,desc:'Hỗ trợ kéo tâm, bám đầu.'},
{name:'Fix Rung Tâm',price:100000,desc:'Giảm rung, ổn định tâm.'},
{name:'Combo Nhẹ Tâm + Bám Đầu V1',price:150000,desc:'Combo Nhẹ Tâm + Bám Đầu.'},
{name:'Combo Nhẹ Tâm + Bám Đầu V2',price:200000,desc:'Combo V2 nâng cấp.'},
{name:'Combo Nhẹ Tâm + Bám Đầu V3',price:250000,desc:'Combo V3 full tính năng.'},
{name:'Aimlock AVT-Cache',price:150000,desc:'Tối ưu cache, giảm lag.'}
];
var html='';
PRODUCTS.forEach(function(p,i){html+='<div class="card"><h3>'+p.name+'</h3><div class="desc">'+p.desc+'</div><div class="price">'+p.price.toLocaleString()+'đ</div><button onclick="openPlatform('+i+')">Mua Ngay</button></div>'});
document.getElementById('productList').innerHTML=html;
function openMenu(){document.getElementById('sidebar').classList.add('open');document.getElementById('overlay').classList.add('show')}
function closeMenu(){document.getElementById('sidebar').classList.remove('open');document.getElementById('overlay').classList.remove('show')}
var songs=[
{name:'Nhạc Việt Chill',src:'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3'},
{name:'Nhạc Việt Lofi',src:'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3'},
{name:'Nhạc Việt Buồn',src:'https://cdn.pixabay.com/download/audio/2022/10/25/audio_946bc2b4e4.mp3'}
];
var currentSong=0,player=document.getElementById('musicPlayer');
function loadSong(i){currentSong=(i+songs.length)%songs.length;document.getElementById('musicSource').src=songs[currentSong].src;player.load();document.getElementById('songTitle').textContent='🎵 '+(currentSong+1)+': '+songs[currentSong].name}
function toggleMusic(){if(player.paused){player.play();document.getElementById('playBtn').textContent='⏸ TẮT NHẠC'}else{player.pause();document.getElementById('playBtn').textContent='▶ BẬT NHẠC'}}
function nextSong(){loadSong(currentSong+1);player.play();document.getElementById('playBtn').textContent='⏸ TẮT NHẠC'}
function prevSong(){loadSong(currentSong-1);player.play();document.getElementById('playBtn').textContent='⏸ TẮT NHẠC'}
function setVolume(){player.volume=document.getElementById('volume').value/100}
player.volume=0.5;
function getOrders(){try{return JSON.parse(localStorage.getItem('zebxvex')||'[]')}catch(e){return[]}}
function saveOrders(o){localStorage.setItem('zebxvex',JSON.stringify(o))}
function genCode(){return 'ZEBXVEX'+Math.floor(1000+Math.random()*9000)}
function submitNap(){var n=document.getElementById('nName').value.trim();var a=document.getElementById('nAmount').value.trim();if(!n||!a){alert('Nhập đủ tên và số tiền!');return}var code=genCode();var o=getOrders();o.push({id:Date.now(),name:n,amount:parseInt(a),time:new Date().toLocaleString('vi-VN'),status:'pending',code:code,product:'Nạp tiền',platform:''});saveOrders(o);alert('✅ Đã tạo đơn!\nNội dung CK: '+code);document.getElementById('nName').value='';document.getElementById('nAmount').value=''}
function openPlatform(i){currentProduct=PRODUCTS[i];document.getElementById('platformProduct').textContent='Sản phẩm: '+currentProduct.name+' — '+currentProduct.price.toLocaleString()+'đ';document.getElementById('platformPopup').classList.remove('hide')}
function closePlatform(){document.getElementById('platformPopup').classList.add('hide')}
function choosePlatform(p){closePlatform();document.getElementById('buyName').textContent='Sản phẩm: '+currentProduct.name+' ('+(p==='ios'?'iOS':'Android')+')';var code=genCode();currentOrder={amount:currentProduct.price,code:code,product:currentProduct.name,platform:p};document.getElementById('buyPrice').textContent='💰 Tổng: '+currentProduct.price.toLocaleString()+'đ';document.getElementById('buyContent').textContent=code;document.getElementById('buyCus').value='';document.getElementById('checkMsg').textContent='';document.getElementById('autoStatus').classList.add('hide');document.getElementById('deliverBox').classList.add('hide');document.getElementById('deliverBox').innerHTML='';document.getElementById('checkBtn').disabled=false;document.getElementById('checkBtn').innerHTML='✅ Tôi Đã Chuyển Khoản';document.getElementById('buyPopup').classList.remove('hide')}
function closeBuy(){document.getElementById('buyPopup').classList.add('hide');if(autoCheckTimer){clearInterval(autoCheckTimer);autoCheckTimer=null}}
function startAutoCheck(){var name=document.getElementById('buyCus').value.trim();if(!name){alert('Nhập tên của bạn!');return}if(!currentOrder){alert('Lỗi!');return}currentOrder.customerName=name;document.getElementById('checkMsg').innerHTML='<span style="color:#ffd166">⏳ Đang kiểm tra lần đầu...</span>';document.getElementById('autoStatus').classList.remove('hide');checkOnce();if(autoCheckTimer)clearInterval(autoCheckTimer);autoCheckTimer=setInterval(checkOnce,5000)}
function checkOnce(){fetch(WORKER_URL).then(function(r){return r.json()}).then(function(data){var txs=data.transactions||data.data||[];var found=null;txs.forEach(function(t){var content=(t.transaction_content||t.content||'').toUpperCase();var amountIn=t.amount_in||t.amountIn||t.amount||0;if(content.indexOf(currentOrder.code)>-1 && parseInt(amountIn)>=currentOrder.amount){found=t}});if(found){if(autoCheckTimer){clearInterval(autoCheckTimer);autoCheckTimer=null}var o=getOrders();o.push({id:Date.now(),name:currentOrder.customerName+' (Mua '+currentOrder.product+')',amount:currentOrder.amount,time:new Date().toLocaleString('vi-VN'),status:'done',code:currentOrder.code,product:currentOrder.product,platform:currentOrder.platform});saveOrders(o);document.getElementById('checkMsg').innerHTML='<span style="color:#06d6a0">✅ Thanh toán thành công! File đã sẵn sàng tải bên dưới.</span>';document.getElementById('autoStatus').classList.add('hide');document.getElementById('checkBtn').disabled=true;deliverProduct(currentOrder.product,currentOrder.platform)}else{document.getElementById('checkMsg').innerHTML='<span style="color:#ffd166">⏳ Chưa nhận được. Đang tự kiểm tra mỗi 5 giây...</span>'}}).catch(function(){document.getElementById('checkMsg').innerHTML='<span style="color:#e63946">❌ Lỗi kết nối. Đang thử lại...</span>'})}
function deliverProduct(productName,platform){var box=document.getElementById('deliverBox');box.classList.remove('hide');var d=DELIVER[productName];if(!d){box.innerHTML='<h4>📦 Sản phẩm của bạn</h4><p style="font-size:13px;color:#a0a0b0">Liên hệ Zalo 0355417385 để nhận file.</p>';return}var link=d[platform];if(!link){box.innerHTML='<h4>📦 Sản phẩm của bạn</h4><p style="font-size:13px;color:#a0a0b0">Liên hệ Zalo 0355417385.</p>';return}var finalLink=gd(link);var platformName=platform==='ios'?'iOS':'Android';box.innerHTML='<h4>📦 File cho '+platformName+'</h4><a href="'+finalLink+'" target="_blank">📥 TẢI XUỐNG NGAY</a><p style="font-size:12px;color:#a0a0b0;margin-top:8px">Bấm nút trên để tải file.</p>'}
function showLogin(){document.getElementById('shop').classList.add('hide');document.getElementById('login').classList.remove('hide')}
function showHistory(){document.getElementById('shop').classList.add('hide');document.getElementById('historyPage').classList.remove('hide');renderHistory()}
function backHome(){document.getElementById('login').classList.add('hide');document.getElementById('admin').classList.add('hide');document.getElementById('historyPage').classList.add('hide');document.getElementById('shop').classList.remove('hide')}
function login(){if(document.getElementById('pass').value==='Hoangbaonam@2012'){document.getElementById('login').classList.add('hide');document.getElementById('admin').classList.remove('hide');renderAdmin()}else{document.getElementById('err').classList.remove('hide')}}
function logout(){backHome()}
function renderAdmin(){var o=getOrders();var tbody=document.getElementById('orders');tbody.innerHTML='';if(o.length===0){document.getElementById('empty').style.display='block';return}document.getElementById('empty').style.display='none';o.sort(function(a,b){return b.id-a.id});o.forEach(function(x){var tr=document.createElement('tr');var st=x.status==='pending'?'<span style="color:#ffd166">Chờ</span>':'<span style="color:#06d6a0">Đã duyệt</span>';var btn=x.status==='pending'?'<button style="width:auto;padding:4px 8px;background:#06d6a0;color:#000" onclick="approveOrder('+x.id+')">Duyệt</button> <button style="width:auto;padding:4px 8px;background:#e63946" onclick="delOrder('+x.id+')">Xóa</button>':'<button style="width:auto;padding:4px 8px;background:#e63946" onclick="delOrder('+x.id+')">Xóa</button>';tr.innerHTML='<td>'+x.time+'</td><td>'+x.name+'</td><td>'+x.amount.toLocaleString()+'đ</td><td>'+(x.product||'—')+'</td><td>'+(x.platform||'—')+'</td><td>'+st+'</td><td>'+btn+'</td>';tbody.appendChild(tr)})}
function approveOrder(id){var o=getOrders().map(function(x){if(x.id===id){x.status='done'}return x});saveOrders(o);renderAdmin()}
function delOrder(id){saveOrders(getOrders().filter(function(x){return x.id!==id}));renderAdmin()}
function renderHistory(){var o=getOrders().filter(function(x){return x.status==='done'});var tbody=document.getElementById('historyList');tbody.innerHTML='';if(o.length===0){document.getElementById('noHistory').style.display='block';return}document.getElementById('noHistory').style.display='none';o.sort(function(a,b){return b.id-a.id});o.forEach(function(x){var tr=document.createElement('tr');tr.innerHTML='<td>'+(x.product||'—')+'</td><td>1</td><td>'+x.amount.toLocaleString()+'đ</td><td>'+x.time+'</td>';tbody.appendChild(tr)})}
