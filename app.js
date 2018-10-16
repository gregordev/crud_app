var bookStore = new function() {


    // Obiekt JSON zawierajacy wszystkie książki, pełni funkcję prowizorycznej bazy danych
    this.allBooks = [
        {
            id: 1,
            title: 'Harry Potter and the Chamber of Secrets',
            category: 'Fantasy',
            price: 55.40
        },
        {
            id: 2,
            title: 'JavaScript - all you should know',
            category: 'IT',
            price: 122.80
        },
        {
            id: 3,
            title: 'Front End Handbook',
            category: 'IT',
            price: 112.20
        }
    ];

    // Lista dostępnych kategorii
    this.category = ['Fantasy', 'Health', 'Biography', 'IT'];

    // Tablica zawierająca wszystkie nagłówki tabeli
    this.column = [];

    /*
        ~~ Tworzenie tabeli ~~
    */
    this.createTable = function() {

        // Wypełniam tablicę this.column wszystkimi nagłówkami obiektów JSON
        for (var i = 0; i < this.allBooks.length; i++) {
            for (let key in this.allBooks[i]) {
                if (this.column.indexOf(key) === -1) {
                    this.column.push(key);
                }
            }
        }


        // Tworzenie tabeli
        let table = document.createElement('table');
        table.setAttribute('id', 'table');
        
        // Tworzenie pierwszego wiersza tabeli, w którym będą nagłówki
        let tr = table.insertRow(-1);

        // Tworzenie 'header cell <th>' dla każdego nagłówka zawartego w this.column
        for (let h = 0; h < this.column.length; h++) {
            let th = document.createElement('th');
            th.innerHTML = this.column[h];
            th.setAttribute('style', 'text-transform: uppercase');
            tr.appendChild(th);
        }

        // Tworzenie wierszy z JSONa
        for (let i = 0; i < this.allBooks.length; i++) {
            tr = table.insertRow(-1);

            for (let j = 0; j < this.column.length; j++) {
                let tableCell = tr.insertCell(-1);
                tableCell.innerHTML = this.allBooks[i][this.column[j]];
            }

            this.td = document.createElement('td');


             /*****************************************
             *****CANCEL BUTTON DLA KAŻDEGO REKORDU****
             *****************************************/

            tr.appendChild(this.td);
            var lblCancel = document.createElement('label');
            lblCancel.innerHTML = '✖';
            // Nadanie atrybutów oraz eventListenera
            lblCancel.setAttribute('style', 'display:none;');
            lblCancel.setAttribute('title', 'Cancel');
            lblCancel.setAttribute('id', 'lbl' + i);
            lblCancel.setAttribute('onclick', 'bookStore.Cancel(this)');
            this.td.appendChild(lblCancel);


            /******************************************
            *****SAVE BUTTON DLA KAŻDEGO REKORDU*******
            ******************************************/

            tr.appendChild(this.td);
            var btSave = document.createElement('input');
            // Nadanie atrybutów oraz eventListenera
            btSave.setAttribute('type', 'button');
            btSave.setAttribute('value', 'Save');
            btSave.setAttribute('id', 'save' + i);
            btSave.setAttribute('style', 'display:none;');
            btSave.setAttribute('onclick', 'bookStore.Save(this)');
            this.td.appendChild(btSave);


            /*****************************************
            *****UPDATE BUTTON DLA KAŻDEGO REKORDU****
            *****************************************/

            tr.appendChild(this.td);
            var btUpdate = document.createElement('input');
            // Nadanie atrybutów oraz eventListenera
            btUpdate.setAttribute('type', 'button');    // SET ATTRIBUTES.
            btUpdate.setAttribute('value', 'Update');
            btUpdate.setAttribute('id', 'edit' + i);
            btUpdate.setAttribute('style', 'background-color: #3C7CC4; border-radius: 4px;');
            btUpdate.setAttribute('onclick', 'bookStore.Update(this)');   // ADD THE BUTTON's 'onclick' EVENT.
            this.td.appendChild(btUpdate);

            /*****************************************
             *****DELETE BUTTON DLA KAŻDEGO REKORDU****
             *****************************************/
            this.td = document.createElement('td');
            tr.appendChild(this.td);
            var btDelete = document.createElement('input');
            btDelete.setAttribute('type', 'button');    // SET INPUT ATTRIBUTE.
            btDelete.setAttribute('value', 'Delete');
            btDelete.setAttribute('style', 'background-color: #CC0404; border-radius: 4px;');
            btDelete.setAttribute('onclick', 'bookStore.Delete(this)');   // ADD THE BUTTON's 'onclick' EVENT.
            this.td.appendChild(btDelete);
        }


        // Dodanie blank inputów z dropdown listą na samym końcu dla tworzenia nowych rekordów

        tr = table.insertRow(-1);
        tr.setAttribute('style', 'background-color: #4b495e !important;')

        // id = 0, title = 1, category = 2, price = 3
        for (let j = 0; j < this.column.length; j++) {
            
            // Dodajemy komórkę dla każdego j, a więc 4 komórki
            let newCell = tr.insertCell(-1);
            // Zaczynamy od 1, ponieważ nie potrzebujemy pustego inputa w id (0)
            if (j >= 1) {

                // Lista rozwijana jest dla 2-giej kolumny (category)
                if (j == 2) {

                    var select = document.createElement('select');
                    select.innerHTML = '<option value="" disabled selected>Select a category</option>';
                    for (let k = 0; k < this.category.length; k++) {
                        select.innerHTML = select.innerHTML +
                            '<option value="' + this.category[k] + '">' + this.category[k] + '</option>';
                    }
                    newCell.appendChild(select);
                }
                // Dla 1-wszej i 3-ciej kolumny input texty
                else if (j == 1) {
                    //
                    var tBox = document.createElement('input');
                    tBox.setAttribute('type', 'text');
                    tBox.setAttribute('placeholder', 'Title of a book');
                    tBox.setAttribute('value', '');
                    newCell.appendChild(tBox);
                } else {
                    var tBox = document.createElement('input');
                    tBox.setAttribute('type', 'number');
                    tBox.setAttribute('placeholder', 'Type a price');
                    tBox.setAttribute('style', 'text-align: center;');
                    tBox.setAttribute('value', '');
                    newCell.appendChild(tBox);
                }
            }
        }
        // Dodanie komórki dla Create New buttona
        this.td = document.createElement('td');
        tr.appendChild(this.td);

        // Dodanie CREATE NEW Buttona
        var btNew = document.createElement('input');
        btNew.setAttribute('type', 'button');
        btNew.setAttribute('value', 'Create');
        btNew.setAttribute('id', 'new' + i);
        btNew.setAttribute('style', 'background-color: #2d8930; border-radius: 4px; padding: 6px 6px;');
        btNew.setAttribute('onclick', 'bookStore.CreateNew(this)');
        this.td.appendChild(btNew);

        // Dodanie tabeli do strony
        var container = document.getElementById('container');
        container.innerHTML = '';
        container.appendChild(table);
    };

    /*----------------------------------------
    ------------------------------------------
    ------------------------------------------
    Rozpoczęcie kodu funkcjonalności aplikacji
    ------------------------------------------
    ------------------------------------------
    ----------------------------------------*/

    /****************************************
    ************** ~~ CANCEL ~~ *************
    ****************************************/

   this.Cancel = function (button) {

        // Ukrycie Cancel buttona
        button.setAttribute('style', 'display:none; float:none;');

        // Ustalenie indexu aktywnego wiersza
        var activeRow = button.parentNode.parentNode.rowIndex;

        // Ukrycie Save buttona
        var btSave = document.getElementById('save' + (activeRow - 1));
        btSave.setAttribute('style', 'display:none;');

        // Ponowne pokazanie Update Buttona
        var btUpdate = document.getElementById('edit' + (activeRow - 1));
        btUpdate.setAttribute('style', 'display:block; margin:0 auto; background-color: #3C7CC4; border-radius: 4px;');
        btUpdate.classList.add('animated', "fadeIn");

        // Ustalenie aktywnego wiersza na podstawie indexu
        var tab = document.getElementById('table').rows[activeRow];

        // Ponowne wczytanie z JSONa danych do komórek aktywnego wiersza
        for (i = 0; i < this.column.length; i++) {
            var td = tab.getElementsByTagName("td")[i];
            td.innerHTML = this.allBooks[(activeRow - 1)][this.column[i]];
        }
    };

    /****************************************
    ************** ~~ UPDATE ~~ *************
    ****************************************/

    this.Update = function (button) {

        // Aktualny wiersz
        var activeRow = button.parentNode.parentNode.rowIndex;
        var tab = document.getElementById('table').rows[activeRow];

        for (i = 1; i < 4; i++) {

            // Wstawiam listę rozwijaną dla 'category'
            if (i == 2) {
                var td = tab.getElementsByTagName("td")[i];
                var ele = document.createElement('select');      // DROPDOWN LIST.
                ele.innerHTML = '<option value="' + td.innerText + '">' + td.innerText + '</option>';
                for (k = 0; k < this.category.length; k++) {
                    ele.innerHTML = ele.innerHTML +
                        '<option value="' + this.category[k] + '">' + this.category[k] + '</option>';
                }
                td.innerText = '';
                td.appendChild(ele);
            }
            // Dla pozostałych wstawiam inputy
            else if (i == 1) {
                var td = tab.getElementsByTagName("td")[i];
                var ele = document.createElement('input');
                ele.setAttribute('type', 'text');
                // Pobranie wartości aktualnej z innerText i przekazanie jej do inputa
                ele.setAttribute('value', td.innerText);
                // Wyzerowanie innerText
                td.innerText = '';
                td.appendChild(ele);
            } else {
                var td = tab.getElementsByTagName("td")[i];
                var ele = document.createElement('input');
                ele.setAttribute('type', 'number');
                // Pobranie wartości aktualnej z innerText i przekazanie jej do inputa
                ele.setAttribute('value', td.innerText);
                // Wyzerowanie innerText
                td.innerText = '';
                td.appendChild(ele); 
            }
        }

        // Wyświetlam Cancel button
        var lblCancel = document.getElementById('lbl' + (activeRow - 1));
        lblCancel.setAttribute('style', 'cursor:pointer; display:block; width:20px; float:left; position: absolute; color: #5C5C64; margin-left: 10px;');
        lblCancel.classList.add('animated', "fadeIn");

        // Wyświetlam Save button
        var btSave = document.getElementById('save' + (activeRow - 1));
        btSave.setAttribute('style', 'display:block; margin-left:40px; float:left; background-color: #29792C; border-radius: 4px;');
        btSave.classList.add('animated', "fadeIn");

        // Chowam Update button
        button.setAttribute('style', 'display:none;');
    };

    /****************************************
    ************** ~~ DELETE ~~ *************
    ****************************************/

    this.Delete = function (button) {
        var activeRow = button.parentNode.parentNode.rowIndex;
        
        // Usuwam aktywny wiersz
        this.allBooks.splice((activeRow - 1), 1);
        
        // Odświeżam tabelę
        this.createTable();
    };

    /****************************************
    ************** ~~ SAVE ~~ *************
    ****************************************/

   this.Save = function (button) {

    // Aktywny wiersz
    var activeRow = button.parentNode.parentNode.rowIndex;
    var tab = document.getElementById('table').rows[activeRow];

    for (i = 1; i < this.column.length; i++) {
        var td = tab.getElementsByTagName("td")[i];

        // Sprawdzam czy to co jest w komórkach (poza id) jest inputem czy selectem - tak na wszelki wypadek
        if (td.childNodes[0].getAttribute('type') == 'text' || td.childNodes[0].tagName == 'SELECT' || td.childNodes[0].getAttribute('type') == 'number') {
            this.allBooks[(activeRow - 1)][this.column[i]] = td.childNodes[0].value;
            if (this.allBooks[activeRow - 1][this.column[3]]) {
                            // Przeparsowanie stringa na inta w przypadku 'price', które jest liczbą
            this.allBooks[activeRow - 1][this.column[3]] = parseFloat(td.childNodes[0].value);
            }


        }
    }
    this.createTable();
}

    /****************************************
    ************** ~~ CREATE NEW ~~ *********
    ****************************************/

   this.CreateNew = function (button) {
       

    // Aktywny wiersz
    var activeRow = button.parentNode.parentNode.rowIndex;
    var tab = document.getElementById('table').rows[activeRow];
    var obj = {};

    for (i = 1; i < this.column.length; i++) {
        
        // Wszystkie aktywne komórki (są w nich inputy albo select, będą służyły do wstawienia value do obiektu)
        var td = tab.getElementsByTagName("td")[i];

        // Sprawdzam czy to co jest w komórkach (poza id) jest inputem czy selectem - tak na wszelki wypadek
        if (td.childNodes[0].getAttribute('type') == 'text' || td.childNodes[0].tagName == 'SELECT' || td.childNodes[0].getAttribute('type') == 'number') {

            // Tworzę kolejne id
            if (this.allBooks.length === 0) {
                obj[this.column[0]] = 1;
            } else {
                obj[this.column[0]] = this.allBooks[(this.allBooks.length - 1)].id + 1;
            }
            

            // Dla każdej komórki pobieram wartości z inputa/selecta i wstawiam je do zmiennej
            var txtVal = td.childNodes[0].value;
            if (txtVal != '') {
                
                // Wstawianie wartości do obiektu, trim pozbywa się spacji dookoła
                obj[this.column[i]] = txtVal.trim();
            }
            else {
                // Jeśli jakieś pole jest puste, breakuje pętlę i zeruję obiekt
                obj = '';
                alert('You cannot add a book to the book store without any data!');
                break;
            }
        }
    }

    // Sprawdź, czy obiekt nie jest pusty
    if (Object.keys(obj).length > 0) {  
        
        // Zamieniam 'price' w inta
        obj.price = parseFloat(obj.price);
        // Pushuję obiekt do tablicy z JSONem
        this.allBooks.push(obj);  
        
        // Odświeżam tabelę
        this.createTable();
    }
}

}

// Tworzę tabelę na samym początku działania aplikacji
bookStore.createTable();