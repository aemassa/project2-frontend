// jQuery.ajax
$(function() {
    "use strict";
    var sa = '//localhost:3000';
    //var myToken;

    $("#sign-up-button").on("click", function(e) {
        $.ajax(sa + "/users", {
            contentType: "application/json",
            data: JSON.stringify({
                credentials: {
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
            console.log(JSON.stringify(data));
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
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
            //myToken = data.token;
            simpleStorage.set('token', data.token);
            console.log(data.token);
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.log('Login failed.');
        })
        .always();
    });

    $("#list").on("click", function(e) {
        $.ajax(sa + "/events", {
            dataType: "json",
            method: "GET",
            headers: {
              Authorization: 'Token token=' + simpleStorage.get('token')
            }
        })
        .done(function(data, textStatus, jqXHR) {
            console.log(JSON.stringify(data));
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.log('Failed to list events.')
        })
        .always();
    });

    // $("#create-event-button").on("click", function(e) {
    //     $.ajax(sa + "/events", {
    //         contentType: "application/json",
    //         processData: false,
    //         data: JSON.stringify({
    //           event: {
    //               description: $("#inputEventDescription").val(),
    //               date: $("#inputEventDate").val(),
    //               time: $("#inputEventTime").val(),
    //               location: $("#inputEventLocation").val(),
    //           }
    //         }),
    //         dataType: "json",
    //         method: "POST",
    //         headers: {
    //           Authorization: 'Token token=' + simpleStorage.get('token')
    //         }
    //     })
    //     .done(function(data, textStatus, jqXHR) {
    //         //$("#result").val(JSON.stringify(data));
    //         console.log(JSON.stringify(data));
    //     })
    //     .fail(function(jqXHR, textStatus, errorThrown) {
    //         //$("#result").val("create failed");
    //         console.log('Failed to create event.')
    //     })
    //     .always();
    // });

    $("#event-create").on("click", function(e) {
      $.ajax(sa + "/events", {
          contentType: "application/json",
          processData: false,
        data: JSON.stringify({
          event: {
              description: $("#event-description").val(),
              date: $("#event-date").val(),
              time: $("#event-time").val(),
              location: $("#event-location").val(),
          }
        }),
        dataType: "json",
        method: "POST",
        headers: {
          Authorization: 'Token token=' + simpleStorage.get('token')
        }
    })
    .done(function(data, textStatus, jqXHR) {
      //$("#result").val(JSON.stringify(data));
      console.log(JSON.stringify(data));
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      //$("#result").val("create failed");
      console.log('Failed to create event.')
    })
    .always();
  });

    $("#event-update").on("click", function(e) {
      $.ajax(sa + "/events/" + $("#event-id").val(), {
          contentType: "application/json",
          processData: false,
        data: JSON.stringify({
          event: {
              description: $("#event-description").val(),
              date: $("#event-date").val(),
              time: $("#event-time").val(),
              location: $("#event-location").val()
          }
        }),
        dataType: "json",
        method: "PATCH",
        headers: {
          Authorization: 'Token token=' + simpleStorage.get('token')
        }
    })
    .done(function(data, textStatus, jqXHR) {
      //$("#result").val(JSON.stringify(data));
      console.log('Event updated!')
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      //$("#result").val("create failed");
      console.log('Failed to update event.')
    })
    .always();
  });

    // $("#event-update").on('click', function(){
    //   $.ajax({
    //     url: '/events/' + $("#event-id").val(),
    //     method: 'PATCH',
    //     data: {
    //       event: {
    //         description: $("#event-description").val(),
    //         date: $("#event-date").val(),
    //         time: $("#event-time").val(),
    //         location: $("#event-location").val()
    //       }
    //     }
    //     }).done(function(data){
    //       console.log("Updated event!");
    //     }).fail(function(data){
    //       console.error(data);
    //     });
    //   });

    $("#event-destroy").on("click", function(e) {
      $.ajax(sa + "/events/" + $("#event-id").val(), {
          contentType: "application/json",
          processData: false,
          method: "DELETE",
          headers: {
            Authorization: 'Token token=' + simpleStorage.get('token')
        }
    })
    .done(function(data, textStatus, jqXHR) {
      //$("#result").val(JSON.stringify(data));
      console.log('Event destroyed!')
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      //$("#result").val("create failed");
      console.log('Failed to destroy event.')
    })
    .always();
  });


//     $("#show").on("click", function(e) {
//         $.ajax(sa + "/games/" + $('#id').val(), {
//             dataType: "json",
//             method: "GET",
//             headers: {
//               Authorization: 'Token token=' + $('#token').val()
//             }
//         })
//         .done(function(data, textStatus, jqXHR) {
//             $("#result").val(JSON.stringify(data));
//         })
//         .fail(function(jqXHR, textStatus, errorThrown) {
//             $("#result").val("show failed");
//         })
//         .always();
//     });

//     $("#join").on("click", function(e) {
//       $.ajax(sa + "/games/" + $('#id').val(), {
//           contentType: "application/json",
//           processData: false,
//           data: JSON.stringify({}),
//           dataType: "json",
//           method: "PATCH",
//           headers: {
//             Authorization: 'Token token=' + $('#token').val()
//         }
//     })
//       .done(function(data, textStatus, jqXHR) {
//           $("#result").val(JSON.stringify(data));
//       })
//       .fail(function(jqXHR, textStatus, errorThrown) {
//           $("#result").val("join failed");
//       })
//       .always();
//   });

// $("#move").on("click", function(e) {
//       $.ajax(sa + "/games/" + $('#id').val(), {
//           contentType: "application/json",
//           processData: false,
//           data: JSON.stringify({
//             game: {
//                 cell: {
//                 index: +$('#index').val(),
//                 value: $('#value').val()
//                 }
//             }
//           }),
//           dataType: "json",
//           method: "PATCH",
//           headers: {
//             Authorization: 'Token token=' + $('#token').val()
//         }
//     })
//       .done(function(data, textStatus, jqXHR) {
//           $("#result").val(JSON.stringify(data));
//       })
//       .fail(function(jqXHR, textStatus, errorThrown) {
//           $("#result").val("move failed");
//       })
//       .always();
//   });

//     $('#watch').on('click', function() {
//         gameWatcher = resourceWatcher(sa + "/games/" + $('#id').val() + '/watch', {
//             Authorization: 'Token token=' + $('#token').val()
//         });
//         gameWatcher.on('change', function(data){
//             var parsedData = JSON.parse(data);
//             // heroku routers report this as a 503
//             // if (data.timeout) { //not an error
//             // gameWatcher.close();
//             // return console.warn(data.timeout);
//             // }
//             var gameData = parsedData.game;
//             var cell = gameData.cell
//             $('#index').val(cell.index);
//             $('#value').val(cell.value);
//         });
//         gameWatcher.on('error', function(e){
//             console.error('an error has occured with the stream', e);
//         });
//     });

});
