(function(){document.getElementById("inflationForm").addEventListener("submit",function(a){a.preventDefault();var b=parseFloat(document.getElementById("currentSalary").value),c=parseFloat(document.getElementById("annualRate").value)/100,d=parseInt(document.getElementById("years").value);var erResult=document.getElementById("erResult");var result=document.getElementById("result");if(isNaN(b)||isNaN(c)||isNaN(d)){erResult.classList.remove("hidden");erResult.textContent="Harap isi semua kolom (hanya angka)";result.classList.add("hidden");return;}erResult.classList.add("hidden");result.classList.remove("hidden");var e=Math.pow(1+c,d),f=(b*1).toLocaleString("id-ID",{style:"currency",currency:"IDR"}),g=(b*e).toLocaleString("id-ID",{style:"currency",currency:"IDR"}),h="tahun";result.innerHTML=`Dengan inflasi sebesar <strong>${(c*100).toFixed(2)}%</strong>, gaji <strong>${f}</strong> Anda saat ini perlu ditingkatkan menjadi <strong>${g} </strong> dalam <strong>${d} ${h}</strong> untuk menjaga daya beli Anda.`;});})();
