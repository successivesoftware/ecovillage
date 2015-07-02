Meteor.subscribe('RecivePosts');
Template.feed.helpers({
  activities: function() {
    return Activities.find({}, {sort: {date: -1}});
  },
  ready: function() {
    return Router.current().feedSubscription.ready();
  },
  posts : function(){
    console.log(Posts.find());
    return Posts.find();
  }
})