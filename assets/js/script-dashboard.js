const btnTambahData = document.getElementById("btnTambah");
const btnKembali = document.getElementById("btnKembali");
const btnDashboard = document.getElementById("btnDashboard");
const btnBelumDibaca = document.getElementById("btnBelumDibaca");
const btnSudahDibaca = document.getElementById("btnSudahDibaca");
const btnLogout = document.getElementById("btnLogout");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

const dashboard = document.getElementById("dashboard");
const tambahData = document.getElementById("tambahData");
const belumDibaca = document.getElementById("belumDibaca");
const sudahDibaca = document.getElementById("sudahDibaca");

const bookList = document.getElementById("bookList");
const noReadList = document.getElementById("noRead");
const readList = document.getElementById("read");

const addBookForm = document.getElementById("addBookForm");
let books = [];

if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
}

btnLogout.addEventListener("click", () => {
    localStorage.removeItem("loggedIn");
    window.location.href = "index.html";
});

btnTambahData.addEventListener("click", () => {
    dashboard.classList.remove("dashboard-card-active");
    dashboard.classList.add("dashboard-card-disactive");

    tambahData.classList.remove("tambah-data-disactive");
    tambahData.classList.add("tambah-data-active");
});

btnKembali.addEventListener("click", () => {
    tambahData.classList.remove("tambah-data-active");
    tambahData.classList.add("tambah-data-disactive");

    dashboard.classList.remove("dashboard-card-disactive");
    dashboard.classList.add("dashboard-card-active");
});

btnDashboard.addEventListener("click", () => {
    tambahData.classList.remove("tambah-data-active");
    tambahData.classList.add("tambah-data-disactive");

    belumDibaca.classList.remove("belum-dibaca-active");
    belumDibaca.classList.add("belum-dibaca-disactive");

    sudahDibaca.classList.remove("sudah-dibaca-active");
    sudahDibaca.classList.add("sudah-dibaca-disactive");

    dashboard.classList.remove("dashboard-card-disactive");
    dashboard.classList.add("dashboard-card-active");

    renderBookList();
});

btnBelumDibaca.addEventListener("click", () => {
    tambahData.classList.remove("tambah-data-active");
    tambahData.classList.add("tambah-data-disactive");

    dashboard.classList.remove("dashboard-card-active");
    dashboard.classList.add("dashboard-card-disactive");

    sudahDibaca.classList.remove("sudah-dibaca-active");
    sudahDibaca.classList.add("sudah-dibaca-disactive");

    renderBookList(null, false);

    belumDibaca.classList.remove("belum-dibaca-disactive");
    belumDibaca.classList.add("belum-dibaca-active");
});

btnSudahDibaca.addEventListener("click", () => {
    tambahData.classList.remove("tambah-data-active");
    tambahData.classList.add("tambah-data-disactive");

    dashboard.classList.remove("dashboard-card-active");
    dashboard.classList.add("dashboard-card-disactive");

    belumDibaca.classList.remove("belum-dibaca-active");
    belumDibaca.classList.add("belum-dibaca-disactive");

    renderBookList(null, true);

    sudahDibaca.classList.remove("sudah-dibaca-disactive");
    sudahDibaca.classList.add("sudah-dibaca-active");
});

if (localStorage.getItem("books")) {
    books = JSON.parse(localStorage.getItem("books"));
    renderBookList();
}

addBookForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const id = +new Date();
    const title = document.getElementById("judul").value;
    const author = document.getElementById("penulis").value;
    const tahunValue = document.getElementById("tahun").value;
    const year = parseInt(tahunValue);
    const cekbox = document.getElementById("cek");

    if (cekbox.checked) {
        isComplete = true
    } else {
        isComplete = false
    }

    const book = {
        id,
        title,
        author,
        year,
        isComplete,
    };

    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
    addBookForm.reset();
    renderBookList();
    window.location.href = "dashboard.html";
});

searchButton.addEventListener("click", performSearch);
searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        performSearch();
    }
});

