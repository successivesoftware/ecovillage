var IMAGE_KEY = 'shareOverlayAttachedImage';
Template.shareOverlay.onCreated(function() {
  Session.set(IMAGE_KEY, null);
});

Template.shareOverlay.helpers({
  attachedImage: function() {
    return Session.get('capImg');
  },
});
Template.shareOverlay.events({
  'click .js-attach-image': function() {
    MeteorCamera.getPicture({width: 320}, function(error, data) {
      if (error)
        alert(error.reason);
      else
        Session.set(IMAGE_KEY, data);
        Session.set('capImg', Session.get(IMAGE_KEY));
    });
  },
  'submit': function(event, template) {

    Meteor.call("byte64toImg" , Session.get('capImg') , event.target.text.value , function(err, response) {
      if(err) {
        console.log(err);
        Session.set('serverDataResponse', "Error:" + err.reason);
        return;
      }
      Session.set( 'Img_Name', response);
      Router.go('shareOverlay2');
    });
    //Meteor.call("addPosts",event.target.text.value,Session.get(IMAGE_KEY));
  },

  'click .back':function(){
    Session.set(IMAGE_KEY, null);
  },
  'click .edit': function ( ) {
    $('.imagetocropModel').cropper({
      aspectRatio: 16 / 9,
      autoCropArea: 0.65,
      strict: false,
      guides: false,
      highlight: true,
      dragCrop: false,
      movable: true,
      resizable: true
    });
    $('.modal')
        .modal({
          closable  : false,
          onDeny    : function(){

          },
          onApprove : function() {
            var cropped =  $('.imagetocropModel').cropper("getDataURL", "image/jpeg", 0.6);
            Session.set('capImg', cropped);
            return true;
          }
        })
        .modal('setting', 'transition', 'horizontal flip')
        .modal('setting', 'closable', false )
        .modal('setting', 'closable', false )
        .modal('show');
  },

});
