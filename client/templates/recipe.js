var TAB_KEY = 'recipeShowTab';

Template.recipe.onCreated(function() {
  Session.set('scroll' , true );
  if (Router.current().params.activityId)
    Template.recipe.setTab('feed');
  else
    Template.recipe.setTab('recipe');
});

Template.recipe.onRendered(function () {
  Template.recipe.setTab('recipe');
  this.$('.recipe').touchwipe({
    wipeDown: function () {
      if (Session.equals(TAB_KEY, 'recipe'))
        Template.recipe.setTab('make')
    },
    preventDefaultEvents: false
  });
  this.$('.attribution-recipe').touchwipe({
    wipeUp: function () {
      if (! Session.equals(TAB_KEY, 'recipe'))
        Template.recipe.setTab('recipe')
    },
    preventDefaultEvents: false
  });
});

// CSS transitions can't tell the difference between e.g. reaching
//   the "make" tab from the expanded state or the "feed" tab
//   so we need to help the transition out by attaching another
//   class that indicates if the feed tab should slide out of the
//   way smoothly, right away, or after the transition is over
Template.recipe.setTab = function(tab) {

  var lastTab = Session.get(TAB_KEY);
  Session.set(TAB_KEY, tab);
  var fromRecipe = (lastTab === 'recipe') && (tab !== 'recipe');
  $('.feed-scrollable').toggleClass('instant', fromRecipe);

  var toRecipe = (lastTab !== 'recipe') && (tab === 'recipe');
  $('.feed-scrollable').toggleClass('delayed', toRecipe);
}

Template.recipe.helpers({
  isActiveTab: function(name) {
    return Session.equals(TAB_KEY, name);
  },
  activeTabClass: function() {
    return Session.get(TAB_KEY);
  },

  bookmarked: function() {
    return Meteor.user() && _.include(Meteor.user().bookmarkedRecipeNames, this.name);
  },
  title: function(){
    return RecipesData[this.name].title;
  },
  activities: function() {
    return Activities.find({ingredients: this.name}, {sort: {date: -1}});
  },
  ingredients : function () {
    if(Session.get('scroll')){
      return RecipesData[this.name].ingredients;
    }else{
      return null;
    }
  },
  directions : function() {
    if(Session.get('scroll')){
      return RecipesData[this.name].ingredients;
    }else{
      return null;
    }
  }
});

Template.recipe.events({
  'click .js-add-bookmark': function(event) {
    event.preventDefault();

    if (! Meteor.userId())
      return Overlay.open('authOverlay');

    Meteor.call('bookmarkRecipe', this.name);
  },
  'click .js-remove-bookmark': function(event) {
    event.preventDefault();

    Meteor.call('unbookmarkRecipe', this.name);
  },
  'scroll .page' : function(){
    Session.set('scroll' , true );
  }
});
