// jQuery.ajax
$(function() {
    "use strict";
    var sa = '//localhost:3000';

    // User Login/Sign-Up Requests

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
            $('#signUpLinkTopRight').hide();
            console.log(JSON.stringify(data));
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            alert("Registration failed. Please try again.")
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
            //$('#homepage').hide();
            $('#myEventsLinkTopRight').removeClass("hidden");
            $('#signUpLinkTopRight').hide();
            //$('#eventpage').show();
            console.log(data.token);
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            alert("Login failed. Please try again.")
            console.log('Login failed.');
        })
        .always();
    });

    // Additional Navbar links
    $("#gatherTopLeft").click(function(){
      $('#homepage').show();
      $('#eventpage').addClass("hidden")
    });

    $("#myEventsLinkTopRight").click(function(){
      $('#homepage').hide();
      $('#eventpage').removeClass("hidden");
    });

    // Event CRUD actions

    $("#list-event-button").on("click", function(e) {
        $.ajax(sa + "/events", {
            dataType: "json",
            method: "GET",
            headers: {
              Authorization: 'Token token=' + simpleStorage.get('token')
            }
        })
        .done(function(data, textStatus, jqXHR) {
            console.log(JSON.stringify(data));
            var templatingFunction = Handlebars.compile($('#events-list-template').html());
            var html = templatingFunction({events: data.events });
            $('#events-list').html(html);
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            alert("Failed to list events.")
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

    $("#create-event-button").on("click", function(e) {
      $.ajax(sa + "/events", {
          contentType: "application/json",
          processData: false,
        data: JSON.stringify({
          event: {
              description: $("#inputEventDescription").val(),
              date: $("#inputEventDate").val(),
              time: $("#inputEventTime").val(),
              location: $("#inputEventLocation").val(),
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
      alert("Failed to create event. Please try again.")
      console.log('Failed to create event.')
    })
    .always();
  });

  //   $("#event-update").on("click", function(e) {
  //     $.ajax(sa + "/events/" + $("#event-id").val(), {
  //         contentType: "application/json",
  //         processData: false,
  //       data: JSON.stringify({
  //         event: {
  //             description: $("#event-description").val(),
  //             date: $("#event-date").val(),
  //             time: $("#event-time").val(),
  //             location: $("#event-location").val()
  //         }
  //       }),
  //       dataType: "json",
  //       method: "PATCH",
  //       headers: {
  //         Authorization: 'Token token=' + simpleStorage.get('token')
  //       }
  //   })
  //   .done(function(data, textStatus, jqXHR) {
  //     //$("#result").val(JSON.stringify(data));
  //     console.log('Event updated!')
  //   })
  //   .fail(function(jqXHR, textStatus, errorThrown) {
  //     //$("#result").val("create failed");
  //     console.log('Failed to update event.')
  //   })
  //   .always();
  // });

  //   $("#event-destroy").on("click", function(e) {
  //     $.ajax(sa + "/events/" + $("#event-id").val(), {
  //         contentType: "application/json",
  //         processData: false,
  //         method: "DELETE",
  //         headers: {
  //           Authorization: 'Token token=' + simpleStorage.get('token')
  //       }
  //   })
  //   .done(function(data, textStatus, jqXHR) {
  //     //$("#result").val(JSON.stringify(data));
  //     console.log('Event destroyed!')
  //   })
  //   .fail(function(jqXHR, textStatus, errorThrown) {
  //     //$("#result").val("create failed");
  //     console.log('Failed to destroy event.')
  //   })
  //   .always();
  // });

// RSVP actions

    // $("#list-all-rsvps").on("click", function(e) {
    //     $.ajax(sa + "/rsvps", {
    //         dataType: "json",
    //         method: "GET",
    //         headers: {
    //           Authorization: 'Token token=' + simpleStorage.get('token')
    //         }
    //     })
    //     .done(function(data, textStatus, jqXHR) {
    //         console.log(JSON.stringify(data));
    //     })
    //     .fail(function(jqXHR, textStatus, errorThrown) {
    //         console.log('Failed to list RSVPs.')
    //     })
    //     .always();
    // });

    // $("#rsvp-show").on("click", function(e) {
    //     $.ajax(sa + "/rsvps/" + $('#rsvp-id').val(), {
    //         dataType: "json",
    //         method: "GET",
    //         headers: {
    //           Authorization: 'Token token=' + simpleStorage.get('token')
    //         }
    //     })
    //     .done(function(data, textStatus, jqXHR) {
    //         console.log(JSON.stringify(data));
    //     })
    //     .fail(function(jqXHR, textStatus, errorThrown) {
    //         console.log('Failed to show RSVPs.')
    //     })
    //     .always();
    // });

    $("#create-rsvp-button").on("click", function(e) {
      var $modal = $('#createRsvpModal');
      $.ajax(sa + "/rsvps", {
          contentType: "application/json",
          processData: false,
        data: JSON.stringify({
          rsvp: {
              confirmed: $('input[name="optradio"]:checked').val(),
              item: $("#inputRsvpItem").val(),
              event_id: $modal.data('id')
          }
        }),
        dataType: "json",
        method: "POST",
        headers: {
          Authorization: 'Token token=' + simpleStorage.get('token')
        }
    })
    .done(function(data, textStatus, jqXHR) {
      $('#rsvp-button').fadeOut('fast');
      //$("#result").val(JSON.stringify(data));
      console.log(JSON.stringify(data));
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      //$("#result").val("create failed");
      console.log('Failed to RSVP.')
    })
    .always();
  });

    $("#update-rsvp-button").on("click", function(e) {
      var $modalUpdateRsvp = $('#updateRsvpModal');
      var rsvpId = $modalUpdateRsvp.data('id');
      console.log(rsvpId);
      $.ajax(sa + "/rsvps/" + rsvpId, {
          contentType: "application/json",
          processData: false,
        data: JSON.stringify({
          rsvp: {
              confirmed: $('input[name="optradio"]:checked').val(),
              item: $("#updateRsvpItem").val()
          }
        }),
        dataType: "json",
        method: "PATCH",
        headers: {
          Authorization: 'Token token=' + simpleStorage.get('token')
        }
    })
    .done(function(data, textStatus, jqXHR) {
      alert("RSVP updated!")
      console.log('RSVP updated!')
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      alert("Failed to update RSVP.")
      console.log('Failed to update RSVP.')
    })
    .always();
  });

    $("#delete-rsvp-button").on("click", function(e) {
      var $modalDeleteRsvp = $('#deleteRsvpModal');
      var rsvpId = $modalDeleteRsvp.data('id');
      console.log(rsvpId);
      $.ajax(sa + "/rsvps/" + rsvpId, {
          contentType: "application/json",
          processData: false,
          method: "DELETE",
          headers: {
            Authorization: 'Token token=' + simpleStorage.get('token')
        }
    })
    .done(function(data, textStatus, jqXHR) {
      //$("#result").val(JSON.stringify(data));
      alert("RSVP deleted!")
      console.log('RSVP destroyed!')
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      //$("#result").val("create failed");
      alert("Faield to delete RSVP.")
      console.log('Failed to destroy RSVP.')
    })
    .always();
  });

  $('#createRsvpModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var id = button.data('id') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.data('id', id);
  })

  $('#updateRsvpModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget)
    var id = button.closest('.rsvp').data('id')
    var modal = $(this)
    modal.data('id', id);
  })

  $('#deleteRsvpModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget)
    var id = button.closest('.rsvp').data('id')
    var modal = $(this)
    modal.data('id', id);
  })

});


