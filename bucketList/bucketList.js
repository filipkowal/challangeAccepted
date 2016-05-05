Challanges = new Mongo.Collection('challanges');


if (Meteor.isClient) {
  Template.nav.helpers({
    'listView'() {
      Session.set('view', 'listView');
    },
  });

  Template.nav.events({
    'click .listView'() {
      Session.set('view', 'listView');
    },
    'click .insertView'() {
      Session.set('view', 'insertView');
      console.log('insertView');
    },
  });

  Template.challangeList.helpers({
    'showChallanges'() {
      return Challanges.find();
    },
    'listView'() {
      if(Session.get('view') === 'listView') {
        return true;
      }
    },
  });

  Template.challangeList.events({
    'click .delete'() {
      Challanges.remove(this._id);
    }
  });

  Template.insertChallange.events({
    'submit .insertChallange'(event) {
        event.preventDefault();
        var challangeName = event.target.challangeName.value;
        var latitude = Number(event.target.latitude.value);
        var longitude = Number(event.target.longitude.value);
        var createdAt = new Date();
        var challangeDescription = event.target.challangeDescription.value;

        Challanges.insert({
        challangeName: challangeName,
        latitude: latitude,
        longitude: longitude,
        createdAt: createdAt,
        challangeDescription: challangeDescription,
        });

        event.target.challangeName.value = "";
        event.target.latitude.value = "";
        event.target.longitude.value = "";
        event.target.challangeDescription.value = "";
    },
  });

  Template.insertChallange.helpers({
    'insertView'() {
      if(Session.get('view') === 'insertView') {
        return true;
      }
    },
  });

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    });
  }
};