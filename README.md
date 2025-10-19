<p>
Aplikacija služi za praćenje statusa grejne sezone, davanje saveta o uštedi energije i omogućavanje korisnicima da daju povratne informacije toplani putem anketa i prijava problema.
</p>

<hr>

<h2>Tipovi korisnika</h2>

<ul>
  <li><strong>Klijent (korisnik)</strong> – koristi aplikaciju za informisanje, slanje prijava i popunjavanje anketa.</li>
  <li><strong>Admin</strong> – upravlja anketama i prijavama korisnika.</li>
</ul>

<hr>

<h2>Sign In / Register</h2>

<p>
Korisnik može da se uloguje pomoću email adrese i šifre.<br>
Ukoliko nema nalog, može se registrovati putem stranice za registraciju.
</p>

<p><strong>Prikaz:</strong></p>
<img src="https://github.com/user-attachments/assets/7376dd99-90ab-49cd-b07b-18ed96ca8495" alt="logreg" style="max-width:150px; height:auto;"/>

<hr>

<h2>Klijentska strana</h2>

<h3>Home Page</h3>

<p>Prikazuje informaciju da li je grejna sezona trenutno aktivna.</p>

<p>Sadrži sekcije koje vode ka:</p>
<ul>
  <li>Profilu korisnika</li>
  <li>Stranici sa savetima</li>
  <li>Anketama</li>
  <li>Prijavama (reportovima)</li>
</ul>

<p><strong>Dodatno:</strong></p>
<ul>
  <li>Kratak opis i istorijat toplane sa linkom ka zvaničnom sajtu</li>
  <li>Korisni linkovi ka različitim sekcijama sajta Niške toplane</li>
  <li>Dugme <strong>„Odjavi se”</strong> za odjavu korisnika</li>
</ul>

<p><strong>Prikaz:</strong></p>
<img src="https://github.com/user-attachments/assets/d81d23b6-3954-411f-87df-1fc6dc7ad87c" alt="hom1_hom2" style="max-width:150px; height:auto;"/>

<hr>

<h3>Saveti</h3>

<p>
Stranica sadrži savete koji korisnicima mogu pomoći da uštede energiju.<br>
Saveti su prikazani u vidu kartica, uz mogućnost pregleda više primera.
</p>

<p><strong>Prikaz:</strong></p>
<img src="https://github.com/user-attachments/assets/89cf22e9-26bd-4956-9e38-8f9147518742" alt="t3_t2_t4_t1" style="max-width:150px; height:auto;"/>

<hr>

<h3>Profil</h3>

<p>
Profil prikazuje lične podatke korisnika.<br>
Ako profil nije kompletiran, korisnik ne može pristupiti anketama i prijavama, jer se uz te funkcionalnosti prosleđuju i dodatne informacije iz profila.
</p>

<p>U <em>edit režimu</em> dostupna su dugmad <strong>Cancel</strong> i <strong>Save</strong> za poništavanje ili čuvanje izmena.</p>

<p><strong>Prikaz:</strong></p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/0e21ed58-12d8-4ada-8090-775ea59dabfa" alt="profil_profil2" style="max-width:150px; height:auto;"/>
</p>

<hr>

<h3>Ankete</h3>

<p>Prikaz svih aktivnih anketa (naslov, pitanje, moguće opcije).</p>
<p>Klikom na anketu otvara se tekst pitanja i ponuđeni odgovori.</p>
<p>Nakon slanja odgovora, kartica postaje siva (odgovor poslat).</p>
<p>Ankete sa isteklim rokom više se ne prikazuju.</p>

<p><strong>Prikaz:</strong></p>
<img src="https://github.com/user-attachments/assets/bb4918f8-4079-4466-a744-8dea2c466470" alt="aktuelne ankete" style="max-width:150px; height:auto;"/>

<hr>

<h3>Prijave (Reportovi)</h3>

<p>Korisnik može:</p>
<ul>
  <li>Izabrati tip prijave</li>
  <li>Uneti opis problema</li>
  <li>Poslati prijavu</li>
</ul>

<p>Prijava se automatski prosleđuje zajedno sa informacijama o korisniku.</p>

<p><strong>Prikaz:</strong></p>
<img src="https://github.com/user-attachments/assets/dd57cd13-b1df-4467-b37b-3c5fd2e1c1d4" alt="prijavaproblema" style="max-width:150px; height:auto;"/>

<hr>

<h2>Admin sekcija</h2>

<h3>Home Page</h3>

<p>Sadrži sekcije koje vode ka:</p>
<ul>
  <li>Aktivnim anketama</li>
  <li>Završenim anketama</li>
  <li>Stranici za kreiranje anketa</li>
  <li>Primljenim prijavama</li>
</ul>

<p><strong>Prikaz:</strong></p>
<img src="https://github.com/user-attachments/assets/aecd4619-52e4-46d9-b790-4ca918bb98d7" alt="adminhome" style="max-width:150px; height:auto;"/>

<hr>

<h3>Aktivne ankete</h3>

<p>Admin ima pregled svih aktivnih anketa:</p>
<ul>
  <li>Broj korisnika koji su odgovorili</li>
  <li>Broj glasova po opciji (broj i procenat)</li>
  <li>Dugme za osvežavanje anketa</li>
  <li>Mogućnost odjave</li>
</ul>

<p><strong>Prikaz:</strong></p>
<img src="https://github.com/user-attachments/assets/897fef4d-da3c-4177-b5be-52a928e55755" alt="aktivneankete" style="max-width:150px; height:auto;"/>

<hr>

<h3>Završene ankete</h3>

<p>Pregled svih završenih anketa i njihovih rezultata. Admin može brisati ankete.</p>

<p><strong>Prikaz:</strong></p>
<img src="https://github.com/user-attachments/assets/3c3a58ac-0393-48e1-8465-7834632e2c15" alt="zavrsene ankete" style="max-width:150px; height:auto;"/>

<hr>

<h3>Kreiranje ankete</h3>

<p>Admin može kreirati novu anketu unosom:</p>
<ul>
  <li>Naslova</li>
  <li>Pitanja</li>
  <li>Trajanja ankete</li>
  <li>Broja odgovora i njihovog sadržaja</li>
</ul>

<p><strong>Prikaz:</strong></p>
<img src="https://github.com/user-attachments/assets/80aaa5bd-c006-4888-8031-56cee328afef" alt="kreirajanketu" style="max-width:150px; height:auto;"/>

<hr>

<h3>Poslate prijave</h3>

<p>Admin ima uvid u sve korisničke prijave:</p>
<ul>
  <li>Prikaz tipa problema</li>
  <li>Klikom na karticu vidi se detaljan opis i podaci korisnika</li>
  <li>Mogućnost brisanja prijava</li>
</ul>

<p><strong>Prikaz:</strong></p>
<img src="https://github.com/user-attachments/assets/d3cf894d-9ad5-4fc4-9cc0-30a1f4109f87" alt="prijave" style="max-width:150px; height:auto;"/>
