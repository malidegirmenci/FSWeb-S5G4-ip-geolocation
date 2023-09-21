//axios import buraya gelecek
import axios from 'axios';
var benimIP;


// ------------ değiştirmeyin --------------
// licensed to Ergineer 2022
require("babel-core/register");
require("babel-polyfill");
async function ipAdresimiAl() {
	await axios({
		method: 'get',
		url: 'https://apis.ergineer.com/ipadresim',
	})
		.then(function (response) {
			return response.data;
		})
		.then(function (a) {
			benimIP = a
		});
}
// ------------ değiştirmeyin --------------


/*
	ADIM 1: axios kullanarak, aşağıdaki URL'ye GET sorgusu atacağız
	(tag içindeki yere kendi ipnizi yazarak URL'yi oluşturun):
	https://apis.ergineer.com/ipgeoapi/<ipniz>
	
	NOT: Bilgisayarın IP adresini öğrenmek için: https://apis.ergineer.com/ipadresim 
	ADIM 5'e gelene kadar fonksiyonunuzu test etmek için ip nizi URL'ye manuel olarak ekleyebilirsiniz.
*/

/*
	ADIM 2: Geri döndürülen verileri inceleyin, bu sizin ip bilgileriniz! Bileşen fonksiyonunuzu geliştirmek içindeki bu veri yapısını
	iyice anlamanız gerekmektedir.
	
*/

/*
	ADIM 3: Argümanı sadece 1 nesne kabül eden bir fonksiyon oluşturun.
	DOM metotlarını ve özelliklerini kullanarak, şunları gerçekleştirin:
	NOT: API'den gelen bayrak url'i çalışmazsa alternatif olarak: https://flagsapi.com/
	<div class="card">
	<img src={ülke bayrağı url} />
	<div class="card-info">
		<h3 class="ip">{ip adresi}</h3>
		<p class="ulke">{ülke bilgisi (ülke kodu)}</p>
		<p>Enlem: {enlem} Boylam: {boylam}</p>
		<p>Şehir: {şehir}</p>
		<p>Saat dilimi: {saat dilimi}</p>
		<p>Para birimi: {para birimi}</p>
		<p>ISP: {isp}</p>
	</div>
	</div>
*/

/*
	ADIM 4: API'den alınan verileri kullanarak ADIM 3'te verilen yapıda bir kart oluşturun ve 
	bu kartı DOM olarak .cards elementinin içine ekleyin. 
*/

/*
	ADIM 5: Manuel olarak eklediğiniz IP adresini dinamiğe dönüştürün. 
	Sayfanın en üstünde ---değiştirmeyin--- etiketleri arasında yer alan asenkron ipAdresimiAl() fonksiyonuna 
	sorgu atarak bilgisayarınız IP adresini dinamik olarak aldıracaksınız. Bu fonksiyon asenkron olarak çağırıldığında `benimIP` değişkenine 
	bilgisayarınızın IP adresini atayacaktır. 
	Örnek dinamik URL kullanımı: var url = "https://apis.ergineer.com/ipgeoapi/"+benimIP; 
*/

ipAdresimiAl().then(() => {
	axios.get(`https://apis.ergineer.com/ipgeoapi/${benimIP}`).then((res) => {
		document.querySelector(".cards").append(createCard(res));
	}).catch((err) => {
		console.log(err);
	})
})

const createCard = ((res) => {
	const card = document.createElement("div")
	card.classList.add("card");

	const countryFlag = document.createElement("img");

	countryFlag.src = `https://flagsapi.com/TR/flat/64.png`;

	const cardInfo = document.createElement("div");

	const h3 = document.createElement("h3");
	h3.classList.add("ip");
	h3.textContent = res.data.sorgu;
	cardInfo.append(h3);
	const paragraphs = [
		`${res.data.ülke}  ${res.data.ülkeKodu}`,
		`Enlem: ${res.data.enlem} Boylam: ${res.data.boylam}`,
		`Şehir: ${res.data.şehir}`,
		`Saat dilimi: ${res.data.saatdilimi}`,
		`Para birimi: ${res.data.parabirimi}`,
		`ISP: ${res.data.isp}`
	];
	for(let i = 0; i < paragraphs.length; i++){
		const p = document.createElement("p");
		p.textContent = paragraphs[i];
		cardInfo.appendChild(p);
	}
	card.append(countryFlag, cardInfo);
	return card
});