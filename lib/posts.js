/**
 * Created on 08-06-2015.
 */
Posts = new Mongo.Collection('posts');
Meteor.methods({
    'addPosts' : function(name , image) {
        Posts.insert({
            text: name,
            image: image,
        });
    },
    'allPosts':function(){
        return Posts.findOne();
    }
});