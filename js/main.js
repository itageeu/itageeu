firebase.auth().signInAnonymously().catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
});

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      // ...
    } else {
      // User is signed out.
      // ...
    }
    // ...
  });

function kaydetVeritabani(tablo, id, veri) {




    firebase.database().ref(tablo + '/' + id).set(veri).then(function (deneme) {
        msgInfo("Başarılı", "Kayıt tamamlandı. İşleminize devam edebilirsiniz..");
    }).catch(function (error) {
        msgInfo("Uyarı", "Kayıt tamamlanamadı. Lütfen girişlerinizi kontrol ediniz.");
        console.error("ERROR: " + error);

    });
}

function generateID(text) {
    var d = new Date();
    var n = GetTimeStamp(d);
    text = text.replace(/[^\x00-\x7F]/g, "").split(' ').join('') + n;
    text = text.replace(/[{()}]/g, '');
    text = text.replace(/[\[\]']+/g, '');
    text = text.replace(/\(|\)/g, '')
    return text;
}

function GetTimeStamp(dt) {

    var timestmp = dt.getTime();

    return timestmp;
}


function saveContactInfo() {

    if (validateFields()) {

        var txtName = $("#txtName").val();
        var txtCompany = $("#txtCompany").val();
        var txtPhone = $("#txtPhone").val();
        var txtEmail = $("#txtEmail").val();
        var txtMessage = $("#txtMessage").val();

        var d = new Date();
        var dd = d.getDate();
        var mm = (d.getMonth() + 1);
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        var tarih = dd + "/" + mm + "/" + d.getFullYear() + " "+d.getHours()+":";//+d.getMinutes()+":"+d.getMilliseconds();

        var veri = {
            "Name": txtName,
            "Company": txtCompany,
            "Phone": txtPhone,
            "Email": txtEmail,
            "Message": txtMessage,
            "Date": tarih
        }

        var id = generateID(txtName);

        kaydetVeritabani("kontakte", id, veri);


    }


}

function validateFields() {
    var statusreq = validateRequiredFields();
    var statusnum = validateRequiredFields();

    return statusreq && statusnum;
}

function validateRequiredFields() {
    var allright = true;
    $(".required").each(function (r) {
        if (this.value === "") {
            $("#" + this.id).addClass("invalid");
            allright = false;
        } else {
            $("#" + this.id).removeClass("invalid");
        }
    });

    $(".requireddrp").each(function (r) {
        if (this.value === "0") {
            $("#" + this.id).addClass("invalid");
            allright = false;
        } else {
            $("#" + this.id).removeClass("invalid");
        }
    });

    return allright;
}

function msgInfo(title, msg) {


    $("#modalTitle").text(title);
    $("#modalMessage").text(msg);
    $("#modalBtnClose2").addClass("hide");
    $("#modalAlert div.modal-body").removeClass('bg-warning');
    $("#modalAlert div.modal-body").addClass('bg-success');
    $("#modalAlert div.modal-header").removeClass("text-danger");
    $("#modalAlert div.modal-header").addClass("text-success");
    $("#modalmessage").removeClass("text-danger");
    $("#modalmessage").addClass("text-success");
    $("#modalTitle").removeClass("text-danger");
    $("#modalTitle").addClass("text-success");
    $("#modalAlert").modal({ backdrop: 'true' });
    $("#modalAlert").modal({ backdrop: 'true', show: 'show' });

}

function msgWarning(title, msg) {


    $("#modalTitle").text(title);
    $("#modalMessage").text(msg);
    $("#modalBtnClose").removeClass("hide");
    //$("#modalBtnClose2").removeClass("hide");
    $("#modalAlert div.modal-body").removeClass('bg-success');
    $("#modalAlert div.modal-body").addClass('bg-warning');
    $("#modalAlert div.modal-header").removeClass("text-success");
    $("#modalAlert div.modal-header").addClass("text-danger");
    $("#modalmessage").removeClass("text-success");
    $("#modalmessage").addClass("text-danger");
    $("#modalTitle").removeClass("text-success");
    $("#modalTitle").addClass("text-danger");
    $("#modalAlert").modal({ backdrop: 'true', show: 'show' });
}