function renderBookList(booksToRender, isComplete) {
    bookList.innerHTML = "";
    noReadList.innerHTML = "";
    readList.innerHTML = "";

    const booksToShow = booksToRender || books;
    const filteredBooks = isComplete === undefined ? booksToShow : booksToShow.filter(book => book.isComplete === isComplete);
    const filteredtrue = books.filter(book => book.isComplete === true);
    const filteredfalse = books.filter(book => book.isComplete === false);

    if (books.length === 0) {
        if (isComplete === true) {
            const noDataMessage = document.createElement("p");
            noDataMessage.textContent = "Daftar buku yang telah selesai dibaca belum ada!";
            readList.appendChild(noDataMessage);
        } else if (filteredfalse.length === 0 && isComplete === false) {
            const noDataMessage = document.createElement("p");
            noDataMessage.textContent = "Daftar buku yang telah belum dibaca belum ada!";
            noReadList.appendChild(noDataMessage);
        } else {
            const noDataMessage = document.createElement("p");
            noDataMessage.textContent = "Data Buku Masih Belum Tersedia!";
            bookList.appendChild(noDataMessage);
        }
    } else if (booksToShow.length === 0) {
        const noDataMessage = document.createElement("p");
        noDataMessage.textContent = "Pencarian buku tidak ditemukan!";
        bookList.appendChild(noDataMessage);
    } else if (filteredtrue.length === 0 && isComplete === true) {
        const noDataMessage = document.createElement("p");
        noDataMessage.textContent = "Daftar buku yang telah selesai dibaca belum ada!";
        readList.appendChild(noDataMessage);
    } else if (filteredfalse.length === 0 && isComplete === false) {
        const noDataMessage = document.createElement("p");
        noDataMessage.textContent = "Daftar buku yang telah belum dibaca belum ada!";
        noReadList.appendChild(noDataMessage);
    } else {
        for (const book of filteredBooks) {
            const bookItem = document.createElement("div");
            bookItem.className = "card-item table";
            bookItem.innerHTML = `
                <table>
                    <tr>
                        <td><strong>Judul Buku</strong></td>
                        <td style="padding-left: 10px;"><strong>:</strong></td>
                        <td style="padding-left: 10px;"><strong> ${book.title} </strong></td>
                    </tr>
                    <tr>
                        <td><strong>Penulis</strong></td>
                        <td style="padding-left: 10px;"><strong>:</strong></td>
                        <td style="padding-left: 10px;"><strong> ${book.author} </strong></td>
                    </tr>
                    <tr>
                        <td><strong>Tahun Terbit</strong></td>
                        <td style="padding-left: 10px;"><strong>:</strong></td>
                        <td style="padding-left: 10px;"><strong> ${book.year} </strong></td>
                    </tr>
                    <tr>
                        <td><strong>Keterangan</strong></td>
                        <td style="padding-left: 10px;"><strong>:</strong></td>
                        <td style="padding-left: 10px;"><strong> ${book.isComplete == true ? "<a class='btn-sm'>selesai<a>" : "<a class='btn-sm-progress'>progress<a>"} </strong></td>
                    </tr>
                </table>
                <button class="btn-delete" onclick="deleteBook(${book.id})">
                <i class="uil uil-trash i-del"></i>
                </button>
            `;

            if (isComplete == undefined) {
                bookList.appendChild(bookItem);
            } else if (book.isComplete === true) {
                readList.appendChild(bookItem);
            } else if (book.isComplete === false) {
                noReadList.appendChild(bookItem);
            }
        }
    }
}

function deleteBook(bookId) {
    console.log(bookId)
    const confirmation = confirm("Apakah Anda yakin ingin menghapus buku ini?");
    if (confirmation) {
        books = books.filter((book) => book.id.toString() != bookId);
        console.log("data", books)
        localStorage.setItem("books", JSON.stringify(books));
        alert('Data Berhasil Dihapus')
        renderBookList();
    }
}

function performSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredBooks = books.filter((book) => {
        return (
            book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm) ||
            book.year.toString().includes(searchTerm)
        );
    });
    renderBookList(filteredBooks);
}