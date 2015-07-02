/**
 * Created by Successive on 09-06-2015.
 */
var require = __meteor_bootstrap__.require ? __meteor_bootstrap__.require : Npm.require;
var fs = require('fs');
//var gm = require('graphicsmagick');
Meteor.methods({
    byte64toImg : function( IMAGE_KEY , comment){

        var matches = IMAGE_KEY.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

        if (matches.length !== 3) {
            return new Error('Invalid input string');
        }

        type = matches[1];
        data = new Buffer(matches[2], 'base64');

        var imgName = Random.id([16])+'.jpg';

        //  fs.writeFile('image_decoded.txt', IMAGE_KEY, 'binary', function(err) {});
        fs.readFile(  data , 'binary', function(err, original_data){
            var decodedImage = new Buffer ( data , 'base64').toString('binary');
            console.log("decodedImage:");
            //console.log(decodedImage);
            fs.writeFile(process.env.METEOR_SHELL_DIR +'../../../../public/'+imgName , decodedImage, 'binary', function(err) {});
            //var filePath = process.env.PWD + '/public/.uploads/' ;
            //var data = fs.readFileSync(filePath, decodedImage);
        });
        console.log(imgName);
        Meteor.call( 'addPosts' , comment , imgName );
        return imgName ;
    },
})

Meteor.publish('RecivePosts', function(){
    return Posts.find();
});