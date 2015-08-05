// jQuery.ajax
$(function() {
    "use strict";
    var sa = '//localhost:3000';

    $("#sign-up-button").on("click", function(e) {
        $.ajax(sa + "/users", {
            contentType: "application/json",
            data: JSON.stringify({
                credentials: {
                    //name: $("#exampleInputName1").val(),
                    email: $("#exampleInputEmail1").val(),
                    password: $("#exampleInputPassword1").val(),
                    password_confirmation: $("#exampleInputPassword1").val()
                },
                profile: {
                  name: $("#exampleInputName1").val()
                }
            }),
            dataType: "json",
            method: "POST",
            processData: false
        })
        .done(function(data, textStatus, jqXHR) {
            //$("#result").val(JSON.stringify(data));
            console.log(JSON.stringify(data));
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            //$("#result").val("registration failed");
            console.log('Registration failed.');
        })
        .always();
    });

    $("#log-in-button").on("click", function(e) {
        $.ajax(sa + "/login", {
            contentType: "application/json",
            data: JSON.stringify({
                credentials: {
                    email: $("#exampleInputEmail2").val(),
                    password: $("#exampleInputPassword2").val(),
                    password_confirmation: $("#exampleInputPassword2").val()
                }
            }),
            dataType: "json",
            method: "POST",
            processData: false
        })
        .done(function(data, textStatus, jqXHR) {
            //$("#token").val(data.token);
            console.log(data.token);
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            //$("#result").val("login failed");
            console.log('Login failed.');
        })
        .always();
    });

    $("#list").on("click", function(e) {
        $.ajax(sa + "/users", {
            dataType: "json",
            method: "GET",
            headers: {
              Authorization: 'Token token=' + $('#token').val()
            }
        })
        .done(function(data, textStatus, jqXHR) {
            $("#result").val(JSON.stringify(data));
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            $("#result").val("login failed");
        })
        .always();
    });

    $("#create").on("click", function(e) {
        $.ajax(sa + "/games", {
            contentType: "application/json",
            processData: false,
            data: JSON.stringify({}),
            dataType: "json",
            method: "POST",
            headers: {
              Authorization: 'Token token=' + $('#token').val()
            }
        })
        .done(function(data, textStatus, jqXHR) {
            $("#result").val(JSON.stringify(data));
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            $("#result").val("create failed");
        })
        .always();
    });

    $("#show").on("click", function(e) {
        $.ajax(sa + "/games/" + $('#id').val(), {
            dataType: "json",
            method: "GET",
            headers: {
              Authorization: 'Token token=' + $('#token').val()
            }
        })
        .done(function(data, textStatus, jqXHR) {
            $("#result").val(JSON.stringify(data));
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            $("#result").val("show failed");
        })
        .always();
    });

    $("#join").on("click", function(e) {
      $.ajax(sa + "/games/" + $('#id').val(), {
          contentType: "application/json",
          processData: false,
          data: JSON.stringify({}),
          dataType: "json",
          method: "PATCH",
          headers: {
            Authorization: 'Token token=' + $('#token').val()
        }
    })
      .done(function(data, textStatus, jqXHR) {
          $("#result").val(JSON.stringify(data));
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
          $("#result").val("join failed");
      })
      .always();
  });

$("#move").on("click", function(e) {
      $.ajax(sa + "/games/" + $('#id').val(), {
          contentType: "application/json",
          processData: false,
          data: JSON.stringify({
            game: {
                cell: {
                index: +$('#index').val(),
                value: $('#value').val()
                }
            }
          }),
          dataType: "json",
          method: "PATCH",
          headers: {
            Authorization: 'Token token=' + $('#token').val()
        }
    })
      .done(function(data, textStatus, jqXHR) {
          $("#result").val(JSON.stringify(data));
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
          $("#result").val("move failed");
      })
      .always();
  });

    $('#watch').on('click', function() {
        gameWatcher = resourceWatcher(sa + "/games/" + $('#id').val() + '/watch', {
            Authorization: 'Token token=' + $('#token').val()
        });
        gameWatcher.on('change', function(data){
            var parsedData = JSON.parse(data);
            // heroku routers report this as a 503
            // if (data.timeout) { //not an error
            // gameWatcher.close();
            // return console.warn(data.timeout);
            // }
            var gameData = parsedData.game;
            var cell = gameData.cell
            $('#index').val(cell.index);
            $('#value').val(cell.value);
        });
        gameWatcher.on('error', function(e){
            console.error('an error has occured with the stream', e);
        });
    });

});
