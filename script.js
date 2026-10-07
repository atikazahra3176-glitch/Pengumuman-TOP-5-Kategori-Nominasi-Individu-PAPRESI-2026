const form = document.getElementById("searchForm");
const result = document.getElementById("result");

const nameInput = document.getElementById("name");
const nimInput = document.getElementById("nim");



/* ==========================================
   NORMALIZE TEXT
========================================== */

function normalize(value) {

  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();

}



/* ==========================================
   NORMALIZE NIM
========================================== */

function normalizeNim(value) {

  return String(value || "")
    .toUpperCase()
    .replace(/\s+/g, "");

}



/* ==========================================
   SECURITY
   Mencegah karakter HTML masuk ke halaman
========================================== */

function escapeHTML(value) {

  return String(value ?? "")
    .replace(/[&<>"']/g, (char) => ({

      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"

    }[char]));

}



/* ==========================================
   DATA TIDAK DITEMUKAN
========================================== */

function renderNotFound() {

  result.innerHTML = `

    <div class="result-card failed">

      <div class="result-badge">
        ✦ DATA BELUM DITEMUKAN
      </div>


      <h3>
        Coba Periksa Kembali
      </h3>


      <p class="lead">

        Kami belum menemukan kombinasi nama dan NIM tersebut.
        Pastikan penulisan nama dan NIM sudah sesuai dengan data
        yang digunakan saat pendaftaran.

      </p>


      <button
        class="back-button"
        type="button"
        onclick="resetResult()"
      >

        ↺ Coba lagi

      </button>

    </div>

  `;


  result.scrollIntoView({

    behavior: "smooth",
    block: "center"

  });

}



/* ==========================================
   HASIL LOLOS
========================================== */

function renderPassed(person) {

  const safeName =
    escapeHTML(person.name);

  const safeNim =
    escapeHTML(person.nim);

  const safeFaculty =
    escapeHTML(person.faculty);

  const safeNomination =
    escapeHTML(person.nomination);


  result.innerHTML = `

    <div class="result-card">


      <div class="result-badge">

        ✦ CONGRATULATIONS · TOP 5 FINALIST ✦

      </div>



      <h3>
        Selamat, ${safeName}!
      </h3>



      <p class="lead">

        Perjalananmu berhasil membawamu melewati gerbang seleksi
        dan masuk ke <strong>Top 5 Kategori Individu</strong>
        Pekan Apresiasi IPB 2026.

        Sebuah pencapaian yang patut dirayakan!

      </p>



      <div class="person-box">


        <div class="person-field">

          <small>
            Nama Lengkap
          </small>

          <strong>
            ${safeName}
          </strong>

        </div>



        <div class="person-field">

          <small>
            NIM
          </small>

          <strong>
            ${safeNim}
          </strong>

        </div>



        <div class="person-field">

          <small>
            Fakultas
          </small>

          <strong>
            ${safeFaculty}
          </strong>

        </div>



        <div class="person-field">

          <small>
            Nominasi
          </small>

          <strong class="nomination">

            ${safeNomination}

          </strong>

        </div>


      </div>



      <p class="lead">

        Jangan lupa melangkah ke gerbang berikutnya.
        Informasi lanjutan dan koordinasi finalis akan
        disampaikan melalui grup WhatsApp.

      </p>



      <a
        class="wa-button"
        href="${person.whatsapp}"
        target="_blank"
        rel="noopener"
      >

        ✦ Bergabung ke Grup Finalis

      </a>



      <br>



      <button
        class="back-button"
        type="button"
        onclick="resetResult()"
      >

        ↺ Cek data lain

      </button>


    </div>

  `;


  result.scrollIntoView({

    behavior: "smooth",
    block: "center"

  });

}



/* ==========================================
   HASIL TIDAK LOLOS
========================================== */

function renderFailed(person) {

  const safeName =
    escapeHTML(person.name);

  const safeNim =
    escapeHTML(person.nim);

  const safeFaculty =
    escapeHTML(person.faculty);

  const safeNomination =
    escapeHTML(person.nomination);


  result.innerHTML = `

    <div class="result-card failed">


      <div class="result-badge">

        ✦ HASIL SELEKSI ✦

      </div>



      <h3>

        Belum Berhasil Melaju ke Top 5

      </h3>



      <p class="lead">

        Hai, <strong>${safeName}</strong>.

        Untuk seleksi kali ini, kamu dinyatakan
        <strong>TIDAK LOLOS</strong> sebagai finalis
        Top 5 Kategori Individu Pekan Apresiasi IPB 2026.

      </p>



      <div class="person-box">


        <div class="person-field">

          <small>
            Nama Lengkap
          </small>

          <strong>
            ${safeName}
          </strong>

        </div>



        <div class="person-field">

          <small>
            NIM
          </small>

          <strong>
            ${safeNim}
          </strong>

        </div>



        <div class="person-field">

          <small>
            Fakultas
          </small>

          <strong>
            ${safeFaculty}
          </strong>

        </div>



        <div class="person-field">

          <small>
            Nominasi
          </small>

          <strong class="nomination">

            ${safeNomination}

          </strong>

        </div>


      </div>



      <p class="lead">

        Terima kasih sudah meluangkan waktu, keberanian,
        dan semangat untuk menjadi bagian dari PAPRESI 2026.

        Hasil hari ini bukan akhir dari perjalananmu.
        Tetap berkarya, terus bertumbuh, dan jangan berhenti
        melangkah.

      </p>



      <p class="closing">

        Sampai jumpa di PAPRESI berikutnya. ✦

      </p>



      <button
        class="back-button"
        type="button"
        onclick="resetResult()"
      >

        ↺ Cek data lain

      </button>


    </div>

  `;


  result.scrollIntoView({

    behavior: "smooth",
    block: "center"

  });

}



/* ==========================================
   CARI PESERTA
========================================== */

function findParticipant(name, nim) {

  const cleanName =
    normalize(name);

  const cleanNim =
    normalizeNim(nim);


  return PARTICIPANTS.find((person) =>

    normalize(person.name) === cleanName &&

    normalizeNim(person.nim) === cleanNim

  );

}



/* ==========================================
   SUBMIT FORM
========================================== */

form.addEventListener("submit", (event) => {

  event.preventDefault();


  const person =
    findParticipant(
      nameInput.value,
      nimInput.value
    );


  if (!person) {

    renderNotFound();

    return;

  }


  if (person.status === "LOLOS") {

    renderPassed(person);

  } else {

    renderFailed(person);

  }

});



/* ==========================================
   RESET RESULT
========================================== */

function resetResult() {

  result.innerHTML = "";

  nameInput.focus();


  document
    .getElementById("cek")
    .scrollIntoView({

      behavior: "smooth",
      block: "start"

    });

}